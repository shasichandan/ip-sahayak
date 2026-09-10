from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import Source, User

router = APIRouter(prefix="/sources", tags=["sources"])


@router.get("")
async def list_sources(
    type: str | None = Query(
        default=None,
        pattern="^(classical_text|statute|treaty|pharmacopoeia)$",
    ),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    stmt = select(Source).order_by(Source.id)
    if type:
        stmt = stmt.where(Source.source_type == type)
    rows = (await db.execute(stmt)).scalars().all()
    return [
        {"id": s.id, "title": s.title, "sourceType": s.source_type,
         "author": s.author, "era": s.era, "excerpt": s.excerpt, "language": s.language}
        for s in rows
    ]


@router.get("/{source_id}")
async def get_source(
    source_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    row = (
        await db.execute(select(Source).where(Source.id == source_id))
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found")
    return {
        "id": row.id, "title": row.title, "sourceType": row.source_type,
        "author": row.author, "era": row.era, "excerpt": row.excerpt,
        "language": row.language,
    }
