const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
