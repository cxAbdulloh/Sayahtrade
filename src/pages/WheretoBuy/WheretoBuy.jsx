import "./WheretoBuy.css";

const marketplaces = [
    {
        name: "Яндекс Маркет",
        tag: "⭐️ 4.9 · 2983+ отзывов",
        hint: "Скидки до 26%",
        url: "https://ya.cc/t/WdBoHC158BFeG2",
        icon: <img src="https://logo-teka.com/wp-content/uploads/2025/06/yandex-market-sign-logo.png" alt="Яндекс Маркет" width="40" height="40" style={{ borderRadius: "10px", objectFit: "contain" }} />,
    },
    {
        name: "Uzum Market",
        tag: "Официальный магазин",
        hint: "SAYA Health Trade",
        url: "https://uzum.uz/ru/shop/sayahealthtrade",
        icon: <img src="https://uzum.com/images/services/market-logo.png" alt="Uzum Market" width="40" height="40" style={{ borderRadius: "10px", objectFit: "contain" }} />,
    },
];

const pharmacies = [
    {
        name: "Grand Pharm",
        tag: "Аптечная сеть",
        hint: "grandpharm.uz",
        url: "https://www.grandpharm.uz/uz",
        logo: "https://www.grandpharm.uz/assets/logo.svg",
    },
    {
        name: "Dorixona 03",
        tag: "Аптека",
        hint: "dorixona03.uz",
        url: "https://dorixona03.uz/",
        logo: "https://static.tildacdn.one/tild3931-6666-4366-b239-336536363531/03-logo.svg",
    },
    {
        name: "A5 Аптека",
        tag: "Аптечная сеть",
        hint: "a5apteka.uz",
        url: "https://a5apteka.uz/ru",
        logo: "https://a5apteka.uz/_next/image?url=https%3A%2F%2Fapi.a5apteka.uz%2Fuploads%2F2025-04-14%2F8aa4d519-02ad-44ff-9f21-0d46730fa4cb.png&w=640&q=75",
    },
    {
        name: "Shoh Pharm",
        tag: "Instagram аптека",
        hint: "@shohpharm.uz",
        url: "https://www.instagram.com/shohpharm.uz",
        logo: "https://static.tildacdn.one/tild3264-6362-4563-a230-343138393365/IMG_7719.PNG"
    },
    {
        name: "Best Pharm",
        tag: "Instagram аптека",
        hint: "@bestpharm_uz",
        url: "https://www.instagram.com/bestpharm_uz",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA8PMg7qRyzBgRIi2eF0fOOJcvqFSgZtZnaQ&s"
       },
    {
        name: "Vaksinamed",
        tag: "Instagram аптека",
        hint: "@vaksinamed.sam",
        url: "https://www.instagram.com/vaksinamed.sam",
        logo: "https://img.hhcdn.ru/employer-logo-round/5482973.jpeg"
    },
];



export default function WheretoBuy() {
    return (
        <section className="wtb-section">
            <div className="wtb-container">


                <div className="wtb-header">
                    <span className="wtb-header__tag">Наличие товаров</span>
                    <h2 className="wtb-header__title">Где купить</h2>
                    <p className="wtb-header__sub">Наши продукты доступны на ведущих маркетплейсах и в аптеках Узбекистана</p>
                </div>


                <div className="wtb-group">
                    <div className="wtb-group__label">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B2D8E" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                        Маркетплейсы
                    </div>
                    <div className="wtb-grid wtb-grid--2">
                        {marketplaces.map((shop, i) => (
                            <a key={i} href={shop.url} target="_blank" rel="noopener noreferrer" className="wtb-card wtb-card--market">
                                <div className="wtb-card__icon">{shop.icon}</div>
                                <div className="wtb-card__info">
                                    <div className="wtb-card__name">{shop.name}</div>
                                    <div className="wtb-card__tag">{shop.tag}</div>
                                    <div className="wtb-card__hint">{shop.hint}</div>
                                </div>
                                <div className="wtb-card__arrow">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>


                <div className="wtb-group">
                    <div className="wtb-group__label">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B2D8E" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        Аптеки
                    </div>
                    <div className="wtb-grid wtb-grid--3">
                        {pharmacies.map((ph, i) => (
                            <a key={i} href={ph.url} target="_blank" rel="noopener noreferrer" className="wtb-card wtb-card--pharm">
                                <div className="wtb-card__icon">
                                    <img
                                        src={ph.logo}
                                        alt={ph.name}
                                        width="40"
                                        height="40"
                                        style={{ borderRadius: "10px", objectFit: "contain", background: "#f7f2fc", padding: "4px" }}
                                    />
                                </div>
                                <div className="wtb-card__info">
                                    <div className="wtb-card__name">{ph.name}</div>
                                    <div className="wtb-card__tag">{ph.tag}</div>
                                    <div className="wtb-card__hint">{ph.hint}</div>
                                </div>
                                <div className="wtb-card__arrow">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}