from sqlalchemy.orm import Session
from app.models.sale import Sale
from app.schemas.sale_schema import SaleCreate
from datetime import date

def create_sale(db: Session, payload: SaleCreate):
    sale = Sale(**payload.dict())
    db.add(sale)
    db.commit()
    db.refresh(sale)
    return sale

def list_sales_between(db: Session, start_date: date, end_date: date):
    return (
        db.query(Sale)
        .filter(Sale.date >= start_date, Sale.date <= end_date)
        .all()
    )
