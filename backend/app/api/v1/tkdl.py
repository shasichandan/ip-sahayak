from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import TKDLSearch, User
from app.services.engines.tkdl_engine import search_tkdl

router = APIRouter(prefix="/tkdl", tags=["tkdl"])


@router.get("/search")
async def search(
    q: str = Query(min_length=1, max_length=500),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    records = search_tkdl(q)
    row = TKDLSearch(
        user_id=current_user.id, query=q,
        results={"records": records}, result_count=len(records),
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return {"searchId": row.id, "query": q, "resultCount": len(records), "records": records}


@router.get("/searches")
async def history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    rows = (
        await db.execute(
            select(TKDLSearch).where(TKDLSearch.user_id == current_user.id)
            .order_by(TKDLSearch.created_at.desc()).limit(50)
        )
    ).scalars().all()
    return [
        {"id": r.id, "query": r.query, "resultCount": r.result_count, "createdAt": r.created_at}
        for r in rows
    ]
