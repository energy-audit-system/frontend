import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal/Modal";
import logo from "../../image/header_logo_down1.png";
import "./Header.scss";

export default function Header() {
const [isLoginOpen, setIsLoginOpen] = useState(false);
const [isRegisterOpen, setIsRegisterOpen] = useState(false);
const [isBurgerOpen, setIsBurgerOpen] = useState(false);

return (
<>
  <header className="header">
    <div className="User">
      <div className="header__logo-container">
        <img src={logo} alt="Энергоаудит" className="header__logo" />
      </div>

      {/* Кнопки (десктоп) */}
      <div className="header__user-buttons desktop-only">
        <button className="btn-user" onClick={()=> setIsRegisterOpen(true)}>
          Регистрация
        </button>
        <button className="btn-user" onClick={()=> setIsLoginOpen(true)}>
          Войти
        </button>
      </div>

      {/* Бургер */}
      <button className="burger mobile-only" onClick={()=> setIsBurgerOpen(true)}
        >
        <span />
        <span />
        <span />
      </button>
    </div>

    {/* Навигация (десктоп) */}
    <nav className="desktop-only">
      <NavLink to="/" className="btn-link">Один</NavLink>
      <NavLink to="/two" className="btn-link">Два</NavLink>
      <NavLink to="/three" className="btn-link">Три</NavLink>
      <NavLink to="/four" className="btn-link">Четыре</NavLink>
      <NavLink to="/five" className="btn-link">Пять</NavLink>
    </nav>
  </header>

  {/* 🔥 Бургер-меню (модалка) */}
  <Modal isOpen={isBurgerOpen} onClose={()=> setIsBurgerOpen(false)}
    >
    <div className="burger-menu">
      <div className="modal-User-buttons">
        <button className="btn-user" onClick={()=> {
          setIsRegisterOpen(true);
          setIsBurgerOpen(false);
          }}
          >
          Регистрация
        </button>

        <button className="btn-user" onClick={()=> {
          setIsLoginOpen(true);
          setIsBurgerOpen(false);
          }}
          >
          Войти
        </button>
      </div>

      <nav className="burger-nav">
        <NavLink to="/" onClick={()=> setIsBurgerOpen(false)} className="btn-link">Один</NavLink>
        <NavLink to="/two" onClick={()=> setIsBurgerOpen(false)} className="btn-link">Два</NavLink>
        <NavLink to="/three" onClick={()=> setIsBurgerOpen(false)} className="btn-link">Три</NavLink>
        <NavLink to="/four" onClick={()=> setIsBurgerOpen(false)} className="btn-link">Четыре</NavLink>
        <NavLink to="/five" onClick={()=> setIsBurgerOpen(false)} className="btn-link">Пять</NavLink>
      </nav>
    </div>
  </Modal>

  {/* Модалки логина / регистрации */}
  <Modal isOpen={isLoginOpen} onClose={()=> setIsLoginOpen(false)} title="Войти">
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Пароль" />
    <button>Войти</button>
  </Modal>

  <Modal isOpen={isRegisterOpen} onClose={()=> setIsRegisterOpen(false)} title="Регистрация">
    <input type="text" placeholder="Имя" />
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Пароль" />
    <button>Зарегистрироваться</button>
  </Modal>
</>
);
}