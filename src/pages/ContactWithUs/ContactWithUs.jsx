import "./ContactWithUs.css";
import { useState } from "react";

export default function ContactWithUs() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", theme: "", message: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const iconUrls = [
        "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-experts-ico-1.svg",
        "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-experts-ico-2.svg",
        "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-experts-ico-3.svg",
        "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-experts-ico-4.svg",
        "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-experts-ico-5.svg"
    ];

    return (
        <section className="consult-wrapper">
            <div className="consult-grid">
                <div className="consult-left">
                    <h1 className="consult-title">
                        ПОЛУЧИТЕ <br />
                        <span className="consult-title-accent">ПРОФЕССИОНАЛЬНУЮ</span>
                        <br />
                        КОНСУЛЬТАЦИЮ
                    </h1>
                    <p className="consult-desc">
                        Оставьте заявку, и наш специалист свяжется с вами в ближайшее время,
                        чтобы ответить на ваши вопросы и предложить оптимальное решение.
                    </p>
                    <div className="consult-icons">
                        {iconUrls.map((url, i) => (
                            <div key={i} className="consult-icon-slot">
                                <img src={url} alt={`Icon ${i + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="consult-form-box">
                    <h3>Написать нам</h3>

                    <div className="form-group">
                        <label>Ваше имя</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Ваш e-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Номер телефона для обратной связи</label>
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+998"
                        />
                    </div>

                    <div className="form-group">
                        <label>Тема</label>
                        <input
                            type="text"
                            name="theme"
                            value={form.theme}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Ваше Сообщение (не обязательно)</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-submit">
                        <button type="button">Отправить</button>
                    </div>
                </div>
            </div>
        </section>
    );
}