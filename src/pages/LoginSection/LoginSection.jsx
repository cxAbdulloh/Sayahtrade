import React, { useState } from "react";
import "./LoginSection.css";
import { Link } from "react-router-dom";

const LoginSection = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="account-page">
            <div className="account-banner">
                <div className="banner-content">
                    <h1>Мой аккаунт</h1>
                    <nav className="breadcrumb">
                        <Link to="/">Главная</Link> <span>/</span> <span className="active">Мой аккаунт</span>
                    </nav>
                </div>
            </div>

            <div className="login-section">
                <div className="login-container">
                    <div className="login-left">
                        {isLogin ? (
                            <>
                                <h2>Вход</h2>

                                <label>Имя пользователя или Email *</label>
                                <input type="text" />

                                <label>Пароль *</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="password-input"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                <button className="main-btn">
                                    Вход В Систему
                                </button>

                                <div className="login-bottom">
                                    <label className="checkbox-label">
                                        <input type="checkbox" />
                                        Запомни меня
                                    </label>

                                    <a href="#">Забыли пароль?</a>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2>Регистрация</h2>

                                <label>Email *</label>
                                <input type="email" />

                                <p className="info-text">
                                    Ссылка для установки нового пароля будет
                                    отправлена на ваш адрес электронной почты.
                                </p>

                                <p className="info-text">
                                    Ваши личные данные будут использоваться
                                    для упрощения дальнейшего взаимодействия
                                    с сайтом.
                                </p>

                                <button className="main-btn">
                                    Регистрация
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