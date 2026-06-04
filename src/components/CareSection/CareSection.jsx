import React from "react";
import "./CareSection.css";

export default function CareSection() {
    return (
        <section className="saya-care">
            <div className="saya-care__header">
                <p className="saya-care__top-text">
                    Мы предлагаем витамины и БАДы, которые поддержат вашу энергию, иммунитет и общее самочувствие.
                </p>

                <div className="saya-care__title-wrapper">
                    <div className="saya-care__line"></div>
                    <h2 className="saya-care__title">
                        Забота о здоровье начинается с <br />
                        <span className="saya-care__highlight">правильных добавок!</span>
                    </h2>
                    <div className="saya-care__line"></div>
                </div>

                <p className="saya-care__bottom-text">
                    Качество и эффективность каждого продукта проверены, чтобы вы могли доверять своему выбору. Откройте путь к лучшему здоровью с нами!
                </p>
            </div>
        </section>
    );
}