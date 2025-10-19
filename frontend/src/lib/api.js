const API_URL = import.meta.env.VITE_API_URL;

export async function seedDemo() {
  const r = await fetch(`${API_URL}/demo/seed`, { method: "POST" });
  if (!r.ok) throw new Error("Failed to seed demo data");
  return r.json();
}

export async function getSellers() {
  const r = await fetch(`${API_URL}/sellers/`);
  if (!r.ok) throw new Error("Failed to fetch sellers");
  return r.json();
}

export async function getCommissions(startDate, endDate) {
  const url = new URL(`${API_URL}/commissions/`);
  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", endDate);
  const r = await fetch(url);
  if (!r.ok) throw new Error("Failed to fetch commissions");
  return r.json();
}

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
