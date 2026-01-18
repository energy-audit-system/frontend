// src/routes/AdminRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function AdminRoute({ children }) {
  const location = useLocation();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("auth_user"));
  } catch {
    user = null;
  }

  // не залогинен
  if (!user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  // залогинен, но не админ
  if (user.role !== "engineer") {
    return <Navigate to="/" replace />;
  }

  // админ
  return children;
}
