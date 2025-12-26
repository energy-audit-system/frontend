import { useState } from "react";
import "../styles/admin.scss";
import Modal from "../components//Modal/Modal";

export default function AdminLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // открываем модалку
  };

  const handleConfirm = () => {
    // действия при нажатии "Да"
    console.log("Отчет сформирован!");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    // действия при нажатии "Нет"
    setIsModalOpen(false);
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin</h2>

        <nav className="admin-nav">
          <a href="/admin">Dashboard</a>
          <a href="/admin/users">Users</a>
          <a href="/admin/orders">Orders</a>
        </nav>
      </aside>

      <main className="admin-main">
        {/* HEADER ADMIN PAGE */}
        <div className="admin-header">
          <h1 className="admin-title">Админ панель</h1>
          <button className="admin-add-btn">Добавить</button>
        </div>

        {/* FORM (появляется после клика "Добавить") */}
        <form className="admin-form" onSubmit={handleFormSubmit}>
          <input
            className="admin-input"
            type="text"
            placeholder="Название"
            required
          />

          <input
            className="admin-input"
            type="number"
            placeholder="Значение"
            required
          />

          <button className="admin-submit-btn" type="submit">
            Сформировать
          </button>
        </form>

        {/* МОДАЛЬНОЕ ОКНО */}
        <Modal isOpen={isModalOpen} onClose={handleCancel}>
          <h2>Вы готовы сформировать отчет?</h2>
          <div className="modal__content">
            <button onClick={handleConfirm}>Да</button>
            <button onClick={handleCancel}>Нет</button>
          </div>
        </Modal>
      </main>
    </div>
  );
}
