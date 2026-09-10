import importlib
import logging
from functools import lru_cache

from app.core.config import settings

logger = logging.getLogger(__name__)


@lru_cache
def get_translation_engine():
    """Dynamically load the translation engine from env config. Engines plug in
    with ZERO code changes here — set ML_ENGINE_MODULE / ML_ENGINE_CLASS in .env."""
    module = importlib.import_module(settings.ML_ENGINE_MODULE)
    cls = getattr(module, settings.ML_ENGINE_CLASS)
    engine = cls()
    logger.info("Translation engine loaded: %s.%s", settings.ML_ENGINE_MODULE, settings.ML_ENGINE_CLASS)
    return engine
