// src/hooks/link.js

const BASE_URL = "https://88f103ccb50a.ngrok-free.app";

// универсальный request
async function request(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Ошибка запроса");
  }

  return data;
}

// GET
export const apiGet = (url) =>
  request(url, {
    method: "GET",
  });

// POST
export const apiPost = (url, body) =>
  request(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
