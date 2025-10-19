from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from app.models.sale import Sale
from app.models.seller import Seller

# Commission rules: highest threshold that is <= total -> apply rate
# Example: >= 1000 => 15%, >= 800 => 10%, >= 600 => 8%, >= 500 => 6%
COMMISSION_RULES = [
    {"min": 1000.0, "rate": 0.15},
    {"min": 800.0,  "rate": 0.10},
    {"min": 600.0,  "rate": 0.08},
    {"min": 500.0,  "rate": 0.06},
]

def _rate_for_total(total_amount: float):
    for rule in COMMISSION_RULES:
        if total_amount >= rule["min"]:
            return rule["rate"]
    return 0.0

def calculate_commissions(db: Session, start_date: date, end_date: date):
    # totals per seller
    rows = (
        db.query(
            Seller.id.label("seller_id"),
            Seller.name.label("seller_name"),
            func.count(Sale.id).label("sales_count"),
            func.coalesce(func.sum(Sale.amount), 0.0).label("total_amount"),
        )
        .join(Sale, Sale.seller_id == Seller.id, isouter=True)
        .filter((Sale.date >= start_date) & (Sale.date <= end_date))
        .group_by(Seller.id)
        .all()
    )

    per_seller = []
    total_sales = 0
    total_amount = 0.0
    total_commission = 0.0

    for r in rows:
        total_sales += int(r.sales_count or 0)
        total_amount += float(r.total_amount or 0.0)
        rate = _rate_for_total(float(r.total_amount or 0.0))
        commission = float(r.total_amount or 0.0) * rate
        total_commission += commission

        per_seller.append({
            "seller_id": r.seller_id,
            "seller_name": r.seller_name,
            "sales_count": int(r.sales_count or 0),
            "total_sales_amount": float(r.total_amount or 0.0),
            "applied_rate": rate,
            "commission_amount": commission
        })

    return {
        "period": {
            "start_date": str(start_date),
            "end_date": str(end_date),
        },
        "rules": COMMISSION_RULES,
        "summary": {
            "total_sellers": len(rows),
            "total_sales": total_sales,
            "total_amount": total_amount,
            "total_commission": total_commission,
        },
        "per_seller": per_seller
    }
