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

            {/* ON affiche les boutons que si la largeur de l'écran est supérieur à xs */}
            <ul className={styles.headerList}>
                <button className="mr-5 btn btn-reverse-primary">
                    <i className="fa-solid fa-heart mr-5"></i>
                    <span>Coups de coeur</span>
                </button>
                <button className="btn btn-primary">Connexion</button>
            </ul>
            {/* Icone menu */}
            <i onClick={() => { setShowMenu(true) }} className={`fa-solid fa-bars ${styles.headerXs}`}> </i>
            {/* Si Showmenu = true on affiche le menu pour petit ecran */}
            {showMenu && (
                <>
                    <div onClick={() => { setShowMenu(false) }} className="calc"></div>
                    <HeaderMenuXS />
                </>
            )
            }
        </header >
    );
}

export default Header; 