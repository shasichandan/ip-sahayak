from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import FormulationAnalysis, User
from app.schemas.analysis import FormulationAnalysisRequest
from app.services.engines.formulation_engine import analyze_formulation

router = APIRouter(prefix="/formulation-analysis", tags=["formulation-analysis"])


@router.post("", status_code=status.HTTP_201_CREATED)
async def run_analysis(
    payload: FormulationAnalysisRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    result = analyze_formulation(payload.model_dump())
    row = FormulationAnalysis(
        user_id=current_user.id,
        product_name=payload.productName,
        dosage_form=payload.dosageForm,
        ingredients=payload.ingredients,
        indications=payload.indications,
        provenance=payload.provenance,
        tk_basis=payload.tkBasis,
        result=result,
        confidence_score=result["confidence"]["score"],
        jurisdiction=payload.jurisdiction,
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return {
        "id": row.id,
        "productName": row.product_name,
        "confidenceScore": result["confidence"]["score"],
        "confidenceLevel": result["confidence"]["level"],
        "result": result,
        "createdAt": row.created_at,
    }


@router.get("")
async def list_analyses(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    rows = (
        await db.execute(
            select(FormulationAnalysis)
            .where(FormulationAnalysis.user_id == current_user.id)
            .order_by(FormulationAnalysis.created_at.desc())
            .limit(50)
        )
    ).scalars().all()
    return [
        {"id": r.id, "productName": r.product_name, "confidenceScore": r.confidence_score,
         "jurisdiction": r.jurisdiction, "createdAt": r.created_at}
        for r in rows
    ]


@router.get("/{analysis_id}")
async def get_analysis(
    analysis_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    row = (
        await db.execute(
            select(FormulationAnalysis).where(
                FormulationAnalysis.id == analysis_id,
                FormulationAnalysis.user_id == current_user.id,
            )
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Analysis not found")
    return {
        "id": row.id, "productName": row.product_name, "dosageForm": row.dosage_form,
        "ingredients": row.ingredients, "indications": row.indications,
        "provenance": row.provenance, "tkBasis": row.tk_basis,
        "confidenceScore": row.confidence_score, "result": row.result,
        "jurisdiction": row.jurisdiction, "createdAt": row.created_at,
    }
