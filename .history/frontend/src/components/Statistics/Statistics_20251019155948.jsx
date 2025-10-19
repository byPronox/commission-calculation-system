import "./Statistics.scss";

export default function Statistics({ summary }) {
  return (
    <section className="stats">
      <h3 className="stats__title">Statistics</h3>
      {!summary ? (
        <p className="stats__empty">No data yet.</p>
      ) : (
        <ul className="stats__list">
          <li className="stats__item"><span>Total Sellers</span><strong>{summary.total_sellers}</strong></li>
          <li className="stats__item"><span>Total Sales</span><strong>{summary.total_sales}</strong></li>
          <li className="stats__item"><span>System Amount</span><strong>${summary.total_amount.toFixed(2)}</strong></li>
          <li className="stats__item"><span>Total Commission</span><strong>${summary.total_commission.toFixed(2)}</strong></li>
        </ul>
      )}
    </section>
  );
}
