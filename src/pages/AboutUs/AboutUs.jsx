import React from 'react';
import './AboutUs.css';
import {Link} from "react-router-dom";

export default function AboutUs() {
    return (
        <>
            <div className="account-banner">
                <div className="banner-content">
                    <h1>О Компании</h1>
                    <nav className="breadcrumb">
                        <Link to="/">Главная</Link> <span>/</span> <span className="active">О Компании</span>
                    </nav>
                </div>
            </div>

            <div className="saya-about">

            <div className="saya-about__container">

                <div className="saya-about__left">
                    <span className="saya-about__subtitle">O Нас</span>
                    <h2 className="saya-about__title">
                        Saya Trade — ваш официальный представитель компании «Эвалар»
                    </h2>

                    <div className="saya-about__content">
                        <h3>О компании «Эвалар»</h3>
                        <p>
                            «Эвалар» — ведущий российский производитель натуральных препаратов, созданных по
                            международному стандарту качества GMP. Это первый и единственный бренд в России, который
                            соблюдает столь высокие требования при производстве продукции.
                        </p>
                        <p>
                            Согласно исследованию агентства Magram Market Research, в 2023 году «Эвалар» признан самым
                            известным российским брендом на аптечном рынке.
                        </p>
                    </div>
                </div>

                <div className="saya-about__right">

                    <div className="saya-about__feature">
                        <div className="saya-about__icon-wrap">
                            <svg className="saya-about__star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                        </div>
                        <div className="saya-about__feature-text">
                            <h4>Подлинность</h4>
                            <p>
                                Для отбора сырья используются сложнейшие современные аппаратные методы, растения
                                проходят многоступенчатую систему идентификации
                            </p>
                        </div>
                    </div>

                    <div className="saya-about__feature">
                        <div className="saya-about__icon-wrap">
                            <svg className="saya-about__star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                        </div>
                        <div className="saya-about__feature-text">
                            <h4>Безопасность</h4>
                            <p>
                                Каждый природный компонент должен быть идеально чистым, без тяжелых металлов,
                                радионуклидов и микроорганизмов
                            </p>
                        </div>
                    </div>

                    <div className="saya-about__feature">
                        <div className="saya-about__icon-wrap">
                            <svg className="saya-about__star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                        </div>
                        <div className="saya-about__feature-text">
                            <h4>Активность</h4>
                            <p>
                                Чем больше в растениях активных веществ, тем эффективнее будут изготовленные из них
                                препараты. Мы отбираем ингредиенты только с высоким содержанием полезных компонентов
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        </>

    );
}