from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import SavedReport, User
from app.schemas.content import SavedReportCreate

router = APIRouter(prefix="/saved-answers", tags=["saved-answers"])


@router.post("", status_code=status.HTTP_201_CREATED)
async def save_answer(
    payload: SavedReportCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    row = SavedReport(
        user_id=current_user.id, question=payload.question,
        summary=payload.summary, category=payload.category,
        sources_count=payload.sourcesCount, full_payload=payload.fullPayload,
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return {"id": row.id, "status": "success"}


@router.get("")
async def list_saved(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    rows = (
        await db.execute(
            select(SavedReport).where(SavedReport.user_id == current_user.id)
            .order_by(SavedReport.created_at.desc()).limit(100)
        )
    ).scalars().all()
    return [
        {"id": r.id, "question": r.question, "summary": r.summary,
         "category": r.category, "sourcesCount": r.sources_count,
         "createdAt": r.created_at}
        for r in rows
    ]


@router.get("/{report_id}")
async def get_saved(
    report_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    row = (
        await db.execute(
            select(SavedReport).where(
                SavedReport.id == report_id, SavedReport.user_id == current_user.id
            )
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")
    return {
        "id": row.id, "question": row.question, "summary": row.summary,
        "category": row.category, "sourcesCount": row.sources_count,
        "fullPayload": row.full_payload, "createdAt": row.created_at,
    }


@router.delete("/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_saved(
    report_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    row = (
        await db.execute(
            select(SavedReport).where(
                SavedReport.id == report_id, SavedReport.user_id == current_user.id
            )
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")
    await db.delete(row)
    await db.commit()
