import asyncio

from sqlalchemy import select

from app.core.security import hash_password
from app.db.session import AsyncSessionLocal
from app.models import User

DEMO_PASSWORD = "Demo@12345"


async def main() -> None:
    async with AsyncSessionLocal() as session:
        user = (
            await session.execute(select(User).where(User.email == "demo@ipsahayak.in"))
        ).scalar_one_or_none()
        if user is None:
            print("DEMO_USER=missing")
            return
        if user.password_hash:
            print("DEMO_USER=already_claimed")
            return
        user.password_hash = hash_password(DEMO_PASSWORD)
        await session.commit()
        print("DEMO_USER=claimed")


if __name__ == "__main__":
    asyncio.run(main())
