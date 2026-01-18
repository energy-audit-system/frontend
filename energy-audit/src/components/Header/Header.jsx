// src/components/Header/Header.jsx
import { NavLink } from "react-router-dom";
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
  // =========================
  // UI state (модалки)
  // =========================
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  // =========================
  // Auth state (ВАЖНО)
  // =========================
  const [authUser, setAuthUser] = useState(() => {
    const u = loadUser();
    console.log("[Header] init authUser from storage:", u);
    return u;
  });

  // =========================
  // Регистрация
  // =========================
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // шаг регистрации
  const [registerStep, setRegisterStep] = useState("form"); // "form" | "verify"
  const [verifyToken, setVerifyToken] = useState("");

  // =========================
  // Логин
  // =========================
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // =========================
  // Restore UI state
  // =========================
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

    // на всякий случай синхронизируем authUser из storage
    const u = loadUser();
    if (u) setAuthUser(u);
  }, []);

  // Save UI state
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

  // ✅ helper: сохранить user так, чтобы React точно перерисовался
  const commitUser = (u) => {
    console.log("[Header] commitUser ->", u);
    if (!u) return;
    saveUser(u);      // localStorage
    setAuthUser(u);   // ✅ state -> UI перерисуется
  };

  // =========================
  // Регистрация (POST /auth/register)
  // =========================
  const handleRegister = async () => {
    console.log("[Header] register click", { regName, regEmail });

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

      // сохраним пользователя (он ещё не верифицирован — но нам это ок для шага verify)
      if (data?.user) commitUser(data.user);

      if (data?.email_verification_token) {
        console.log("[Header] email_verification_token:", data.email_verification_token);
      }
    } catch (err) {
      console.log("[Header] register error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Verify (GET /auth/verify-email?token=...)
  // =========================
const handleVerifyEmail = async () => {
  console.log("[Header] verify click", verifyToken);

  if (!verifyToken.trim()) {
    setError("Введите токен из письма");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const data = await verifyEmailRequest(verifyToken.trim());
    console.log("[Header] verify response:", data);

    // ✅ у тебя токен приходит как data.token
    const tokenFromServer = data?.token || data?.access_token;
    if (tokenFromServer) setToken(tokenFromServer);

    // ✅ ВАЖНО: бэк возвращает юзера не в data.user, а прямо объектом
    const userFromServer = data?.user || data;

    // ✅ если вдруг вернулся только token без полей пользователя
    if (userFromServer && (userFromServer.full_name || userFromServer.email)) {
      commitUser(userFromServer);
    } else if (authUser) {
      commitUser(authUser);
    }

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

  // =========================
  // Login (GET /auth/login?email=...&password=...)
  // =========================
  const handleLogin = async () => {
    console.log("[Header] login click", { loginEmail });

    setLoginLoading(true);
    setLoginError("");

    try {
      const data = await loginRequest({
        email: loginEmail,
        password: loginPassword,
      });

      console.log("[Header] login response:", data);

      const tokenFromServer = data?.token || data?.access_token;
      const userFromServer = data?.user || data;

      if (tokenFromServer) setToken(tokenFromServer);

      if (userFromServer?.is_email_verified === false) {
        throw new Error("Подтвердите почту перед входом.");
      }

      // ✅ кладём в state
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

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    console.log("[Header] logout");

    setAuthUser(null); // ✅ state
    clearUser();       // storage
    clearToken();

    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsBurgerOpen(false);

    setRegisterStep("form");
    setVerifyToken("");
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
                  Привет, {authUser.full_name || authUser.email}
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
          <NavLink to="/" className="btn-link">Один</NavLink>
          <NavLink to="/two" className="btn-link">Два</NavLink>
          <NavLink to="/three" className="btn-link">Три</NavLink>
          <NavLink to="/four" className="btn-link">Четыре</NavLink>
          <NavLink to="/five" className="btn-link">Пять</NavLink>
        </nav>
      </header>

      {/* Burger */}
      <Modal isOpen={isBurgerOpen} onClose={() => setIsBurgerOpen(false)}>
        <div className="burger-menu">
          <div className="modal-User-buttons">
            {!authUser ? (
              <>
                <button
                  className="btn-user"
                  onClick={() => { setIsRegisterOpen(true); setIsBurgerOpen(false); }}
                >
                  Регистрация
                </button>
                <button
                  className="btn-user"
                  onClick={() => { setIsLoginOpen(true); setIsBurgerOpen(false); }}
                >
                  Войти
                </button>
              </>
            ) : (
              <>
                <span className="btn-user">
                  Привет, {authUser.full_name || authUser.email}
                </span>
                <button className="btn-user" onClick={handleLogout}>
                  Выйти
                </button>
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

      {/* Login */}
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

      {/* Register */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title={registerStep === "form" ? "Регистрация" : "Подтверждение почты"}
      >
        {registerStep === "form" ? (
          <>
            <input
              type="text"
              placeholder="Имя"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleRegister} disabled={loading}>
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: 10 }}>
              ✅ Вы зарегистрировались. На почту <b>{regEmail}</b> отправлен токен.
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
