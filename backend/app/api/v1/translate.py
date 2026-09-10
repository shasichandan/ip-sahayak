from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import User
from app.services.ml.loader import get_translation_engine

router = APIRouter(prefix="/translate", tags=["translate"])


class TranslateRequest(BaseModel):
    text: str = Field(min_length=1, max_length=8000)
    sourceLanguage: str = Field(default="en", pattern="^(en|te|hi)$")
    targetLanguage: str = Field(pattern="^(en|te|hi)$")


@router.post("")
async def translate(
    payload: TranslateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    engine = get_translation_engine()
    return await engine.translate(
        payload.text, payload.sourceLanguage, payload.targetLanguage
    )
