const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

export async function getHealthStatus() {
  const res = await fetch(`${API_URL}/`);
  if (!res.ok) throw new Error("Failed to fetch backend health");
  return res.json();
}
