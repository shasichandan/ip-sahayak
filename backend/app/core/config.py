from functools import lru_cache
import os
from pathlib import Path

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parents[2]
ROOT_DIR = Path(__file__).resolve().parents[3]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=[
            str(BACKEND_DIR / ".env"),
            str(ROOT_DIR / ".env"),
            str(ROOT_DIR / ".env.local"),
        ],
        env_file_encoding="utf-8",
        extra="ignore",
    )

    PROJECT_NAME: str = "IP-SAKTI Sahayak API"
    API_V1_PREFIX: str = "/api"
    DATABASE_URL: str = "postgresql+asyncpg://localhost/ip_sahayak"
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    SECRET_KEY: str = "CHANGE_ME_dev_only"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120
    RAG_ENGINE_MODULE: str = "app.services.rag.production_engine"
    RAG_ENGINE_CLASS: str = "ProductionRAGEngine"
    ML_ENGINE_MODULE: str = "app.services.ml.passthrough"
    ML_ENGINE_CLASS: str = "PassthroughTranslationEngine"
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    LLM_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    MODEL_GEMINI: str = "gemini-2.5-flash"
    RAG_TOP_K: int = 3
    RAG_RELEVANCE_THRESHOLD: float = 0.12
    RAG_SIMILARITY_THRESHOLD: float = 0.12
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_MB: int = 5
    RATE_LIMIT_CHAT: int = 20
    RATE_LIMIT_WINDOW_SECONDS: int = 60

    @field_validator("DATABASE_URL", mode="after")
    @classmethod
    def normalize_database_url(cls, v: str) -> str:
        # asyncpg requires ssl= instead of sslmode=
        return v.replace("sslmode=", "ssl=")


def get_settings() -> Settings:
    return Settings()


settings = get_settings()

