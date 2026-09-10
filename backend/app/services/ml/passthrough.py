"""Default no-op translation engine: returns the input unchanged. Replace via
ML_ENGINE_MODULE / ML_ENGINE_CLASS env vars when the real engine is ready."""
from typing import Any


class PassthroughTranslationEngine:
    async def translate(
        self, text: str, source_language: str, target_language: str
    ) -> dict[str, Any]:
        return {
            "translatedText": text,
            "sourceLanguage": source_language,
            "targetLanguage": target_language,
            "engine": "passthrough",
        }
