"""
Simple JSON-file backed storage for prediction history.

This is intentionally simple (a single JSON array on disk) per the project
spec. It can be swapped for a real database later without touching the
router code, since routers only ever call the functions defined here.
"""

import json
import logging
import threading
from typing import List

from app.config import HISTORY_FILE
from app.schemas import HistoryItem

logger = logging.getLogger("smartagroai.history_service")

_lock = threading.Lock()


def _read_all() -> List[dict]:
    if not HISTORY_FILE.exists():
        return []
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError) as exc:
        logger.error("Failed to read history file, starting fresh: %s", exc)
        return []


def _write_all(items: List[dict]) -> None:
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(items, f, indent=2, default=str)


def add_entry(item: HistoryItem) -> None:
    with _lock:
        items = _read_all()
        record = json.loads(item.model_dump_json())
        items.insert(0, record)  # newest first
        _write_all(items)


def get_all() -> List[dict]:
    with _lock:
        return _read_all()


def delete_one(entry_id: str) -> bool:
    with _lock:
        items = _read_all()
        remaining = [i for i in items if i.get("id") != entry_id]
        if len(remaining) == len(items):
            return False
        _write_all(remaining)
        return True


def clear_all() -> None:
    with _lock:
        _write_all([])
