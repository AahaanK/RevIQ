import os
from fastapi import APIRouter, HTTPException, status, Request
from pydantic import BaseModel, EmailStr, Field
from app.security import hash_password, verify_password, create_access_token
from app.main import limiter 
from supabase import create_client, Client

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

# Initialize independent client context wrapper inside router frame to bypass circular reference loops
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class UserAuthInput(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6, description="Password must be at least 6 characters long")

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(payload: UserAuthInput):
    try:
        existing_user = supabase.table("users").select("email").eq("email", payload.email).execute()
        if existing_user.data:
            raise HTTPException(status_code=400, detail="An account with this email already exists.")
        
        hashed_pwd = hash_password(payload.password)
        user_data = {"email": payload.email, "hashed_password": hashed_pwd}
        supabase.table("users").insert(user_data).execute()
        
        return {"success": True, "message": "User registered successfully!"}
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Registration Internal Crash: {str(e)}")

@router.post("/login")
@limiter.limit("5/minute")
def login_user(request: Request, payload: UserAuthInput):
    try:
        db_user = supabase.table("users").select("*").eq("email", payload.email).execute()
        if not db_user.data:
            raise HTTPException(status_code=400, detail="Invalid Email or Password.")
        
        user_record = db_user.data[0]
        if not verify_password(payload.password, user_record["hashed_password"]):
            raise HTTPException(status_code=400, detail="Invalid Email or Password.")
        
        token = create_access_token(data={"sub": user_record["email"], "user_id": user_record["id"]})
        return {"success": True, "access_token": token, "token_type": "bearer"}
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Login Internal Crash: {str(e)}")

# 🌐 NEW DELIVERABLE NODE: Expose Supabase GitHub OAuth Provider URI Generation Gate
@router.get("/oauth/github")
def get_github_oauth_url():
    """
    Requests a secure server-side third-party callback handshake configuration link 
    from Supabase targeting GitHub servers.
    """
    try:
        # Redirect link maps directly back into our React dashboard router interface frame
        res = supabase.auth.get_oauth_nav_url(
            provider="github", 
            redirect_to="http://localhost:5173/dashboard"
        )
        return {"url": res.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"OAuth Generation Fault: {str(e)}")