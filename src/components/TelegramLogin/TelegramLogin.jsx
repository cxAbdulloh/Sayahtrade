import { useEffect, useState } from "react";
import { useTelegramAuth } from "../../hooks/useTelegramAuth.js";
import { db } from "../../firebase/firebase.js";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import "./TelegramLogin.css";

export default function TelegramLogin() {
    const { tgUser, loading } = useTelegramAuth();
    const [status, setStatus] = useState("idle"); // idle | loading | registered | existing
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!tgUser) return;

        const checkUser = async () => {
            setStatus("loading");
            try {
                const userRef = doc(db, "telegram_users", String(tgUser.id));
                const existing = await getDoc(userRef);

                if (existing.exists()) {
                    // Foydalanuvchi allaqachon ro'yxatdan o'tgan
                    setUserData(existing.data());
                    setStatus("existing");
                    // lastSeen yangilash
                    await setDoc(userRef, { lastSeen: serverTimestamp() }, { merge: true });
                } else {
                    setStatus("new"); // Yangi foydalanuvchi — register ko'rsinsin
                }
            } catch (err) {
                console.error("Firestore error:", err);
                setStatus("error");
            }
        };

        checkUser();
    }, [tgUser]);

    // Register tugmasi bosilganda
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
            setUserData({
                telegramId: tgUser.id,
                firstName: tgUser.firstName,
                lastName: tgUser.lastName,
                username: tgUser.username,
                photoUrl: tgUser.photoUrl,
            });
            setStatus("registered");
        } catch (err) {
            console.error("Register error:", err);
            setStatus("error");
        }
    };

    // ── Loading ──
    if (loading || status === "loading") {
        return (
            <div className="tg-login">
                <div className="tg-login__loading">
                    <div className="tg-login__spinner" />
                    <span>Загрузка...</span>
                </div>
            </div>
        );
    }

    // ── Telegram da emas ──
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

    const displayData = userData || tgUser;
    const displayName = [displayData.firstName, displayData.lastName].filter(Boolean).join(" ") || fullName;

    // ── Yangi foydalanuvchi — Register ──
    if (status === "new") {
        return (
            <div className="tg-login">
                <div className="tg-login__card">
                    <div className="tg-login__avatar">
                        {tgUser.photoUrl ? (
                            <img src={tgUser.photoUrl} alt={fullName} />
                        ) : (
                            <div className="tg-login__avatar-placeholder">{initials}</div>
                        )}
                    </div>

                    <div className="tg-login__welcome">
                        <span className="tg-login__greeting">Привет, {tgUser.firstName}! 👋</span>
                        <h2 className="tg-login__name">Создайте аккаунт</h2>
                        <p className="tg-login__desc">
                            Зарегистрируйтесь, чтобы делать заказы, отслеживать доставку и получать скидки
                        </p>
                    </div>

                    <div className="tg-login__register-info">
                        <div className="tg-login__info-item">
                            <span className="tg-login__info-label">Имя</span>
                            <span className="tg-login__info-value">{fullName}</span>
                        </div>
                        {tgUser.username && (
                            <div className="tg-login__info-item">
                                <span className="tg-login__info-label">Username</span>
                                <span className="tg-login__info-value">@{tgUser.username}</span>
                            </div>
                        )}
                        <div className="tg-login__info-item">
                            <span className="tg-login__info-label">Telegram ID</span>
                            <span className="tg-login__info-value">{tgUser.id}</span>
                        </div>
                    </div>

                    <button className="tg-login__btn" onClick={handleRegister}>
                        Создать аккаунт
                    </button>

                    <p className="tg-login__note">
                        Данные берутся из вашего Telegram профиля
                    </p>
                </div>
            </div>
        );
    }

    // ── Profil (existing yoki registered) ──
    return (
        <div className="tg-login">
            <div className="tg-login__card">

                {/* Avatar */}
                <div className="tg-login__avatar">
                    {tgUser.photoUrl ? (
                        <img src={tgUser.photoUrl} alt={displayName} />
                    ) : (
                        <div className="tg-login__avatar-placeholder">{initials}</div>
                    )}
                    <div className="tg-login__avatar-badge">✓</div>
                </div>

                {/* Welcome */}
                <div className="tg-login__welcome">
                    {status === "registered" && (
                        <span className="tg-login__new-badge">🎉 Аккаунт создан!</span>
                    )}
                    <span className="tg-login__greeting">Добро пожаловать!</span>
                    <h2 className="tg-login__name">{displayName}</h2>
                    {tgUser.username && (
                        <span className="tg-login__username">@{tgUser.username}</span>
                    )}
                </div>

                {/* Info */}
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
                    <div className="tg-login__info-item">
                        <span className="tg-login__info-label">Статус</span>
                        <span className="tg-login__info-value tg-login__info-value--green">✓ Активен</span>
                    </div>
                </div>

                {/* CTA */}
                <button
                    className="tg-login__btn"
                    onClick={() => window.Telegram?.WebApp?.close()}
                >
                    Перейти в магазин
                </button>

            </div>
        </div>
    );
}