import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.core.config import settings
from app.db.session import get_db
from app.models import Document, User

router = APIRouter(prefix="/documents", tags=["documents"])

ALLOWED_SUFFIXES = {".pdf", ".txt", ".md", ".csv", ".png", ".jpg", ".jpeg", ".docx"}


def _upload_dir() -> Path:
    p = Path(settings.UPLOAD_DIR)
    p.mkdir(parents=True, exist_ok=True)
    return p


@router.post("", status_code=status.HTTP_201_CREATED)
async def upload_document(
    file: UploadFile,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in ALLOWED_SUFFIXES:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"File type '{suffix or 'unknown'}' not allowed; permitted: {sorted(ALLOWED_SUFFIXES)}",
        )
    max_bytes = settings.MAX_UPLOAD_MB * 1024 * 1024
    content = await file.read()
    if len(content) > max_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds {settings.MAX_UPLOAD_MB} MB limit",
        )
    if not content:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Empty file")
    stored_name = f"{uuid.uuid4().hex}{suffix}"
    dest = _upload_dir() / stored_name
    dest.write_bytes(content)
    row = Document(
        user_id=current_user.id,
        filename=file.filename or stored_name,
        mime_type=file.content_type,
        size_bytes=len(content),
        storage_path=str(dest),
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return {
        "id": row.id, "filename": row.filename, "mimeType": row.mime_type,
        "sizeBytes": row.size_bytes, "createdAt": row.created_at,
    }


@router.get("")
async def list_documents(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    rows = (
        await db.execute(
            select(Document).where(Document.user_id == current_user.id)
            .order_by(Document.created_at.desc()).limit(100)
        )
    ).scalars().all()
    return [
        {"id": d.id, "filename": d.filename, "mimeType": d.mime_type,
         "sizeBytes": d.size_bytes, "createdAt": d.created_at}
        for d in rows
    ]


@router.get("/{document_id}")
async def get_document(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    row = (
        await db.execute(
            select(Document).where(
                Document.id == document_id, Document.user_id == current_user.id
            )
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
    return {
        "id": row.id, "filename": row.filename, "mimeType": row.mime_type,
        "sizeBytes": row.size_bytes, "storagePath": row.storage_path,
        "createdAt": row.created_at,
    }


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    row = (
        await db.execute(
            select(Document).where(
                Document.id == document_id, Document.user_id == current_user.id
            )
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
    if row.storage_path:
        try:
            Path(row.storage_path).unlink(missing_ok=True)
        except OSError:
            pass
    await db.delete(row)
    await db.commit()
