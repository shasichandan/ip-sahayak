from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import Order, Product, User
from app.schemas.hub import OrderCreate

router = APIRouter(prefix="/orders", tags=["orders"])

TRACKING_STEPS = [
    {"step": 1, "label": "Order confirmed", "done": True},
    {"step": 2, "label": "Prescription verified by pharmacy", "done": False},
    {"step": 3, "label": "Packed & quality sealed", "done": False},
    {"step": 4, "label": "Out for delivery", "done": False},
    {"step": 5, "label": "Delivered", "done": False},
]


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_order(
    payload: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    ids = [item.productId for item in payload.items]
    products = {
        p.id: p
        for p in (
            await db.execute(select(Product).where(Product.id.in_(ids)))
        ).scalars().all()
    }
    missing = [pid for pid in ids if pid not in products]
    if missing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product(s) not found: {missing}",
        )
    echoed_items: list[dict] = []
    total = 0.0
    for item in payload.items:
        product = products[item.productId]
        if product.requires_prescription and not (item.prescribedDose or "").strip():
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"'{product.name}' requires a prescription with a stated dose",
            )
        line = round(product.price * item.quantity, 2)
        total += line
        echoed_items.append({
            "productId": product.id, "name": product.name,
            "quantity": item.quantity, "prescribedDose": item.prescribedDose,
            "unitPrice": product.price, "lineTotal": line,
        })
    row = Order(
        user_id=current_user.id, pharmacy_name=payload.pharmacyName,
        items=echoed_items, total=round(total, 2),
        status="processing", tracking_steps=TRACKING_STEPS,
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return {
        "id": row.id, "pharmacyName": row.pharmacy_name, "items": row.items,
        "total": row.total, "status": row.status,
        "trackingSteps": row.tracking_steps, "createdAt": row.created_at,
    }


@router.get("")
async def list_orders(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    rows = (
        await db.execute(
            select(Order).where(Order.user_id == current_user.id)
            .order_by(Order.created_at.desc()).limit(100)
        )
    ).scalars().all()
    return [
        {"id": o.id, "pharmacyName": o.pharmacy_name, "items": o.items,
         "total": o.total, "status": o.status, "trackingSteps": o.tracking_steps,
         "createdAt": o.created_at}
        for o in rows
    ]


@router.get("/{order_id}")
async def get_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    row = (
        await db.execute(
            select(Order).where(Order.id == order_id, Order.user_id == current_user.id)
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return {
        "id": row.id, "pharmacyName": row.pharmacy_name, "items": row.items,
        "total": row.total, "status": row.status,
        "trackingSteps": row.tracking_steps, "createdAt": row.created_at,
    }
