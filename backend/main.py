from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database.database import engine
from models.user import User
from database.database import Base
from routers.auth import router as auth_router

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Secured RBAC & Auth System",
    description="A Simple, Strong and Secure RBAC and Authentication system.",
    version="1.0.0",   
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def root_router():
    return "The app is Running! 🚀"

@app.get("/health")
def health_check():
    return {"status": "ok"}

