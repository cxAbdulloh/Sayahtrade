import { useEffect, useState } from "react";
import { useTelegramAuth } from "../../hooks/useTelegramAuth.js";
import { db } from "../../firebase/firebase.js";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import "./TelegramLogin.css";
import {Link} from "react-router-dom";

export default function TelegramLogin() {
    const { tgUser, loading } = useTelegramAuth();
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    // Firebase Firestore ga saqlash
    useEffect(() => {
        if (!tgUser) return;

        const saveUser = async () => {
            setSaving(true);
            try {
                const userRef = doc(db, "telegram_users", String(tgUser.id));
                const existing = await getDoc(userRef);

                await setDoc(userRef, {
                    telegramId: tgUser.id,
                    firstName: tgUser.firstName,
                    lastName: tgUser.lastName,
                    username: tgUser.username,
                    photoUrl: tgUser.photoUrl,
                    lastSeen: serverTimestamp(),
                    // Birinchi marta saqlanganda createdAt qo'shamiz
                    ...(existing.exists() ? {} : { createdAt: serverTimestamp() }),
                }, { merge: true });

                setSaved(true);
            } catch (err) {
                console.error("Firestore save error:", err);
            } finally {
                setSaving(false);
            }
        };

        saveUser();
    }, [tgUser]);

    if (loading) {
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
        .filter(Boolean)
        .join("")
        .toUpperCase() || "U";

    return (
        <div className="tg-login">
            <div className="tg-login__card">

                {/* Avatar */}
                <div className="tg-login__avatar">
                    {tgUser.photoUrl ? (
                        <img src={tgUser.photoUrl} alt={fullName} />
                    ) : (
                        <div className="tg-login__avatar-placeholder">{initials}</div>
                    )}
                    <div className="tg-login__avatar-badge">✓</div>
                </div>

                {/* Welcome text */}
                <div className="tg-login__welcome">
                    <span className="tg-login__greeting">Добро пожаловать!</span>
                    <h2 className="tg-login__name">{fullName}</h2>
                    {tgUser.username && (
                        <span className="tg-login__username">@{tgUser.username}</span>
                    )}
                </div>

                {/* Status */}
                <div className="tg-login__status">
                    {saving ? (
                        <span className="tg-login__status--saving">
                            <div className="tg-login__spinner tg-login__spinner--sm" />
                            Сохраняем данные...
                        </span>
                    ) : saved ? (
                        <span className="tg-login__status--saved">
                            ✓ Профиль сохранён
                        </span>
                    ) : null}
                </div>

                {/* Info */}
                <div className="tg-login__info">
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

                {/* CTA */}
                <Link to="/shop"
                    className="tg-login__btn"
                    onClick={() => window.Telegram?.WebApp?.close()}
                >
                    Перейти в магазин
                </Link>

            </div>
        </div>
    );
}