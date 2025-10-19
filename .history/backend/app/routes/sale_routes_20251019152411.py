from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import date
from app.database import get_db
from app.schemas.sale_schema import SaleCreate, SaleOut
from app.controllers.sale_controller import create_sale, list_sales_between

router = APIRouter(prefix="/sales", tags=["Sales"])

@router.post("/", response_model=SaleOut)
def post_sale(payload: SaleCreate, db: Session = Depends(get_db)):
    return create_sale(db, payload)

@router.get("/", response_model=List[SaleOut])
def get_sales(
    start_date: date = Query(...),
    end_date: date = Query(...),
    db: Session = Depends(get_db),
):
    return list_sales_between(db, start_date, end_date)
