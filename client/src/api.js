const API_URL = "http://localhost:7890";

export async function allLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}
