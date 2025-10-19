import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.database import Base, engine
from app.models import seller as _seller
from app.models import sale as _sale
from app.routes.seller_routes import router as seller_router
from app.routes.sale_routes import router as sale_router
from app.routes.commission_routes import router as commission_router
from app.routes.demo_routes import router as demo_router

# Load environment variables
load_dotenv()

app = FastAPI(title="Commission Calculation System API")

# Read allowed origins from environment
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

# Database tables
Base.metadata.create_all(bind=engine)

# Enable CORS dynamically
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

# Routers
app.include_router(seller_router)
app.include_router(sale_router)
app.include_router(commission_router)
app.include_router(demo_router)
