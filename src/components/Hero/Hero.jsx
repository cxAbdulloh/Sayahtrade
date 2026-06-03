import React, { useState } from "react";
import "./Hero.css";
import {assets} from "../../assets/assets.js";

const SCROLL_ITEMS = [
    {
        label: "Гарантия качества",
        icon: (
            <img src={assets.icon_7} className="hero-icon"/>
        )
    },
    {
        label: "Доставка",
        icon: (
            <img src={assets.icon_6} className="hero-icon"/>
        )
    },
    {
        label: "Широкий ассортимент",
        icon: (
            <img src={assets.icon_4} className="hero-icon"/>
        )
    },
    {
        label: "Гарантия безопасности",
        icon: (
            <img src={assets.icon_5} className="hero-icon"/>
        )
    }
];

export default function Hero() {
    const marqueeItems = [...SCROLL_ITEMS, ...SCROLL_ITEMS];
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="saya-hero">
            <div className="saya-hero__container">

                <div className="saya-hero__left">
                    <h1 className="saya-hero__title">
                        Наполните свою <span className="saya-hero__highlight">жизнь энергией</span> и здоровьем вместе <span className="saya-hero__highlight">с нашими витаминами!</span>
                    </h1>
                    <p className="saya-hero__subtitle">
                        Мы помогаем людям заботиться о здоровье и красоте, предоставляя только проверенные БАДы и витамины с гарантией эффективности и безопасности.
                    </p>

                    <div className="saya-hero__marquee-container">
                        <div className="saya-hero__marquee-track">
                            {marqueeItems.map((item, index) => (
                                <div key={index} className="saya-hero__badge">
                                    <span className="saya-hero__badge-icon">
                                        {item.icon}
                                    </span>
                                    <span className="saya-hero__badge-label">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="saya-hero__right">
                    <div className="saya-hero__image-wrapper">
                        {isPlaying ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/WpNHw3Zkj68?autoplay=1"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", border: "none" }}
                            ></iframe>
                        ) : (
                            <>
                                <img
                                    src={assets.hero}
                                    alt=""
                                    className="saya-hero__video"
                                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                />

                                <button className="saya-hero__play-btn" aria-label="Play video" onClick={() => setIsPlaying(true)}>
                                    <svg className="saya-hero__play-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}