from typing import Any, Literal, Protocol


class RAGEngine(Protocol):
    """Contract every RAG engine must satisfy.

    The returned dict MUST match the frontend structuredResponse interface:
    { summary, relevantRegimes, patentability, traditionalKnowledge,
      regulatoryClassification, absConsiderations, recommendedNextSteps,
      sources, confidence, confidenceScore, confidenceReason,
      supportedClaimsRatio }
    All keys required, none None. Sources items:
    { id, title, section, excerpt, authority, category, relevanceScore,
      pageOrChapter }
    """

    async def answer(
        self,
        query: str,
        jurisdiction: Literal["india", "international"],
        language: str = "en",
        history: list[dict[str, str]] | None = None,
        context: dict[str, Any] | None = None,
    ) -> dict[str, Any]: ...
