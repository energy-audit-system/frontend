import "./Modal.scss";
import img from "../../image/header_logo_down2.png"
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <img src={img} alt="benka logo" className="benka_logo_modal" />
          <button className="modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
}
