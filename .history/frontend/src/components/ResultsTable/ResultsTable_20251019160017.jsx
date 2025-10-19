import "./ResultsTable.scss";

export default function ResultsTable({ results = [] }) {
  if (!results || results.length === 0) {
    return (
      <section className="results">
        <h3 className="results__title">Results</h3>
        <p className="results__empty">Run a calculation to see results.</p>
      </section>
    );
  }

  return (
    <section className="results">
      <h3 className="results__title">Results</h3>
      <div className="results__table" role="table">
        <div className="results__row results__row--head" role="row">
          <div className="results__cell">Seller</div>
          <div className="results__cell">Sales Count</div>
          <div className="results__cell">Total Sales</div>
          <div className="results__cell">Rate</div>
          <div className="results__cell">Commission</div>
        </div>
        {results.map((r) => (
          <div key={r.seller_id} className="results__row" role="row">
            <div className="results__cell">{r.seller_name}</div>
            <div className="results__cell">{r.sales_count}</div>
            <div className="results__cell">${r.total_sales_amount.toFixed(2)}</div>
            <div className="results__cell">{(r.applied_rate * 100).toFixed(1)}%</div>
            <div className="results__cell">${r.commission_amount.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
