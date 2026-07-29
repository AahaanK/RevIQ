import os
import bcrypt
from datetime import datetime, timedelta, timezone
from typing import Optional
from jwt import encode, decode, InvalidTokenError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

# 1. Base Setup Configurations
JWT_SECRET = os.getenv("JWT_SECRET", "super-fallback-secret-key-change-me")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# OAuth2 scheme targets the login endpoint to read token headers automatically
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

# 2. Existing Auth Hashing Primitives (Keep These!)
def hash_password(password: str) -> str:
    """Hashes a plain text password using native bcrypt securely."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain text password against a native bcrypt hash string."""
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except Exception:
        return False

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Generates a secure JWT string payload configuration frame."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

# 3. New Token Verification Dependency Layer (Add This to the Bottom!)
def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """
    Decodes the incoming JWT token. 
    If invalid or expired, automatically throws a 401 Unauthorized exception.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials. Access token missing or invalid.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email: str = payload.get("sub")
        user_id: str = payload.get("user_id")
        
        if email is None or user_id is None:
            raise credentials_exception
            
        return {"email": email, "user_id": user_id}
    except InvalidTokenError:
        raise credentials_exception