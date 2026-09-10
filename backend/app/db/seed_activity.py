import asyncio
from datetime import date, timedelta

from sqlalchemy import func, select

from app.db.session import AsyncSessionLocal
from app.models import Appointment, HealthRecord, Prescription, User


async def main() -> None:
    async with AsyncSessionLocal() as session:
        user = (
            await session.execute(select(User).where(User.email == "demo@ipsahayak.in"))
        ).scalar_one_or_none()
        if user is None:
            print("DEMO_USER=missing")
            return
        created: dict[str, int] = {}

        n = (
            await session.execute(
                select(func.count()).select_from(Prescription)
                .where(Prescription.patient_id == user.id)
            )
        ).scalar_one()
        if n == 0:
            session.add(Prescription(
                patient_id=user.id, doctor_name="Vaidya Anjali Deshmukh",
                diagnosis="Joint inflammation (Sandhivata)",
                medicines=[
                    {"name": "Ashwagandha Churna", "dose": "1 tsp twice daily", "duration": "8 weeks"},
                    {"name": "Kaishore Guggulu", "dose": "2 tablets twice daily", "duration": "6 weeks"},
                ],
                notes="Follow Vata-pacifying diet; warm water only.",
                status="active",
            ))
            created["prescriptions"] = 1

        n = (
            await session.execute(
                select(func.count()).select_from(Appointment)
                .where(Appointment.patient_id == user.id)
            )
        ).scalar_one()
        if n == 0:
            session.add(Appointment(
                patient_id=user.id, doctor_name="Dr. Priya Nair",
                date=date.today() + timedelta(days=3), time="10:30",
                type="video", reason="Follow-up on joint pain management",
                status="upcoming", meet_link="https://meet.ipsahayak.demo/seed-1",
            ))
            created["appointments"] = 1

        n = (
            await session.execute(
                select(func.count()).select_from(HealthRecord)
                .where(HealthRecord.user_id == user.id)
            )
        ).scalar_one()
        if n == 0:
            session.add(HealthRecord(
                user_id=user.id, record_type="vitals",
                title="Morning energy log",
                notes="Improved sleep quality after Ashwagandha course.",
                data={"energy": 7, "sleep_hours": 7.5},
                record_date=date.today(),
            ))
            created["health_records"] = 1

        await session.commit()
        print("ACTIVITY_SEED_OK", created if created else "nothing-to-add")


if __name__ == "__main__":
    asyncio.run(main())
