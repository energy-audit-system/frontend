// src/hooks/link.js

const BASE_URL = "http://104.248.129.188:5000";

// ✅ Ключи localStorage
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

// ✅ Триггер модалок авторизации из любых страниц
const LS_AUTH_MODAL = "auth_modal_open"; // { type: "login"|"register", ts: number }

// ===== Token helpers =====
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  console.log("[link.js] setToken ->", token);
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  console.log("[link.js] clearToken");
  localStorage.removeItem(TOKEN_KEY);
};

// ===== User helpers =====
export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.log("[link.js] getUser JSON parse error:", e);
    return null;
  }
};

export const setUser = (user) => {
  console.log("[link.js] setUser ->", user);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  console.log("[link.js] auth_user NOW =", localStorage.getItem(USER_KEY));
};

export const clearUser = () => {
  console.log("[link.js] clearUser");
  localStorage.removeItem(USER_KEY);
};

// ===== Open auth modal from anywhere =====
export const openAuthModal = (type) => {
  // type: "login" | "register"
  localStorage.setItem(
    "auth_modal_request",
    JSON.stringify({ type, ts: Date.now() })
  );
  window.dispatchEvent(new Event("auth_modal_open"));
};

export const consumeAuthModalRequest = () => {
  const raw = localStorage.getItem("auth_modal_request");
  if (!raw) return null;
  localStorage.removeItem("auth_modal_request");
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};


// ===== Query builder =====
function buildQuery(params) {
  if (!params || typeof params !== "object") return "";
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    qs.append(k, String(v));
  });
  const s = qs.toString();
  return s ? `?${s}` : "";
}

// ===== Universal request =====
async function request(url, options = {}) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${url}`, {
    method: options.method || "GET",
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { message: text };
  }

  if (!res.ok) {
    const msg =
      data?.detail ||
      data?.message ||
      data?.error ||
      `Ошибка запроса: ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

// GET
export const apiGet = (url, params, options = {}) =>
  request(`${url}${buildQuery(params)}`, { method: "GET", ...options });

// POST
export const apiPost = (url, body, options = {}) =>
  request(url, { method: "POST", body: JSON.stringify(body), ...options });

// ===== Auth API =====
export const registerRequest = (payload) => apiPost("/auth/register", payload);

// ✅ Логин (у тебя сейчас backend работает через POST — это правильно)
export const loginRequest = ({ email, password }) =>
  apiPost("/auth/login", { email, password });

// ✅ Verify email: GET /auth/verify-email?token=...
export const verifyEmailRequest = (token) =>
  apiGet("/auth/verify-email", { token });
// ===============================
// AUTH CHANGE EVENT (ВАЖНО)
// ===============================

export const emitAuthChanged = () => {
  console.log("[link.js] emitAuthChanged");
  window.dispatchEvent(new Event("auth_changed"));
};

export const onAuthChanged = (callback) => {
  const handler = () => callback();
  window.addEventListener("auth_changed", handler);

  return () => {
    window.removeEventListener("auth_changed", handler);
  };
};
