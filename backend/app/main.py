import os
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("❌ Error: Missing SUPABASE_URL or SUPABASE_KEY in .env file")

# Establish direct HTTP connection link to your new Supabase project
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)



app = FastAPI(
    title="RevIQ Telemetry API - Fresh Supabase Edition", 
    version="2.5.0",
    swagger_ui_parameters={"syntaxHighlight.theme": "obsidian"},
    swagger_ui_default_parameters={"deepLinking": True}
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LogCreateInput(BaseModel):
    client: str
    feedback: str
    priority: Optional[str] = "Low"
    badge: Optional[str] = "Central Ledger"

class LogUpdateInput(BaseModel):
    client: Optional[str] = None
    feedback: Optional[str] = None
    priority: Optional[str] = None
    badge: Optional[str] = None

# 1. CREATE (POST)
from pydantic import BaseModel

# 1. Define the data format your API expects to receive
class LogCreate(BaseModel):
    client_id: int      # MUST be an integer ID of an existing client (e.g., 1)
    feedback: str
    priority: str = "Low"
    badge: str = "Central Ledger"

# 2. The POST Endpoint
@app.post("/api/v1/logs")
def create_log(log: LogCreate):
    log_data = {
        "client_id": log.client_id,
        "feedback": log.feedback,
        "priority": log.priority,
        "badge": log.badge
    }
    
    # Insert the dictionary into the Supabase table
    response = supabase.table("telemetry_logs").insert(log_data).execute()
    return response.data

# 2. READ ALL (GET)
@app.get("/api/v1/logs")
def get_all_logs():
    try:
        response = supabase.table("telemetry_logs").select("*").order("created_at", desc=True).execute()
        return {"success": True, "count": len(response.data), "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 3. READ BY ID (GET)
@app.get("/api/v1/logs/{log_id}")
def get_log_by_id(log_id: int):
    try:
        response = supabase.table("telemetry_logs").select("*").eq("id", log_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Log not found")
        return {"success": True, "data": response.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 4. UPDATE (PUT)
@app.put("/api/v1/logs/{log_id}")
def update_log(log_id: int, payload: LogUpdateInput):
    try:
        update_data = {k: v for k, v in payload.dict().items() if v is not None}
        response = supabase.table("telemetry_logs").update(update_data).eq("id", log_id).execute()
        return {"success": True, "data": response.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 5. DELETE (DELETE)
@app.delete("/api/v1/logs/{log_id}")
def delete_log(log_id: int):
    try:
        supabase.table("telemetry_logs").delete().eq("id", log_id).execute()
        return {"success": True, "message": f"Log {log_id} successfully deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 6. FILTER SEARCH (GET)
@app.get("/api/v1/logs/search/filter")
def search_logs(priority: str):
    try:
        response = supabase.table("telemetry_logs").select("*").eq("priority", priority).execute()
        return {"success": True, "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))