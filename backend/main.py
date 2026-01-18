from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

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

