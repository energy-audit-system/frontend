import "./Pagination.scss";

export default function Pagination({ page, total, perPage, setPage }) {
  const pages = Math.ceil(total / perPage);

  const getPages = () => {
    // если страниц мало — показываем все
    if (pages <= 4) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    // первая страница
    if (page <= 2) {
      return [1, 2, 3, 4];
    }

    // последняя страница
    if (page >= pages - 1) {
      return [1, pages - 2, pages - 1, pages];
    }

    // середина
    return [1, page - 1, page, page + 1];
  };

  return (
    <div className="pagination">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        &lt;
      </button>

      {getPages().map((p) => (
        <button
          key={p}
          className={page === p ? "active" : ""}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === pages}
      >
        &gt;
      </button>
    </div>
  );
}
