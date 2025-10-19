from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.seller_schema import SellerOut, SellerCreate
from app.controllers.seller_controller import create_seller, list_sellers

router = APIRouter(prefix="/sellers", tags=["Sellers"])

@router.get("/", response_model=List[SellerOut])
def get_sellers(db: Session = Depends(get_db)):
    return list_sellers(db)

@router.post("/", response_model=SellerOut)
def post_seller(payload: SellerCreate, db: Session = Depends(get_db)):
    return create_seller(db, payload)

from typing import List, Union

@router.post("/", response_model=Union[SellerOut, List[SellerOut]])
def post_seller(payload: Union[SellerCreate, List[SellerCreate]], db: Session = Depends(get_db)):
    if isinstance(payload, list):
        result = []
        for p in payload:
            result.append(create_seller(db, p))
        return result
    return create_seller(db, payload)
