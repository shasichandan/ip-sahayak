import importlib
import logging
from functools import lru_cache

from app.core.config import settings

logger = logging.getLogger(__name__)


@lru_cache
def get_rag_engine():
    """Dynamically load the RAG engine from env config. Engines plug in with
    ZERO code changes here — set RAG_ENGINE_MODULE and RAG_ENGINE_CLASS in .env."""
    module = importlib.import_module(settings.RAG_ENGINE_MODULE)
    cls = getattr(module, settings.RAG_ENGINE_CLASS)
    engine = cls()
    logger.info("RAG engine loaded: %s.%s", settings.RAG_ENGINE_MODULE, settings.RAG_ENGINE_CLASS)
    return engine
