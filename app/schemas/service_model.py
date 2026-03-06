from typing import Optional

from pydantic import BaseModel, Field


class ServiceBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    description: Optional[str] = None
    capacity: Optional[int] = Field(None, gt=0)
    is_active: bool = True


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    description: Optional[str] = None
    capacity: Optional[int] = Field(None, gt=0)
    is_active: Optional[bool] = None


class ServiceInDB(ServiceBase):
    id: str


class ServicePublic(ServiceInDB):
    pass
