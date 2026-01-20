import "../../styles/page.scss";
import { useState, useRef, useEffect } from "react";
import Modal from "../../components/Modal/Modal";

const TYPE_OPTIONS = {
  "Apartments - subsidized": ["Gap", "Middle", "High"],
  "Serviced apartments": ["Serviced apartments"],
  Hotel: [
    "5-star Hotel",
    "4-star Hotel",
    "3-star Hotel",
    "2-star Hotel",
    "1-star Hotel",
  ],
  Resort: [
    "5-star Resort",
    "4-star Resort",
    "3-star Resort",
    "2-star Resort",
    "1-star Resort",
  ],
  Retail: [
    "Department Store",
    "Shopping Mall",
    "Supermarket",
    "Convenience Store",
    "Small Food Retail",
    "Non-Food Big Box Retail",
  ],
  Industrial: ["Light Industry", "Warehouse"],
  Office: ["Office"],
  Healthcare: [
    "Nursing Home",
    "Private Hospital",
    "Public Hospital",
    "Multi-Speciality Hospital",
    "Clinics",
    "Diagnostic Center",
    "Teaching Hospital",
    "Eye Hospital",
    "Dental Hospital",
  ],
  Education: [
    "Preschool, School",
    "University",
    "Sports Facilities",
    "Other Educational Facilities",
  ],
  "Mixed-use": ["Self-defined Building"],
};

export default function ClientReport() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");

  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isSubTypeOpen, setIsSubTypeOpen] = useState(false);

  const [selectedType, setSelectedType] = useState("Тип объекта");
  const [selectedSubType, setSelectedSubType] = useState("Подтип");

  const typeRef = useRef(null);
  const subTypeRef = useRef(null);

  // закрытие select при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (typeRef.current && !typeRef.current.contains(e.target)) {
        setIsTypeOpen(false);
      }
      if (subTypeRef.current && !subTypeRef.current.contains(e.target)) {
        setIsSubTypeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFormValid =
    title.trim() !== "" &&
    selectedType !== "Тип объекта" &&
    selectedSubType !== "Подтип";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* SELECT: Тип объекта */}
            <div
              className={`client-select ${isTypeOpen ? "open" : ""}`}
              ref={typeRef}
            >
              <div
                className="client-select__value"
                onClick={() => setIsTypeOpen(!isTypeOpen)}
              >
                {selectedType}
                <span className="client-select__arrow">▾</span>
              </div>

              <ul className="client-select__dropdown">
                {Object.keys(TYPE_OPTIONS).map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setSelectedType(item);
                      setSelectedSubType("Подтип");
                      setIsTypeOpen(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* SELECT: Подтип */}
            {selectedType !== "Тип объекта" && (
              <div
                className={`client-select ${
                  isSubTypeOpen ? "open" : ""
                }`}
                ref={subTypeRef}
              >
                <div
                  className="client-select__value"
                  onClick={() =>
                    setIsSubTypeOpen(!isSubTypeOpen)
                  }
                >
                  {selectedSubType}
                  <span className="client-select__arrow">▾</span>
                </div>

                <ul className="client-select__dropdown">
                  {TYPE_OPTIONS[selectedType].map((sub) => (
                    <li
                      key={sub}
                      onClick={() => {
                        setSelectedSubType(sub);
                        setIsSubTypeOpen(false);
                      }}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              className="client-submit-btn"
              type="submit"
              disabled={!isFormValid}
            >
              Сформировать
            </button>
          </form>

          {/* MODAL */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <h5>Вы готовы сформировать отчет?</h5>
            <div className="modal__content">
              <button onClick={() => setIsModalOpen(false)}>
                Да
              </button>
              <button onClick={() => setIsModalOpen(false)}>
                Нет
              </button>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  );
}
