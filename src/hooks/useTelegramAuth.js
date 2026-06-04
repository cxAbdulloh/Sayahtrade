import { useEffect, useState } from "react";
import { signInWithCustomToken, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.js";

export function useTelegramAuth() {
    const [tgUser, setTgUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;

        if (!tg) {
            setLoading(false);
            return;
        }

        tg.ready();
        tg.expand();

        const user = tg.initDataUnsafe?.user;

        if (user) {
            setTgUser({
                id: user.id,
                firstName: user.first_name || "",
                lastName: user.last_name || "",
                username: user.username || "",
                photoUrl: user.photo_url || null,
                languageCode: user.language_code || "ru",
            });
        }

        setLoading(false);
    }, []);

    return { tgUser, loading, error };
}