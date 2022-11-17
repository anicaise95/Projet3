import { useState } from "react";
import styles from "./Recipe.module.scss"

function Recipe({ title, image }) {
    const [liked, setLiked] = useState(false);

    function handleClicl() {
        setLiked(!liked);
    }

    return (
        <div className={styles.recipe} onClick={handleClicl}>
            <div className={styles.imageContainer}>
                <img src={image} alt={title} />
            </div>
            <div className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}>
                <h3 className="mb-10">{title}</h3>
                <i className={`fa-solid fa-heart ${liked ? "text-primary" : ""}`}></i>
            </div>
        </div>
    );
}

export default Recipe;