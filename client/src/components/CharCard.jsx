import React from "react";

const CharCard = (props) => {
    const addFavorite = async() => {
        await fetch(`http://localhost:3000/addFavorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({characterId: props.id, characterName: props.name, characterAnimes: props.animes,
                characterNameJPN: props.name_kanji, characterInfo:props.about, characterImg: props.image_url, type: "character"}),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.status);
        })
    }

    return (
        <div className="character-card" onClick={addFavorite}>
            <h2 className="char-name">{props.name}</h2> 
            {props.name_kanji ? <h3 className="char-name">({props.name_kanji})</h3> : null}
            <img src={props.image_url} alt={props.name}/>
            {props.about ? <p>{props.about}</p> : <p>No info found on {props.name}</p>}
        </div>
    );
};

export default CharCard;