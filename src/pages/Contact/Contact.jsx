import React, { useState } from "react";
import "./Contact.css";
import {Link} from "react-router-dom";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="account-banner">
                <div className="banner-content">
                    <h1>Контакты</h1>
                    <nav className="breadcrumb">
                        <Link to="/">Главная</Link> <span>/</span> <span className="active">Контакты</span>
                    </nav>
                </div>
            </div>
            <div className="contact-wrapper">
                <div className="contact-grid">
                    <div className="contact-left">
                        <h1>Наш адрес</h1>
                        <a className="contact-address-link">г.Ташкент, ул. Навнихол, 3</a>
                        <p className="contact-hours">
                            Понедельник – Пятница: с 10:00 до 16:00 (только по предварительной записи)<br />
                            Суббота - Воскресенье: выходной
                        </p>

                        <div className="contact-info-row">
                            <div className="contact-info-block">
                                <h2>Телефон</h2>
                                <a href="">901683698</a>
                                <a href="">901863688</a>
                            </div>
                            <div className="contact-info-block">
                                <h2>Email</h2>
                                <a href="mailto:info@sayatrade.uz">info@sayatrade.uz</a>
                            </div>
                        </div>

                        <div className="contact-form-box">
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
                                    type="message"
                                    value={form.phone}
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


                    <div className="contact-map-container">
                        <div className="map-placeholder">
                            <iframe
                                src="https://yandex.com/map-widget/v1/?um=constructor%3A769dc12d101e43638b7156e2e373739f93ec633dfe9cc29f42c05a23d12d0535&amp;source=constructor"
                                width="600" height="600" frameBorder="0"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}