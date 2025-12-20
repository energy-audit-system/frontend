import "../styles/page.scss";
import { useEffect, useState } from "react";
import { apiGet } from "../hooks/link";
import Loader from "../components/Loader/Loader";

export default function Two() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await apiGet("/audit-orders");
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) return <Loader fullscreen={true} />;
  if (error) return <div className="page">{error}</div>;

  return (
    <div className="page">
      <h2>Список заказов</h2>

      {orders.length === 0 ? (
        <p>Заказов нет</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>ID:</strong> {order.id} <br />
              <strong>Статус:</strong> {order.status} <br />
              <strong>Создан:</strong> {order.created_at} <br />
              <strong>Изменен:</strong> {order.updated_at}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
