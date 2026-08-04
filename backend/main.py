"""
SmartAgroAI Backend
====================
FastAPI application entrypoint.

Run locally with:
    uvicorn main:app --reload --port 8000

The AI model is loaded exactly ONCE at startup (see `lifespan` below) and
reused for every /predict request — it is never reloaded per-request.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import CORS_ORIGINS, UPLOADS_DIR
from app.disease_service import load_disease_data
from app.model_loader import model_registry
from app.routers import history, predict
from app.schemas import HealthResponse

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("smartagroai.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- Startup: load the model and disease data ONCE ---------------------
    logger.info("Starting SmartAgroAI backend...")
    model_registry.load()
    load_disease_data()
    if not model_registry.is_loaded:
        logger.warning(
            "Server is starting WITHOUT a loaded model. "
            "/predict will return 503 until model/best_cnn.keras and "
            "model/class_names.json are present and the server is restarted."
        )
    yield
    # --- Shutdown (nothing to clean up currently) ---------------------------
    logger.info("Shutting down SmartAgroAI backend.")


app = FastAPI(
    title="SmartAgroAI API",
    description="AI-powered plant disease detection from leaf images.",
    version="1.0.0",
    lifespan=lifespan,
)

# --- CORS -------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Static file serving for uploaded leaf images ----------------------------
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

# --- Routers ------------------------------------------------------------------
app.include_router(predict.router)
app.include_router(history.router)


@app.get("/", tags=["Health"], summary="API root")
async def root():
    return {"message": "SmartAgroAI API is running. See /docs for API documentation."}


@app.get("/health", response_model=HealthResponse, tags=["Health"], summary="Health check")
async def health() -> HealthResponse:
    return HealthResponse(
        status="ok" if model_registry.is_loaded else "degraded",
        model_loaded=model_registry.is_loaded,
        num_classes=model_registry.num_classes,
    )
