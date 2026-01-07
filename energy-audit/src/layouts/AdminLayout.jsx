import { useState } from "react";
import "../styles/admin.scss";
import Modal from "../components/Modal/Modal";

export default function AdminLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fields, setFields] = useState([
    { name: "", value: "" },
  ]);

const handleAddField = () => {
  const lastField = fields[fields.length - 1];

  if (!lastField.name.trim() || !lastField.value.toString().trim()) {
    return; // не добавляем новую строку
  }

  setFields([...fields, { name: "", value: "" }]);
};
const lastField = fields[fields.length - 1];
const isAddDisabled =
  !lastField.name.trim() || !lastField.value.toString().trim();


  const handleChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log("Данные:", fields);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
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
        <div className="admin-header">
          <h1 className="admin-title">Админ панель</h1>
        </div>

        <form className="admin-form" onSubmit={handleFormSubmit}>
          {fields.map((field, index) => (
            <div className="admin-row" key={index}>
              <input
                className="admin-input"
                type="text"
                placeholder="Название"
                value={field.name}
                onChange={(e) =>
                  handleChange(index, "name", e.target.value)
                }
                required
              />

              <input
                className="admin-input"
                type="number"
                placeholder="Значение"
                value={field.value}
                onChange={(e) =>
                  handleChange(index, "value", e.target.value)
                }
                required
              />
            </div>
          ))}

          <button
            type="button"
            className="admin-add-btn"
            onClick={handleAddField}
          >
            Добавить
          </button>

          <button className="admin-submit-btn" type="submit">
            Сформировать
          </button>
        </form>

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
