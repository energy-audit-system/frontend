import { Navigate, useLocation } from "react-router-dom";

export default function AdminRoute({ children }) {
  const location = useLocation();
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  if (!user || user.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
