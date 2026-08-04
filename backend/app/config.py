"""
Central configuration for the SmartAgroAI backend.

All filesystem paths and tunable constants live here so the rest of the
codebase never hardcodes a path directly.
"""

from pathlib import Path

# Project root = backend/
BASE_DIR = Path(__file__).resolve().parent.parent

# --- AI model files -------------------------------------------------------
MODEL_DIR = BASE_DIR / "model"
MODEL_PATH = MODEL_DIR / "best_cnn.keras"
CLASS_NAMES_PATH = MODEL_DIR / "class_names.json"

# --- Data files -------------------------------------------------------------
DISEASE_DATA_PATH = BASE_DIR / "disease_data.json"

# --- Storage folders --------------------------------------------------------
UPLOADS_DIR = BASE_DIR / "uploads"
HISTORY_DIR = BASE_DIR / "history"
HISTORY_FILE = HISTORY_DIR / "history.json"

# --- Model input spec --------------------------------------------------------
IMAGE_SIZE = (224, 224)  # (width, height)
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/jpg", "image/png"}
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}
MAX_UPLOAD_SIZE_MB = 10

# --- CORS ---------------------------------------------------------------------
# Add your deployed frontend origin(s) here in production.
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Ensure runtime folders exist on import
for folder in (UPLOADS_DIR, HISTORY_DIR):
    folder.mkdir(parents=True, exist_ok=True)
