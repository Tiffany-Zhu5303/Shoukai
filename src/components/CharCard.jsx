import React from "react";

const CharCard = (props) => {
    return (
        <div className="character-card">
            <h2 className="char-name">{props.name}</h2> 
            {props.name_kanji ? <h3 className="char-name">({props.name_kanji})</h3> : null}
            <img src={props.image_url} alt={"image of " + props.name}/>
            {props.about ? <p>{props.about}</p> : <p>No info found on {props.name}</p>}
        </div>
    );
};

export default CharCard;