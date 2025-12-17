import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal/Modal";
import logo from "../../image/header_logo_down1.png";
import "./Header.scss";

export default function Header() {
const [isLoginOpen, setIsLoginOpen] = useState(false);
const [isRegisterOpen, setIsRegisterOpen] = useState(false);

return (
<>
  <header className="header">
    <div className="User">
      <div className="header__logo-container">
        <img src={logo} alt="Энергоаудит" className="header__logo" />
      </div>

      <div className="header__user-buttons">
        <button className="btn-user" onClick={()=> setIsRegisterOpen(true)}
          >
          Регистрация
        </button>

        <button className="btn-user" onClick={()=> setIsLoginOpen(true)}
          >
          Войти
        </button>
      </div>

    </div>

    <nav>
      <NavLink to="/" className="btn-link">Один</NavLink>
      <NavLink to="/two" className="btn-link">Два</NavLink>
      <NavLink to="/three" className="btn-link">Три</NavLink>
      <NavLink to="/four" className="btn-link">Четыре</NavLink>
      <NavLink to="/five" className="btn-link">Пять</NavLink>
    </nav>
  </header>

  {/* Модалка входа */}
  <Modal isOpen={isLoginOpen} onClose={()=> setIsLoginOpen(false)}
    title="Войти"
    >
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Пароль" />
    <button>Войти</button>
  </Modal>

  {/* Модалка регистрации */}
  <Modal isOpen={isRegisterOpen} onClose={()=> setIsRegisterOpen(false)}
    title="Регистрация"
    >
    <input type="text" placeholder="Имя" />
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Пароль" />
    <button>Зарегистрироваться</button>
  </Modal>
</>
);
}