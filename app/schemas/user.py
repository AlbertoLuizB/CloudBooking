from typing import Literal, Optional

from pydantic import BaseModel, EmailStr, Field


Role = Literal["user", "admin"]


class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(min_length=8)


class UserInDB(UserBase):
    id: str
    role: Role = "user"
    password_hash: str


class UserPublic(UserBase):
    id: str
    role: Role = "user"


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    password: Optional[str] = Field(None, min_length=8)

