from fastapi import APIRouter, Query
from typing import Optional
from app.controllers.log_controller import LogController, LogCreateSchema, LogUpdateSchema

router = APIRouter()

@router.get("/search")
async def search_logs(priority: Optional[str] = Query(None)):
    return await LogController.search_logs(priority)

@router.get("")
async def get_all_logs():
    return await LogController.get_all_logs()

@router.post("", status_code=201)
async def create_log(payload: LogCreateSchema):
    return await LogController.create_log(payload)

@router.get("/{id}")
async def get_log_by_id(id: str):
    return await LogController.get_log_by_id(id)

@router.put("/{id}")
async def update_log(id: str, payload: LogUpdateSchema):
    return await LogController.update_log(id, payload)

@router.delete("/{id}")
async def delete_log(id: str):
    return await LogController.delete_log(id)