import { useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [catalogOpen, setCatalogOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
            setCatalogOpen(false);
            setAboutOpen(false);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (searchModalOpen || mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [searchModalOpen, mobileOpen]);

    return (
        <>
            {/* MOBILE BACKDROP */}
            {mobileOpen && <div className="saya-mobile-backdrop" onClick={() => setMobileOpen(false)} />}

            {/* MOBILE DRAWER */}
            <div className={`saya-mobile-drawer${mobileOpen ? " open" : ""}`}>
                <div className="saya-mobile-drawer__search-bar">
                    <input
                        type="text"
                        placeholder="Поиск товаров"
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        className="saya-mobile-drawer__search-input"
                    />
                    {searchVal && (
                        <button className="saya-mobile-drawer__search-clear" onClick={() => setSearchVal("")}>×</button>
                    )}
                    <div className="saya-mobile-drawer__search-divider"></div>
                    <button className="saya-mobile-drawer__search-submit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                    </button>
                </div>

                <nav className="saya-mobile-drawer__nav">
                    {/* Каталог */}
                    <div>
                        <button className="saya-mobile-item__btn" onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}>
                            Каталог <span className={`saya-mobile-item__arrow${mobileCatalogOpen ? " open" : ""}`}><img src={assets.arrow} alt="" style={{ width: "10px", height: "auto", filter: "opacity(0.4)" }}/></span>
                        </button>
                        <div className={`saya-mobile-item__sub${mobileCatalogOpen ? " open" : ""}`}>
                            {[
                                { label: "Витамины и минералы", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/vitamins.svg" },
                                { label: "Женское здоровье", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/womenhealth.svg" },
                                { label: "Здоровье сердца, сосудов, вен", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/heart.svg" },
                                { label: "Лечебные чаи", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/teas.svg" },
                                { label: "Anti-Age", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/antiage.svg" },
                                { label: "Поддержка здоровья ЖКТ", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/gastrointestinal.svg" },
                                { label: "Похудение и контроль веса", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/weightloss.svg" },
                                { label: "Здоровье щитовидной железы", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/thyroid.svg" },
                                { label: "Внимания и работы мозга", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/brain.svg" },
                                { label: "Здоровье суставов и костей", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/bone.svg" }
                            ].map((item, i) => (
                                <a key={i} href="#" className="saya-mobile-item__link">
                                    <img src={item.icon} alt={item.label} width={24} height={24} />
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <Link to="/about" className="saya-mobile-item__btn" style={{display: 'block', textDecoration: 'none'}}>О Компании</Link>
                    <Link to="/" className="saya-mobile-item__btn" style={{display: 'block', textDecoration: 'none'}}>Блог</Link>
                    <Link to="/contact" className="saya-mobile-item__btn" style={{display: 'block', textDecoration: 'none'}}>Контакты</Link>

                    {/* ✅ YANGI: Где купить — mobile */}
                    <Link to="/wheretobuy" className="saya-mobile-item__btn" style={{display: 'block', textDecoration: 'none'}}>Где купить</Link>

                    {/* ✅ YANGI: Скидки — mobile */}
                    <Link to="/discounts" className="saya-mobile-item__btn" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'}}>
                        Скидки
                        <span className="saya-nav__badge">Акция</span>
                    </Link>

                    <Link
                        to="/my-account"
                        className="saya-mobile-item__btn"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '12px', textDecoration: 'none' }}
                    >
                        <img src={assets.icon_3} alt="Login" style={{ width: '18px', height: 'auto', display: 'block' }} />
                        <span style={{ fontWeight: '600' }}>Вход / регистрация</span>
                    </Link>
                </nav>
            </div>

            {/* FULLSCREEN SEARCH MODAL */}
            <div className={`saya-fullscreen-search${searchModalOpen ? " open" : ""}`}>
                <button className="saya-fullscreen-search__close" onClick={() => setSearchModalOpen(false)}>×</button>
                <div className="saya-fullscreen-search__inner">
                    <div className="saya-fullscreen-search__box">
                        <input
                            type="text"
                            placeholder="Поиск товаров..."
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                            className="saya-fullscreen-search__input"
                            autoFocus={searchModalOpen}
                        />
                        <button className="saya-fullscreen-search__submit">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                        </button>
                    </div>
                    <div className="saya-fullscreen-search__hint">Введите запрос и нажмите Enter</div>
                </div>
            </div>

            {/* DESKTOP NAVBAR */}
            <nav className={`saya-nav${scrolled ? " scrolled" : ""}`}>
                <div className="saya-nav__container">

                    <button className="saya-hamburger" onClick={() => setMobileOpen(true)}>
                        <img src={assets.hamburger} alt=""/>
                    </button>

                    <div className="saya-nav__left">
                        {/* Каталог Dropdown */}
                        <div
                            className="saya-dropdown-wrap"
                            onMouseEnter={() => setCatalogOpen(true)}
                            onMouseLeave={() => setCatalogOpen(false)}
                        >
                            <button className={`saya-nav__btn${catalogOpen ? " active" : ""}`}>
                                Каталог <span className="arrow"><img src={assets.arrow} alt="arrow" style={{ width: "10px", height: "auto", filter: "opacity(0.4)" }} /></span>
                            </button>
                            <div className={`saya-dropdown-overlay${catalogOpen ? " open" : ""}`}>
                                <div className="saya-dropdown-overlay__inner">
                                    <div className="saya-dropdown-overlay__grid">
                                        {[
                                            { label: "Витамины и минералы", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/vitamins.svg" },
                                            { label: "Женское здоровье", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/womenhealth.svg" },
                                            { label: "Здоровье сердца, сосудов, вен", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/heart.svg" },
                                            { label: "Лечебные чаи", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/teas.svg" },
                                            { label: "Anti-Age", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/antiage.svg" },
                                            { label: "Поддержка здоровья ЖКТ", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/gastrointestinal.svg" },
                                            { label: "Похудение и контроль веса", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/weightloss.svg" },
                                            { label: "Здоровье щитовидной железы", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/thyroid.svg" },
                                            { label: "Внимания и работы мозга", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/brain.svg" },
                                            { label: "Здоровье суставов и костей", icon: "https://sayatrade.uz/wp-content/uploads/2025/07/bone.svg" }
                                        ].map((item, i) => (
                                            <a key={i} href="#" className="saya-dropdown-overlay__item">
                                                <img src={item.icon} alt={item.label} width={36} height={36} />
                                                {item.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* О нас Dropdown */}
                        <div
                            className="saya-dropdown-wrap"
                            onMouseEnter={() => setAboutOpen(true)}
                            onMouseLeave={() => setAboutOpen(false)}
                        >
                            <button className={`saya-nav__btn${aboutOpen ? " active" : ""}`}>
                                О нас <span className="arrow"><img src={assets.arrow} alt="arrow" style={{ width: "10px", height: "auto", filter: "opacity(0.4)" }} /></span>
                            </button>
                            <div className={`saya-dropdown-overlay${aboutOpen ? " open" : ""}`}>
                                <div className="saya-dropdown-overlay__inner">
                                    <div className="saya-dropdown-overlay__grid">
                                        {[
                                            { label: "О Компания", path: "/about" },
                                            { label: "Контакты", path: "/contact" },
                                            { label: "Новости", path: "/" }
                                        ].map((item, i) => (
                                            <Link key={i} to={item.path} className="saya-dropdown-overlay__item" onClick={() => setAboutOpen(false)}>
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ✅ YANGI: Где купить */}
                        <Link to="/wheretobuy" className="saya-nav__btn" style={{ textDecoration: 'none' }}>
                            Где купить
                        </Link>

                        {/* ✅ YANGI: Скидки badge bilan */}
                        <Link to="/discounts" className="saya-nav__btn saya-nav__btn--deals" style={{ textDecoration: 'none' }}>
                            Скидки
                            <span className="saya-nav__badge">Акция</span>
                        </Link>

                        {/* Search */}
                        <button className="saya-search-btn" onClick={() => setSearchModalOpen(true)}>
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                        </button>
                    </div>

                    <Link to="/" className="saya-logo-slot">
                        <img src={assets.saya} alt=""/>
                    </Link>

                    <Link to="/contactwithus" className="saya-cta-btn">Связаться С Нами</Link>

                    <button className="saya-cart-btn">
                        <img src={assets.icon_2} alt="Cart"/>
                    </button>

                </div>
            </nav>
        </>
    );
}