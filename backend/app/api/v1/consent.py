from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import ConsentLog, User

router = APIRouter(prefix="/consent", tags=["consent"])


class ConsentCreate(BaseModel):
    sourceName: str = Field(min_length=1, max_length=255)
    granted: bool
    purpose: str = Field(
        default="Access user-subscribed paid legal/research sources on my behalf",
        max_length=500,
    )


@router.post("/paid-sources", status_code=201)
async def record_consent(
    payload: ConsentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    row = ConsentLog(
        user_id=current_user.id,
        source_name=payload.sourceName,
        granted=payload.granted,
        purpose=payload.purpose,
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return {
        "id": row.id, "sourceName": row.source_name,
        "granted": row.granted, "purpose": row.purpose, "status": "recorded",
    }


@router.get("/paid-sources")
async def list_consents(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    rows = (
        await db.execute(
            select(ConsentLog).where(ConsentLog.user_id == current_user.id)
            .order_by(ConsentLog.created_at.desc()).limit(50)
        )
    ).scalars().all()
    return [
        {"id": c.id, "sourceName": c.source_name, "granted": c.granted,
         "purpose": c.purpose, "expiresAt": c.expires_at, "createdAt": c.created_at}
        for c in rows
    ]
