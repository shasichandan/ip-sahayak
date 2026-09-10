import asyncio

from sqlalchemy import select

from app.core.security import hash_password
from app.db.session import AsyncSessionLocal
from app.models import User

ADMIN_EMAIL = "admin@ipsahayak.in"
ADMIN_PASSWORD = "Admin@12345"


async def main() -> None:
    async with AsyncSessionLocal() as session:
        user = (
            await session.execute(select(User).where(User.email == ADMIN_EMAIL))
        ).scalar_one_or_none()
        if user is None:
            session.add(User(
                email=ADMIN_EMAIL,
                password_hash=hash_password(ADMIN_PASSWORD),
                full_name="Platform Admin",
                role="admin",
            ))
            print("ADMIN=created")
        else:
            user.role = "admin"
            print("ADMIN=promoted")
        await session.commit()


if __name__ == "__main__":
    asyncio.run(main())
