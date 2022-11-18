import styles from "./Header.module.scss";
import logo from "../../asset/images/voting.JPG"
import HeaderMenuXS from "./components/HeaderMenu/HeaderMenuXS";
import { useState } from "react";

function Header() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className={`${styles.header} d-flex flex-row align-items-center`}>

            <div className="flex-fill">
                <img src={logo} alt="Logo" />
            </div>
        </header >
    );
}

export default Header; 