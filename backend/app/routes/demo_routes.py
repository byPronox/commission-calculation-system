from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date
from app.database import get_db
from app.models.seller import Seller
from app.models.sale import Sale

router = APIRouter(prefix="/demo", tags=["Demo"])

@router.post("/seed")
def seed_demo(db: Session = Depends(get_db)):
    if db.query(Seller).count() == 0:
        names = ["Perico P", "Zoila B", "Aquiles C", "Johny M"]
        for n in names:
            db.add(Seller(name=n))
        db.commit()

    sellers = db.query(Seller).all()

    if db.query(Sale).count() == 0:
        data = [
            {"name": "Perico P", "amounts": [320.0, 220.0, 480.0, 300.0]},
            {"name": "Zoila B",  "amounts": [900.0, 120.0, 140.0]},
            {"name": "Aquiles C","amounts": [610.0, 140.0]},
            {"name": "Johny M",  "amounts": [450.0, 100.0]},
        ]
        for d in data:
            seller = next(s for s in sellers if s.name == d["name"])
            for idx, amt in enumerate(d["amounts"]):
                db.add(Sale(amount=amt, date=date.today(), seller_id=seller.id))
        db.commit()

    return {"status": "ok", "message": "Demo data created"}
