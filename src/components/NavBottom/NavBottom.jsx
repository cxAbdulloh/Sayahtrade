import {Link} from "react-router-dom";
import "./NavBottom.css";
import { assets } from "../../assets/assets.js";

export default function NavBottom({ cartCount = 0 }) {
    return (
        <nav className="bottom-nav">

            <Link to="/shop" className="bottom-nav__item">
                <img src={assets.icon_1} width={24} />
                <span>Магазин</span>
            </Link>

            <div to="/cart" className="bottom-nav__item">
                <img src={assets.icon_2} width={24} />
                <span>Заказ</span>

                {cartCount > 0 && (
                    <span className="bottom-nav__badge">{cartCount}</span>
                )}
            </div>

            <Link to="/my-account" className="bottom-nav__item">
                <img src={assets.icon_3} width={24} />
                <span>Мой аккаунт</span>
            </Link>

        </nav>
    );
}