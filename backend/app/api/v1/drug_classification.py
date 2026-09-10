from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import DrugClassification, User
from app.schemas.analysis import DrugClassificationRequest
from app.services.engines.drug_classification_engine import classify_drug

router = APIRouter(prefix="/drug-classification", tags=["drug-classification"])


@router.post("", status_code=status.HTTP_201_CREATED)
async def run_classification(
    payload: DrugClassificationRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    result = classify_drug(
        payload.scheduleListed, payload.exactClassicalRecipe,
        payload.modernDosageForm, payload.scheduleE1,
    )
    row = DrugClassification(
        user_id=current_user.id,
        checklist_answers=payload.model_dump(),
        classification=result["classification"],
        rule_reference=result["ruleReference"],
        dossier_requirements={
            "dossier": result["dossier"], "ipPosture": result["ipPosture"],
            "warnings": result["warnings"],
        },
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return {"id": row.id, "result": result, "createdAt": row.created_at}


@router.get("")
async def list_classifications(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    rows = (
        await db.execute(
            select(DrugClassification)
            .where(DrugClassification.user_id == current_user.id)
            .order_by(DrugClassification.created_at.desc()).limit(50)
        )
    ).scalars().all()
    return [
        {"id": r.id, "classification": r.classification,
         "ruleReference": r.rule_reference, "createdAt": r.created_at}
        for r in rows
    ]


@router.get("/{record_id}")
async def get_classification(
    record_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    row = (
        await db.execute(
            select(DrugClassification).where(
                DrugClassification.id == record_id,
                DrugClassification.user_id == current_user.id,
            )
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    return {
        "id": row.id, "checklistAnswers": row.checklist_answers,
        "classification": row.classification, "ruleReference": row.rule_reference,
        "dossierRequirements": row.dossier_requirements, "createdAt": row.created_at,
    }
