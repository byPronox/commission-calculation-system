from pydantic import BaseModel, ConfigDict

class SellerBase(BaseModel):
    name: str

class SellerCreate(SellerBase):
    pass

class SellerOut(SellerBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
