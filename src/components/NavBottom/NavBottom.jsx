import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBottom.css";
import { assets } from "../../assets/assets.js";

export default function NavBottom({ cartCount = 0 }) {
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <>
            <nav className="bottom-nav">

                <Link to="/shop" className="bottom-nav__item">
                    <img src={assets.icon_1} width={24} />
                    <span>Магазин</span>
                </Link>

                <button
                    className="bottom-nav__item"
                    onClick={() => setCartOpen(true)}
                >
                    <img src={assets.icon_2} width={24} />
                    <span>Заказ</span>

                    {cartCount > 0 && (
                        <span className="bottom-nav__badge">
                            {cartCount}
                        </span>
                    )}
                </button>

                <Link to="/my-account" className="bottom-nav__item">
                    <img src={assets.icon_3} width={24} />
                    <span>Мой аккаунт</span>
                </Link>
            </nav>

            {cartOpen && (
                <>
                    <div
                        className="cart-overlay"
                        onClick={() => setCartOpen(false)}
                    />

                    <div className="cart-drawer">

                        <div className="cart-drawer__header">
                            <h3>Корзина</h3>

                            <button
                                onClick={() => setCartOpen(false)}
                                className="cart-close"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="cart-empty">
                            <div className="cart-empty__icon">
                                <img src="https://static.vecteezy.com/system/resources/previews/052/944/503/non_2x/shopping-backet-icon-buy-sign-for-sale-web-site-shop-retail-market-and-commerce-store-symbol-vector.jpg" alt="" />
                            </div>

                            <p>Корзина пуста.</p>

                            <Link to="/shop"
                                className="cart-return-btn"
                                onClick={() => setCartOpen(false)}
                            >
                                Вернуться в Магазин
                            </Link>
                        </div>

                    </div>
                </>
            )}
        </>
    );
}