import { useState } from "react";
import { useTelegramAuth } from "../../hooks/useTelegramAuth.js";
import "./TelegramProfile.css";

const THEME_COLORS = ["#5B2D8E", "#007AFF", "#34C759", "#FF9500", "#111111"];

export default function TelegramProfile() {
    const { tgUser, loading } = useTelegramAuth();
    const [headerColor, setHeaderColor] = useState("#5B2D8E");
    const [showColors, setShowColors] = useState(false);
    const [currentLang, setCurrentLang] = useState("ru");

    if (loading) {
        return (
            <div className="tgp-loading">
                <div className="tgp-spinner" />
                <span>Загрузка профиля...</span>
            </div>
        );
    }

    if (!tgUser) {
        return (
            <div className="tgp-not-tg">
                <span>📱</span>
                <h3>Откройте в Telegram</h3>
                <p>Этот профиль доступен только через Telegram Mini App</p>
            </div>
        );
    }

    const fullName = [tgUser.firstName, tgUser.lastName].filter(Boolean).join(" ");
    const initials = [tgUser.firstName?.[0], tgUser.lastName?.[0]]
        .filter(Boolean).join("").toUpperCase() || "U";

    return (
        <div className="tgp-wrap">
            <div className="tgp-card">

                {/* ── HEADER SECTION ── */}
                <header className="tgp-header" style={{ backgroundColor: headerColor }}>
                    <div className="tgp-header__top">
                        <span className="tgp-header__title">Профиль</span>
                        <button
                            className="tgp-color-btn"
                            onClick={() => setShowColors(!showColors)}
                            aria-label="Change theme color"
                        >
                            🎨
                        </button>
                    </div>

                    {showColors && (
                        <div className="tgp-color-picker">
                            {THEME_COLORS.map((color) => (
                                <button
                                    key={color}
                                    className={`tgp-color-dot ${headerColor === color ? "active" : ""}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setHeaderColor(color)}
                                />
                            ))}
                        </div>
                    )}

                    <div className="tgp-header__user">
                        <div className="tgp-avatar">
                            {tgUser.photoUrl ? (
                                <img src={tgUser.photoUrl} alt={fullName} />
                            ) : (
                                <div className="tgp-avatar__placeholder">{initials}</div>
                            )}
                            <div className="tgp-avatar__badge">✓</div>
                        </div>

                        <div className="tgp-header__info">
                            <span className="tgp-header__greeting">Добро пожаловать</span>
                            <h2 className="tgp-header__name">{fullName}</h2>
                            {tgUser.username && <span className="tgp-header__username">@{tgUser.username}</span>}
                        </div>
                    </div>
                </header>

                {/* ── BODY SECTION ── */}
                <div className="tgp-body">

                    {/* Menu Navigation */}
                    <nav className="tgp-menu">
                        <button className="tgp-menu-item">
                            <span className="tgp-menu-item__icon">📦</span>
                            <span className="tgp-menu-item__label">Мои заказы</span>
                            <span className="tgp-menu-item__arrow">›</span>
                        </button>
                        <button className="tgp-menu-item">
                            <span className="tgp-menu-item__icon">🎁</span>
                            <span className="tgp-menu-item__label">Бонусы и скидки</span>
                            <span className="tgp-menu-item__arrow">›</span>
                        </button>
                        <button className="tgp-menu-item">
                            <span className="tgp-menu-item__icon">⚙️</span>
                            <span className="tgp-menu-item__label">Настройки аккаунта</span>
                            <span className="tgp-menu-item__arrow">›</span>
                        </button>
                    </nav>

                    {/* Language Selection */}
                    <div className="tgp-section">
                        <span className="tgp-section__label">Язык приложения</span>
                        <div className="tgp-lang-btns">
                            <button
                                className={`tgp-lang-btn ${currentLang === "uz" ? "active" : ""}`}
                                onClick={() => setCurrentLang("uz")}
                            >
                                O'zbekcha
                            </button>
                            <button
                                className={`tgp-lang-btn ${currentLang === "ru" ? "active" : ""}`}
                                onClick={() => setCurrentLang("ru")}
                            >
                                Русский
                            </button>
                        </div>
                    </div>

                    {/* Telegram Info Section */}
                    <div className="tgp-info-box">
                        <div className="tgp-info-row">
                            <span className="tgp-info-label">Telegram ID</span>
                            <span className="tgp-info-value">{tgUser.id}</span>
                        </div>
                        <div className="tgp-info-row">
                            <span className="tgp-info-label">Статус</span>
                            <span className="tgp-info-value status-active">● Активен</span>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button className="tgp-logout-btn" onClick={() => window.location.href = "/"}>
                        Выйти из профиля
                    </button>
                </div>

            </div>
        </div>
    );
}