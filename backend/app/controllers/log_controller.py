import time
from typing import Optional, List
from pydantic import BaseModel
from fastapi import HTTPException

# Pydantic Schema Models for validation
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

# Mock database seed records
telemetry_logs = [
    { "id": "1", "client": "Trishul Cabin Site Alpha", "feedback": "The central heating matrix experienced automated reset loops.", "priority": "High", "badge": "Core Processing" },
    { "id": "2", "client": "Trishul Cabin Site Beta", "feedback": "Everything functional, excellent power backup logging.", "priority": "Low", "badge": "NLP Engine" }
]

class LogController:
    @staticmethod
    def get_all_logs():
        return { "success": True, "count": len(telemetry_logs), "data": telemetry_logs }

    @staticmethod
    def get_log_by_id(log_id: str):
        log = next((item for item in telemetry_logs if item["id"] == log_id), None)
        if not log:
            raise HTTPException(status_code=404, detail=f"Data log index ref [{log_id}] failed system lookup.")
        return { "success": True, "data": log }

    @staticmethod
    def create_log(payload: LogCreateSchema):
        new_id = str(int(time.time() * 1000))
        new_log = {
            "id": new_id,
            "client": payload.client,
            "feedback": payload.feedback,
            "priority": payload.priority,
            "badge": payload.badge
        }
        telemetry_logs.append(new_log)
        return { "success": True, "data": new_log }

    @staticmethod
    def update_log(log_id: str, payload: LogUpdateSchema):
        log = next((item for item in telemetry_logs if item["id"] == log_id), None)
        if not log:
            raise HTTPException(status_code=404, detail="Update trace targeted reference ID failed.")
        
        update_data = payload.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            log[key] = value
            
        return { "success": True, "data": log }

    @staticmethod
    def delete_log(log_id: str):
        global telemetry_logs
        log = next((item for item in telemetry_logs if item["id"] == log_id), None)
        if not log:
            raise HTTPException(status_code=404, detail="Delete targeting query missing matching parameter records.")
        
        telemetry_logs = [item for item in telemetry_logs if item["id"] != log_id]
        return { "success": True, "message": "Purged record payload successfully.", "data": log }

    @staticmethod
    def search_logs(priority: Optional[str] = None):
        if not priority:
            return { "success": True, "data": telemetry_logs }
        
        filtered_matches = [item for item in telemetry_logs if item["priority"].lower() == priority.lower()]
        return { "success": True, "count": len(filtered_matches), "data": filtered_matches }