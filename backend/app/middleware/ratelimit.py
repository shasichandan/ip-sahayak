import time
from collections import defaultdict, deque

from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.core.config import settings
from app.db.session import get_db
from app.models import User

_BUCKETS: dict[int, deque] = defaultdict(deque)


def chat_rate_limit(limit: int | None = None, window_seconds: int | None = None):
    limit = settings.RATE_LIMIT_CHAT if limit is None else limit
    window_seconds = settings.RATE_LIMIT_WINDOW_SECONDS if window_seconds is None else window_seconds
    """Sliding-window limiter per user id. Returns a FastAPI dependency."""

    async def _limit(
        current_user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db),
    ) -> None:
        now = time.monotonic()
        bucket = _BUCKETS[current_user.id]
        while bucket and now - bucket[0] > window_seconds:
            bucket.popleft()
        if len(bucket) >= limit:
            raise HTTPException(
                status_code=429,
                detail=f"Rate limit exceeded: max {limit} chat requests per {window_seconds}s. Please retry shortly.",
            )
        bucket.append(now)

    return _limit


chat_rate_limit_dep = chat_rate_limit()
