import React from "react";
import "./CareSection.css";

const SCROLL_IMAGES = [
    "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-connect-1.png",
    "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-connect-2.png",
    "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-connect-3.png",
];

const SCROLL_IMAGES_SECOND = [
    "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-connect-7.png",
    "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-connect-5.png",
    "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-connect-6.png",
];

export default function CareSection() {
    // 1-qator uchun uzilishlarsiz massiv
    const infiniteImagesFirst = [...SCROLL_IMAGES, ...SCROLL_IMAGES, ...SCROLL_IMAGES];

    // 2-qator uchun uzilishlarsiz massiv
    const infiniteImagesSecond = [...SCROLL_IMAGES_SECOND, ...SCROLL_IMAGES_SECOND, ...SCROLL_IMAGES_SECOND];

    return (
        <section className="saya-care">
            {/* Yuqori matnlar va chiziqlar qismi */}
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

            {/* Pastki cheksiz karusel (Infinite Scroll) qismi */}
            <div className="saya-care__marquee-container">

                {/* 1-QAVAT: Chapga qarab yuradi (Birinchi rasmlar) */}
                <div className="saya-care__marquee saya-care__marquee--left">
                    <div className="saya-care__marquee-track">
                        {infiniteImagesFirst.map((imgUrl, index) => (
                            <div key={`left-${index}`} className="saya-care__image-card">
                                <img src={imgUrl} alt={`Care aesthetic left ${index}`} className="saya-care__img" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2-QAVAT: O'ngga qarab yuradi (Ikkinchi boshqa rasmlar) */}
                <div className="saya-care__marquee saya-care__marquee--right">
                    <div className="saya-care__marquee-track">
                        {infiniteImagesSecond.map((imgUrl, index) => (
                            <div key={`right-${index}`} className="saya-care__image-card">
                                <img src={imgUrl} alt={`Care aesthetic right ${index}`} className="saya-care__img" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}