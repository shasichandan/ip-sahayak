"""
Query Router for IP-Sahayak.
Distinguishes small-talk / conversational queries from domain questions
and routes them efficiently without unnecessary RAG retrieval.
"""

import re
from typing import Set

# Normalized lower-case exact small talk phrases
EXACT_SMALL_TALK_PHRASES: Set[str] = {
    # English
    "hi", "hello", "hey", "hiya", "howdy",
    "good morning", "good evening", "good afternoon", "good day", "greetings",
    "how are you", "how are you doing", "how r u", "how do you do", "what's up", "whats up",
    "thank you", "thanks", "thank you so much", "thanks a lot", "thank u", "thx",
    "who are you", "what is your name", "tell me about yourself", "who r u", "what are you",
    "bye", "goodbye", "see you", "see ya", "cya", "take care", "have a good day",

    # Telugu (Native script & Transliterated)
    "హలో", "నమస్కారం", "నమస్తే", "బాగున్నారా", "ఎలా ఉన్నారు", "ఎలా ఉన్నావు",
    "ధన్యవాదాలు", "ధన్యవాదం", "థాంక్స్", "మీరు ఎవరు", "నువ్వు ఎవరు", "బాయ్", "వీడ్కోలు",
    "namaskaram", "namaste", "bagunnara", "ela unnaru", "ela unnavu",
    "dhanyavadalu", "dhanyavadam", "meeru evaru", "nuvvu evaru",

    # Hindi (Native script & Transliterated)
    "नमस्ते", "नमस्कार", "हेलो", "हाय", "आप कैसे हैं", "तुम कैसे हो", "कैसे हो", "कैसी हो",
    "धन्यवाद", "शुक्रिया", "बहुत धन्यवाद", "आप कौन हैं", "तुम कौन हो", "अलविदा",
    "namaste", "namaskar", "aap kaise hain", "kaise ho", "kaisa hai",
    "dhanyawad", "dhanyavad", "shukriya", "aap kaun hain", "tum kaun ho", "alvida",
}

# Regex patterns for small-talk greetings or casual utterances
SMALL_TALK_PATTERNS = [
    r"^(hi|hello|hey|greetings|namaste|namaskar|namaskaram)\b",
    r"^(good\s+(morning|afternoon|evening|night|day))\b",
    r"^(how\s+are\s+you|how\s+r\s+u|how\s+are\s+you\s+doing)\b",
    r"^(who\s+are\s+you|who\s+r\s+u|what\s+is\s+your\s+name)\b",
    r"^(thank\s+you|thanks|thank\s+u|thx)\b",
    r"^(bye|goodbye|see\s+you|cya)\b",
    r"^(హలో|నమస్కారం|నమస్తే|బాగున్నారా|ఎలా ఉన్నారు|మీరు ఎవరు|ధన్యవాదాలు|థాంక్స్)\b",
    r"^(नमस्ते|नमस्कार|हेलो|हाय|आप कैसे हैं|आप कौन हैं|धन्यवाद|शुक्रिया)\b",
]


def is_small_talk(query: str) -> bool:
    """
    Returns True if the user query is a greeting, casual conversation,
    or general conversational banter that should bypass RAG retrieval.
    """
    if not query or not query.strip():
        return True

    # Strip punctuation and normalize whitespace
    cleaned = re.sub(r"[^\w\s\u0C00-\u0C7F\u0900-\u097F]", "", query.lower()).strip()
    cleaned = re.sub(r"\s+", " ", cleaned)

    if cleaned in EXACT_SMALL_TALK_PHRASES:
        return True

    # Check for short queries (< 40 chars) matching small talk patterns
    if len(cleaned) < 40:
        for pat in SMALL_TALK_PATTERNS:
            if re.search(pat, cleaned, re.IGNORECASE):
                # Ensure the query is not asking a domain question in the same breath
                domain_cues = ["patent", "dinacharya", "ritucharya", "panchakarma", "ayurved", "peetent", "పేటెంట్", "दवा", "औषध"]
                if not any(cue in cleaned for cue in domain_cues):
                    return True

    return False
