from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# get the name of the current conda environment
import os
import sys
sys.path.append(os.path.join(os.environ['CONDA_PREFIX'], 'lib', 'site-packages'))
from routers import vqa
from middleware.timeout import TimeoutMiddleware

app = FastAPI(
    name="Knowledge-based VQA", 
    docs_url="/docs", 
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add timeout middleware with 3 minutes timeout
app.add_middleware(TimeoutMiddleware, timeout=180)

# Include the VQA router
app.include_router(vqa.router)