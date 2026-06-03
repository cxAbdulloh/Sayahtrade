import React from "react";
import "./CareSection.css";

// const SCROLL_IMAGES = [
//     "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-connect-1.png",
//     "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-connect-2.png",
//     "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-connect-3.png",
// ];
//
// const SCROLL_IMAGES_SECOND = [
//     "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-connect-7.png",
//     "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-connect-5.png",
//     "https://sayatrade.uz/wp-content/uploads/2024/03/w-pas-connect-6.png",
// ];

export default function CareSection() {

    // const infiniteImagesFirst = [...SCROLL_IMAGES, ...SCROLL_IMAGES, ...SCROLL_IMAGES];
    //
    //
    // const infiniteImagesSecond = [...SCROLL_IMAGES_SECOND, ...SCROLL_IMAGES_SECOND, ...SCROLL_IMAGES_SECOND];

    return (
        <section className="saya-care">

            <div className="saya-care__header">
                <p className="saya-care__top-text">
                    Мы предлагаем витамины и БАДы, которые поддержат вашу энергию, иммунитет и общее самочувствие.
                </p>

                <div className="saya-care__title-wrapper">
                    <div className="saya-care__line"></div>
                    <h2 className="saya-care__title">
                        Забота о здоровье начинается с <br />
                        <span className="saya-care__highlight">правильных добавок!</span>
                    </h2>
                    <div className="saya-care__line"></div>
                </div>

                <p className="saya-care__bottom-text">
                    Качество и эффективность каждого продукта проверены, чтобы вы могли доверять своему выбору. Откройте путь к лучшему здоровью с нами!
                </p>
            </div>


            {/*<div className="saya-care__marquee-container">*/}

            {/*    <div className="saya-care__marquee saya-care__marquee--left">*/}
            {/*        <div className="saya-care__marquee-track">*/}
            {/*            {infiniteImagesFirst.map((imgUrl, index) => (*/}
            {/*                <div key={`left-${index}`} className="saya-care__image-card">*/}
            {/*                    <img src={imgUrl} alt={`Care aesthetic left ${index}`} className="saya-care__img" />*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}


            {/*    <div className="saya-care__marquee saya-care__marquee--right">*/}
            {/*        <div className="saya-care__marquee-track">*/}
            {/*            {infiniteImagesSecond.map((imgUrl, index) => (*/}
            {/*                <div key={`right-${index}`} className="saya-care__image-card">*/}
            {/*                    <img src={imgUrl} alt={`Care aesthetic right ${index}`} className="saya-care__img" />*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</div>*/}
        </section>
    );
}