from sqlalchemy.orm import Session
from app.models.seller import Seller
from app.schemas.seller_schema import SellerCreate

def create_seller(db: Session, payload: SellerCreate):
    s = Seller(name=payload.name)
    db.add(s)
    db.commit()
    db.refresh(s)
    return s

def list_sellers(db: Session):
    return db.query(Seller).order_by(Seller.name.asc()).all()
