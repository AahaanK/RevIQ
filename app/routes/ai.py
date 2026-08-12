import os
import json
import logging
from typing import List
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, Field
from google.genai import Client
from google.genai import types
from dotenv import load_dotenv
from supabase import create_client, Client as SupabaseClient
try:
    from backend.app.security import get_current_user
except Exception:
    from app.security import get_current_user

load_dotenv()

logger = logging.getLogger("reviq.ai")

router = APIRouter(
    prefix="/api/ai",
    tags=["AI Features"]
)

def get_gemini_client() -> Client:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="System Fault: GEMINI_API_KEY missing from environment configuration matrix."
        )
    return Client(api_key=api_key)

def get_supabase_client() -> SupabaseClient:
    url = os.getenv("SUPABASE_URL", "")
    key = os.getenv("SUPABASE_KEY", "")
    if not url or not key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="System Fault: SUPABASE_URL or SUPABASE_KEY missing from environment."
        )
    return create_client(url, key)

FLAGGED_SENTIMENT_THRESHOLD = 0.4


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

        response = get_gemini_client().models.generate_content(
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


class ReviewItem(BaseModel):
    id: str
    comment: str


class BatchAnalyzeRequest(BaseModel):
    reviews: List[ReviewItem] = Field(..., min_length=1)


class AnalyzedReview(BaseModel):
    id: str
    sentiment_score: float
    is_flagged: bool
    issue_category: str


class BatchAnalyzeResponse(BaseModel):
    success: bool
    analyzed: List[AnalyzedReview]
    failed_ids: List[str]


def _analyze_single_comment(comment: str) -> dict:
    """
    Calls Gemini once for a single review comment and asks for a strict
    JSON object back: sentiment_score (0-1, where 0 is very negative and
    1 is very positive), is_flagged (bool), and issue_category (short
    label like 'Cleanliness', 'Staff', 'Noise', 'Booking', 'Facilities',
    'Other'). Falls back to a neutral score if parsing fails, rather than
    crashing the whole batch over one bad response.
    """
    system_instruction = (
        "You are a sentiment analysis engine for guest reviews. "
        "Given a single review comment, respond with ONLY a raw JSON object "
        "(no markdown, no code fences, no extra text) in exactly this shape: "
        '{"sentiment_score": <float 0.0-1.0>, "is_flagged": <true|false>, '
        '"issue_category": "<short category label>"}. '
        "sentiment_score of 0.0 means extremely negative, 1.0 means extremely "
        "positive. is_flagged should be true if the review indicates a real "
        "operational problem worth staff attention, regardless of politeness "
        "of tone. issue_category should be one short word or phrase such as "
        "Cleanliness, Staff, Noise, Booking, Facilities, Safety, or General."
    )

    try:
        response = get_gemini_client().models.generate_content(
            model='gemini-3.5-flash',
            contents=comment,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.2,
                max_output_tokens=150,
            ),
        )

        raw = (response.text or "").strip()
        if raw.startswith("```"):
            raw = raw.strip("`")
            if raw.lower().startswith("json"):
                raw = raw[4:].strip()

        parsed = json.loads(raw)

        sentiment_score = float(parsed.get("sentiment_score", 0.5))
        sentiment_score = max(0.0, min(1.0, sentiment_score))

        is_flagged = bool(parsed.get("is_flagged", sentiment_score < FLAGGED_SENTIMENT_THRESHOLD))
        issue_category = str(parsed.get("issue_category", "General")) or "General"

        return {
            "sentiment_score": sentiment_score,
            "is_flagged": is_flagged,
            "issue_category": issue_category,
        }

    except Exception:
        logger.exception("Failed to analyze/parse a single review comment; using neutral fallback")
        return {
            "sentiment_score": 0.5,
            "is_flagged": False,
            "issue_category": "General",
        }


@router.post("/analyze-batch", response_model=BatchAnalyzeResponse)
def analyze_batch(payload: BatchAnalyzeRequest, current_user: dict = Depends(get_current_user)):
    analyzed: List[AnalyzedReview] = []
    failed_ids: List[str] = []

    for item in payload.reviews:
        try:
            result = _analyze_single_comment(item.comment)

            update_response = (
                get_supabase_client().table("reviews")
                .update({
                    "sentiment_score": result["sentiment_score"],
                    "is_flagged": result["is_flagged"],
                })
                .eq("id", item.id)
                .execute()
            )

            if not update_response.data:
                logger.warning("No row updated for review id %s - id may not exist", item.id)
                failed_ids.append(item.id)
                continue

            analyzed.append(AnalyzedReview(
                id=item.id,
                sentiment_score=result["sentiment_score"],
                is_flagged=result["is_flagged"],
                issue_category=result["issue_category"],
            ))

        except Exception:
            logger.excepapption("Failed to analyze/update review id %s", item.id)
            failed_ids.append(item.id)

    return BatchAnalyzeResponse(
        success=len(failed_ids) == 0,
        analyzed=analyzed,
        failed_ids=failed_ids,
    )