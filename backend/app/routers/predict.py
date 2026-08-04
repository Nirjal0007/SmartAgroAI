"""POST /predict — upload a leaf image, get back a disease prediction."""

import logging
import uuid
from datetime import datetime
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.config import ALLOWED_CONTENT_TYPES, ALLOWED_EXTENSIONS, MAX_UPLOAD_SIZE_MB, UPLOADS_DIR
from app.disease_service import get_disease_info, is_healthy_class
from app.history_service import add_entry
from app.model_loader import model_registry
from app.predict_service import InvalidImageError, run_inference
from app.schemas import HistoryItem, PredictionResponse

logger = logging.getLogger("smartagroai.routers.predict")
router = APIRouter(tags=["Prediction"])

MAX_UPLOAD_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024


@router.post(
    "/predict",
    response_model=PredictionResponse,
    summary="Predict plant disease from a leaf image",
)
async def predict(file: UploadFile = File(...)) -> PredictionResponse:
    # --- Validate model availability -----------------------------------
    if not model_registry.is_loaded:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                "AI model is not loaded on the server. "
                f"{model_registry.load_error or 'Check server startup logs.'}"
            ),
        )

    # --- Validate file type ----------------------------------------------
    extension = Path(file.filename or "").suffix.lower()
    if file.content_type not in ALLOWED_CONTENT_TYPES and extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file type. Please upload a JPG, JPEG, or PNG image.",
        )

    # --- Read + validate size -----------------------------------------------
    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No file uploaded.")
    if len(file_bytes) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File too large. Maximum size is {MAX_UPLOAD_SIZE_MB}MB.",
        )

    # --- Run AI pipeline ----------------------------------------------------
    try:
        class_name, confidence = run_inference(file_bytes)
    except InvalidImageError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)) from exc
    except Exception as exc:  # noqa: BLE001
        logger.exception("Unexpected prediction failure")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Prediction failed unexpectedly. Please try again.",
        ) from exc

    # --- Save uploaded image to disk ----------------------------------------
    prediction_id = str(uuid.uuid4())
    saved_filename = f"{prediction_id}{extension or '.jpg'}"
    saved_path = UPLOADS_DIR / saved_filename
    with open(saved_path, "wb") as f:
        f.write(file_bytes)
    image_url = f"/uploads/{saved_filename}"

    # --- Build response -------------------------------------------------------
    disease_info = get_disease_info(class_name)
    status_label = "healthy" if is_healthy_class(class_name) else "diseased"
    predicted_at = datetime.utcnow()

    response = PredictionResponse(
        id=prediction_id,
        confidence=confidence,
        status=status_label,
        class_name=class_name,
        image_url=image_url,
        predicted_at=predicted_at,
        **disease_info.model_dump(),
    )

    # --- Persist to history -----------------------------------------------------
    add_entry(
        HistoryItem(
            id=prediction_id,
            plant=disease_info.plant,
            disease=disease_info.disease,
            confidence=confidence,
            status=status_label,
            class_name=class_name,
            image_url=image_url,
            predicted_at=predicted_at,
        )
    )

    return response
