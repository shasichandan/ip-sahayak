#!/usr/bin/env python3
"""
CLI Ingestion Script for IP-Sahayak.
Loads IPR legal documents from knowledge_base/documents,
generates context-preserving chunks with metadata,
builds the persistent vector index in knowledge_base/index/.
Usage:
    python scripts/ingest_documents.py
"""

import os
import sys
from pathlib import Path

# Add backend to sys.path so app modules can be imported
backend_dir = Path(__file__).resolve().parents[1] / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.core.config import settings
from app.services.rag.ingestion import ingest_documents_directory
from app.services.rag.vector_store import IPRVectorStore


def main():
    workspace_root = Path(__file__).resolve().parents[1]
    kb_dir = workspace_root / "knowledge_base"
    docs_dir = kb_dir / "documents"
    processed_file = kb_dir / "processed" / "chunks.json"
    index_dir = kb_dir / "index"

    print("=" * 60)
    print(" IP-SAHAYAK: Document Ingestion Pipeline")
    print("=" * 60)
    print(f"[*] Input documents directory:  {docs_dir}")
    print(f"[*] Processed output path:      {processed_file}")
    print(f"[*] Vector index directory:     {index_dir}")

    if not docs_dir.exists():
        print(f"[!] Warning: Documents directory {docs_dir} not found. Creating it.")
        docs_dir.mkdir(parents=True, exist_ok=True)

    print("\n[1/3] Ingesting documents & extracting legal chunks...")
    chunks = ingest_documents_directory(docs_dir, output_processed_path=processed_file)
    print(f"[+] Total legal chunks extracted: {len(chunks)}")

    if not chunks:
        print("[!] No documents found to ingest. Exiting.")
        return

    print("\n[2/3] Building vector index and computing embeddings...")
    vector_store = IPRVectorStore(index_dir=index_dir)
    api_key = getattr(settings, "GEMINI_API_KEY", None) or os.getenv("GEMINI_API_KEY")
    vector_store.build_index(chunks, api_key=api_key)

    print(f"[+] Vector index successfully saved to: {index_dir}")
    print("\n[3/3] Sample Verification Search:")
    test_queries = [
        "What is a patent in India?",
        "Trademark validity renewal term",
        "Section 3(p) traditional knowledge",
        "Form III National Biodiversity Authority",
    ]
    for q in test_queries:
        results = vector_store.retrieve_top_k(q, k=2)
        print(f"\n  Query: '{q}'")
        if results:
            top = results[0]
            print(f"  -> Match: [{top.get('category')}] {top.get('document_name')} ({top.get('section')})")
            print(f"     Score: {top.get('relevance_score')}")
        else:
            print("  -> No match found.")

    print("\n" + "=" * 60)
    print(" [OK] INGESTION COMPLETE! IP-Sahayak Knowledge Base is Ready.")
    print("=" * 60)


if __name__ == "__main__":
    main()
