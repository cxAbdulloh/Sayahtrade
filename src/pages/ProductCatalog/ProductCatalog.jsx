import { useState, useEffect } from "react";
import "./ProductCatalog.css";

const MOCK_PRODUCTS = [
    {
        id: 1,
        title: "«Мамма Гель» 100 гр",
        category: "Женское здоровье",
        price: "190 400 UZS",
        image: "https://sayatrade.uz/wp-content/uploads/2024/11/vpcs3ib3dc541v53ks1xads4q6mpbrja-300x300.png",
        sku: "SAYA-0001",
        activeSubstance: "Экстракт диоскореи ниппонской, экстракт клевера, экстракт цветков и листьев боярышника...",
        action: "Для поддержания в норме уровня холестерина."
    },
    {
        id: 2,
        title: "Атероклефит БИО (30 капсул)",
        category: "Здоровье сердца, сосудов, вен",
        price: "91 840 UZS",
        image: "https://sayatrade.uz/wp-content/uploads/2025/07/hyoso-300x300.png",
        sku: "SAYA-0002",
        activeSubstance: "Экстракт диоскореи ниппонской, экстракт клевера.",
        action: "Для поддержания в норме уровня холестерина и давления."
    },
    {
        id: 3,
        title: "Атероклефит БИО (60 капсул)",
        category: "Здоровье сердца, сосудов, вен",
        price: "125 440 UZS",
        image: "https://sayatrade.uz/wp-content/uploads/2024/11/original_a1a03b51-1a1a-4742-8696-e2cb45057a5f-1.png",
        sku: "SAYA-0003",
        activeSubstance: "Витамины группы B.",
        action: "Для здоровья сердца."
    },
    {
        id: 4,
        title: "Биотин форте Эвалар, (60 таблеток)",
        category: "Витамины и минералы",
        price: "161 952 UZS",
        image: "https://sayatrade.uz/wp-content/uploads/2024/12/mi2qx34xybi5pyxo6aduzjhbdsitwjt6-300x300.png",
        sku: "SAYA-0004",
        activeSubstance: "Биотин, комплекс минералов.",
        action: "Для здоровья волос, кожи."
    }
];

export default function ProductCatalog() {
    const [perPage, setPerPage] = useState(24);
    const [sortBy, setSortBy] = useState("popularity");
    const [viewType, setViewType] = useState("grid-4");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const sortOptions = [
        { value: "default", label: "Исходная сортировка" },
        { value: "popularity", label: "По популярности" },
        { value: "rating", label: "По рейтингу" },
        { value: "newness", label: "По новизне" },
        { value: "price-asc", label: "По возрастанию цены" },
        { value: "price-desc", label: "По убыванию цены" }
    ];

    const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label;

    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [selectedProduct]);

    return (
        <div className="saya-catalog-container">
            <div className="saya-toolbar">
                <div className="saya-toolbar__left">Отображение 1–24 из 63</div>
                <div className="saya-toolbar__right">
                    <div className="saya-per-page">
                        <span>Показать :</span>
                        {[9, 12, 18, 24].map((num) => (
                            <button
                                key={num}
                                className={`saya-per-page__btn ${perPage === num ? "active" : ""}`}
                                onClick={() => setPerPage(num)}
                            >
                                {num}
                            </button>
                        ))}
                    </div>

                    <div className="saya-view-switcher">
                        <button className={`saya-view-btn ${viewType === "grid-4" ? "active" : ""}`} onClick={() => setViewType("grid-4")}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect width="10" height="10"/><rect x="14" width="10" height="10"/><rect y="14" width="10" height="10"/><rect x="14" y="14" width="10" height="10"/></svg>
                        </button>
                        <button className={`saya-view-btn ${viewType === "grid-3" ? "active" : ""}`} onClick={() => setViewType("grid-3")}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="4" cy="4" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="20" cy="12" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="12" cy="20" r="2"/><circle cx="20" cy="20" r="2"/></svg>
                        </button>
                    </div>

                    <div className="saya-sort-dropdown">
                        <button className="saya-sort-dropdown__trigger" onClick={() => setIsSortOpen(!isSortOpen)}>
                            {currentSortLabel} <span className="arrow">▼</span>
                        </button>
                        {isSortOpen && (
                            <ul className="saya-sort-dropdown__menu">
                                {sortOptions.map((option) => (
                                    <li
                                        key={option.value}
                                        className={sortBy === option.value ? "selected" : ""}
                                        onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                                    >
                                        {option.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* MAHSULOTLAR GRIDI (Bestsellers Karta dizayni bilan) */}
            <div className={`saya-products-grid ${viewType}`}>
                {MOCK_PRODUCTS.map((product) => (
                    <div key={product.id} className="saya-bestsellers__card">
                        <div className="saya-bestsellers__image-wrapper">
                            <img src={product.image} alt={product.title} className="saya-bestsellers__img" />
                        </div>

                        <div className="saya-bestsellers__info">
                            <h3 className="saya-bestsellers__name">{product.title}</h3>
                            <p className="saya-bestsellers__category">{product.category}</p>
                            <div className="saya-bestsellers__price">{product.price}</div>
                        </div>

                        {/* Hover harakatlari paneli */}
                        <div className="saya-bestsellers__hover-actions">
                            <button className="saya-bestsellers__btn-cart">В Корзину</button>
                            <button className="saya-bestsellers__btn-view" aria-label="Quick view" onClick={() => { setSelectedProduct(product); setQuantity(1); }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* TEZKOR KO'RISH (QUICK VIEW) MODAL OYNASI */}
            {selectedProduct && (
                <div className="saya-modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="saya-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="saya-modal-close" onClick={() => setSelectedProduct(null)}>✕</button>

                        <div className="saya-modal-left">
                            <div className="saya-modal-img-container">
                                <img src={selectedProduct.image} alt={selectedProduct.title} className="saya-modal-img" />
                            </div>
                            <button className="saya-modal-btn-more">Подробнее О Товаре</button>
                        </div>

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

                            <div className="saya-modal-meta">
                                <div><span className="saya-modal-meta-label">Артикул:</span> {selectedProduct.sku}</div>
                                <div><span className="saya-modal-meta-label">Категория:</span> {selectedProduct.category}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}