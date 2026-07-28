from fastapi import APIRouter

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
def get_dashboard_summary():
    return {"message": "Dashboard summary endpoint"}
