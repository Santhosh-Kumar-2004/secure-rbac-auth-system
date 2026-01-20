from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from database.database import get_db
from models.user import User
from schemas.user import UserCreate, UserLogin, UserResponse
from core.security import (
    hash_password,
    verify_password,
    create_access_token
)

from fastapi import APIRouter, Depends, status
from core.dependencies import get_current_user
from schemas.user import UserResponse
from models.refresh_token import RefreshToken
from core.security import create_refresh_token


router = APIRouter(prefix="/auth", tags=["Auth"])

from sqlalchemy.exc import IntegrityError
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    try:
        if db.query(User).filter(User.email == user.email.lower()).first():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered"
            )
            
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


@router.post("/login", status_code=status.HTTP_200_OK)
def login_user(
    credentials: UserLogin,
    response: Response,
    db: Session = Depends(get_db)
):
    try:
        # Find user
        user = (
            db.query(User)
            .filter(User.email == credentials.email.lower())
            .first()
        )

        # Invalid credentials
        if not user or not verify_password(
            credentials.password,
            user.password_hash
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        # Inactive account
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is disabled"
            )

        # Enforce single session (delete old refresh token)
        existing_token = (
            db.query(RefreshToken)
            .filter(RefreshToken.user_id == user.id)
            .first()
        )

        if existing_token:
            db.delete(existing_token)
            db.commit()

        # Create refresh token
        refresh_token_value, refresh_expires_at = create_refresh_token()

        refresh_token = RefreshToken(
            user_id=user.id,
            token=refresh_token_value,
            expires_at=refresh_expires_at
        )

        db.add(refresh_token)
        db.commit()

        # Create access token
        access_token = create_access_token(
            data={"sub": str(user.id)}
        )

        # Set access token cookie
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,      # True in production (HTTPS)
            samesite="lax",
            max_age=60 * 30    # 30 minutes
        )

        # Set refresh token cookie
        response.set_cookie(
            key="refresh_token",
            value=refresh_token_value,
            httponly=True,
            secure=False,      # True in production (HTTPS)
            samesite="lax"
        )

        return {
            "message": "Login successful",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            }
        }

    except HTTPException:
        raise

    except SQLAlchemyError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error during login"
        )

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )

        
@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out"}


@router.get(
    "/me",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    summary="Get current authenticated user",
)
async def get_me(
    current_user: UserResponse = Depends(get_current_user),
) -> UserResponse:
    return current_user
