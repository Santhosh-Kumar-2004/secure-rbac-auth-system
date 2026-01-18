from fastapi import APIRouter, Depends
from core.dependencies import require_roles
from models.user import User

router = APIRouter(
    prefix="/waiter",
    tags=["Waiter"]
)

@router.get("/orders")
def waiter_orders(
    current_user: User = Depends(require_roles("waiter", "admin"))
):
    return {
        "message": "Waiter orders access",
        "user": current_user.email
    }
