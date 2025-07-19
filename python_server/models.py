from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class User(BaseModel):
    id: int
    username: str
    password: str

class CreateUser(BaseModel):
    username: str
    password: str

class ContactMessage(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: datetime

class CreateContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None
    errors: Optional[list] = None