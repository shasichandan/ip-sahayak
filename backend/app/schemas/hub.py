from datetime import date

from pydantic import BaseModel, Field


class AppointmentCreate(BaseModel):
    doctorName: str = Field(min_length=1, max_length=255)
    date: date
    time: str = Field(min_length=1, max_length=20)
    type: str = Field(default="video", max_length=50)
    reason: str | None = Field(default=None, max_length=2000)


class OrderItemIn(BaseModel):
    productId: int
    quantity: int = Field(ge=1, le=99)
    prescribedDose: str | None = Field(default=None, max_length=200)


class OrderCreate(BaseModel):
    pharmacyName: str = Field(min_length=1, max_length=255)
    items: list[OrderItemIn] = Field(min_length=1, max_length=50)


class HealthRecordCreate(BaseModel):
    recordType: str = Field(default="general", max_length=50)
    title: str = Field(min_length=1, max_length=500)
    notes: str | None = Field(default=None, max_length=8000)
    data: dict | None = None
    recordDate: date | None = None
