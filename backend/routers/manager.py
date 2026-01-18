from fastapi import APIRouter, Depends
from core.dependencies import require_roles
from models.user import User

router = APIRouter(
    prefix="/manager",
    tags=["Manager"]
)

@router.get("/reports")
def manager_reports(
    current_user: User = Depends(require_roles("manager", "admin"))
):
    return {
        "message": "Manager reports access",
        "user": current_user.email
    }
