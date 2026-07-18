from fastapi import Request
from fastapi.responses import JSONResponse
import os

async def global_exception_handler(request: Request, exc: Exception):
    status_code = 500
    if hasattr(exc, "status_code"):
        status_code = exc.status_code
        
    response_payload = {
        "success": False,
        "message": getattr(exc, "detail", str(exc)) or "Internal System Error Matrix Exception"
    }
    
    if os.getenv("NODE_ENV") != "production":
        response_payload["detail"] = repr(exc)
        
    return JSONResponse(
        status_code=status_code,
        content=response_payload
    )