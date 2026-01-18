from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from database.database import get_db
from models.user import User
from schemas.user import UserCreate, UserLogin, UserResponse
from core.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(prefix="/auth", tags=["Auth"])

from sqlalchemy.exc import IntegrityError
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        # Check if email already exists
        if db.query(User).filter(User.email == user.email).first():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered"
            )

        # Create user
        new_user = User(
            name=user.name.strip(),
            email=user.email.lower(),
            password_hash=hash_password(user.password),
            role=user.role or "user"
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists"
        )

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to register user"
        )
