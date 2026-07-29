from typing import Optional
from pydantic import BaseModel
from fastapi import HTTPException
from app.database import MongoLogRepository

# ==========================================
# 📝 PRESERVED DATA VALIDATION SCHEMAS
# ==========================================
class LogCreateSchema(BaseModel):
    client: str
    feedback: str
    priority: Optional[str] = "Low"
    badge: Optional[str] = "Central Ledger"

class LogUpdateSchema(BaseModel):
    client: Optional[str] = None
    feedback: Optional[str] = None
    priority: Optional[str] = None
    badge: Optional[str] = None

# ==========================================
# 🎮 ASYNC DATABASE CONTROLLER CORE
# ==========================================
class LogController:

    @staticmethod
    async def get_all_logs():
        # Asynchronously fetch persistent data rows from your MongoDB cluster
        logs = await MongoLogRepository.find_all()
        return { "success": True, "count": len(logs), "data": logs }

    @staticmethod
    async def get_log_by_id(log_id: str):
        # Maps log_id parameter directly to MongoDB document search functions
        log = await MongoLogRepository.find_by_id(log_id)
        if not log:
            raise HTTPException(status_code=404, detail=f"Data log index ref [{log_id}] failed system lookup.")
        return { "success": True, "data": log }

    @staticmethod
    async def create_log(payload: LogCreateSchema):
        # Extract pristine payload dictionary data attributes safely
        log_data = payload.model_dump()
        created_log = await MongoLogRepository.insert(log_data)
        return { "success": True, "data": created_log }

    @staticmethod
    async def update_log(log_id: str, payload: LogUpdateSchema):
        # Strip out any fields left untouched by the user modification request
        update_data = payload.model_dump(exclude_unset=True)
        updated_log = await MongoLogRepository.update(log_id, update_data)
        if not updated_log:
            raise HTTPException(status_code=404, detail="Update trace targeted reference ID failed.")
        return { "success": True, "data": updated_log }

    @staticmethod
    async def delete_log(log_id: str):
        # Permanently drop document data record matching targeted hex ID
        log_to_delete = await MongoLogRepository.find_by_id(log_id)
        if not log_to_delete:
            raise HTTPException(status_code=404, detail="Delete targeting query missing matching parameter records.")
        
        await MongoLogRepository.delete(log_id)
        return { "success": True, "message": "Purged record payload successfully.", "data": log_to_delete }

    @staticmethod
    async def search_logs(priority: Optional[str] = None):
        if not priority:
            return await LogController.get_all_logs()
        
        filtered_matches = await MongoLogRepository.search(priority)
        return { "success": True, "count": len(filtered_matches), "data": filtered_matches }