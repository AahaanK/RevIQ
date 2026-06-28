import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.routes.log_routes import router as log_router
from app.middleware.error_handler import global_exception_handler

# Read configuration files early
load_dotenv()

app = FastAPI(
    title="RevIQ Telemetry API",
    description="Python FastAPI engine for Trishul Staff Portal backend services",
    version="1.0.0"
)

# Connect global custom exception interceptor structures
app.add_exception_handler(Exception, global_exception_handler)

# Setup CORS middleware so your frontend can communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount log router mapping modules
app.include_router(log_router, prefix="/api/v1/logs", tags=["Telemetry Logs"])

@app.get("/")
def root_check():
    return {"status": "Online", "engine": "FastAPI Python Stack Engine Core Active"}