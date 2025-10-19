from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.sale_controller import create_sale, get_sales_between_dates
from app.schemas.sale_schema import SaleCreate
from app.database import get_db

router = APIRouter(prefix="/sales", tags=["Sales"])

@router.post("/")
def add_sale(sale: SaleCreate, db: Session = Depends(get_db)):
    return create_sale(db, sale)

@router.get("/")
def read_sales(start_date: str, end_date: str, db: Session = Depends(get_db)):
    return get_sales_between_dates(db, start_date, end_date)
