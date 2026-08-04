"""
Loads disease_data.json once and provides lookups from a raw model class
label (e.g. "Tomato___Early_blight") to structured disease information.
"""

import json
import logging
from typing import Dict

from app.config import DISEASE_DATA_PATH
from app.schemas import DiseaseInfo

logger = logging.getLogger("smartagroai.disease_service")

_disease_data: Dict[str, dict] = {}


def load_disease_data() -> None:
    """Load disease_data.json into memory. Call once at startup."""
    global _disease_data
    if not DISEASE_DATA_PATH.exists():
        logger.error("disease_data.json not found at %s", DISEASE_DATA_PATH)
        _disease_data = {}
        return

    with open(DISEASE_DATA_PATH, "r", encoding="utf-8") as f:
        _disease_data = json.load(f)
    logger.info("Loaded disease info for %d classes.", len(_disease_data))


def get_disease_info(class_name: str) -> DiseaseInfo:
    """
    Look up structured disease info for a raw class label.
    Falls back to a generic placeholder if the class is missing from the
    JSON file, so the API never crashes on an unrecognized label.
    """
    entry = _disease_data.get(class_name)
    if entry is None:
        logger.warning("No disease_data.json entry found for class '%s'", class_name)
        plant, _, disease = class_name.partition("___")
        return DiseaseInfo(
            plant=plant.replace("_", " ").title() or "Unknown",
            disease=disease.replace("_", " ").title() or "Unknown",
            description="No detailed information is available for this class yet.",
            symptoms=[],
            causes=[],
            treatment=[],
            prevention=[],
        )
    return DiseaseInfo(**entry)


def is_healthy_class(class_name: str) -> bool:
    return class_name.lower().endswith("healthy")
