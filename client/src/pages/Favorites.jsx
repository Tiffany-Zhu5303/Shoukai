import React, {useState, useEffect} from "react";
import FaveCard from "../components/FaveCard";
import "./Favorites.css";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const getFavorites = () => {
            fetch('http://localhost:3000/getFavorites', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                setFavorites(data);
                console.log("data", data);
            })
        }

        getFavorites();
    }, [])

    return(
        <div className="favorites-page">
            <h1 id="favorite-title">Your favorites</h1>
            <div className="favorite-display">
                {favorites ? Object.keys(favorites).map((item) => {
                    {console.log(favorites[item])}
                    if(favorites[item].type === "character"){
                        return(
                            <FaveCard key={favorites[item]._id} id={favorites[item].characterId} name={favorites[item].characterName} 
                            name_kanji={favorites[item].characterNameJPN} image_url={favorites[item].characterImg} 
                            about={favorites[item].characterInfo} type={favorites[item].type}/>
                        );
                    }else{
                        console.log("what", favorites[item].type);
                    }
                })

                    : null}
            </div>
        </div>
    );
};

export default Favorites    