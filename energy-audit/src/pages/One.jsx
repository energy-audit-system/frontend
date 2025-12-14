import "../styles/page.scss";

import { useEffect, useState } from "react";


export default function One() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/audit-orders")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка запроса");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <ul>
      {data.map((item, i) => (
        <li key={i}>{item.name}</li>
      ))}
    </ul>
  );
}
