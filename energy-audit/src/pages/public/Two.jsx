import "../../styles/page.scss";
import { useState, useRef, useEffect } from "react";
import Modal from "../../components/Modal/Modal";

export default function ClientReport() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Тип объекта");

  const selectRef = useRef(null);

  // закрытие select при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="page">
    <div className="client-layout">
      <main className="client-main">
        <h2 className="about__title">Сформировать отчет</h2>

        <form className="client-form" onSubmit={handleSubmit}>
          {/* Название */}
          <input
            className="client-input"
            type="text"
            placeholder="Название"
            required
          />

          {/* CUSTOM SELECT */}
          <div
            className={`client-select ${isSelectOpen ? "open" : ""}`}
            ref={selectRef}
          >
            <div
              className="client-select__value"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              {selectedType}
              <span className="client-select__arrow">▾</span>
            </div>

            <ul className="client-select__dropdown">
              {["Офис", "Больница", "Здание"].map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedType(item);
                    setIsSelectOpen(false);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Значение */}
          <input
            className="client-input"
            type="number"
            placeholder="Значение"
            required
          />

          <button className="client-submit-btn" type="submit">
            Сформировать
          </button>
        </form>

        {/* MODAL */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h5>Вы готовы сформировать отчет?</h5>
          <div className="modal__content">
            <button onClick={() => setIsModalOpen(false)}>Да</button>
            <button onClick={() => setIsModalOpen(false)}>Нет</button>
          </div>
        </Modal>
      </main>
    </div>
    </div>
  );
}
