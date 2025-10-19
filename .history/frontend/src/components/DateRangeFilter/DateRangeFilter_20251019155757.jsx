import "./DateRangeFilter.scss";

export default function DateRangeFilter({ period, setPeriod, onCalculate, loading }) {
  return (
    <div className="filter">
      <div className="filter__row">
        <label className="filter__label">Start Date</label>
        <input
          className="filter__input"
          type="date"
          value={period.start}
          onChange={(e) => setPeriod((p) => ({ ...p, start: e.target.value }))}
        />
      </div>

      <div className="filter__row">
        <label className="filter__label">End Date</label>
        <input
          className="filter__input"
          type="date"
          value={period.end}
          onChange={(e) => setPeriod((p) => ({ ...p, end: e.target.value }))}
        />
      </div>

      <button className="filter__button" onClick={onCalculate} disabled={loading}>
        {loading ? "Calculating..." : "Calculate Commissions"}
      </button>
    </div>
  );
}
