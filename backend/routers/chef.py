from fastapi import APIRouter, Depends
from core.dependencies import require_roles
from models.user import User

router = APIRouter(
    prefix="/chef",
    tags=["Chef"]
)

@router.get("/orders")
def chef_orders(
    current_user: User = Depends(require_roles("chef", "admin"))
):
    return {
        "message": "Chef orders view",
        "user": current_user.email
    }
