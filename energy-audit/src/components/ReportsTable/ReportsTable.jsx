import Pagination from "../Pagination/Pagination";
import "./ReportsTable.scss";

export default function ReportsTable({
  data,
  page,
  total,
  perPage,
  setPage,
}) {
  return (
    <div className="table-wrapper">
      <div className="table-header">
        <span>Список отчетов</span>
        <span>Статус</span>
      </div>

      {data.map((item) => (
        <div className="table-row" key={item.id}>
          <span>{item.name}</span>

          <div className="row-right">
            <button className="icon">⬇</button>
            <button className="icon">✎</button>

            <span
              className={`status ${
                item.status === "done" ? "done" : "progress"
              }`}
            >
              {item.status === "done" ? "Завершен" : "В работе"}
            </span>
          </div>
        </div>
      ))}

      <Pagination
        page={page}
        total={total}
        perPage={perPage}
        setPage={setPage}
      />
    </div>
  );
}
