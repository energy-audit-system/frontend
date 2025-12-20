import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal/Modal";
import logo from "../../image/header_logo_down1.png";
import "./Header.scss";
import { apiPost } from "../../hooks/link";

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [user, setUser] = useState(null); // после успешного входа/регистрации

  // 🔥 Регистрация
  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiPost("/auth/register", {
        full_name: regName,
        email: regEmail,
        password: regPassword,
        role: "client",
      });
      console.log("Успешная регистрация:", data);
      setUser(data); // сохраняем пользователя
      setIsRegisterOpen(false);
      setRegName("");
      setRegEmail("");
      setRegPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Вход
  const handleLogin = async () => {
    setLoginLoading(true);
    setLoginError("");
    try {
      const data = await apiPost("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });
      console.log("Успешный вход:", data);
      setUser(data); // сохраняем пользователя
      setIsLoginOpen(false);
      setLoginEmail("");
      setLoginPassword("");
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  // 🔁 Выход
  const handleLogout = () => {
    setUser(null); // очищаем пользователя
  };

  return (
    <>
      <header className="header">
        <div className="User">
          <div className="header__logo-container">
            <img src={logo} alt="Энергоаудит" className="header__logo" />
          </div>

          <div className="header__user-buttons desktop-only">
            {!user ? (
              <>
                <button className="btn-user" onClick={() => setIsRegisterOpen(true)}>
                  Регистрация
                </button>
                <button className="btn-user" onClick={() => setIsLoginOpen(true)}>
                  Войти
                </button>
              </>
            ) : (
              <>
                <span className="btn-user">Привет, {user.full_name || user.email}</span>
                <button className="btn-user" onClick={handleLogout}>
                  Выйти
                </button>
              </>
            )}
          </div>

          <button
            className="burger mobile-only"
            onClick={() => setIsBurgerOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className="desktop-only">
          <NavLink to="/" className="btn-link">Один</NavLink>
          <NavLink to="/two" className="btn-link">Два</NavLink>
          <NavLink to="/three" className="btn-link">Три</NavLink>
          <NavLink to="/four" className="btn-link">Четыре</NavLink>
          <NavLink to="/five" className="btn-link">Пять</NavLink>
        </nav>
      </header>

      <Modal isOpen={isBurgerOpen} onClose={() => setIsBurgerOpen(false)}>
        <div className="burger-menu">
          <div className="modal-User-buttons">
            {!user ? (
              <>
                <button className="btn-user" onClick={() => { setIsRegisterOpen(true); setIsBurgerOpen(false); }}>
                  Регистрация
                </button>
                <button className="btn-user" onClick={() => { setIsLoginOpen(true); setIsBurgerOpen(false); }}>
                  Войти
                </button>
              </>
            ) : (
              <>
                <span className="btn-user">Привет, {user.full_name || user.email}</span>
                <button className="btn-user" onClick={handleLogout}>Выйти</button>
              </>
            )}
          </div>
          <nav className="burger-nav">
            <NavLink to="/" onClick={() => setIsBurgerOpen(false)} className="btn-link">Один</NavLink>
            <NavLink to="/two" onClick={() => setIsBurgerOpen(false)} className="btn-link">Два</NavLink>
            <NavLink to="/three" onClick={() => setIsBurgerOpen(false)} className="btn-link">Три</NavLink>
            <NavLink to="/four" onClick={() => setIsBurgerOpen(false)} className="btn-link">Четыре</NavLink>
            <NavLink to="/five" onClick={() => setIsBurgerOpen(false)} className="btn-link">Пять</NavLink>
          </nav>
        </div>
      </Modal>

      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Войти">
        <input
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <button onClick={handleLogin} disabled={loginLoading}>
          {loginLoading ? "Вход..." : "Войти"}
        </button>
      </Modal>

      <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} title="Регистрация">
        <input type="text" placeholder="Имя" value={regName} onChange={(e) => setRegName(e.target.value)} />
        <input type="email" placeholder="Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
        <input type="password" placeholder="Пароль" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </Modal>
    </>
  );
}
