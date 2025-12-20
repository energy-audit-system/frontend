const API_BASE_URL = "https://88f103ccb50a.ngrok-free.app";

export async function apiGet(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}
