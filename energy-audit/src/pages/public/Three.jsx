// src/pages/public/Three.jsx
import "../../styles/page.scss";
import { useEffect, useState } from "react";
import ReportsTable from "../../components/ReportsTable/ReportsTable";
import Loader from "../../components/Loader/Loader";
import {
  apiGet,
  getUser,
  openAuthModal,
  onAuthChanged,
} from "../../hooks/link";

export default function Three() {
  // ✅ Делаем authUser state, чтобы React мог перерисовывать
  const [authUser, setAuthUser] = useState(() => getUser());

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false); // ⚠️ теперь false по умолчанию
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const perPage = 5;

  // ✅ Подписка на изменения авторизации
  useEffect(() => {
    return onAuthChanged(() => {
      const u = getUser();
      console.log("[Three] auth_changed ->", u);
      setAuthUser(u);
    });
  }, []);

  // ✅ Загружаем отчеты ТОЛЬКО если авторизован
  useEffect(() => {
    if (!authUser) return;

    const getReports = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await apiGet("/audit-orders");
        setReports(data);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить отчеты");
      } finally {
        setLoading(false);
      }
    };

    getReports();
  }, [authUser]);

  // =========================
  // Если НЕ авторизован
  // =========================
  if (!authUser) {
    return (
      <div className="page">
        <h2 className="text-report">Доступ ограничен</h2>

        <p style={{ textAlign: "center", maxWidth: 520, margin: "0 auto 24px" }}>
          Для просмотра отчетов необходимо войти в аккаунт или зарегистрироваться.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button className="btn-report" onClick={() => openAuthModal("login")}>
            Войти
          </button>

          <button
            className="btn-report btn-report--ghost"
            onClick={() => openAuthModal("register")}
          >
            Регистрация
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // Если авторизован — грузим данные
  // =========================
  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="page">
        <p className="text-report">{error}</p>
      </div>
    );
  }

  const start = (page - 1) * perPage;
  const current = reports.slice(start, start + perPage);

  return (
    <div className="page">
      <div className="Report">
        <button className="btn-report">Создать отчет</button>
      </div>

      <ReportsTable
        data={current.map((item, index) => ({
          ...item,
          name: `Отчет №${start + index + 1}`,
        }))}
        page={page}
        total={reports.length}
        perPage={perPage}
        setPage={setPage}
      />
    </div>
  );
}
