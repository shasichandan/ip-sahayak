import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.router import api_router
from app.core.config import settings
from app.db.session import engine
from app.middleware.observability import AuditTrailMiddleware, DisclaimerMiddleware
from app.schemas.chat import PublicChatRequest, PublicChatResponse
from app.services.rag.loader import get_rag_engine
from app.services.rag.ingestion import ingest_documents_directory
from app.services.rag.vector_store import get_vector_store

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        logger.info("Database connection established.")
    except Exception as exc:
        logger.warning("Database connection failed (%s); operating in prototype/offline mode.", exc)
    yield
    try:
        await engine.dispose()
    except Exception:
        pass


app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(AuditTrailMiddleware)
app.add_middleware(DisclaimerMiddleware)

# Direct prototype chat endpoint
@app.post("/api/chat", response_model=PublicChatResponse, tags=["rag-chat"])
async def public_chat(payload: PublicChatRequest) -> PublicChatResponse:
    """Public prototype endpoint for Indian IPR RAG queries with multilingual support."""
    engine_inst = get_rag_engine()
    structured = await engine_inst.answer(
        query=payload.message,
        jurisdiction=payload.jurisdiction,
        language=payload.language or "en",
        session_id=payload.session_id or "default_session",
    )
    answer_text = structured.get("summary") or structured.get("answer", "")
    detected_lang = structured.get("detected_language") or payload.language or "en"
    return PublicChatResponse(
        answer=answer_text,
        language=detected_lang,
        language_name=structured.get("language_name"),
        source=structured.get("source", "rag"),
        sources=structured.get("sources", []),
        retrieved_chunks=structured.get("retrieved_chunks_count", 0),
        confidence=structured.get("confidence", "high"),
        confidenceScore=structured.get("confidenceScore", 85),
        structuredResponse=structured,
    )


# Ingestion endpoint
@app.post("/api/ingest", tags=["ingestion"])
async def trigger_ingestion() -> dict:
    """Triggers knowledge base document re-ingestion and vector indexing."""
    kb_dir = Path(__file__).resolve().parents[2] / "knowledge_base"
    docs_dir = kb_dir / "documents"
    proc_file = kb_dir / "processed" / "chunks.json"
    chunks = ingest_documents_directory(docs_dir, output_processed_path=proc_file)
    vector_store = get_vector_store()
    vector_store.build_index(chunks, api_key=settings.GEMINI_API_KEY)
    return {
        "status": "success",
        "chunks_indexed": len(chunks),
        "message": f"Successfully ingested {len(chunks)} chunks from {docs_dir}",
    }


app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.get("/", tags=["meta"])
async def root() -> dict:
    return {"app": settings.PROJECT_NAME, "status": "operational", "docs": "/docs"}

