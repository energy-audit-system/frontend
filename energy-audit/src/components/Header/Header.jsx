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
  emitAuthChanged,
  consumeAuthModalRequest,
} from "../../hooks/link";

const LS_UI = "header_ui_state";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= UI ================= */
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  /* ================= AUTH ================= */
  const [authUser, setAuthUser] = useState(() => {
    const u = loadUser();
    console.log("[Header] init authUser from storage:", u);
    return u;
  });

  /* ================= REGISTER ================= */
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [registerStep, setRegisterStep] = useState("form"); // form | verify
  const [verifyToken, setVerifyToken] = useState("");

  /* ================= LOGIN ================= */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");

  /* ================= RESTORE UI ================= */
  useEffect(() => {
    const savedToken = getToken();
    if (savedToken) {
      console.log("[Header] restore token:", savedToken);
    }

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

  /* ================= SAVE UI ================= */
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

  /* ================= OPEN MODAL FROM PAGES ================= */
  useEffect(() => {
    const handler = () => {
      const req = consumeAuthModalRequest();
      if (!req) return;

      console.log("[Header] auth_modal_open:", req);

      if (req.type === "login") setIsLoginOpen(true);
      if (req.type === "register") setIsRegisterOpen(true);
    };

    window.addEventListener("auth_modal_open", handler);
    return () => window.removeEventListener("auth_modal_open", handler);
  }, []);

  /* ================= ADMIN REDIRECT ================= */
  useEffect(() => {
    if (!authUser) return;

    const isAdmin = authUser.role === "engineer";
    const alreadyOnAdmin = location.pathname.startsWith("/admin");

    if (isAdmin && !alreadyOnAdmin) {
      console.log("[Header] admin detected → redirect /admin");
      navigate("/admin", { replace: true });
    }
  }, [authUser, location.pathname, navigate]);

  /* ================= CORE ================= */
  const commitUser = (u) => {
    console.log("[Header] commitUser ->", u);
    if (!u) return;

    const { token, access_token, ...userOnly } = u;
    saveUser(userOnly);
    setAuthUser(userOnly);

    emitAuthChanged();
  };

  /* ================= REGISTER ================= */
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

      if (data?.user) commitUser(data.user);
    } catch (e) {
      console.log("[Header] register error:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY EMAIL ================= */
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

      const tokenFromServer = data?.token || data?.access_token;
      if (tokenFromServer) {
        setToken(tokenFromServer);
      }

      const userFromServer = data?.user || data;
      commitUser(userFromServer);

      setIsRegisterOpen(false);
      setRegisterStep("form");
      setVerifyToken("");
    } catch (e) {
      console.log("[Header] verify error:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    console.log("[Header] login click", loginEmail);

    setLoading(true);
    setLoginError("");

    try {
      const data = await loginRequest({
        email: loginEmail,
        password: loginPassword,
      });

      console.log("[Header] login response:", data);

      if (data?.token) setToken(data.token);

      const user = data?.user || data;
      if (user?.is_email_verified === false) {
        throw new Error("Подтвердите почту");
      }

      commitUser(user);

      setIsLoginOpen(false);
      setLoginEmail("");
      setLoginPassword("");
    } catch (e) {
      console.log("[Header] login error:", e);
      setLoginError(e.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    console.log("[Header] logout");

    clearUser();
    clearToken();
    setAuthUser(null);

    emitAuthChanged();

    setIsBurgerOpen(false);
    navigate("/", { replace: true });
  };

  const goToGmail = () => {
    window.open("https://mail.google.com/mail/u/", "_blank", "noopener,noreferrer");
  };

  /* ================= RENDER ================= */
  return (
    <>
      <header className="header">
        <div className="User">
          <img src={logo} alt="logo" className="header__logo" />

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
          <NavLink to="/" className="btn-link">О нас</NavLink>
          <NavLink to="/two" className="btn-link">Услуги</NavLink>
          <NavLink to="/three" className="btn-link">Наши работы</NavLink>
          <NavLink to="/four" className="btn-link">Заявки</NavLink>
          <NavLink to="/five" className="btn-link">Контакты</NavLink>
        </nav>
      </header>

      {/* ===== BURGER MENU ===== */}
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

      {/* ===== LOGIN MODAL ===== */}
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Войти">
        <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Пароль" />
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <button onClick={handleLogin}>{loading ? "Вход..." : "Войти"}</button>
      </Modal>

      {/* ===== REGISTER MODAL (ORIGINAL STRUCTURE) ===== */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title={registerStep === "form" ? "Регистрация" : "Подтверждение почты"}
      >
        {registerStep === "form" ? (
          <>
            <input value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Имя" />
            <input value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="Пароль" />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleRegister}>
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: 10 }}>
              ✅ Вы зарегистрировались. На почту <b>{regEmail}</b> отправлен токен.
            </p>

            <input
              value={verifyToken}
              onChange={(e) => setVerifyToken(e.target.value)}
              placeholder="Вставьте токен из письма"
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleVerifyEmail}>
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
