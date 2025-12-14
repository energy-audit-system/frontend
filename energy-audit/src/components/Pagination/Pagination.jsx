import "./Pagination.scss";

export default function Pagination({ page, total, perPage, setPage }) {
  const pages = Math.ceil(total / perPage);

  return (
    <div className="pagination">
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>

      {[...Array(pages)].map((_, i) => (
        <button
          key={i}
          className={page === i + 1 ? "active" : ""}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
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
