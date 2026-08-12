import os
import logging
from collections import defaultdict
from fastapi import APIRouter, HTTPException, Depends
from supabase import create_client, Client
from dotenv import load_dotenv
try:
    from backend.app.security import get_current_user
except Exception:
    from app.security import get_current_user

load_dotenv()

logger = logging.getLogger("reviq.analytics")

def get_supabase_client() -> Client:
    url = os.getenv("SUPABASE_URL", "")
    key = os.getenv("SUPABASE_KEY", "")
    if not url or not key:
        raise HTTPException(status_code=500, detail="Error: Missing SUPABASE_URL or SUPABASE_KEY in environment variables")
    return create_client(url, key)

router = APIRouter(
    prefix="/api/analytics",
    tags=["Analytics"]
)

FLAGGED_RATING_THRESHOLD = 3
FLAGGED_SENTIMENT_THRESHOLD = 0.4


@router.get("/review-matrix")
def get_review_matrix(current_user: dict = Depends(get_current_user)):
    try:
        response = get_supabase_client().table("reviews").select("*").order("created_at", desc=True).execute()
        reviews = response.data or []

        total_reviews = len(reviews)

        if total_reviews == 0:
            return {
                "summary": {
                    "total_reviews": 0,
                    "average_rating": 0,
                    "dissatisfaction_rate": 0,
                    "flagged_count": 0,
                },
                "flagged_reviews": [],
                "category_breakdown": [],
            }

        total_rating = sum(r.get("rating", 0) for r in reviews)
        average_rating = round(total_rating / total_reviews, 2)

        def is_flagged(r):
            if r.get("is_flagged"):
                return True
            rating = r.get("rating", 5)
            sentiment = r.get("sentiment_score", 1.0)
            return rating <= FLAGGED_RATING_THRESHOLD or sentiment < FLAGGED_SENTIMENT_THRESHOLD

        flagged_reviews = [r for r in reviews if is_flagged(r)]
        flagged_count = len(flagged_reviews)
        dissatisfaction_rate = round((flagged_count / total_reviews) * 100, 1)

        category_stats = defaultdict(lambda: {"count": 0, "rating_sum": 0, "flagged_count": 0})
        for r in reviews:
            cat = r.get("category") or "Uncategorized"
            category_stats[cat]["count"] += 1
            category_stats[cat]["rating_sum"] += r.get("rating", 0)
            if is_flagged(r):
                category_stats[cat]["flagged_count"] += 1

        category_breakdown = [
            {
                "category": cat,
                "count": stats["count"],
                "average_rating": round(stats["rating_sum"] / stats["count"], 2) if stats["count"] else 0,
                "flagged_count": stats["flagged_count"],
            }
            for cat, stats in category_stats.items()
        ]
        category_breakdown.sort(key=lambda c: c["flagged_count"], reverse=True)

        return {
            "summary": {
                "total_reviews": total_reviews,
                "average_rating": average_rating,
                "dissatisfaction_rate": dissatisfaction_rate,
                "flagged_count": flagged_count,
            },
            "flagged_reviews": flagged_reviews,
            "category_breakdown": category_breakdown,
        }

    except Exception as e:
        logger.exception("Failed to build review matrix")
        raise HTTPException(status_code=500, detail=f"Review Matrix computation failed: {str(e)}")