from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import Doctor, User

router = APIRouter(prefix="/doctors", tags=["doctors"])


@router.get("")
async def list_doctors(
    specialty: str | None = Query(default=None, max_length=255),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    stmt = select(Doctor).where(Doctor.is_available.is_(True)).order_by(Doctor.rating.desc())
    if specialty:
        stmt = stmt.where(Doctor.specialty.ilike(f"%{specialty}%"))
    rows = (await db.execute(stmt)).scalars().all()
    return [
        {"id": d.id, "name": d.name, "specialty": d.specialty,
         "qualifications": d.qualifications, "rating": d.rating,
         "languages": d.languages, "fee": d.fee, "isAvailable": d.is_available}
        for d in rows
    ]
