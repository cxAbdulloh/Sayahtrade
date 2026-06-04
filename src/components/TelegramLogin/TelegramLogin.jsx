import { useEffect, useState } from "react";
import { useTelegramAuth } from "../../hooks/useTelegramAuth.js";
import { db } from "../../firebase/firebase.js";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import "./TelegramLogin.css";

export default function TelegramLogin() {
    const { tgUser, loading } = useTelegramAuth();
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        if (!tgUser) return;
        const checkUser = async () => {
            setStatus("loading");
            try {
                const userRef = doc(db, "telegram_users", String(tgUser.id));
                const existing = await getDoc(userRef);
                if (existing.exists()) {
                    setStatus("existing");
                    await setDoc(userRef, { lastSeen: serverTimestamp() }, { merge: true });
                } else {
                    setStatus("new");
                }
            } catch {
                setStatus("error");
            }
        };
        checkUser();
    }, [tgUser]);

    const handleRegister = async () => {
        if (!tgUser) return;
        setStatus("loading");
        try {
            const userRef = doc(db, "telegram_users", String(tgUser.id));
            await setDoc(userRef, {
                telegramId: tgUser.id,
                firstName: tgUser.firstName,
                lastName: tgUser.lastName,
                username: tgUser.username,
                photoUrl: tgUser.photoUrl,
                createdAt: serverTimestamp(),
                lastSeen: serverTimestamp(),
            });
            setStatus("registered");
        } catch {
            setStatus("error");
        }
    };

    if (loading || status === "idle" || status === "loading") {
        return (
            <div className="tg-login">
                <div className="tg-login__loading">
                    <div className="tg-login__spinner" />
                    <span>Загрузка...</span>
                </div>
            </div>
        );
    }

    if (!tgUser) {
        return (
            <div className="tg-login">
                <div className="tg-login__not-tg">
                    <div className="tg-login__icon">📱</div>
                    <h3>Откройте в Telegram</h3>
                    <p>Это приложение доступно только через Telegram Mini App</p>
                </div>
            </div>
        );
    }

    const fullName = [tgUser.firstName, tgUser.lastName].filter(Boolean).join(" ");
    const initials = [tgUser.firstName?.[0], tgUser.lastName?.[0]]
        .filter(Boolean).join("").toUpperCase() || "U";

    // ── Yangi foydalanuvchi — Register ──
    if (status === "new") {
        return (
            <div className="tg-login">
                <div className="tg-login__card">
                    <div className="tg-login__avatar">
                        {tgUser.photoUrl
                            ? <img src={tgUser.photoUrl} alt={fullName} />
                            : <div className="tg-login__avatar-placeholder">{initials}</div>
                        }
                    </div>
                    <div className="tg-login__welcome">
                        <span className="tg-login__greeting">Привет, {tgUser.firstName}! 👋</span>
                        <h2 className="tg-login__name">{fullName}</h2>
                        {tgUser.username && <span className="tg-login__username">@{tgUser.username}</span>}
                    </div>
                    <div className="tg-login__register-info">
                        <div className="tg-login__info-item">
                            <span className="tg-login__info-label">Telegram ID</span>
                            <span className="tg-login__info-value">{tgUser.id}</span>
                        </div>
                        {tgUser.username && (
                            <div className="tg-login__info-item">
                                <span className="tg-login__info-label">Username</span>
                                <span className="tg-login__info-value">@{tgUser.username}</span>
                            </div>
                        )}
                    </div>
                    <button className="tg-login__btn" onClick={handleRegister}>
                        Создать аккаунт
                    </button>
                    <p className="tg-login__note">Данные берутся из вашего Telegram профиля</p>
                </div>
            </div>
        );
    }

    // ── Akkaunt bor yoki register qilindi — faqat "Перейти в магазин" ──
    return (
        <div className="tg-login">
            <div className="tg-login__card">
                <div className="tg-login__avatar">
                    {tgUser.photoUrl
                        ? <img src={tgUser.photoUrl} alt={fullName} />
                        : <div className="tg-login__avatar-placeholder">{initials}</div>
                    }
                    <div className="tg-login__avatar-badge">✓</div>
                </div>
                <div className="tg-login__welcome">
                    {status === "registered" && (
                        <span className="tg-login__new-badge">🎉 Аккаунт создан!</span>
                    )}
                    <span className="tg-login__greeting">Добро пожаловать!</span>
                    <h2 className="tg-login__name">{fullName}</h2>
                    {tgUser.username && <span className="tg-login__username">@{tgUser.username}</span>}
                </div>
                <div className="tg-login__register-info">
                    <div className="tg-login__info-item">
                        <span className="tg-login__info-label">Telegram ID</span>
                        <span className="tg-login__info-value">{tgUser.id}</span>
                    </div>
                    <div className="tg-login__info-item">
                        <span className="tg-login__info-label">Статус</span>
                        <span className="tg-login__info-value" style={{color: "#2D7A4F"}}>✓ Активен</span>
                    </div>
                </div>
                <button className="tg-login__btn" onClick={() => window.location.href = "/"}>
                    Перейти в магазин
                </button>
            </div>
        </div>
    );
}