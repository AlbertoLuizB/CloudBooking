from logging import getLogger

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_auth import router as auth_router
from app.api.routes_bookings import router as bookings_router
from app.api.routes_health import router as health_router
from app.api.routes_services import router as services_router
from app.api.routes_users import router as users_router
from app.config import get_settings
from app.core.logging_config import configure_logging

configure_logging()
settings = get_settings()
logger = getLogger("app")

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info("request start: %s %s", request.method, request.url.path)
    response = await call_next(request)
    logger.info(
        "request end: %s %s %s",
        request.method,
        request.url.path,
        response.status_code,
    )
    return response


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.exception("unhandled error")
    return JSONResponse(
        status_code=500,
        content={"detail": "Erro interno no servidor"},
    )


app.include_router(health_router)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(services_router)
app.include_router(bookings_router)

