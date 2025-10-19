from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class Seller(Base):
    __tablename__ = "sellers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    # relationship with Sale (declared on Sale)
    sales = relationship("Sale", back_populates="seller", cascade="all, delete")
