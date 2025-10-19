import AddSeller from "../AddSeller/AddSeller";
import "./SellersList.scss";

export default function SellersList({ sellers = [], onRefresh }) {
  return (
    <section className="sellers">
      <h3 className="sellers__title">Sellers</h3>

      <ul className="sellers__list">
        {sellers.length === 0 && <li className="sellers__empty">No sellers found</li>}
        {sellers.map((s) => (
          <li key={s.id} className="sellers__item">{s.name}</li>
        ))}
      </ul>

      {/* new form */}
      <AddSeller onSellerAdded={onRefresh} />
    </section>
  );
}
