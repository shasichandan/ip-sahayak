"""Demo engine: prefixes text to simulate translation. FOR EVALS ONLY."""
from typing import Any


class MockDevanagariEngine:
    async def translate(
        self, text: str, source_language: str, target_language: str
    ) -> dict[str, Any]:
        return {
            "translatedText": f"[{target_language}] {text}",
            "sourceLanguage": source_language,
            "targetLanguage": target_language,
            "engine": "mock_devanagari",
        }
