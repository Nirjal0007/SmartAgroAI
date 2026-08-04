"""GET/DELETE /history — view and manage stored prediction history."""

from fastapi import APIRouter, HTTPException, status

from app.history_service import clear_all, delete_one, get_all
from app.schemas import DeleteResponse, HistoryListResponse

router = APIRouter(tags=["History"])


@router.get("/history", response_model=HistoryListResponse, summary="Get prediction history")
async def list_history() -> HistoryListResponse:
    items = get_all()
    return HistoryListResponse(total=len(items), items=items)


@router.delete("/history", response_model=DeleteResponse, summary="Clear all prediction history")
async def clear_history() -> DeleteResponse:
    clear_all()
    return DeleteResponse(success=True, message="All history cleared.")


@router.delete(
    "/history/{entry_id}",
    response_model=DeleteResponse,
    summary="Delete a single prediction from history",
)
async def delete_history_entry(entry_id: str) -> DeleteResponse:
    deleted = delete_one(entry_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No history entry found with id '{entry_id}'.",
        )
    return DeleteResponse(success=True, message=f"Entry {entry_id} deleted.")
