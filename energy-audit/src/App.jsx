import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminRoute from "./routes/AdminRoute";

// public pages
import One from "./pages/public/One";
import Two from "./pages/public/Two";
import Three from "./pages/public/Three";
import Four from "./pages/public/Four";
import Five from "./pages/public/Five";

// admin pages
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<One />} />
        <Route path="/two" element={<Two />} />
        <Route path="/three" element={<Three />} />
        <Route path="/four" element={<Four />} />
        <Route path="/five" element={<Five />} />
      </Route>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}
