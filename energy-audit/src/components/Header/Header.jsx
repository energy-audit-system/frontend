import { NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
        <div className="User">
            <button className="btn-user">Регистрация</button>
            <button className="btn-user">Войти</button>
        </div>
      <nav>
        <NavLink to="/" className="btn-link">Один</NavLink>
        <NavLink to="/two" className="btn-link">Два</NavLink>
        <NavLink to="/three" className="btn-link">Три</NavLink>
        <NavLink to="/four" className="btn-link">Четыре</NavLink>
        <NavLink to="/five" className="btn-link">Пять</NavLink>
      </nav>
    </header>
  );
}
