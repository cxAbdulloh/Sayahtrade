import { useEffect, useState } from "react";
import { useTelegramAuth } from "../../hooks/useTelegramAuth.js";
import { db } from "../../firebase/firebase.js";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import "./TelegramLogin.css";

const LANGS = [
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "uz", label: "O'zbek", flag: "🇺🇿" },
];

const HEADER_COLORS = [
    { label: "Фиолетовый", value: "linear-gradient(135deg, #5B2D8E, #8B5CF6)" },
    { label: "Зелёный", value: "linear-gradient(135deg, #2D7A4F, #4ade80)" },
    { label: "Синий", value: "linear-gradient(135deg, #1e40af, #60a5fa)" },
    { label: "Золотой", value: "linear-gradient(135deg, #92400e, #C9A84C)" },
    { label: "Чёрный", value: "linear-gradient(135deg, #111, #444)" },
];

export default function TelegramLogin() {
    const { tgUser, loading } = useTelegramAuth();
    const [status, setStatus] = useState("idle");
    const [userData, setUserData] = useState(null);
    const [lang, setLang] = useState("ru");
    const [headerColor, setHeaderColor] = useState(HEADER_COLORS[0].value);
    const [showColorPicker, setShowColorPicker] = useState(false);

    const t = {
        ru: {
            welcome: "Добро пожаловать!",
            orders: "Мои заказы",
            language: "Язык",
            logout: "Выйти",
            create: "Создать аккаунт",
            creating: "Создаём...",
            profile: "Профиль",
            status: "Активен",
            changeColor: "Изменить цвет",
            notTg: "Откройте в Telegram",
            notTgDesc: "Это приложение доступно только через Telegram Mini App",
            loading: "Загрузка...",
            goShop: "Перейти в магазин",
            createDesc: "Зарегистрируйтесь, чтобы делать заказы и получать скидки",
            created: "🎉 Аккаунт создан!",
        },
        uz: {
            welcome: "Xush kelibsiz!",
            orders: "Buyurtmalarim",
            language: "Til",
            logout: "Chiqish",
            create: "Akkaunt yaratish",
            creating: "Yaratilmoqda...",
            profile: "Profil",
            status: "Faol",
            changeColor: "Rangni o'zgartirish",
            notTg: "Telegramda oching",
            notTgDesc: "Bu ilova faqat Telegram Mini App orqali mavjud",
            loading: "Yuklanmoqda...",
            goShop: "Do'konga o'tish",
            createDesc: "Buyurtma berish va chegirmalar olish uchun ro'yxatdan o'ting",
            created: "🎉 Akkaunt yaratildi!",
        },
    };
    const T = t[lang];

    useEffect(() => {
        if (!tgUser) return;
        const checkUser = async () => {
            setStatus("loading");
            try {
                const userRef = doc(db, "telegram_users", String(tgUser.id));
                const existing = await getDoc(userRef);
                if (existing.exists()) {
                    setUserData(existing.data());
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
            const data = {
                telegramId: tgUser.id,
                firstName: tgUser.firstName,
                lastName: tgUser.lastName,
                username: tgUser.username,
                photoUrl: tgUser.photoUrl,
                createdAt: serverTimestamp(),
                lastSeen: serverTimestamp(),
            };
            await setDoc(userRef, data);
            setUserData(data);
            setStatus("registered");
        } catch {
            setStatus("error");
        }
    };

    if (loading || status === "idle" || status === "loading") {
        return (
            <div className="tgp-wrap">
                <div className="tgp-loading">
                    <div className="tgp-spinner" />
                    <span>{T.loading}</span>
                </div>
            </div>
        );
    }

    if (!tgUser) {
        return (
            <div className="tgp-wrap">
                <div className="tgp-not-tg">
                    <span>📱</span>
                    <h3>{T.notTg}</h3>
                    <p>{T.notTgDesc}</p>
                </div>
            </div>
        );
    }

    const fullName = [tgUser.firstName, tgUser.lastName].filter(Boolean).join(" ");
    const initials = [tgUser.firstName?.[0], tgUser.lastName?.[0]].filter(Boolean).join("").toUpperCase() || "U";

    // ── Yangi foydalanuvchi ──
    if (status === "new") {
        return (
            <div className="tgp-wrap">
                <div className="tgp-card">
                    <div className="tgp-header" style={{ background: headerColor }}>
                        <div className="tgp-avatar">
                            {tgUser.photoUrl
                                ? <img src={tgUser.photoUrl} alt={fullName} />
                                : <div className="tgp-avatar__placeholder">{initials}</div>
                            }
                        </div>
                        <div className="tgp-header__info">
                            <span className="tgp-header__greeting">Привет, {tgUser.firstName}! 👋</span>
                            <h2 className="tgp-header__name">{fullName}</h2>
                            {tgUser.username && <span className="tgp-header__username">@{tgUser.username}</span>}
                        </div>
                    </div>

                    <div className="tgp-body">
                        <p className="tgp-create-desc">{T.createDesc}</p>
                        <button className="tgp-create-btn" onClick={handleRegister}>
                            {T.create}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Profil ──
    return (
        <div className="tgp-wrap">
            <div className="tgp-card">

                {/* Header */}
                <div className="tgp-header" style={{ background: headerColor }}>
                    <div className="tgp-header__top">
                        <span className="tgp-header__title">{T.profile}</span>
                        <button className="tgp-color-btn" onClick={() => setShowColorPicker(!showColorPicker)}>
                            🎨
                        </button>
                    </div>

                    {/* Color picker */}
                    {showColorPicker && (
                        <div className="tgp-color-picker">
                            {HEADER_COLORS.map((c) => (
                                <button
                                    key={c.value}
                                    className={`tgp-color-dot${headerColor === c.value ? " active" : ""}`}
                                    style={{ background: c.value }}
                                    onClick={() => { setHeaderColor(c.value); setShowColorPicker(false); }}
                                    title={c.label}
                                />
                            ))}
                        </div>
                    )}

                    <div className="tgp-header__user">
                        <div className="tgp-avatar">
                            {tgUser.photoUrl
                                ? <img src={tgUser.photoUrl} alt={fullName} />
                                : <div className="tgp-avatar__placeholder">{initials}</div>
                            }
                            <div className="tgp-avatar__badge">✓</div>
                        </div>
                        <div className="tgp-header__info">
                            {status === "registered" && <span className="tgp-new-badge">🎉 {T.created}</span>}
                            <span className="tgp-header__greeting">{T.welcome}</span>
                            <h2 className="tgp-header__name">{fullName}</h2>
                            {tgUser.username && <span className="tgp-header__username">@{tgUser.username}</span>}
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="tgp-body">

                    {/* Buyurtmalar */}
                    <div className="tgp-menu">
                        <button className="tgp-menu-item">
                            <span className="tgp-menu-item__icon">🛍️</span>
                            <span className="tgp-menu-item__label">{T.orders}</span>
                            <span className="tgp-menu-item__arrow">›</span>
                        </button>
                    </div>

                    {/* Til */}
                    <div className="tgp-section">
                        <span className="tgp-section__label">{T.language}</span>
                        <div className="tgp-lang-btns">
                            {LANGS.map((l) => (
                                <button
                                    key={l.code}
                                    className={`tgp-lang-btn${lang === l.code ? " active" : ""}`}
                                    onClick={() => setLang(l.code)}
                                >
                                    {l.flag} {l.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chiqish */}
                    <button className="tgp-logout-btn" onClick={() => window.Telegram?.WebApp?.close()}>
                        {T.logout}
                    </button>

                </div>
            </div>
        </div>
    );
}