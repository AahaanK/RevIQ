from fastapi import APIRouter, Query
from typing import Optional
from app.controllers.log_controller import LogController, LogCreateSchema, LogUpdateSchema

router = APIRouter()

# Endpoint 1: Advanced Filter Search (Must be placed above the dynamic /{id} path)
@router.get("/search")
def search_logs(priority: Optional[str] = Query(None)):
    return LogController.search_logs(priority)

# Endpoint 2: GET All Logs
@router.get("")
def get_all_logs():
    return LogController.get_all_logs()

# Endpoint 3: POST Ingest New Log
@router.post("", status_code=201)
def create_log(payload: LogCreateSchema):
    return LogController.create_log(payload)

# Endpoint 4: GET Single Log by ID
@router.get("/{id}")
def get_log_by_id(id: str):
    return LogController.get_log_by_id(id)

# Endpoint 5: PUT Update Log Parameters
@router.put("/{id}")
def update_log(id: str, payload: LogUpdateSchema):
    return LogController.update_log(id, payload)

# Endpoint 6: DELETE Purge Log
@router.delete("/{id}")
def delete_log(id: str):
    return LogController.delete_log(id)