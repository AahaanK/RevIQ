import os
from typing import Optional
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from dotenv import load_dotenv
from supabase import create_client, Client
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
try:
    from backend.app.routes import ai, auth
    from backend.app.security import get_current_user
except Exception:
    from app.routes import ai, auth
    from app.security import get_current_user

limiter = Limiter(key_func=get_remote_address)

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

def get_supabase_client() -> Client:
    url = os.getenv("SUPABASE_URL") or SUPABASE_URL
    key = os.getenv("SUPABASE_KEY") or SUPABASE_KEY
    if not url or not key:
        raise HTTPException(status_code=500, detail="Error: Missing SUPABASE_URL or SUPABASE_KEY in environment variables")
    return create_client(url, key)

if SUPABASE_URL and SUPABASE_KEY:
    supabase: Optional[Client] = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    supabase = None

def _db() -> Client:
    global supabase
    if supabase is None:
        supabase = get_supabase_client()
    return supabase

app = FastAPI(
    title="RevIQ Telemetry API - Fresh Supabase Edition", 
    version="2.5.0",
    swagger_ui_parameters={"syntaxHighlight.theme": "obsidian"},
    swagger_ui_default_parameters={"deepLinking": True}
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserAuthSchema(BaseModel):
    email: EmailStr 
    password: str = Field(..., min_length=6, description="Password must be at least 6 characters long")

class LogCreate(BaseModel):
    client_id: int = 1  
    feedback: str
    priority: str = "Low"
    badge: str = "Central Ledger"

class LogUpdateInput(BaseModel):
    client_id: Optional[int] = None
    feedback: Optional[str] = None
    priority: Optional[str] = None
    badge: Optional[str] = None

# Public log ingestion endpoint (No Auth dependency required)
@app.post("/api/v1/logs", status_code=status.HTTP_201_CREATED)
def create_log(log: LogCreate):
    log_data = {
        "client_id": log.client_id,
        "feedback": log.feedback,
        "priority": log.priority,
        "badge": log.badge
    }
    try:
        response = _db().table("telemetry_logs").insert(log_data).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        return response.data
    except Exception as e:
        raise HTTPException(
            status_code=400, 
            detail=f"Database insertion failed. Verify client_id exists. Error: {str(e)}"
        )

@app.get("/api/v1/logs")
def get_all_logs():  
    try:
        response = _db().table("telemetry_logs").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/logs/search/filter")
def search_logs(priority: str, current_user: dict = Depends(get_current_user)):
    try:
        response = _db().table("telemetry_logs").select("*").eq("priority", priority).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/logs/{log_id}")
def get_log_by_id(log_id: int, current_user: dict = Depends(get_current_user)):
    try:
        response = _db().table("telemetry_logs").select("*").eq("id", log_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail=f"Log with ID {log_id} not found.")
        return response.data[0]
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/v1/logs/{log_id}")
def update_log(log_id: int, payload: LogUpdateInput, current_user: dict = Depends(get_current_user)):
    try:
        update_data = {k: v for k, v in payload.dict().items() if v is not None}
        if not update_data:
            raise HTTPException(status_code=400, detail="No valid tracking updates provided in payload body.")
        
        response = _db().table("telemetry_logs").update(update_data).eq("id", log_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail=f"Log with ID {log_id} does not exist.")
        return response.data[0]
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/v1/logs/{log_id}")
def delete_log(log_id: int, current_user: dict = Depends(get_current_user)):
    try:
        check = _db().table("telemetry_logs").select("id").eq("id", log_id).execute()
        if not check.data:
            raise HTTPException(status_code=404, detail=f"Log with ID {log_id} not found.")
            
        _db().table("telemetry_logs").delete().eq("id", log_id).execute()
        return {"success": True, "message": f"Log item {log_id} successfully dropped from master tables."}
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

try:
    from backend.app.routes import analytics
except Exception:
    from app.routes import analytics

app.include_router(auth.router)
app.include_router(ai.router)
app.include_router(analytics.router)