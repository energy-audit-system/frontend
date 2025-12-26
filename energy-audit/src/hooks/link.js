// src/hooks/link.js

const BASE_URL = "http://localhost:5000";

// универсальный request
async function request(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    throw new Error(data?.detail || data?.message || "Ошибка запроса");
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
