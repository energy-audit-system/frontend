import { Navigate, useLocation } from "react-router-dom";

/**
 * AdminRoute
 * Защищает админские роуты
 * Пускает ТОЛЬКО если user.role === "admin"
 */
export default function AdminRoute({ children }) {
  const location = useLocation();

  // Получаем user из localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Если нет пользователя или он не админ — редирект
  if (!user || user.role !== "admin") {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }

  // Если всё ок — рендерим админку
  return children;
}
