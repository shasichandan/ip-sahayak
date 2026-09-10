from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import (
    ABSCheck, Appointment, Conversation, DrugClassification, FormulationAnalysis,
    Message, Notification, Order, SavedReport, TKDLSearch, User,
)

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


async def _count(db: AsyncSession, model, *filters) -> int:
    stmt = select(func.count()).select_from(model)
    for f in filters:
        stmt = stmt.where(f)
    return (await db.execute(stmt)).scalar_one()


@router.get("/stats")
async def stats(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    uid = current_user.id
    unread = await _count(
        db, Notification,
        Notification.is_read.is_(False),
        (Notification.user_id == uid) | (Notification.user_id.is_(None)),
    )
    return {
        "conversations": await _count(db, Conversation, Conversation.user_id == uid),
        "messages": await _count(
            db, Message, Message.conversation_id.in_(
                select(Conversation.id).where(Conversation.user_id == uid)
            )
        ),
        "savedReports": await _count(db, SavedReport, SavedReport.user_id == uid),
        "formulationAnalyses": await _count(db, FormulationAnalysis, FormulationAnalysis.user_id == uid),
        "drugClassifications": await _count(db, DrugClassification, DrugClassification.user_id == uid),
        "absChecks": await _count(db, ABSCheck, ABSCheck.user_id == uid),
        "tkdlSearches": await _count(db, TKDLSearch, TKDLSearch.user_id == uid),
        "appointments": await _count(db, Appointment, Appointment.patient_id == uid),
        "orders": await _count(db, Order, Order.user_id == uid),
        "unreadNotifications": unread,
    }
