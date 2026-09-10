import logging
import time

from starlette.middleware.base import BaseHTTPMiddleware

from app.core.security import decode_token
from app.db.session import AsyncSessionLocal
from app.models import AuditLog

logger = logging.getLogger(__name__)
MUTATING = {"POST", "PATCH", "PUT", "DELETE"}


class AuditTrailMiddleware(BaseHTTPMiddleware):
    """Writes one audit_logs row per mutating /api request. Stores ONLY metadata
    (status, duration) — never request bodies (DPDP-friendly)."""

    async def dispatch(self, request, call_next):
        if request.method not in MUTATING or not request.url.path.startswith("/api"):
            return await call_next(request)
        start = time.monotonic()
        response = await call_next(request)
        duration_ms = int((time.monotonic() - start) * 1000)
        user_id = None
        auth = request.headers.get("authorization", "")
        if auth.lower().startswith("bearer "):
            try:
                user_id = int(decode_token(auth[7:].strip())["sub"])
            except Exception:
                user_id = None
        try:
            async with AsyncSessionLocal() as session:
                session.add(AuditLog(
                    user_id=user_id,
                    action=f"{request.method} {request.url.path}",
                    ip_address=request.client.host if request.client else None,
                    payload={"status": response.status_code, "durationMs": duration_ms},
                ))
                await session.commit()
        except Exception:
            logger.warning("audit log write failed", exc_info=True)
        return response


class DisclaimerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        if request.url.path.startswith("/api"):
            response.headers["X-Disclaimer"] = (
                "Information only - NOT legal advice. Consult a registered IP facilitator."
            )
        return response
