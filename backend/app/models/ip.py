from datetime import datetime

from sqlalchemy import JSON, Boolean, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class FormulationAnalysis(Base):
    __tablename__ = "formulation_analyses"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    product_name: Mapped[str] = mapped_column(String(500))
    dosage_form: Mapped[str | None] = mapped_column(String(500))
    ingredients: Mapped[str | None] = mapped_column(Text)
    indications: Mapped[str | None] = mapped_column(Text)
    provenance: Mapped[str | None] = mapped_column(Text)
    tk_basis: Mapped[str | None] = mapped_column(Text)
    result: Mapped[dict | None] = mapped_column(JSON)
    confidence_score: Mapped[int | None] = mapped_column(Integer)
    jurisdiction: Mapped[str] = mapped_column(String(20), default="india")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), index=True
    )


class DrugClassification(Base):
    __tablename__ = "drug_classifications"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    checklist_answers: Mapped[dict | None] = mapped_column(JSON)
    classification: Mapped[str | None] = mapped_column(String(100))
    rule_reference: Mapped[str | None] = mapped_column(String(200))
    dossier_requirements: Mapped[dict | None] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


class ABSCheck(Base):
    __tablename__ = "abs_checks"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    entity_status: Mapped[str | None] = mapped_column(String(50))
    foreign_participation: Mapped[str | None] = mapped_column(String(50))
    ipr_filing: Mapped[str | None] = mapped_column(String(50))
    commercial_utilization: Mapped[str | None] = mapped_column(String(50))
    origin_states: Mapped[list | None] = mapped_column(JSON)
    determination: Mapped[str | None] = mapped_column(String(50))
    result: Mapped[dict | None] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


class TKDLSearch(Base):
    __tablename__ = "tkdl_searches"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    query: Mapped[str] = mapped_column(String(1000))
    results: Mapped[dict | None] = mapped_column(JSON)
    result_count: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


class SavedReport(Base):
    __tablename__ = "saved_reports"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    question: Mapped[str] = mapped_column(Text)
    summary: Mapped[str | None] = mapped_column(Text)
    category: Mapped[str | None] = mapped_column(String(100))
    sources_count: Mapped[int] = mapped_column(Integer, default=0)
    full_payload: Mapped[dict | None] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), index=True
    )


class Regime(Base):
    __tablename__ = "regimes"

    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    statute: Mapped[str] = mapped_column(String(255))
    authority: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    key_criteria: Mapped[list] = mapped_column(JSON, default=list)
    risks: Mapped[list] = mapped_column(JSON, default=list)
    strategy: Mapped[str | None] = mapped_column(Text)
    portal_url: Mapped[str | None] = mapped_column(String(1000))
    jurisdiction: Mapped[str] = mapped_column(String(20), default="india")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class Source(Base):
    __tablename__ = "sources"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(500), unique=True)
    source_type: Mapped[str] = mapped_column(String(50))  # classical_text|statute|treaty|pharmacopoeia
    author: Mapped[str | None] = mapped_column(String(255))
    era: Mapped[str | None] = mapped_column(String(100))
    excerpt: Mapped[str | None] = mapped_column(Text)
    language: Mapped[str] = mapped_column(String(10), default="en")
