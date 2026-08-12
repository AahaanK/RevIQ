import os
import logging
from urllib.parse import urlencode
from fastapi import APIRouter, HTTPException, status, Request
from pydantic import BaseModel, EmailStr, Field
try:
    from backend.app.security import hash_password, verify_password, create_access_token
except Exception:
    from app.security import hash_password, verify_password, create_access_token

from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("reviq.auth")

def get_supabase_client() -> Client:
    url = os.getenv("SUPABASE_URL", "")
    key = os.getenv("SUPABASE_KEY", "")
    if not url or not key:
        raise HTTPException(status_code=500, detail="Error: Missing SUPABASE_URL or SUPABASE_KEY in environment variables")
    return create_client(url, key)

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

try:
    from backend.app.main import limiter
except Exception:
    from app.main import limiter

class UserAuthInput(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6, description="Password must be at least 6 characters long")

class ExchangeCodeInput(BaseModel):
    code: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(payload: UserAuthInput):
    try:
        existing_user = get_supabase_client().table("users").select("email").eq("email", payload.email).execute()
        if existing_user.data:
            raise HTTPException(status_code=400, detail="An account with this email already exists.")
        
        hashed_pwd = hash_password(payload.password)
        user_data = {"email": payload.email, "hashed_password": hashed_pwd}
        get_supabase_client().table("users").insert(user_data).execute()
        
        return {"success": True, "message": "User registered successfully!"}
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Registration Internal Crash: {str(e)}")

@router.post("/login")
@limiter.limit("5/minute")
def login_user(request: Request, payload: UserAuthInput):
    try:
        db_user = get_supabase_client().table("users").select("*").eq("email", payload.email).execute()
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
def get_github_oauth_url(request: Request):
    try:
        origin = request.headers.get("origin") or os.getenv("FRONTEND_URL", "http://localhost:5173")
        redirect_to = f"{origin}/auth/callback"
        supabase_url = os.getenv("SUPABASE_URL", "")
        params = {
            "provider": "github",
            "redirect_to": redirect_to,
        }
        url = f"{supabase_url}/auth/v1/authorize?{urlencode(params)}"
        return {"url": url}
    except Exception as e:
        logger.exception("OAuth URL generation failed")
        raise HTTPException(status_code=400, detail=f"OAuth Generation Fault: {str(e)}")

@router.post("/exchange")
def exchange_oauth_code(payload: ExchangeCodeInput):
    try:
        res = get_supabase_client().auth.exchange_code_for_session({"auth_code": payload.code})
        logger.info("Supabase exchange_code_for_session response: %s", res)

        session = getattr(res, "session", None)
        user = getattr(res, "user", None)

        if session and getattr(session, "access_token", None):
            user_email = getattr(user, "email", None) or "github_user@supabase.io"
            user_id = getattr(user, "id", None) or "github_oauth"

            token = create_access_token(data={"sub": user_email, "user_id": user_id})
            return {"success": True, "access_token": token, "token_type": "bearer"}

        logger.error("Supabase returned no valid session for code exchange: %s", res)
        raise HTTPException(
            status_code=400,
            detail=(
                "Invalid session exchange from provider. This usually means the "
                "GitHub Client Secret configured in Supabase is wrong, or the "
                "redirect URL isn't allow-listed in Supabase Auth settings."
            ),
        )
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        logger.exception("OAuth code exchange crashed")
        raise HTTPException(status_code=400, detail=f"OAuth exchange failed: {str(e)}")