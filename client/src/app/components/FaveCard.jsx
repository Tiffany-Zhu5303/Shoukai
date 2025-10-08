import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../pages/Favorites.css";

const FaveCard = (props) => {
    useEffect(() => {
        console.log("props", props);
    })
    return (
        <div className="fave-card">
            {props.type === "character" ? 
            <Link to={"/character/"+props.id}>
                <div className="fave-character-card">
                    <h2 className="char-name">{props.name}</h2> 
                    {props.name_kanji ? <h3 className="char-name">({props.name_kanji})</h3> : null}
                    <img className="fave-char-img" src={props.image_url} alt={props.name}/>
                </div>
            </Link> : 
            <Link to={"/anime/"+props.id+"/favorite"}>
                <div className="fave-anime-card">
                    <h2 className="anime-name">{props.name}</h2>
                    {props.name_ENG ? <h3>({props.name_ENG})</h3> : null}
                    <img className="fave-anime-img" src={props.image_url} alt={props.name}/>
                </div>
            </Link>}
        </div>
    );
};

export default FaveCard;