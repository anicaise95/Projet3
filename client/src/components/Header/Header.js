import styles from "./Header.module.scss";
import logo from "../../asset/images/voting.JPG";

function Header(props) {

    return (
        <header className={`${styles.header} d-flex flex-row align-items-center`}>

            <div className="flex-fill">
                <img src={logo} alt="Logo" />
            </div>
        </header >
    );
}

export default Header; 