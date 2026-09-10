"""
Conversation Memory for IP-Sahayak.
Adapted from the atomic disk-persisted multi-turn memory pattern in ORCA.
Maintains conversational turns per session, atomically persisted to disk (sessions/{session_id}.json).
Enables multi-turn contextual query resolution without overriding factual RAG retrieval.
"""

import json
import logging
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)

DEFAULT_MEMORY_TURNS = 5


def utc_iso_now() -> str:
    return datetime.now(timezone.utc).isoformat()


class ConversationMemory:
    """
    In-memory and disk-persisted multi-turn conversation memory for IP-Sahayak.
    Saves turns atomically to survive server reboots.
    """

    def __init__(
        self,
        sessions_dir: Optional[Path] = None,
        turns_cap: int = DEFAULT_MEMORY_TURNS,
    ) -> None:
        self.sessions_dir = (
            sessions_dir or Path(__file__).resolve().parents[4] / "backend" / "sessions"
        )
        self.sessions_dir.mkdir(parents=True, exist_ok=True)
        self.turns_cap = turns_cap
        self._cache: Dict[str, Dict[str, Any]] = {}

    def _ensure_session(self, session_id: str) -> Dict[str, Any]:
        """Loads session from cache or disk, or initializes a new one."""
        if session_id in self._cache:
            return self._cache[session_id]

        file_path = self.sessions_dir / f"{session_id}.json"
        if file_path.exists():
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self._cache[session_id] = data
                    return data
            except Exception as exc:
                logger.error("Failed to load session %s from disk: %s", session_id, exc)

        now = utc_iso_now()
        new_session: Dict[str, Any] = {
            "session_id": session_id,
            "created_at": now,
            "updated_at": now,
            "turns": [],
        }
        self._cache[session_id] = new_session
        return new_session

    def append_turn(
        self,
        session_id: str,
        query: str,
        answer: str,
        language: str = "en",
        sources: Optional[List[Dict[str, Any]]] = None,
        category: Optional[str] = None,
        structured_data: Optional[Dict[str, Any]] = None,
    ) -> None:
        """
        Appends a conversational turn and atomically writes through to disk.
        """
        session_data = self._ensure_session(session_id)
        turns_list = session_data.setdefault("turns", [])

        turn_entry = {
            "query": query,
            "answer": answer,
            "language": language,
            "category": category,
            "sources": sources or [],
            "structured": structured_data or {},
            "timestamp": utc_iso_now(),
        }

        turns_list.append(turn_entry)
        if len(turns_list) > self.turns_cap:
            turns_list.pop(0)

        session_data["updated_at"] = utc_iso_now()
        self._persist_session(session_id, session_data)

    def _persist_session(self, session_id: str, data: Dict[str, Any]) -> None:
        """Atomically persists session file to disk using a temporary file and replace."""
        try:
            self.sessions_dir.mkdir(parents=True, exist_ok=True)
            target = self.sessions_dir / f"{session_id}.json"
            tmp = self.sessions_dir / f"{session_id}.json.tmp"
            with open(tmp, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            os.replace(tmp, target)
        except Exception as exc:
            logger.error("Failed to persist session %s: %s", session_id, exc)

    def get_turns(self, session_id: str) -> List[Dict[str, Any]]:
        """Returns the list of recent turns for the given session."""
        session_data = self._ensure_session(session_id)
        return list(session_data.get("turns", []))

    def resolve_contextual_query(self, session_id: str, current_query: str) -> str:
        """
        Context-aware query disambiguation.
        If the user query contains pronouns ('it', 'this', 'that', 'validity', 'its', 'దీని', 'దీనికి', 'यह', 'इसकी')
        without specifying the underlying IPR subject, appends context from recent turns.
        """
        turns = self.get_turns(session_id)
        if not turns:
            return current_query

        last_turn = turns[-1]
        last_query = last_turn.get("query", "").lower()
        last_category = last_turn.get("category", "")

        # Detect primary IPR subjects in previous turn
        last_subject = ""
        for subj in ["patent", "trademark", "copyright", "geographical indication", "design", "tkdl", "nba"]:
            if subj in last_query:
                last_subject = subj
                break
        if not last_subject and last_category:
            last_subject = last_category.lower()

        # Pronouns or ambiguous continuation markers across English, Telugu, and Hindi
        ambiguous_pattern = r"\b(it|its|this|that|validity|duration|cost|fees|how long|renew|renewal|దీని|దీనికి|ఇది|కాలపరిమితి|यह|इसकी|इसका|वैधता|कितने|शुल्क)\b"

        # Check if current query lacks a concrete IPR domain keyword
        ipr_domains = ["patent", "trademark", "copyright", "gi", "design", "tkdl", "nba",
                       "పేటెంట్", "ట్రేడ్మార్క్", "కాపీరైట్", "డిజైన్",
                       "पेटेंट", "ट्रेडमार्क", "कॉपीराइट", "डिजाइन"]
        has_concrete_subject = any(d in current_query.lower() for d in ipr_domains)

        if not has_concrete_subject and last_subject and re.search(ambiguous_pattern, current_query, re.IGNORECASE):
            resolved = f"{last_subject} {current_query}"
            logger.info("Contextual resolution: '%s' -> '%s' (session: %s)", current_query, resolved, session_id)
            return resolved

        return current_query


# Global singleton instance
memory = ConversationMemory()
