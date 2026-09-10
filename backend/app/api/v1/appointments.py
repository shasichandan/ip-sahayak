from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import Appointment, Doctor, User
from app.schemas.hub import AppointmentCreate

router = APIRouter(prefix="/appointments", tags=["appointments"])


@router.post("", status_code=status.HTTP_201_CREATED)
async def book_appointment(
    payload: AppointmentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    doctor = (
        await db.execute(select(Doctor).where(Doctor.name == payload.doctorName))
    ).scalar_one_or_none()
    row = Appointment(
        patient_id=current_user.id,
        doctor_id=doctor.id if doctor else None,
        doctor_name=payload.doctorName,
        date=payload.date, time=payload.time,
        type=payload.type, reason=payload.reason,
        status="upcoming",
    )
    db.add(row)
    await db.flush()
    row.meet_link = f"https://meet.ipsahayak.demo/{row.id}"
    await db.commit()
    await db.refresh(row)
    return {
        "id": row.id, "doctorName": row.doctor_name, "date": row.date,
        "time": row.time, "type": row.type, "reason": row.reason,
        "status": row.status, "meetLink": row.meet_link, "createdAt": row.created_at,
    }


@router.get("")
async def list_appointments(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    rows = (
        await db.execute(
            select(Appointment).where(Appointment.patient_id == current_user.id)
            .order_by(Appointment.created_at.desc()).limit(100)
        )
    ).scalars().all()
    return [
        {"id": a.id, "doctorName": a.doctor_name, "date": a.date, "time": a.time,
         "type": a.type, "reason": a.reason, "status": a.status,
         "meetLink": a.meet_link, "createdAt": a.created_at}
        for a in rows
    ]


@router.delete("/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def cancel_appointment(
    appointment_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    row = (
        await db.execute(
            select(Appointment).where(
                Appointment.id == appointment_id,
                Appointment.patient_id == current_user.id,
            )
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found")
    await db.delete(row)
    await db.commit()
