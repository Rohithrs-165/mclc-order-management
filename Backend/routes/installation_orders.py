from fastapi import APIRouter

router = APIRouter(prefix="/installation-orders", tags=["Installation Orders"])

@router.get("/")
def get_installation_orders():
    return []
