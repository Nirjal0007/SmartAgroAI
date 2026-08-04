"""
Loads the trained CNN model and class-name list exactly once and keeps
them in memory for the lifetime of the process. Every prediction request
reuses this singleton instead of re-loading the model from disk.
"""

import json
import logging
from typing import List, Optional

from app.config import CLASS_NAMES_PATH, MODEL_PATH

logger = logging.getLogger("smartagroai.model_loader")


class ModelRegistry:
    """Holds the single in-memory instance of the CNN model + class names."""

    def __init__(self) -> None:
        self._model = None
        self._class_names: Optional[List[str]] = None
        self._load_error: Optional[str] = None

    @property
    def is_loaded(self) -> bool:
        return self._model is not None and self._class_names is not None

    @property
    def load_error(self) -> Optional[str]:
        return self._load_error

    @property
    def num_classes(self) -> Optional[int]:
        return len(self._class_names) if self._class_names else None

    def load(self) -> None:
        """Load the Keras model + class_names.json into memory. Call once at startup."""
        try:
            if not MODEL_PATH.exists():
                raise FileNotFoundError(
                    f"Model file not found at {MODEL_PATH}. "
                    "Place your trained best_cnn.keras file in the backend/model/ folder."
                )
            if not CLASS_NAMES_PATH.exists():
                raise FileNotFoundError(
                    f"Class names file not found at {CLASS_NAMES_PATH}. "
                    "Place class_names.json in the backend/model/ folder."
                )

            # Imported lazily so the app can still start (and report a clean
            # error via /health) even in environments where tensorflow isn't
            # installed yet.
            import tensorflow as tf

            logger.info("Loading model from %s ...", MODEL_PATH)
            self._model = tf.keras.models.load_model(MODEL_PATH)

            with open(CLASS_NAMES_PATH, "r", encoding="utf-8") as f:
                self._class_names = json.load(f)

            logger.info(
                "Model loaded successfully with %d output classes.",
                len(self._class_names),
            )
            self._load_error = None
        except Exception as exc:  # noqa: BLE001 - we want to capture and report any load failure
            self._model = None
            self._class_names = None
            self._load_error = str(exc)
            logger.error("Failed to load model: %s", exc)

    def predict(self, batch):
        """Run inference on a preprocessed numpy batch. Raises if model isn't loaded."""
        if not self.is_loaded:
            raise RuntimeError(
                self._load_error or "Model is not loaded. Check server startup logs."
            )
        return self._model.predict(batch, verbose=0)

    def class_name_for_index(self, index: int) -> str:
        if not self._class_names:
            raise RuntimeError("Class names not loaded.")
        return self._class_names[index]


# Single shared instance imported across the app
model_registry = ModelRegistry()
