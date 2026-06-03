import "./Blog.css";


const articles = [
    {
        id: 1,
        category: "Витамины",
        title: "Витамин D: почему он важен и кому не хватает?",
        excerpt: "Витамин D влияет на иммунитет, настроение и здоровье костей. Разбираемся, кто в группе риска и как восполнить дефицит.",
        readTime: "4 мин",
        date: "Скоро",
        tag: "Популярное",
    },
    {
        id: 2,
        category: "Иммунитет",
        title: "5 способов укрепить иммунитет до наступления холодов",
        excerpt: "Простые и проверенные методы: от правильного питания до приёма БАДов — как подготовить организм к сезону простуд.",
        readTime: "5 мин",
        date: "Скоро",
        tag: null,
    },
    {
        id: 3,
        category: "Здоровье сердца",
        title: "Омега-3: мифы и реальная польза для сосудов",
        excerpt: "Что говорит наука о рыбьем жире? Разбираем состав, дозировки и на что обращать внимание при выборе добавки.",
        readTime: "6 мин",
        date: "Скоро",
        tag: null,
    },
    {
        id: 4,
        category: "Женское здоровье",
        title: "Магний: зачем он нужен женщинам и как его принимать",
        excerpt: "Усталость, тревожность, судороги в ногах — всё это может быть дефицитом магния. Рассказываем, как его восполнить.",
        readTime: "4 мин",
        date: "Скоро",
        tag: null,
    },
    {
        id: 5,
        category: "Anti-Age",
        title: "Коллаген vs гиалуроновая кислота: что выбрать?",
        excerpt: "Оба компонента популярны в anti-age уходе. Объясняем разницу, совместимость и эффективность каждого из них.",
        readTime: "5 мин",
        date: "Скоро",
        tag: "Новое",
    },
    {
        id: 6,
        category: "ЖКТ",
        title: "Пробиотики: когда они нужны и как не ошибиться с выбором",
        excerpt: "Не все пробиотики одинаково полезны. Рассказываем, какие штаммы реально работают и в каких случаях их стоит принимать.",
        readTime: "5 мин",
        date: "Скоро",
        tag: null,
    },
];

const categoryColors = {
    "Витамины": "#5B2D8E",
    "Иммунитет": "#2D7A4F",
    "Здоровье сердца": "#C0392B",
    "Женское здоровье": "#A0479E",
    "Anti-Age": "#C9A84C",
    "ЖКТ": "#2980B9",
};

const categoryBg = {
    "Витамины": "#f0eaf8",
    "Иммунитет": "#e8f5ee",
    "Здоровье сердца": "#fdecea",
    "Женское здоровье": "#f8eaf8",
    "Anti-Age": "#fdf6e3",
    "ЖКТ": "#e8f4fd",
};

function CardIllustration({ category }) {
    const icons = {
        "Витамины": (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="28" fill={categoryBg[category] || "#f0eaf8"} />
                <circle cx="40" cy="30" r="10" fill={categoryColors[category] || "#5B2D8E"} opacity="0.15"/>
                <rect x="36" y="22" width="8" height="16" rx="4" fill={categoryColors[category] || "#5B2D8E"} opacity="0.7"/>
                <rect x="32" y="26" width="16" height="8" rx="4" fill={categoryColors[category] || "#5B2D8E"} opacity="0.4"/>
                <circle cx="40" cy="55" r="6" fill={categoryColors[category] || "#5B2D8E"} opacity="0.2"/>
                <circle cx="28" cy="50" r="4" fill={categoryColors[category] || "#5B2D8E"} opacity="0.15"/>
                <circle cx="52" cy="50" r="4" fill={categoryColors[category] || "#5B2D8E"} opacity="0.15"/>
            </svg>
        ),
        "default": (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="28" fill={categoryBg[category] || "#f0eaf8"} />
                <rect x="26" y="30" width="28" height="20" rx="4" fill={categoryColors[category] || "#5B2D8E"} opacity="0.2"/>
                <rect x="30" y="34" width="20" height="3" rx="1.5" fill={categoryColors[category] || "#5B2D8E"} opacity="0.5"/>
                <rect x="30" y="40" width="14" height="3" rx="1.5" fill={categoryColors[category] || "#5B2D8E"} opacity="0.3"/>
                <circle cx="40" cy="25" r="5" fill={categoryColors[category] || "#5B2D8E"} opacity="0.3"/>
            </svg>
        )
    };
    return (
        <div className="blog-card__illustration">
            {icons[category] || icons["default"]}
        </div>
    );
}

export default function Blog() {
    const featured = articles[0];
    const rest = articles.slice(1);

    return (
        <section className="blog-section">
            <div className="blog-container">


                <div className="blog-header">
                    <span className="blog-header__tag">Полезные статьи</span>
                    <h2 className="blog-header__title">Блог о здоровье</h2>
                    <p className="blog-header__sub">Статьи пишутся — скоро здесь появятся материалы о витаминах, БАДах и здоровом образе жизни</p>
                </div>


                <div className="blog-featured">
                    <div className="blog-featured__visual">
                        <CardIllustration category={featured.category} />
                        <div className="blog-featured__coming">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            Скоро
                        </div>
                    </div>
                    <div className="blog-featured__content">
                        <span className="blog-cat" style={{ color: categoryColors[featured.category], background: categoryBg[featured.category] }}>
                            {featured.category}
                        </span>
                        {featured.tag && <span className="blog-tag">{featured.tag}</span>}
                        <h3 className="blog-featured__title">{featured.title}</h3>
                        <p className="blog-featured__excerpt">{featured.excerpt}</p>
                        <div className="blog-featured__meta">
                            <span className="blog-meta__time">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                                {featured.readTime} чтения
                            </span>
                            <button className="blog-featured__btn" disabled>
                                Скоро
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </button>
                        </div>
                    </div>
                </div>


                <div className="blog-grid">
                    {rest.map((article) => (
                        <div key={article.id} className="blog-card">
                            <div className="blog-card__top">
                                <CardIllustration category={article.category} />
                                <div className="blog-card__coming">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                                    Скоро
                                </div>
                            </div>
                            <div className="blog-card__body">
                                <div className="blog-card__header">
                                    <span className="blog-cat blog-cat--sm" style={{ color: categoryColors[article.category], background: categoryBg[article.category] }}>
                                        {article.category}
                                    </span>
                                    {article.tag && <span className="blog-tag blog-tag--sm">{article.tag}</span>}
                                </div>
                                <h4 className="blog-card__title">{article.title}</h4>
                                <p className="blog-card__excerpt">{article.excerpt}</p>
                                <div className="blog-card__meta">
                                    <span className="blog-meta__time">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                                        {article.readTime}
                                    </span>
                                    <span className="blog-meta__soon">Публикуется...</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}