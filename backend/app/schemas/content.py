from pydantic import BaseModel, Field


class SavedReportCreate(BaseModel):
    question: str = Field(min_length=1, max_length=5000)
    summary: str | None = Field(default=None, max_length=8000)
    category: str | None = Field(default=None, max_length=100)
    sourcesCount: int = Field(default=0, ge=0, le=9999)
    fullPayload: dict | None = None
