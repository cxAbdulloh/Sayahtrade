import React, { useRef, useState, useEffect } from "react";
import "./Bestsellers.css";

const BESTSELLERS_DATA = [
    {
        id: 1,
        title: "Атероклефит БИО (30 капсул)",
        category: "Здоровье сердца, сосудов, вен",
        price: "91 840 UZS",
        image: "https://sayatrade.uz/wp-content/uploads/2024/11/vpcs3ib3dc541v53ks1xads4q6mpbrja-300x300.png",
        sku: "SAYA-0001",
        activeSubstance: "Экстракт диоскореи ниппонской, экстракт клевера, экстракт цветков и листьев боярышника, рутин, витамин С, витамин PP (ниацин).",
        action: "Для поддержания в норме уровня холестерина и артериального давления."
    },
    {
        id: 2,
        title: "Атероклефит БИО (60 капсул)",
        category: "Здоровье сердца, сосудов, вен",
        price: "125 440 UZS",
        image: "https://sayatrade.uz/wp-content/uploads/2025/07/hyoso-300x300.png",
        sku: "SAYA-0002",
        activeSubstance: "Экстракт диоскореи ниппонской, экстракт клевера, экстракт цветков.",
        action: "Для поддержания в норме уровня холестерина."
    },
    {
        id: 3,
        title: "Биотин форте Эвалар, (60 таблеток)",
        category: "Витамины и mineralы",
        price: "161 952 UZS",
        image: "https://sayatrade.uz/wp-content/uploads/2024/11/original_a1a03b51-1a1a-4742-8696-e2cb45057a5f-1.png",
        sku: "SAYA-0003",
        activeSubstance: "Биотин, витамины группы B.",
        action: "Для здоровья волос, кожи и ногтей."
    },
    {
        id: 4,
        title: "Боровая матка, trava",
        category: "Женское здоровье",
        price: "77 840 UZS",
        image: "https://sayatrade.uz/wp-content/uploads/2024/12/mi2qx34xybi5pyxo6aduzjhbdsitwjt6-300x300.png",
        sku: "SAYA-0004",
        activeSubstance: "Трава боровой матки (ортилия однобокая).",
        action: "Для поддержания функций женской репродуктивной системы."
    },
    {
        id: 5,
        title: "Боярышник с калием и магнием",
        category: "Здоровье сердца, сосудов, вен",
        price: "123 200 UZS",
        image: "https://sayatrade.uz/wp-content/uploads/2024/12/vx8xpczsw6tm8fkc1jucr1f0c637k693-300x300.png",
        sku: "SAYA-0005",
        activeSubstance: "Экстракт боярышника, аспарагинат калия, аспарагинат магния.",
        action: "Для поддержки сердечно-сосудистой системы."
    }
];

export default function Bestsellers() {
    const scrollRef = useRef(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Modal ochilganda orqa fon skroll bo'lib ketmasligi uchun
    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [selectedProduct]);

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

    const openModal = (product) => {
        setSelectedProduct(product);
        setQuantity(1); // Har safar yangi ochilganda 1 tadan boshlanadi
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <section className="saya-bestsellers">
            <div className="saya-bestsellers__container">
                <h2 className="saya-bestsellers__title">Бестселлеры</h2>

                <div className="saya-bestsellers__slider-wrapper">
                    <button className="saya-bestsellers__arrow saya-bestsellers__arrow--left" onClick={() => handleScroll("left")} aria-label="Previous">‹</button>

                    <div className="saya-bestsellers__grid" ref={scrollRef}>
                        {BESTSELLERS_DATA.map((product) => (
                            <div key={product.id} className="saya-bestsellers__card">
                                <div className="saya-bestsellers__image-wrapper">
                                    <img src={product.image} alt={product.title} className="saya-bestsellers__img" />
                                </div>

                                <div className="saya-bestsellers__info">
                                    <h3 className="saya-bestsellers__name">{product.title}</h3>
                                    <p className="saya-bestsellers__category">{product.category}</p>
                                    <div className="saya-bestsellers__price">{product.price}</div>
                                </div>

                                <div className="saya-bestsellers__hover-actions">
                                    <button className="saya-bestsellers__btn-cart">В Корзину</button>
                                    <button className="saya-bestsellers__btn-view" aria-label="Quick view" onClick={() => openModal(product)}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="saya-bestsellers__arrow saya-bestsellers__arrow--right" onClick={() => handleScroll("right")} aria-label="Next">›</button>
                </div>
            </div>

            {selectedProduct && (
                <div className="saya-modal-overlay" onClick={closeModal}>
                    <div className="saya-modal-content" onClick={(e) => e.stopPropagation()}>

                        {/* Yopish tugmasi (X) */}
                        <button className="saya-modal-close" onClick={closeModal} aria-label="Close modal">✕</button>

                        {/* Chap tomon: Rasm va Batafsil tugmasi */}
                        <div className="saya-modal-left">
                            <div className="saya-modal-img-container">
                                <img src={selectedProduct.image} alt={selectedProduct.title} className="saya-modal-img" />
                            </div>
                            <button className="saya-modal-btn-more">Подробнее О Товаре</button>
                        </div>

                        {/* O'ng tomon: Ma'lumotlar palitrasi */}
                        <div className="saya-modal-right">
                            <h3 className="saya-modal-title">{selectedProduct.title}</h3>
                            <div className="saya-modal-price">{selectedProduct.price}</div>

                            <div className="saya-modal-section">
                                <span className="saya-modal-label">Активное вещество:</span>
                                <p className="saya-modal-text">{selectedProduct.activeSubstance}</p>
                            </div>

                            <div className="saya-modal-section">
                                <span className="saya-modal-label">Действие:</span>
                                <p className="saya-modal-text">{selectedProduct.action}</p>
                            </div>

                            {/* Sanoq va Sotib olish hududi */}
                            <div className="saya-modal-actions">
                                <div className="saya-modal-counter">
                                    <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}>−</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)}>+</button>
                                </div>
                                <button className="saya-modal-btn-cart">В Корзину</button>
                                <button className="saya-modal-btn-buy">Купить Сейчас</button>
                            </div>

                            <hr className="saya-modal-divider" />

                            {/* Meta ma'lumotlar */}
                            <div className="saya-modal-meta">
                                <div><span className="saya-modal-meta-label">Артикул:</span> {selectedProduct.sku}</div>
                                <div><span className="saya-modal-meta-label">Категория:</span> {selectedProduct.category}</div>
                            </div>

                            {/* Ijtimoiy tarmoqlar */}
                            <div className="saya-modal-share">
                                <span className="saya-modal-meta-label">Поделиться:</span>
                                <div className="saya-modal-socials">
                                    <span>f</span>
                                    <span>𝕏</span>
                                    <span>℗</span>
                                    <span>in</span>
                                    <span>✈</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </section>
    );
}