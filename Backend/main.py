import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import engine, Base
import models
from routes import auth, dashboard, customers, material_orders, installation_orders

Base.metadata.create_all(bind=engine)

app = FastAPI(title="MCLC Order Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers must be included before static file fallback
app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(customers.router)
app.include_router(material_orders.router)
app.include_router(installation_orders.router)

# Mount frontend web app at root
frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "Frontend"))
if os.path.exists(frontend_dir):
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")
