import React, { useRef } from "react";
import "./Categories.css";
import {assets} from "../../assets/assets.js";

const CATEGORIES_DATA = [
    {
        id: 1,
        title: "ANTI-AGE",
        image: assets.photo_1,
    },
    {
        id: 2,
        title: "ВИТАМИНЫ И МИНЕРАЛЫ",
        image: assets.photo_2,
    },
    {
        id: 3,
        title: "ВНИМАНИЯ И РАБОТЫ МОЗГА",
        image: assets.photo_3,
    },
    {
        id: 4,
        title: "ЖЕНСКОЕ ЗДОРОВЬЕ",
        image: assets.photo_4,
    },
    {
        id: 5,
        title: "ЗДОРОВЬЕ СЕРДЦА, СОСУДОВ, ВЕН",
        image: assets.photo_5,
    },
    {
        id: 6,
        title: "ЗДОРОВЬЕ СУСТАВОВ И КОСТЕЙ",
        image: assets.photo_6,
    },
    {
        id: 7,
        title: "ЗДОРОВЬЕ ЩИТОВИДНОЙ ЖЕЛЕЗЫ",
        image: assets.photo_8,
    },
    {
        id: 8,
        title: "ЛЕЧЕБНЫЕ ЧАИ",
        image: assets.photo_7,
    }
];

export default function Categories() {
    const scrollRef = useRef(null);

    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;

            const scrollAmount = clientWidth;

            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="saya-categories">
            <div className="saya-categories__container">
                <h2 className="saya-categories__title">Популярные категории</h2>

                <div className="saya-categories__slider-wrapper">
                    <button
                        className="saya-categories__arrow saya-categories__arrow--left"
                        onClick={() => handleScroll("left")}
                        aria-label="Previous"
                    >
                        ‹
                    </button>

                    <div className="saya-categories__grid" ref={scrollRef}>
                        {CATEGORIES_DATA.map((category) => (
                            <div key={category.id} className="saya-categories__card">
                                <div className="saya-categories__image-wrapper">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="saya-categories__img"
                                    />
                                </div>
                                <span className="saya-categories__name">{category.title}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        className="saya-categories__arrow saya-categories__arrow--right"
                        onClick={() => handleScroll("right")}
                        aria-label="Next"
                    >
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
}