import "../../styles/page.scss";
import { useEffect, useState } from "react";
import ReportsTable from "../../components/ReportsTable/ReportsTable";
import "../../components/Header/Header.scss";
import { apiGet } from "../../hooks/link";
import Loader from "../../components/Loader/Loader";


export default function Three() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    const getReports = async () => {
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
  }, []);
   if (loading) return <Loader />;
 console.log(reports);
 
  const start = (page - 1) * perPage;
  const current = reports.slice(start, start + perPage);

  if (loading) {
    return (
      <div className="page">

        <p className="text-report">Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p className="text-report">{error}</p>
      </div>
    );
  }

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
