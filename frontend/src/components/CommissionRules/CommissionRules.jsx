import "./CommissionRules.scss";

export default function CommissionRules({ rules = [] }) {
  return (
    <section className="rules">
      <h3 className="rules__title">Commission Rules</h3>
      {rules.length === 0 ? (
        <p className="rules__empty">Run a calculation to display rules.</p>
      ) : (
        <ul className="rules__list">
          {rules.map((r, idx) => (
            <li key={idx} className="rules__item">
              ≥ ${r.min.toFixed(2)} → {(r.rate * 100).toFixed(1)}%
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
