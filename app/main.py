import os
from typing import Optional
from fastapi import FastAPI, HTTPException, status, Depends  # Added Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from dotenv import load_dotenv
from supabase import create_client, Client

# --- Week 6 Security Dependencies Additions ---
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.security import get_current_user  # Import our JWT Security Guard

# 1. Initialize Rate Limiter Config FIRST
limiter = Limiter(key_func=get_remote_address)

# 2. Environmental Initialization Variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("❌ Error: Missing SUPABASE_URL or SUPABASE_KEY in .env file")

# 3. Instantiate Supabase Client 
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# 4. Configure FastAPI Application Core Frame
app = FastAPI(
    title="RevIQ Telemetry API - Fresh Supabase Edition", 
    version="2.5.0",
    swagger_ui_parameters={"syntaxHighlight.theme": "obsidian"},
    swagger_ui_default_parameters={"deepLinking": True}
)

# Bind slowapi validation handlers directly into app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# 5. Cross-Origin Resource Sharing (CORS) Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Explicitly allow your React Dev Server
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],  # Allows all headers
)

# --- Shared Pydantic Validation Schemas ---
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


# --- Core Operational Endpoint Telemetry Routes ---

# 🔴 PROTECTED: Ingest New Log
@app.post("/api/v1/logs", status_code=status.HTTP_201_CREATED)
def create_log(log: LogCreate, current_user: dict = Depends(get_current_user)):
    log_data = {
        "client_id": log.client_id,
        "feedback": log.feedback,
        "priority": log.priority,
        "badge": log.badge
    }
    try:
        response = supabase.table("telemetry_logs").insert(log_data).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        return response.data
    except Exception as e:
        raise HTTPException(
            status_code=400, 
            detail=f"Database insertion failed. Verify client_id exists. Error: {str(e)}"
        )

# 🟢 UNPROTECTED (Public Read): Get all logs so dashboard can still mount
@app.get("/api/v1/logs")
def get_all_logs():
    try:
        response = supabase.table("telemetry_logs").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/logs/search/filter")
def search_logs(priority: str):
    try:
        response = supabase.table("telemetry_logs").select("*").eq("priority", priority).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/logs/{log_id}")
def get_log_by_id(log_id: int):
    try:
        response = supabase.table("telemetry_logs").select("*").eq("id", log_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail=f"Log with ID {log_id} not found.")
        return response.data[0]
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/v1/logs/{log_id}")
def update_log(log_id: int, payload: LogUpdateInput):
    try:
        update_data = {k: v for k, v in payload.dict().items() if v is not None}
        if not update_data:
            raise HTTPException(status_code=400, detail="No valid tracking updates provided in payload body.")
        
        response = supabase.table("telemetry_logs").update(update_data).eq("id", log_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail=f"Log with ID {log_id} does not exist.")
        return response.data[0]
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 🔴 PROTECTED: Delete Purge Log
@app.delete("/api/v1/logs/{log_id}")
def delete_log(log_id: int, current_user: dict = Depends(get_current_user)):
    try:
        check = supabase.table("telemetry_logs").select("id").eq("id", log_id).execute()
        if not check.data:
            raise HTTPException(status_code=404, detail=f"Log with ID {log_id} not found.")
            
        supabase.table("telemetry_logs").delete().eq("id", log_id).execute()
        return {"success": True, "message": f"Log item {log_id} successfully dropped from master tables."}
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# --- Mount Router Deliverables at the VERY BOTTOM to avoid circular reference loops ---
from app.routes import auth
app.include_router(auth.router)