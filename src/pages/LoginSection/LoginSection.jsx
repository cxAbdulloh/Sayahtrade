import React, { useState } from "react";
import "./LoginSection.css";
import { Link, useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.js";

const LoginSection = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const clearMessages = () => {
        setError("");
        setSuccess("");
    };

    const getErrorMessage = (code) => {
        switch (code) {
            case "auth/user-not-found": return "Пользователь не найден";
            case "auth/wrong-password": return "Неверный пароль";
            case "auth/email-already-in-use": return "Email уже используется";
            case "auth/invalid-email": return "Неверный формат email";
            case "auth/weak-password": return "Пароль должен быть не менее 6 символов";
            case "auth/too-many-requests": return "Слишком много попыток. Попробуйте позже";
            case "auth/invalid-credential": return "Неверный email или пароль";
            default: return "Произошла ошибка. Попробуйте снова";
        }
    };

    // Login
    const handleLogin = async () => {
        if (!email || !password) {
            setError("Заполните все поля");
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccess("Вход выполнен успешно!");
            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            setError(getErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    // Register
    const handleRegister = async () => {
        if (!email) {
            setError("Введите email");
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password || "default123");
            setSuccess("Аккаунт создан! Ссылка для входа отправлена на email.");
            setTimeout(() => setIsLogin(true), 2000);
        } catch (err) {
            setError(getErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    // Forgot password
    const handleForgotPassword = async () => {
        if (!email) {
            setError("Введите email для сброса пароля");
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess("Ссылка для сброса пароля отправлена на email");
        } catch (err) {
            setError(getErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="account-page">
            <div className="account-banner">
                <div className="banner-content">
                    <h1>Мой аккаунт</h1>
                    <nav className="breadcrumb">
                        <Link to="/">Главная</Link> <span>/</span>{" "}
                        <span className="active">Мой аккаунт</span>
                    </nav>
                </div>
            </div>

            <div className="login-section">
                <div className="login-container">
                    <div className="login-left">
                        {/* Error / Success messages */}
                        {error && (
                            <div className="auth-message auth-message--error">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="auth-message auth-message--success">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                                {success}
                            </div>
                        )}

                        {isLogin ? (
                            <>
                                <h2>Вход</h2>

                                <label>Email *</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@email.com"
                                />

                                <label>Пароль *</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="password-input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                                <line x1="1" y1="1" x2="23" y2="23"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                <button
                                    className="main-btn"
                                    onClick={handleLogin}
                                    disabled={loading}
                                >
                                    {loading ? "Входим..." : "Вход В Систему"}
                                </button>

                                <div className="login-bottom">
                                    <label className="checkbox-label">
                                        <input type="checkbox" />
                                        Запомни меня
                                    </label>
                                    <button
                                        className="forgot-btn"
                                        onClick={handleForgotPassword}
                                        disabled={loading}
                                    >
                                        Забыли пароль?
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2>Регистрация</h2>

                                <label>Email *</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@email.com"
                                />

                                <p className="info-text">
                                    Ссылка для установки нового пароля будет отправлена на ваш адрес электронной почты.
                                </p>
                                <p className="info-text">
                                    Ваши личные данные будут использоваться для упрощения дальнейшего взаимодействия с сайтом.
                                </p>

                                <button
                                    className="main-btn"
                                    onClick={handleRegister}
                                    disabled={loading}
                                >
                                    {loading ? "Создаём аккаунт..." : "Регистрация"}
                                </button>
                            </>
                        )}
                    </div>

                    <div className="login-right">
                        <h2>{isLogin ? "Регистрация" : "Вход"}</h2>
                        <p>
                            Регистрация на этом сайте позволит вам получить доступ к статусу и истории ваших заказов. Просто заполните поля ниже, и мы быстро создадим для вас новую учетную запись.
                        </p>
                        <button
                            className="switch-btn"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setShowPassword(false);
                                clearMessages();
                                setEmail("");
                                setPassword("");
                            }}
                        >
                            {isLogin ? "Регистрация" : "Вход"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginSection;