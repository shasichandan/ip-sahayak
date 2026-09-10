from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import HealthRecord, User
from app.schemas.hub import HealthRecordCreate

router = APIRouter(prefix="/records", tags=["health-records"])


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_record(
    payload: HealthRecordCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    row = HealthRecord(
        user_id=current_user.id,
        record_type=payload.recordType,
        title=payload.title,
        notes=payload.notes,
        data=payload.data,
        record_date=payload.recordDate or date.today(),
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return {
        "id": row.id, "recordType": row.record_type, "title": row.title,
        "notes": row.notes, "data": row.data, "recordDate": row.record_date,
        "createdAt": row.created_at,
    }


@router.get("")
async def list_records(
    recordType: str | None = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    stmt = select(HealthRecord).where(HealthRecord.user_id == current_user.id)
    if recordType:
        stmt = stmt.where(HealthRecord.record_type == recordType)
    stmt = stmt.order_by(HealthRecord.record_date.desc()).limit(200)
    rows = (await db.execute(stmt)).scalars().all()
    return [
        {"id": r.id, "recordType": r.record_type, "title": r.title,
         "notes": r.notes, "data": r.data, "recordDate": r.record_date,
         "createdAt": r.created_at}
        for r in rows
    ]


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_record(
    record_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    row = (
        await db.execute(
            select(HealthRecord).where(
                HealthRecord.id == record_id,
                HealthRecord.user_id == current_user.id,
            )
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    await db.delete(row)
    await db.commit()
