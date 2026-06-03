import { useState, useRef } from "react";
import "./CategoriesSlider.css";
import ProductCatalog from "../../pages/ProductCatalog/ProductCatalog.jsx";

export default function CategoriesSlider() {
    const categories = [
        { label: "Лечебные Чаи", icon: "https://sayatrade.uz/wp-content/uploads/2024/12/hd0acc5525a8f4057b2810a5adab28a7-150x150.jpg" },
        { label: "Anti-Age", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/antiage-1-150x150.jpg" },
        { label: "Витамины И Минералы", icon: "https://sayatrade.uz/wp-content/uploads/2024/12/js_bi1l4-150x150.jpg" },
        { label: "Внимания И Работы Мозга", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/brain-150x150.jpg" },
        { label: "Женское Здоровье", icon: "https://sayatrade.uz/wp-content/uploads/2024/12/priority-product-x-large-150x150.png" },
        { label: "Здоровье Сердца, Сосудов, Вен", icon: "https://sayatrade.uz/wp-content/uploads/2024/11/cat1-150x150.jpg" },
        { label: "Здоровье Суставов И Костей", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/joint-health-lubrication-150x150.jpg" },
        { label: "Здоровье Щитовидной Железы", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/thyroid-150x150.jpg" },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);


    const handleScroll = () => {
        if (!scrollRef.current) return;

        const { scrollLeft, clientWidth } = scrollRef.current;

        const index = Math.round(scrollLeft / (clientWidth / 2));

        if (index >= 0 && index < categories.length) {
            setActiveIndex(index);
        }
    };

    return (
        <div className="categories-slider-container">
            <div className="saya-catalog-section">
                <div className="saya-catalog-header">
                    <h1>Каталог</h1>
                    <div className="saya-breadcrumbs">
                        <span>Главная</span> <span className="divider">/</span> <span className="active">Каталог</span>
                    </div>
                </div>

                <div
                    className="saya-catalog-grid"
                    ref={scrollRef}
                    onScroll={handleScroll}
                >
                    {categories.map((item, i) => (
                        <a href={`#${i}`} key={i} className="saya-catalog-card">
                            <div className="saya-catalog-card__img-wrapper">
                                <img src={item.icon} alt={item.label} />
                            </div>
                            <span className="saya-catalog-card__title">{item.label}</span>
                        </a>
                    ))}
                </div>

                <div className="saya-catalog-dots">
                    {categories.map((_, i) => (
                        <div
                            key={i}
                            className={`saya-catalog-dot ${i === activeIndex ? "active" : ""}`}
                        />
                    ))}
                </div>
            </div>
            <ProductCatalog/>
        </div>

    );
}