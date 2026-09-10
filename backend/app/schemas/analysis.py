from typing import Literal

from pydantic import BaseModel, Field


class FormulationAnalysisRequest(BaseModel):
    productName: str = Field(min_length=1, max_length=500)
    dosageForm: str = Field(default="", max_length=500)
    ingredients: str = Field(min_length=1, max_length=8000)
    indications: str = Field(default="", max_length=4000)
    provenance: str = Field(default="", max_length=4000)
    tkBasis: str = Field(default="", max_length=4000)
    jurisdiction: Literal["india", "international"] = "india"


class DrugClassificationRequest(BaseModel):
    scheduleListed: bool        # Q1: all herbs in the 54 First Schedule texts?
    exactClassicalRecipe: bool  # Q2: prepared exactly per classical recipe?
    modernDosageForm: bool      # Q3: modern dosage forms introduced?
    scheduleE1: bool            # Q4: contains Schedule E(1) poisonous ingredients?


class ABSCheckRequest(BaseModel):
    entityStatus: Literal["indian", "foreign"]
    foreignParticipation: Literal["none", "has_foreign"]
    iprFiling: Literal["yes", "no"]
    commercialUtilization: Literal["commercial", "research"]
    originStates: list[str] = Field(default_factory=list, max_length=20)
