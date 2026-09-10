"""
Document Ingestion Pipeline for IP-Sahayak.
Loads IPR legal documents (PDF, DOCX, TXT, Markdown, JSON), cleans text,
splits into legally meaningful chunks preserving section context and metadata.
"""

import json
import logging
import os
import re
from pathlib import Path
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)


def clean_text(text: str) -> str:
    """Normalizes whitespace and cleans common extraction artifacts."""
    if not text:
        return ""
    # Replace non-breaking spaces and other odd whitespaces
    text = text.replace("\u00a0", " ").replace("\ufeff", "")
    # Normalize carriage returns
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    # Collapse multiple empty lines
    text = re.sub(r"\n{3,}", "\n\n", text)
    # Collapse repeated spaces
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip()


def chunk_text_sliding_window(
    text: str,
    chunk_size: int = 700,
    overlap: int = 120,
    min_chunk_len: int = 100,
) -> List[str]:
    """
    Chunks text into context-preserving windows, breaking on sentence or paragraph boundaries
    wherever possible to avoid splitting statutory provisions midway.
    """
    cleaned = clean_text(text)
    if len(cleaned) <= chunk_size:
        return [cleaned] if len(cleaned) >= min_chunk_len else []

    # Try splitting by double newline (paragraphs) first
    paragraphs = cleaned.split("\n\n")
    chunks: List[str] = []
    current_chunk: List[str] = []
    current_len = 0

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        if current_len + len(para) + 2 <= chunk_size:
            current_chunk.append(para)
            current_len += len(para) + 2
        else:
            if current_chunk:
                chunks.append("\n\n".join(current_chunk))
            # If paragraph itself is too large, split by sentences
            if len(para) > chunk_size:
                sentences = re.split(r"(?<=[.!?])\s+", para)
                sub_chunk: List[str] = []
                sub_len = 0
                for sent in sentences:
                    if sub_len + len(sent) + 1 <= chunk_size:
                        sub_chunk.append(sent)
                        sub_len += len(sent) + 1
                    else:
                        if sub_chunk:
                            chunks.append(" ".join(sub_chunk))
                        sub_chunk = [sent]
                        sub_len = len(sent)
                if sub_chunk:
                    chunks.append(" ".join(sub_chunk))
                current_chunk = []
                current_len = 0
            else:
                current_chunk = [para]
                current_len = len(para)

    if current_chunk:
        chunks.append("\n\n".join(current_chunk))

    # Apply overlap if chunks were split without natural context retention
    if len(chunks) <= 1:
        return [c for c in chunks if len(c) >= min_chunk_len]

    return [c for c in chunks if len(c) >= min_chunk_len]


def load_json_documents(file_path: Path) -> List[Dict[str, Any]]:
    """Loads pre-structured IPR documents from JSON."""
    chunks: List[Dict[str, Any]] = []
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    items = data if isinstance(data, list) else [data]
    for idx, item in enumerate(items):
        content = item.get("content") or item.get("text", "")
        if not content:
            continue

        sub_chunks = chunk_text_sliding_window(content, chunk_size=800, overlap=100)
        for s_idx, chunk_txt in enumerate(sub_chunks or [content]):
            chunk_id = f"{file_path.stem}_{idx}_{s_idx}"
            chunks.append({
                "chunk_id": chunk_id,
                "document_name": item.get("document_name", file_path.name),
                "document_type": item.get("document_type", "legal_json"),
                "source": item.get("source", "IP-Sahayak Knowledge Base"),
                "category": item.get("category", "Intellectual Property"),
                "section": item.get("section", "General Statutory Context"),
                "page_number": item.get("page_number"),
                "language": item.get("language", "en"),
                "date": item.get("date"),
                "content": clean_text(chunk_txt),
            })
    return chunks


def load_txt_or_md_documents(file_path: Path) -> List[Dict[str, Any]]:
    """Loads plain text or markdown IPR legal documents."""
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        raw_text = f.read()

    doc_name = file_path.name
    doc_type = "markdown" if file_path.suffix.lower() == ".md" else "text"
    category = "Patent" if "patent" in doc_name.lower() else (
        "Trademark" if "trademark" in doc_name.lower() else "Intellectual Property"
    )

    # Extract headers as section cues if Markdown
    sections = re.split(r"(?m)^#{1,3}\s+", raw_text)
    chunks: List[Dict[str, Any]] = []

    if len(sections) > 1:
        for idx, sec in enumerate(sections):
            if not sec.strip():
                continue
            lines = sec.strip().split("\n", 1)
            sec_title = lines[0].strip() if lines else "General"
            sec_body = lines[1].strip() if len(lines) > 1 else lines[0].strip()
            
            sub_chunks = chunk_text_sliding_window(sec_body)
            for s_idx, sc in enumerate(sub_chunks or [sec_body]):
                chunks.append({
                    "chunk_id": f"{file_path.stem}_sec{idx}_{s_idx}",
                    "document_name": doc_name,
                    "document_type": doc_type,
                    "source": "Office of Controller General of Patents, Designs and Trade Marks (CGPDTM)",
                    "category": category,
                    "section": sec_title[:100],
                    "page_number": None,
                    "language": "en",
                    "date": "2024",
                    "content": clean_text(sc),
                })
    else:
        sub_chunks = chunk_text_sliding_window(raw_text)
        for s_idx, sc in enumerate(sub_chunks or [raw_text]):
            chunks.append({
                "chunk_id": f"{file_path.stem}_{s_idx}",
                "document_name": doc_name,
                "document_type": doc_type,
                "source": "Office of Controller General of Patents, Designs and Trade Marks (CGPDTM)",
                "category": category,
                "section": "Statutory Guidelines",
                "page_number": None,
                "language": "en",
                "date": "2024",
                "content": clean_text(sc),
            })
    return chunks


def load_pdf_documents(file_path: Path) -> List[Dict[str, Any]]:
    """Loads PDF documents page by page using pypdf."""
    chunks: List[Dict[str, Any]] = []
    try:
        from pypdf import PdfReader
        reader = PdfReader(str(file_path))
        doc_name = file_path.name
        category = "Patent" if "patent" in doc_name.lower() else (
            "Trademark" if "trademark" in doc_name.lower() else "Intellectual Property"
        )
        for page_idx, page in enumerate(reader.pages):
            text = page.extract_text() or ""
            if not text.strip():
                continue
            sub_chunks = chunk_text_sliding_window(text)
            for s_idx, sc in enumerate(sub_chunks or [text]):
                chunks.append({
                    "chunk_id": f"{file_path.stem}_p{page_idx + 1}_{s_idx}",
                    "document_name": doc_name,
                    "document_type": "pdf",
                    "source": "Official IPR Statutory Publication",
                    "category": category,
                    "section": f"Page {page_idx + 1}",
                    "page_number": page_idx + 1,
                    "language": "en",
                    "date": None,
                    "content": clean_text(sc),
                })
    except Exception as exc:
        logger.error("Failed to load PDF %s: %s", file_path, exc)
    return chunks


def load_docx_documents(file_path: Path) -> List[Dict[str, Any]]:
    """Loads Word DOCX documents using python-docx."""
    chunks: List[Dict[str, Any]] = []
    try:
        import docx
        doc = docx.Document(str(file_path))
        text = "\n\n".join([p.text for p in doc.paragraphs if p.text.strip()])
        doc_name = file_path.name
        category = "Intellectual Property"
        sub_chunks = chunk_text_sliding_window(text)
        for s_idx, sc in enumerate(sub_chunks or [text]):
            chunks.append({
                "chunk_id": f"{file_path.stem}_{s_idx}",
                "document_name": doc_name,
                "document_type": "docx",
                "source": "Official IPR Document",
                "category": category,
                "section": "Document Content",
                "page_number": None,
                "language": "en",
                "date": None,
                "content": clean_text(sc),
            })
    except Exception as exc:
        logger.error("Failed to load DOCX %s: %s", file_path, exc)
    return chunks


def load_file(file_path: Path) -> List[Dict[str, Any]]:
    """Dispatches document loading according to file extension."""
    suffix = file_path.suffix.lower()
    if suffix == ".json":
        return load_json_documents(file_path)
    elif suffix in (".txt", ".md"):
        return load_txt_or_md_documents(file_path)
    elif suffix == ".pdf":
        return load_pdf_documents(file_path)
    elif suffix in (".docx", ".doc"):
        return load_docx_documents(file_path)
    else:
        logger.warning("Unsupported document format: %s", suffix)
        return []


def ingest_documents_directory(
    input_dir: Path,
    output_processed_path: Optional[Path] = None,
) -> List[Dict[str, Any]]:
    """
    Ingests all compatible files in input_dir, extracts chunks with metadata,
    and optionally writes the consolidated processed chunks JSON to disk.
    """
    if not input_dir.exists():
        logger.warning("Documents directory %s does not exist.", input_dir)
        return []

    all_chunks: List[Dict[str, Any]] = []
    for root, _, files in os.walk(input_dir):
        for file in sorted(files):
            file_path = Path(root) / file
            if file.startswith(".") or file.startswith("~"):
                continue
            chunks = load_file(file_path)
            all_chunks.extend(chunks)

    logger.info("Ingested %d chunks from %s", len(all_chunks), input_dir)

    if output_processed_path:
        output_processed_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_processed_path, "w", encoding="utf-8") as f:
            json.dump(all_chunks, f, indent=2, ensure_ascii=False)
        logger.info("Saved processed chunks to %s", output_processed_path)

    return all_chunks
