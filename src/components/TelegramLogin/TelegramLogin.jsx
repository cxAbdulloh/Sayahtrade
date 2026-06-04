import { useEffect, useState } from "react";
import { useTelegramAuth } from "../../hooks/useTelegramAuth.js";
import { db } from "../../firebase/firebase.js";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import "./TelegramLogin.css";

export default function TelegramLogin() {
    const { tgUser, loading } = useTelegramAuth();
    const [status, setStatus] = useState("idle"); // idle, loading, new, existing, registered, error

    // ── FOYDALANUVCHINI TEKSHIRISH ──
    useEffect(() => {
        if (!tgUser) return;

        const checkUser = async () => {
            setStatus("loading");
            try {
                const userRef = doc(db, "telegram_users", String(tgUser.id));
                const existing = await getDoc(userRef);

                if (existing.exists()) {
                    setStatus("existing");
                    // Agar foydalanuvchi bazada bo'lsa, oxirgi kirgan vaqtini yangilaymiz
                    await setDoc(userRef, { lastSeen: serverTimestamp() }, { merge: true });
                } else {
                    setStatus("new"); // Foydalanuvchi bazada yo'q -> Registratsiya kerak
                }
            } catch (error) {
                console.error("Xatolik yuz berdi:", error);
                setStatus("error");
            }
        };

        checkUser();
    }, [tgUser]);

    // ── REGISTRATSIYA QILISH (BAZAGA YOZISH) ──
    const handleRegister = async () => {
        if (!tgUser) return;
        setStatus("loading");
        try {
            const userRef = doc(db, "telegram_users", String(tgUser.id));
            await setDoc(userRef, {
                telegramId: tgUser.id,
                firstName: tgUser.firstName,
                lastName: tgUser.lastName || "",
                username: tgUser.username || "",
                photoUrl: tgUser.photoUrl || "",
                createdAt: serverTimestamp(),
                lastSeen: serverTimestamp(),
            });
            setStatus("registered");
        } catch (error) {
            console.error("Registratsiyada xatolik:", error);
            setStatus("error");
        }
    };

    // 1. Yuklanish holati (Spinner)
    if (loading || status === "idle" || status === "loading") {
        return (
            <div className="tgl-container">
                <div className="tgl-loading">
                    <div className="tgl-spinner" />
                    <span>Загрузка данных...</span>
                </div>
            </div>
        );
    }

    // 2. Telegramdan tashqarida ochilgandagi holat
    if (!tgUser || status === "error") {
        return (
            <div className="tgl-container">
                <div className="tgl-card tgl-card--error">
                    <div className="tgl-icon">📱</div>
                    <h3>Вход ограничен</h3>
                    <p>Пожалуйста, откройте приложение через официальный Telegram Mini App бот.</p>
                </div>
            </div>
        );
    }

    const fullName = [tgUser.firstName, tgUser.lastName].filter(Boolean).join(" ");
    const initials = [tgUser.firstName?.[0], tgUser.lastName?.[0]]
        .filter(Boolean).join("").toUpperCase() || "U";

    // 3. YANGI FOYDALANUVCHI — Registratsiya oynasi
    if (status === "new") {
        return (
            <div className="tgl-container">
                <div className="tgl-card">
                    <div className="tgl-avatar-wrap">
                        {tgUser.photoUrl ? (
                            <img src={tgUser.photoUrl} alt={fullName} className="tgl-avatar" />
                        ) : (
                            <div className="tgl-avatar-placeholder">{initials}</div>
                        )}
                    </div>

                    <div className="tgl-welcome">
                        <span className="tgl-badge">👋 Привет, {tgUser.firstName}!</span>
                        <h2 className="tgl-title">Создание аккаунта</h2>
                        <p className="tgl-subtitle">Для доступа к магазину необходимо подтвердить профиль.</p>
                    </div>

                    <div className="tgl-info-list">
                        <div className="tgl-info-item">
                            <span className="tgl-label">Имя профиля</span>
                            <span className="tgl-value">{fullName}</span>
                        </div>
                        {tgUser.username && (
                            <div className="tgl-info-item">
                                <span className="tgl-label">Username</span>
                                <span className="tgl-value">@{tgUser.username}</span>
                            </div>
                        )}
                    </div>

                    <button className="tgl-btn tgl-btn--primary" onClick={handleRegister}>
                        Создать аккаунт
                    </button>
                    <p className="tgl-footer-note">Данные автоматически синхронизируются с вашим Telegram</p>
                </div>
            </div>
        );
    }

    // 4. ESKI FOYDALANUVCHI yoki HOZIRGINA RO'YXATDAN O'TGAN — Do'konga kirish oynasi
    return (
        <div className="tgl-container">
            <div className="tgl-card">
                <div className="tgl-avatar-wrap">
                    {tgUser.photoUrl ? (
                        <img src={tgUser.photoUrl} alt={fullName} className="tgl-avatar" />
                    ) : (
                        <div className="tgl-avatar-placeholder">{initials}</div>
                    )}
                    <div className="tgl-success-badge">✓</div>
                </div>

                <div className="tgl-welcome">
                    {status === "registered" ? (
                        <span className="tgl-badge tgl-badge--success">🎉 Успешно зарегистрирован!</span>
                    ) : (
                        <span className="tgl-badge"> рады видеть вас снова!</span>
                    )}
                    <h2 className="tgl-title">{fullName}</h2>
                    <p className="tgl-subtitle">Ваш аккаунт успешно авторизован.</p>
                </div>

                <button className="tgl-btn tgl-btn--success" onClick={() => window.location.href = "/shop"}>
                    Перейти в магазин
                </button>
            </div>
        </div>
    );
}