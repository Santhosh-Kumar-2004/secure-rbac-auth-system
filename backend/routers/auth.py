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
        # Check if a user with the same email already exists
        if db.query(User).filter(User.email == user.email.lower()).first():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered"
            )

        # Create a new user object with hashed password
        new_user = User(
            name=user.name.strip(),
            email=user.email.lower(),
            password_hash=hash_password(user.password),
            role=user.role or "user"
        )

        # Save the new user to the database
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Return the created user (response_model hides sensitive fields)
        return new_user

    except IntegrityError:
        # Roll back transaction if DB uniqueness constraint fails
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists"
        )

    except Exception:
        # Roll back and handle unexpected server errors
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
        # Fetch user by email (normalized)
        user = (
            db.query(User)
            .filter(User.email == credentials.email.lower())
            .first()
        )

        # Validate user existence and password
        if not user or not verify_password(
            credentials.password,
            user.password_hash
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        # Check if the account is active
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is disabled"
            )

        # Generate JWT access token
        access_token = create_access_token(
            data={"sub": str(user.id)}
        )

        # Store JWT securely in HTTP-only cookie
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,          # Set True in production (HTTPS)
            samesite="lax",
            max_age=60 * 30        # Token expires in 30 minutes
        )

        # Return success message and user info
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
        # Re-raise handled HTTP errors
        raise

    except SQLAlchemyError:
        # Handle database-related errors safely
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error during login"
        )

    except Exception:
        # Catch unexpected server errors
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )


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
