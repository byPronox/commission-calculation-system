from sqlalchemy.orm import Session
from app.models.sale import Sale
from app.schemas.sale_schema import SaleCreate

def create_sale(db: Session, sale: SaleCreate):
    new_sale = Sale(**sale.dict())
    db.add(new_sale)
    db.commit()
    db.refresh(new_sale)
    return new_sale

def get_sales_between_dates(db: Session, start_date, end_date):
    return db.query(Sale).filter(Sale.date >= start_date, Sale.date <= end_date).all()
