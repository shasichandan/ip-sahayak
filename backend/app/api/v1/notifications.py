from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import Notification, User

router = APIRouter(prefix="/notifications", tags=["notifications"])


def _visible(user: User):
    return (Notification.user_id == user.id) | (Notification.user_id.is_(None))


@router.get("")
async def list_notifications(
    unreadOnly: bool = Query(default=False),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    stmt = select(Notification).where(_visible(current_user))
    if unreadOnly:
        stmt = stmt.where(Notification.is_read.is_(False))
    stmt = stmt.order_by(Notification.created_at.desc()).limit(50)
    rows = (await db.execute(stmt)).scalars().all()
    return [
        {"id": n.id, "type": n.type, "title": n.title, "message": n.message,
         "severity": n.severity, "isRead": n.is_read, "createdAt": n.created_at}
        for n in rows
    ]


@router.patch("/{notification_id}/read")
async def mark_read(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    row = (
        await db.execute(
            select(Notification).where(
                Notification.id == notification_id, _visible(current_user)
            )
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")
    row.is_read = True
    await db.commit()
    return {"id": row.id, "isRead": True}


@router.patch("/read-all")
async def mark_all_read(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    result = await db.execute(
        update(Notification).where(_visible(current_user), Notification.is_read.is_(False))
        .values(is_read=True)
    )
    await db.commit()
    return {"updated": result.rowcount}
