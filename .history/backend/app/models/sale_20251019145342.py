from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.database import Base

class Sale(Base):
    __tablename__ = "sales"
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    date = Column(Date)
    seller_id = Column(Integer, ForeignKey("sellers.id"))
    seller = relationship("Seller", back_populates="sales")