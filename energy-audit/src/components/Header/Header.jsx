// src/components/Header/Header.jsx
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import logo from "../../image/header_logo_down1.png";
import "./Header.scss";

import {
  registerRequest,
  loginRequest,
  verifyEmailRequest,
  setToken,
  getToken,
  clearToken,
  setUser as saveUser,
  getUser as loadUser,
  clearUser,
} from "../../hooks/link";

const LS_UI = "header_ui_state";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // UI
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  // AUTH
  const [authUser, setAuthUser] = useState(() => {
    const u = loadUser();
    console.log("[Header] init authUser from storage:", u);
    return u;
  });

  // Register
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [registerStep, setRegisterStep] = useState("form");
  const [verifyToken, setVerifyToken] = useState("");

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Restore UI + authUser once
  useEffect(() => {
    const savedToken = getToken();
    if (savedToken) console.log("[Header] restore token:", savedToken);

    const raw = localStorage.getItem(LS_UI);
    if (raw) {
      try {
        const ui = JSON.parse(raw);
        console.log("[Header] restore UI state:", ui);

        setIsLoginOpen(!!ui.isLoginOpen);
        setIsRegisterOpen(!!ui.isRegisterOpen);
        setIsBurgerOpen(!!ui.isBurgerOpen);

        setRegName(ui.regName ?? "");
        setRegEmail(ui.regEmail ?? "");
        setRegPassword(ui.regPassword ?? "");
        setRegisterStep(ui.registerStep ?? "form");
        setVerifyToken(ui.verifyToken ?? "");

        setLoginEmail(ui.loginEmail ?? "");
        setLoginPassword(ui.loginPassword ?? "");
      } catch (e) {
        console.log("[Header] UI state parse error:", e);
      }
    }

    const u = loadUser();
    if (u) setAuthUser(u);
  }, []);

  // ✅ Единственное место редиректа админа (без циклов)
  useEffect(() => {
    if (!authUser) return;

    const isAdmin = authUser.role === "engineer";
    const alreadyOnAdmin = location.pathname.startsWith("/admin");

    if (isAdmin && !alreadyOnAdmin) {
      console.log("[Header] admin detected -> redirect /admin");
      navigate("/admin", { replace: true });
    }
  }, [authUser, location.pathname, navigate]);

  // Save UI
  useEffect(() => {
    const ui = {
      isLoginOpen,
      isRegisterOpen,
      isBurgerOpen,
      regName,
      regEmail,
      regPassword,
      registerStep,
      verifyToken,
      loginEmail,
      loginPassword,
    };
    localStorage.setItem(LS_UI, JSON.stringify(ui));
  }, [
    isLoginOpen,
    isRegisterOpen,
    isBurgerOpen,
    regName,
    regEmail,
    regPassword,
    registerStep,
    verifyToken,
    loginEmail,
    loginPassword,
  ]);

  // Save user to storage + state (без навигации здесь!)
  const commitUser = (u) => {
    console.log("[Header] commitUser ->", u);
    if (!u) return;

    const { token, access_token, ...userOnly } = u;
    saveUser(userOnly);
    setAuthUser(userOnly);
  };

  // Register
  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await registerRequest({
        full_name: regName,
        email: regEmail,
        password: regPassword,
        role: "client",
      });

      console.log("[Header] register response:", data);

      setRegisterStep("verify");
      setRegPassword("");

      if (data?.user) commitUser(data.user);
    } catch (err) {
      console.log("[Header] register error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify (у тебя ответ = user object + token)
  const handleVerifyEmail = async () => {
    if (!verifyToken.trim()) {
      setError("Введите токен из письма");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await verifyEmailRequest(verifyToken.trim());
      console.log("[Header] verify response:", data);

      const tokenFromServer = data?.token || data?.access_token;
      if (tokenFromServer) setToken(tokenFromServer);

      const userFromServer = data?.user || data;
      commitUser(userFromServer);

      setIsRegisterOpen(false);
      setRegisterStep("form");
      setVerifyToken("");
    } catch (err) {
      console.log("[Header] verify error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Login (POST)
  const handleLogin = async () => {
    setLoginLoading(true);
    setLoginError("");

    try {
      const data = await loginRequest({
        email: loginEmail,
        password: loginPassword,
      });

      console.log("[Header] login response:", data);

      const tokenFromServer = data?.token || data?.access_token;
      if (tokenFromServer) setToken(tokenFromServer);

      const userFromServer = data?.user || data;
      if (userFromServer?.is_email_verified === false) {
        throw new Error("Подтвердите почту перед входом.");
      }

      commitUser(userFromServer);

      setIsLoginOpen(false);
      setLoginEmail("");
      setLoginPassword("");
    } catch (err) {
      console.log("[Header] login error:", err);
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    setAuthUser(null);
    clearUser();
    clearToken();

    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsBurgerOpen(false);

    setRegisterStep("form");
    setVerifyToken("");

    navigate("/", { replace: true });
  };

  const goToGmail = () => {
    window.open("https://mail.google.com/mail/u/", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <header className="header">
        <div className="User">
          <div className="header__logo-container">
            <img src={logo} alt="Энергоаудит" className="header__logo" />
          </div>

          <div className="header__user-buttons desktop-only">
            {!authUser ? (
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
                <span className="btn-user">
                  {authUser.full_name || authUser.email}
                </span>
                <button className="btn-user" onClick={handleLogout}>
                  Выйти
                </button>
              </>
            )}
          </div>

          <button className="burger mobile-only" onClick={() => setIsBurgerOpen(true)}>
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className="desktop-only">
          <NavLink to="/" className="btn-link">О нас</NavLink>
          <NavLink to="/two" className="btn-link">Услуги</NavLink>
          <NavLink to="/three" className="btn-link">Наши работы</NavLink>
          <NavLink to="/four" className="btn-link">Заявки</NavLink>
          <NavLink to="/five" className="btn-link">Контакты</NavLink>
        </nav>
      </header>

      {/* Burger */}
      <Modal isOpen={isBurgerOpen} onClose={() => setIsBurgerOpen(false)}>
        <div className="burger-menu">
          <div className="modal-User-buttons">
            {!authUser ? (
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
                <span className="btn-user">
                  {authUser.full_name || authUser.email}
                </span>
                <button className="btn-user" onClick={handleLogout}>
                  Выйти
                </button>
              </>
            )}
          </div>

          <nav className="burger-nav">
            <NavLink to="/" onClick={() => setIsBurgerOpen(false)} className="btn-link">О нас</NavLink>
            <NavLink to="/two" onClick={() => setIsBurgerOpen(false)} className="btn-link">Услуги</NavLink>
            <NavLink to="/three" onClick={() => setIsBurgerOpen(false)} className="btn-link">Наши работы</NavLink>
            <NavLink to="/four" onClick={() => setIsBurgerOpen(false)} className="btn-link">Заявки</NavLink>
            <NavLink to="/five" onClick={() => setIsBurgerOpen(false)} className="btn-link">Контакты</NavLink>
          </nav>
        </div>
      </Modal>

      {/* Login */}
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Войти">
        <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        <input type="password" placeholder="Пароль" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />

        {loginError && <p style={{ color: "red" }}>{loginError}</p>}

        <button onClick={handleLogin} disabled={loginLoading}>
          {loginLoading ? "Вход..." : "Войти"}
        </button>
      </Modal>

      {/* Register */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title={registerStep === "form" ? "Регистрация" : "Подтверждение почты"}
      >
        {registerStep === "form" ? (
          <>
            <input type="text" placeholder="Имя" value={regName} onChange={(e) => setRegName(e.target.value)} />
            <input type="email" placeholder="Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
            <input type="password" placeholder="Пароль" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleRegister} disabled={loading}>
              {loading ? "Регистрация..." : "ЗарегисНаши работыроваться"}
            </button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: 10 }}>
              ✅ Вы зарегисНаши работыровались. На почту <b>{regEmail}</b> отправлен токен.
            </p>

            <input
              type="text"
              placeholder="Вставьте токен из письма"
              value={verifyToken}
              onChange={(e) => setVerifyToken(e.target.value)}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleVerifyEmail} disabled={loading}>
              {loading ? "Проверка..." : "Авторизироваться"}
            </button>

            <button onClick={goToGmail} style={{ marginTop: 10 }}>
              Посмотреть почту
            </button>
          </>
        )}
      </Modal>
    </>
  );
}
