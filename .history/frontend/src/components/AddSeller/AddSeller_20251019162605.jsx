import { useState } from "react";
import "./AddSeller.scss";

export default function AddSeller({ onSellerAdded }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name.trim()) {
      alert("Please enter a seller name");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sellers/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to add seller");

      setName("");
      if (onSellerAdded) onSellerAdded(); // notify parent to refresh
    } catch (err) {
      alert("Error adding seller");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-seller">
      <input
        className="add-seller__input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New seller name"
      />
      <button
        className="add-seller__button"
        onClick={handleAdd}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}
