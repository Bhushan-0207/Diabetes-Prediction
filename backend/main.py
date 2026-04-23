from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import Auth, prediction

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(Auth.router)
app.include_router(prediction.router)