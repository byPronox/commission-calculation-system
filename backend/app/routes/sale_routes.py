from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Union
from datetime import date
from app.database import get_db
from app.schemas.sale_schema import SaleCreate, SaleOut
from app.controllers.sale_controller import create_sale, list_sales_between

router = APIRouter(prefix="/sales", tags=["Sales"])

@router.post("/", response_model=SaleOut)
def post_sale(payload: SaleCreate, db: Session = Depends(get_db)):
    return create_sale(db, payload)

@router.post("/batch", response_model=List[SaleOut])
def post_sales_batch(payload: List[SaleCreate], db: Session = Depends(get_db)):
    created = []
    for item in payload:
        created.append(create_sale(db, item))
    return created

@router.get("/", response_model=List[SaleOut])
def get_sales(
    start_date: date = Query(...),
    end_date: date = Query(...),
    db: Session = Depends(get_db),
):
    return list_sales_between(db, start_date, end_date)
