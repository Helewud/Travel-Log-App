import axios from "axios";
const API_URL = process.env.REACT_APP_API;

export async function allLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}

export async function createLogEntry(entry) {
  axios.post(`${API_URL}/api/logs`, entry);
}
