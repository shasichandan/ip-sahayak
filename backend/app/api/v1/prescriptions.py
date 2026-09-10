from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import Prescription, User

router = APIRouter(prefix="/prescriptions", tags=["prescriptions"])


@router.get("")
async def list_prescriptions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    rows = (
        await db.execute(
            select(Prescription).where(Prescription.patient_id == current_user.id)
            .order_by(Prescription.created_at.desc()).limit(100)
        )
    ).scalars().all()
    return [
        {"id": p.id, "doctorName": p.doctor_name, "diagnosis": p.diagnosis,
         "medicines": p.medicines, "notes": p.notes, "status": p.status,
         "createdAt": p.created_at}
        for p in rows
    ]
