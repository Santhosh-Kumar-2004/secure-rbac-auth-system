from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database.database import engine
from database.database import Base
from routers.auth import router as auth_router
from routers.admin import router as admin_router
from routers.manager import router as manager_router
from routers.chef import router as chef_router
from routers.waiter import router as waiter_router
from models.refresh_token import RefreshToken


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

app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(manager_router)
app.include_router(chef_router)
app.include_router(waiter_router)