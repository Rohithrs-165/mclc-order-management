from fastapi import APIRouter

router = APIRouter(prefix="/material-orders", tags=["Material Orders"])

@router.get("/")
def get_material_orders():
    return []
