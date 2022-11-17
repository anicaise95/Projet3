import React, { useRef } from 'react';
import { useState, useEffect, useContext } from 'react';
import styles from "./Homepage.module.scss";
import Recipe from "./components/Recipe/Recipe";
import Loading from "../../components/Loading/Loading";
import { ApiContext } from '../../contexts/AppContext';
import { Owner } from '../../contexts/AppContext';
import TimelineComponent from './components/Timeline/Timeline';

export default function Homepage() {
    const [filter, setFilter] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const BASE_URL_API = useContext(ApiContext);

    console.log(Owner);

    function handleInput(e) {
        const filter = e.target.value;
        setFilter(filter.trim().toLowerCase());
    }

    useEffect(() => {

        let cancel = false;
        async function fetchRecipes() {
            try {

                setIsLoading(true);
                // fonction type GET pour récupérer la liste des recettes
                const response = await fetch(BASE_URL_API);
                if (response.ok && !cancel) {
                    // On récupère les recettes de la réponse
                    const recipes = await response.json();
                    // On vérifie qu'on récupère un tableaun, si non on met les recettes dans un tableau
                    setRecipes(Array.isArray(recipes) ? recipes : [recipes]);
                }
            } catch (e) {
                console.log('ERREUR');
            } finally {
                if (!cancel) {
                    setIsLoading(false);
                }
            }
        }
        fetchRecipes();
        return () => (cancel = true);
    }, []);

    return (
        <div className="flex-fill container d-flex flex-column p-20">
            <h1 className="my-30">Découvrez nos nouvelles recettes</h1>
            <div className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}>
                <div className={`d-flex flex-row justify-content-center align-item-center my-30 ${styles.searchBar}`}>
                    <i className="fa-solid fa-magnifying-glass mr-15"></i>
                    <input
                        onInput={handleInput}
                        className="flex-fill"
                        type="text"
                        placeholder="Rechercher"
                    />
                </div>

                {isLoading && !recipes.length ? (
                    <Loading />
                ) : (
                    <div className={styles.grid}>
                        {recipes
                            .filter((r) => r.title.toLowerCase().startsWith(filter))
                            .map((r) => (
                                <Recipe key={r._id} title={r.title} image={r.image} />
                            ))
                        }
                    </div>
                )}
                <TimelineComponent />
            </div>
        </div>
    );
}