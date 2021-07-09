const API_URL = process.env.REACT_APP_API;

export async function allLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}
