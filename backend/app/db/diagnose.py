import asyncio

from sqlalchemy import text

from app.db.base import Base
from app.db.session import AsyncSessionLocal

COUNTS = {
    "regimes": "SELECT count(*) FROM regimes",
    "sources": "SELECT count(*) FROM sources",
    "doctors": "SELECT count(*) FROM doctors",
    "products": "SELECT count(*) FROM products",
    "notifications": "SELECT count(*) FROM notifications",
    "users": "SELECT count(*) FROM users",
}


async def main() -> None:
    async with AsyncSessionLocal() as session:
        rows = await session.execute(
            text(
                "SELECT table_name FROM information_schema.tables "
                "WHERE table_schema='public' ORDER BY table_name"
            )
        )
        db_tables = [r[0] for r in rows]
        model_tables = sorted(Base.metadata.tables.keys())
        print(f"TABLE_COUNT={len(db_tables)}")
        print("DB_TABLES=" + ",".join(db_tables))
        print("MODEL_TABLES=" + ",".join(model_tables))
        missing = [t for t in model_tables if t not in db_tables]
        print("MISSING_TABLES=" + (",".join(missing) if missing else "NONE"))
        for name, sql in COUNTS.items():
            n = (await session.execute(text(sql))).scalar()
            print(f"COUNT_{name}={n}")


if __name__ == "__main__":
    asyncio.run(main())
