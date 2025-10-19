import { useState } from "react";
import { createSale } from "../../lib/api";
import "./AddSale.scss";

export default function AddSale({ sellers = [], onCreated }) {
  const [sellerId, setSellerId] = useState(sellers[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!sellerId || !amount || !date) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await createSale({
        seller_id: Number(sellerId),
        amount: Number(amount),
        date,
      });
      setAmount("");
      if (onCreated) onCreated();
      alert("Sale added ✔");
    } catch (e) {
      console.error(e);
      alert("Failed to add sale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-sale">
      <select
        className="add-sale__select"
        value={sellerId}
        onChange={(e) => setSellerId(e.target.value)}
      >
        {sellers.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <input
        className="add-sale__input"
        type="number"
        step="0.01"
        min="0"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        className="add-sale__input"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        className="add-sale__button"
        onClick={handleCreate}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Sale"}
      </button>
    </div>
  );
}
