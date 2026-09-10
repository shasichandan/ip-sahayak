"""Safe-abstention guardrail: out-of-scope queries must NEVER be answered with
fabricated authority. Returns a structured abstention matching the frontend
contract exactly (all 12 top keys, correct nested key sets)."""
from typing import Any

OUT_OF_SCOPE_KEYWORDS = (
    "weather", "cricket", "football", "movie", "song", "joke",
    "stock price", "share market", "election", "politics",
    "recipe for cake", "who will win", "box office",
)


def is_out_of_scope(query: str) -> bool:
    q = query.lower()
    return any(k in q for k in OUT_OF_SCOPE_KEYWORDS)


ABSTENTION_RESPONSE: dict[str, Any] = {
    "summary": (
        "Your question falls outside the scope of Ayurvedic intellectual property and "
        "regulatory guidance (IPR, TKDL, ABS, drug classification, AYUSH regimes). "
        "To stay accurate I must abstain rather than fabricate authority. This is "
        "information only - not legal advice."
    ),
    "relevantRegimes": [],
    "patentability": {
        "status": "Not assessed",
        "analysis": "Query out of scope.",
        "section3pFlag": False,
        "noveltyAssessment": "Query out of scope.",
    },
    "traditionalKnowledge": {
        "matchFound": False, "tkdlRecord": "",
        "classicalReference": "", "priorArtImplication": "Query out of scope.",
    },
    "regulatoryClassification": {
        "category": "Not assessed",
        "pathway": "Rule 158B screening advised for in-scope queries",
        "rule158BNote": "Query out of scope.",
    },
    "absConsiderations": {
        "nbaApprovalRequired": False,
        "details": "Query out of scope.",
        "legalAct": "",
    },
    "recommendedNextSteps": [
        "Rephrase your question around an Ayurvedic product, formulation, or IP/regulatory concern.",
        "Escalate to a human IP facilitator: facilitators@ipsahayak.in (subject: IP-SAKTI Escalation).",
    ],
    "sources": [],
    "confidence": "abstained",
    "confidenceScore": 0,
    "confidenceReason": "Safe abstention: query is outside the certified corpus; refusing to fabricate authority.",
    "supportedClaimsRatio": "0/0 claims verified",
}
