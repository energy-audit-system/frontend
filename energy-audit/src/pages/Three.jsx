import "../styles/page.scss";

import { useState } from "react";
import ReportsTable from "../components/ReportsTable/ReportsTable";
import { reports } from "../data/reports";
import "../components/Header/Header.scss";


export default function Three() {
  const [page, setPage] = useState(1);
  const perPage = 5;

  const start = (page - 1) * perPage;
  const current = reports.slice(start, start + perPage);

  return (
    <div className="page">
      <div className="Report">
        <button className="btn-report">Список отчетов</button>
        <button className="btn-report">Создать отчет</button>
      </div>

      <ReportsTable
        data={current}
        page={page}
        total={reports.length}
        perPage={perPage}
        setPage={setPage}
      />
    </div>
  );
}