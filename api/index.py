import sys
from pathlib import Path

# Ensure root directory is on Python path for Vercel serverless environment
root_dir = Path(__file__).resolve().parent.parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

try:
    from app.main import app
except Exception:
    from backend.app.main import app

# Vercel WSGI / ASGI entry point
app = app
