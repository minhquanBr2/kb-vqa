import asyncio
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

class TimeoutMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, timeout: int = 180):
        super().__init__(app)
        self.timeout = timeout

    async def dispatch(self, request, call_next):
        try:
            response = await asyncio.wait_for(call_next(request), timeout=self.timeout)
            return response
        except asyncio.TimeoutError:
            return JSONResponse(
                {"detail": "Request timed out"},
                status_code=504,
            )
