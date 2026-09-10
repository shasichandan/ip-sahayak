from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    PROJECT_NAME: str = "IP-SAKTI Sahayak API"
    API_V1_PREFIX: str = "/api"
    DATABASE_URL: str = "postgresql+asyncpg://localhost/ip_sahayak"
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    SECRET_KEY: str = "CHANGE_ME_dev_only"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120
    RAG_ENGINE_MODULE: str = "app.services.rag.mock_engine"
    RAG_ENGINE_CLASS: str = "MockRAGEngine"
    ML_ENGINE_MODULE: str = "app.services.ml.passthrough"
    ML_ENGINE_CLASS: str = "PassthroughTranslationEngine"
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_MB: int = 5
    RATE_LIMIT_CHAT: int = 20
    RATE_LIMIT_WINDOW_SECONDS: int = 60

    @field_validator("DATABASE_URL", mode="after")
    @classmethod
    def normalize_database_url(cls, v: str) -> str:
        # asyncpg requires ssl= instead of sslmode=
        return v.replace("sslmode=", "ssl=")


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
