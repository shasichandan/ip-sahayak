from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import ABSCheck, User
from app.schemas.analysis import ABSCheckRequest
from app.services.engines.abs_engine import evaluate_abs

router = APIRouter(prefix="/abs-check", tags=["abs-compliance"])


@router.post("", status_code=status.HTTP_201_CREATED)
async def run_abs_check(
    payload: ABSCheckRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    result = evaluate_abs(
        payload.entityStatus, payload.foreignParticipation,
        payload.iprFiling, payload.commercialUtilization, payload.originStates,
    )
    row = ABSCheck(
        user_id=current_user.id,
        entity_status=payload.entityStatus,
        foreign_participation=payload.foreignParticipation,
        ipr_filing=payload.iprFiling,
        commercial_utilization=payload.commercialUtilization,
        origin_states=payload.originStates,
        determination=result["determination"],
        result=result,
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return {"id": row.id, "result": result, "createdAt": row.created_at}


@router.get("")
async def list_checks(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    rows = (
        await db.execute(
            select(ABSCheck).where(ABSCheck.user_id == current_user.id)
            .order_by(ABSCheck.created_at.desc()).limit(50)
        )
    ).scalars().all()
    return [
        {"id": r.id, "determination": r.determination,
         "originStates": r.origin_states, "createdAt": r.created_at}
        for r in rows
    ]


@router.get("/{record_id}")
async def get_check(
    record_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    row = (
        await db.execute(
            select(ABSCheck).where(
                ABSCheck.id == record_id, ABSCheck.user_id == current_user.id
            )
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    return {
        "id": row.id,
        "entityStatus": row.entity_status,
        "foreignParticipation": row.foreign_participation,
        "iprFiling": row.ipr_filing,
        "commercialUtilization": row.commercial_utilization,
        "originStates": row.origin_states,
        "determination": row.determination,
        "result": row.result,
        "createdAt": row.created_at,
    }
