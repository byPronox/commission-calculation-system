from pydantic import BaseModel, Field, ConfigDict
from datetime import date

class SaleCreate(BaseModel):
    amount: float = Field(gt=0)
    date: date
    seller_id: int

class SaleOut(SaleCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)
