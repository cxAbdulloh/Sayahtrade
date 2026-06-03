import React from "react";
import "./FeaturesVideo.css";

export default function FeaturesVideo() {
    return (
        <section className="features-container">
            <div className="saya-features">
                <div className="saya-features__container">

                    <div className="saya-features__left">
                        <h2 className="saya-features__title">
                            Эффективные витамины <br /> для вашего здоровья
                        </h2>
                        <p className="saya-features__subtitle">
                            Наши витамины и добавки созданы для того, чтобы поддерживать ваше здоровье,
                            восполняя нехватку жизненно важных питательных веществ. Все продукты
                            проходят строгие испытания для подтверждения их качества и надежности
                        </p>

                        <ul className="saya-features__list">
                            <li className="saya-features__list-item">
                                Продукция, разработанная ведущими мировыми компаниями
                            </li>
                            <li className="saya-features__list-item">
                                Надежность и доверие, проверенные временем
                            </li>
                            <li className="saya-features__list-item">
                                Широкий выбор витаминов и биодобавок для поддержки вашего здоровья
                            </li>
                        </ul>

                        <div className="saya-features__cta">
                        <span className="saya-features__cta-text">
                            Нужна консультация? Обратитесь к нам!
                        </span>
                            <a href="tel:+998" className="saya-features__btn">
                                Позвонить
                                <svg className="saya-features__btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </div>
                    </div>


                    <div className="saya-features__right">
                        <div className="saya-features__video-wrapper">
                            <video
                                className="saya-features__video"
                                src="https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-video-desktop.-mp4.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>

    );
}