from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import User

router = APIRouter(prefix="/users", tags=["users"])


class UserSettingsUpdate(BaseModel):
    fullName: str | None = Field(default=None, min_length=1, max_length=255)
    preferredLanguage: str | None = Field(default=None, pattern="^(en|te|hi)$")
    defaultJurisdiction: str | None = Field(default=None, pattern="^(india|international)$")


@router.patch("/me")
async def update_me(
    payload: UserSettingsUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    if payload.fullName is not None:
        current_user.full_name = payload.fullName
    if payload.preferredLanguage is not None:
        current_user.preferred_language = payload.preferredLanguage
    if payload.defaultJurisdiction is not None:
        current_user.default_jurisdiction = payload.defaultJurisdiction
    db.add(current_user)
    await db.commit()
    await db.refresh(current_user)
    return {
        "id": current_user.id, "email": current_user.email,
        "fullName": current_user.full_name,
        "preferredLanguage": current_user.preferred_language,
        "defaultJurisdiction": current_user.default_jurisdiction,
        "role": current_user.role,
    }
