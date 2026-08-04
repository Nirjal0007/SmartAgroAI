"""
Pydantic models describing every request/response shape used by the API.
Keeping these centralized gives us type-safe, self-documenting endpoints
and automatic OpenAPI/Swagger docs.
"""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class DiseaseInfo(BaseModel):
    """Static reference information about a disease, loaded from disease_data.json."""

    plant: str
    disease: str
    description: str
    symptoms: List[str] = Field(default_factory=list)
    causes: List[str] = Field(default_factory=list)
    treatment: List[str] = Field(default_factory=list)
    prevention: List[str] = Field(default_factory=list)


class PredictionResponse(DiseaseInfo):
    """Response returned by POST /predict — disease info + AI confidence."""

    id: str
    confidence: float = Field(..., ge=0, le=100, description="Confidence percentage 0-100")
    status: str = Field(..., description="'healthy' or 'diseased'")
    class_name: str = Field(..., description="Raw model class label, e.g. Tomato___Early_blight")
    image_url: str
    predicted_at: datetime


class HistoryItem(BaseModel):
    """A single stored prediction history entry."""

    id: str
    plant: str
    disease: str
    confidence: float
    status: str
    class_name: str
    image_url: str
    predicted_at: datetime


class HistoryListResponse(BaseModel):
    total: int
    items: List[HistoryItem]


class DeleteResponse(BaseModel):
    success: bool
    message: str


class ErrorResponse(BaseModel):
    detail: str


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    num_classes: Optional[int] = None
