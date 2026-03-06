from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field


StatusEnum = Literal["pending", "confirmed", "cancelled"]


class BookingBase(BaseModel):
    service_id: str
    start_time: datetime
    end_time: datetime


class BookingCreate(BookingBase):
    pass


class BookingInDB(BookingBase):
    id: str
    user_id: str
    status: StatusEnum = "confirmed"
    created_at: datetime


class BookingPublic(BookingInDB):
    pass
