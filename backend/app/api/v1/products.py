from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import Product, User

router = APIRouter(prefix="/products", tags=["products"])


@router.get("")
async def list_products(
    category: str | None = Query(default=None, max_length=100),
    q: str | None = Query(default=None, max_length=255),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    stmt = select(Product).order_by(Product.id)
    if category:
        stmt = stmt.where(Product.category == category)
    if q:
        stmt = stmt.where(Product.name.ilike(f"%{q}%"))
    rows = (await db.execute(stmt)).scalars().all()
    return [
        {"id": p.id, "name": p.name, "manufacturer": p.manufacturer,
         "category": p.category, "price": p.price, "stock": p.stock,
         "requiresPrescription": p.requires_prescription, "description": p.description}
        for p in rows
    ]
