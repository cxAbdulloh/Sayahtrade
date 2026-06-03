import React, { useState } from "react"; // useState qo'shdik
import "./Footer.css";
import { assets } from "../../assets/assets.js";
import {Link} from "react-router-dom";

export default function Footer() {
    const [logoError, setLogoError] = useState(false);

    return (
        <footer className="saya-footer-section">
            <div className="saya-footer-container">
                <div className="saya-footer__info-card">
                    <div className="saya-footer__info-col">
                        <h3 className="saya-footer__info-title">У Вас остались вопросы?</h3>
                        <Link to="/contactwithus" className="saya-footer__info-btn">
                            Получить Консультацию
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    </div>

                    <div className="saya-footer__info-col">
                        <h3 className="saya-footer__info-title">Ташкент, ул. Навнихол, 3</h3>
                        <Link to="/contact" className="saya-footer__info-link">Локация</Link>
                    </div>

                    <div className="saya-footer__info-col">
                        <h3 className="saya-footer__info-title">Следите наши каналы:</h3>
                        <div className="saya-footer__socials">
                            <a href="#" className="saya-footer__social-item" aria-label="Facebook">f</a>
                            <a href="#" className="saya-footer__social-item" aria-label="Twitter">X</a>
                            <a href="#" className="saya-footer__social-item" aria-label="Instagram">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>


                <div className="saya-footer__main">
                    <div className="saya-footer__brand-block">
                        <div className="saya-footer__logo-box">
                            {!logoError ? (
                                <img
                                    src="https://sayatrade.uz/wp-content/uploads/2024/11/logo.png"
                                    alt="SAYA Health Trade"
                                    className="saya-footer__logo-img"
                                    onError={() => setLogoError(true)}
                                />
                            ) : (
                                <div className="saya-footer__logo-fallback">
                                    {assets?.footer_logo ? (
                                        <img src={assets.footer_logo} alt="SAYA Logo" className="saya-footer__logo-img" />
                                    ) : (
                                        <span></span>
                                    )}
                                </div>
                            )}
                        </div>

                        <p className="saya-footer__description">
                            Лучшие витамины и добавки изготовлены из натуральных ингредиентов
                            с использованием современных технологий, направленных на улучшение
                            физического и психического здоровья.
                        </p>
                    </div>
                </div>

            </div>

            <div className="saya-footer__bottom">
                <div className="saya-footer__bottom-container">
                    <span>SayaTrade © 2026</span>
                </div>
            </div>
        </footer>
    );
}