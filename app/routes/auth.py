import os
from fastapi import APIRouter, HTTPException, status, Request
from pydantic import BaseModel, EmailStr, Field
from app.security import hash_password, verify_password, create_access_token
from supabase import create_client, Client
from dotenv import load_dotenv

# Force load environment files before instantiating the client frame
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

# Defer import to prevent circular compilation lock with main.py during hot reloads
from app.main import limiter 

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

@router.get("/oauth/github")
def get_github_oauth_url():
    """
    Requests a secure server-side third-party callback handshake configuration link 
    from Supabase targeting GitHub servers.
    """
    try:
        # Configuration object single-dictionary execution block
        res = supabase.auth.sign_in_with_oauth({
            "provider": "github",
            "options": {
                "redirect_to": "http://localhost:5173/dashboard"
            }
        })
        
        # Parse across all response structures matching modern python-supabase versions
        if hasattr(res, "url") and res.url:
            return {"url": res.url}
        if isinstance(res, dict) and "url" in res:
            return {"url": res["url"]}
        if hasattr(res, "data") and hasattr(res.data, "url") and res.data.url:
            return {"url": res.data.url}
            
        raise HTTPException(status_code=400, detail="Supabase response did not contain an auth URL.")
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"OAuth Generation Fault: {str(e)}")