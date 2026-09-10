from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import require_roles
from app.db.session import get_db
from app.models import (
    ABSCheck, AnswerFeedback, AuditLog, ConsentLog, DrugClassification,
    FormulationAnalysis, Message, TKDLSearch, User,
)

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(require_roles("admin"))])


@router.get("/audit-logs")
async def audit_logs(
    limit: int = Query(default=100, ge=1, le=500),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    rows = (
        await db.execute(
            select(AuditLog).order_by(AuditLog.created_at.desc()).limit(limit)
        )
    ).scalars().all()
    return [
        {"id": a.id, "userId": a.user_id, "action": a.action,
         "ipAddress": a.ip_address, "payload": a.payload, "createdAt": a.created_at}
        for a in rows
    ]


@router.get("/consent-logs")
async def consent_logs(
    limit: int = Query(default=100, ge=1, le=500),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    rows = (
        await db.execute(
            select(ConsentLog).order_by(ConsentLog.created_at.desc()).limit(limit)
        )
    ).scalars().all()
    return [
        {"id": c.id, "userId": c.user_id, "sourceName": c.source_name,
         "granted": c.granted, "purpose": c.purpose, "createdAt": c.created_at}
        for c in rows
    ]


async def _count(db: AsyncSession, model, *filters) -> int:
    stmt = select(func.count()).select_from(model)
    for f in filters:
        stmt = stmt.where(f)
    return (await db.execute(stmt)).scalar_one()


@router.get("/evals/summary")
async def evals_summary(db: AsyncSession = Depends(get_db)) -> dict:
    messages = await _count(db, Message)
    assistant_msgs = await _count(
        db, Message, Message.role == "assistant", Message.structured_response.is_not(None)
    )
    abstentions = await _count(db, Message, Message.confidence_level == "abstained")
    avg = (
        await db.execute(
            select(func.coalesce(func.avg(Message.confidence_score), 0))
            .where(Message.role == "assistant")
        )
    ).scalar_one()
    return {
        "messages": messages,
        "assistantMessages": assistant_msgs,
        "avgConfidenceScore": round(float(avg)),
        "feedbackUp": await _count(db, AnswerFeedback, AnswerFeedback.rating == "up"),
        "feedbackDown": await _count(db, AnswerFeedback, AnswerFeedback.rating == "down"),
        "formulationAnalyses": await _count(db, FormulationAnalysis),
        "drugClassifications": await _count(db, DrugClassification),
        "absChecks": await _count(db, ABSCheck),
        "tkdlSearches": await _count(db, TKDLSearch),
        "abstentions": abstentions,
    }
