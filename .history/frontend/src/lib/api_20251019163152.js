export async function createSale({ seller_id, amount, date }) {
  const r = await fetch(`${API_URL}/sales/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seller_id, amount, date }),
  });
  if (!r.ok) throw new Error("Failed to create sale");
  return r.json();
}

export async function createSalesBatch(items) {
  const r = await fetch(`${API_URL}/sales/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(items), // [{seller_id, amount, date}, ...]
  });
  if (!r.ok) throw new Error("Failed to create sales batch");
  return r.json();
}
