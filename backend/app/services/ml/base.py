from typing import Protocol


class TranslationEngine(Protocol):
    """Contract for translation engines (e.g., Bhashini-based). The returned dict
    MUST be: { "translatedText": str, "sourceLanguage": str, "targetLanguage": str,
    "engine": str }. Deterministic and pure — no I/O, no timestamps."""

    async def translate(
        self, text: str, source_language: str, target_language: str
    ) -> dict: ...
