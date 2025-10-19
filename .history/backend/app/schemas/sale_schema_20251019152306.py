from pydantic import BaseModel, Field
from datetime import date

class SaleCreate(BaseModel):
    amount: float = Field(gt=0)
    date: date
    seller_id: int

class SaleOut(SaleCreate):
    id: int
    class Config:
        orm_mode = True
