from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import Regime, User

router = APIRouter(prefix="/regimes", tags=["regimes"])


@router.get("")
async def list_regimes(
    jurisdiction: str | None = Query(default=None, pattern="^(india|international)$"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    stmt = select(Regime).where(Regime.is_active.is_(True)).order_by(Regime.id)
    if jurisdiction:
        stmt = stmt.where(Regime.jurisdiction == jurisdiction)
    rows = (await db.execute(stmt)).scalars().all()
    return [
        {"id": r.id, "code": r.code, "name": r.name, "statute": r.statute,
         "authority": r.authority, "description": r.description,
         "jurisdiction": r.jurisdiction, "portalUrl": r.portal_url}
        for r in rows
    ]


@router.get("/{code}")
async def get_regime(
    code: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    row = (
        await db.execute(select(Regime).where(Regime.code == code))
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Regime not found")
    return {
        "id": row.id, "code": row.code, "name": row.name, "statute": row.statute,
        "authority": row.authority, "description": row.description,
        "keyCriteria": row.key_criteria, "risks": row.risks,
        "strategy": row.strategy, "portalUrl": row.portal_url,
        "jurisdiction": row.jurisdiction,
    }
