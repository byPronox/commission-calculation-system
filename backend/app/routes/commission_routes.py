from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from datetime import date
from app.database import get_db
from app.controllers.commission_controller import calculate_commissions

router = APIRouter(prefix="/commissions", tags=["Commissions"])

@router.get("/")
def get_commissions(
    start_date: date = Query(...),
    end_date: date = Query(...),
    db: Session = Depends(get_db),
):
    return calculate_commissions(db, start_date, end_date)
