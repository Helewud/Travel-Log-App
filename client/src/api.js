import axios from "axios";
const API_URL = process.env.REACT_APP_API;

// api call to get all saved entries from database
export async function allLogEntries() {
  try {
    const response = await axios.get(`${API_URL}/api/logs`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
