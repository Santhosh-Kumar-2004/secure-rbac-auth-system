#Defines reusable dependencies (e.g., current user, DB session).
from fastapi import Depends, HTTPException, Request, status
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from database.database import get_db
from models.user import User
from core.security import SECRET_KEY, ALGORITHM
