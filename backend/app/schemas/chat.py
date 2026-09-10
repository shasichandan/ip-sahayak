from datetime import datetime
from typing import Any, Literal

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=8000)
    conversationId: int | None = None
    jurisdiction: Literal["india", "international"] = "india"
    language: Literal["en", "te", "hi"] = "en"


class CitationOut(BaseModel):
    id: int
    title: str
    section: str | None = None
    excerpt: str | None = None
    authority: str | None = None
    category: str | None = None
    relevanceScore: int | None = None
    pageOrChapter: str | None = None
    sourceUrl: str | None = None
    isVerified: bool = False


class MessageOut(BaseModel):
    id: int
    role: Literal["user", "assistant"]
    content: str
    structuredResponse: dict[str, Any] | None = None
    confidenceLevel: str | None = None
    confidenceScore: int | None = None
    confidenceReason: str | None = None
    supportedClaimsRatio: str | None = None
    citations: list[CitationOut] = []
    createdAt: datetime


class ConversationSummary(BaseModel):
    id: int
    title: str
    jurisdiction: str
    language: str
    createdAt: datetime
    updatedAt: datetime


class ConversationDetail(ConversationSummary):
    messages: list[MessageOut]


class ChatResponse(BaseModel):
    conversationId: int
    userMessage: MessageOut
    assistantMessage: MessageOut


class FeedbackCreate(BaseModel):
    rating: Literal["up", "down"]
    comment: str | None = Field(default=None, max_length=2000)
