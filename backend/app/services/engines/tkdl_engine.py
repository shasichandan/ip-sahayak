"""Deterministic TKDL prior-art search over the demo corpus (reuses TK_CORPUS)."""
from typing import Any

from app.services.engines.formulation_engine import TK_CORPUS

ALIASES: dict[str, list[str]] = {
    "withania somnifera": ["ashwagandha", "withania", "somnifera"],
    "curcuma longa": ["curcuma", "turmeric", "haridra", "nisha", "curcumin"],
    "piper nigrum": ["piper", "maricha", "black pepper", "piperine"],
    "bacopa monnieri": ["bacopa", "brahmi", "monnieri"],
}

IMPLICATION = (
    "Section 3(p) non-patentability bar strictly applies to direct herbal powders, "
    "simple decoctions, and classical-indication claims; reframe toward novel "
    "processes, synergistic ratios, or delivery systems."
)


def search_tkdl(query: str) -> list[dict[str, Any]]:
    q = query.lower()
    records: list[dict[str, Any]] = []
    for key, meta in TK_CORPUS.items():
        tokens = [key] + ALIASES.get(key, [])
        if any(t in q for t in tokens):
            records.append({
                "recordId": meta["record"],
                "badge": "CSIR-TKDL",
                "title": meta["name"],
                "ipc": meta["ipc"],
                "excerpt": meta["excerpt"],
                "samhitaSources": meta["samhitaSources"],
                "priorArtBar": "HIGH PRIOR ART BAR",
                "patentabilityImplication": IMPLICATION,
                "tkdlPortalUrl": "https://tkdl.res.in",
            })
    return records
