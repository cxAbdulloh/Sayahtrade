import React, { useRef } from "react";
import "./Categories.css";

const CATEGORIES_DATA = [
    {
        id: 1,
        title: "ANTI-AGE",
        image: "https://sayatrade.uz/wp-content/uploads/2025/07/antiage-1.jpg"
    },
    {
        id: 2,
        title: "ВИТАМИНЫ И МИНЕРАЛЫ",
        image: "https://sayatrade.uz/wp-content/uploads/2024/12/js_bi1l4.jpg"
    },
    {
        id: 3,
        title: "ВНИМАНИЯ И РАБОТЫ МОЗГА",
        image: "https://sayatrade.uz/wp-content/uploads/2025/07/brain-150x147.jpg"
    },
    {
        id: 4,
        title: "ЖЕНСКОЕ ЗДОРОВЬЕ",
        image: "https://sayatrade.uz/wp-content/uploads/2024/12/priority-product-x-large-150x150.png"
    },
    {
        id: 5,
        title: "ЗДОРОВЬЕ СЕРДЦА, СОСУДОВ, ВЕН",
        image: "https://sayatrade.uz/wp-content/uploads/2024/12/heart-health.jpg"
    },
    {
        id: 6,
        title: "ЗДОРОВЬЕ СУСТАВОВ И КОСТЕЙ",
        image: "https://sayatrade.uz/wp-content/uploads/2024/12/joints-health.jpg"
    },
    {
        id: 7,
        title: "ЗДОРОВЬЕ ЩИТОВИДНОЙ ЖЕЛЕЗЫ",
        image: "https://sayatrade.uz/wp-content/uploads/2024/12/thyroid-health.jpg"
    },
    {
        id: 8,
        title: "ЛЕЧЕБНЫЕ ЧАИ",
        image: "https://sayatrade.uz/wp-content/uploads/2024/12/herbal-tea.jpg"
    }
];

export default function Categories() {
    const scrollRef = useRef(null);

    // To'liq 4 ta kartani birdaniga o'tkazish mantiqi
    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;

            // clientWidth - ko'rinib turgan 4 ta kartaning umumiy kengligi
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
                    {/* Chapga burish tugmasi */}
                    <button
                        className="saya-categories__arrow saya-categories__arrow--left"
                        onClick={() => handleScroll("left")}
                        aria-label="Previous"
                    >
                        ‹
                    </button>

                    {/* Scroll bo'luvchi asosiy konteyner */}
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

                    {/* O'ngga burish tugmasi */}
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