from fastapi import APIRouter, Depends
from core.dependencies import require_roles
from models.user import User

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

@router.get("/dashboard")
def admin_dashboard(
    current_user: User = Depends(require_roles("admin"))
):
    return {
        "message": "Welcome Admin",
        "user": current_user.email
    }
