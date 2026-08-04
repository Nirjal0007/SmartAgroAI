"""
The core AI prediction pipeline:
  1. Load image bytes with Pillow
  2. Resize to 224x224 and force RGB
  3. Convert to a NumPy array, normalize, and expand dims for batch inference
  4. Run the model, take argmax
  5. Map the index to a class name via class_names.json
"""

import io
import logging

import numpy as np
from PIL import Image, UnidentifiedImageError

from app.config import IMAGE_SIZE
from app.model_loader import model_registry

logger = logging.getLogger("smartagroai.predict_service")


class InvalidImageError(Exception):
    """Raised when the uploaded file cannot be parsed as a valid image."""


def preprocess_image(file_bytes: bytes) -> np.ndarray:
    """Turn raw uploaded bytes into a (1, 224, 224, 3) normalized float32 batch."""
    try:
        image = Image.open(io.BytesIO(file_bytes))
        image.verify()  # sanity-check the file isn't corrupted
        # Re-open after verify() since verify() invalidates the file pointer/state
        image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    except (UnidentifiedImageError, OSError) as exc:
        raise InvalidImageError("The uploaded file is not a valid image.") from exc

    image = image.resize(IMAGE_SIZE)
    array = np.asarray(image, dtype=np.float32)
    batch = np.expand_dims(array, axis=0)  # (1, 224, 224, 3)
    return batch


def run_inference(file_bytes: bytes):
    """
    Run the full pipeline and return (class_name, confidence_percent).
    Raises InvalidImageError or RuntimeError (model not loaded) on failure.
    """
    batch = preprocess_image(file_bytes)
    predictions = model_registry.predict(batch)  # shape (1, num_classes)
    probabilities = predictions[0]

    predicted_index = int(np.argmax(probabilities))
    confidence = float(probabilities[predicted_index]) * 100.0
    class_name = model_registry.class_name_for_index(predicted_index)

    logger.info("Prediction: %s (%.2f%%)", class_name, confidence)
    return class_name, round(confidence, 2)
