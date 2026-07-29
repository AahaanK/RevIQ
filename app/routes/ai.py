import os
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from google.genai import Client
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(
    prefix="/api/ai",
    tags=["AI Features"]
)

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("System Fault: GEMINI_API_KEY missing from environment configuration matrix.")

client = Client(api_key=API_KEY)

class AIRequestPayload(BaseModel):
    prompt: str = Field(..., min_length=3)

class AIResponsePayload(BaseModel):
    success: bool
    output: str

@router.post("/generate", response_model=AIResponsePayload)
def generate_ai_insight(payload: AIRequestPayload):
    try:
        system_instruction = (
            "You are a precise technical copilot built into a secure dashboard application. "
            "Analyze the user's input thoroughly and return clean, well-structured, actionable insights "
            "formatted in clear markdown. Keep your tone professional, direct, and concise."
        )
        
        response = client.models.generate_content(
            model='gemini-3.5-flash',
            contents=payload.prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
                max_output_tokens=800,
            ),
        )
        
        if not response.text:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY, 
                detail="The generative processing engine returned an empty data payload."
            )
            
        return AIResponsePayload(
            success=True,
            output=response.text
        )
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=f"AI Subsystem Exception: {str(e)}"
        )