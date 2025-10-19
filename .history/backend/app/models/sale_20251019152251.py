from sqlalchemy import Column, Integer, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.database import Base

class Sale(Base):
    __tablename__ = "sales"
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    date = Column(Date, nullable=False)

    seller_id = Column(Integer, ForeignKey("sellers.id"), nullable=False)
    seller = relationship("Seller", back_populates="sales")
