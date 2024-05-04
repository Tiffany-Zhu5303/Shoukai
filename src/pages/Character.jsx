import React, {useState} from "react";
import "./Character.css";

const Character = () => {
    const [characterOne, setCharacterOne] = useState();
    const [characterTwo, setCharacterTwo] = useState();

    const makeQuery = () => {
        let query = `https://api.jikan.moe/v4/random/characters`;
        try{callAPI(query)}
        catch{(alert('Something went wrong with that query, try again'))};
    }

    const callAPI = async(query) =>{
        let response = await fetch(query);
        let jsonOne = await response.json();
        response = await fetch(query);
        let jsonTwo = await response.json();
        console.log(jsonOne.data);
        setCharacterOne(jsonOne.data);
        setCharacterTwo(jsonTwo.data);
    }

    return (
        <div className="character-page">
            {characterOne && characterTwo ? <div className="characters">
                <div id="character-one" className="character-card">
                    <h2 className="char-name">{characterOne.name}</h2> 
                    {characterOne.name_kanji ? <h3 className="char-name">({characterOne.name_kanji})</h3> : null}
                    <img src={characterOne.images.jpg.image_url} alt={"image of " + characterOne.name}/>
                    {characterOne.about ? <p>{characterOne.about}</p> : <p>No info found on {characterOne.name}</p>}
                </div>
                <div id="character-two" className="character-card">
                    <h2 className="char-name">{characterTwo.name}</h2>
                    {characterTwo.name_kanji ? <h3 className="char-name">({characterTwo.name_kanji})</h3> : null}
                    <img src={characterTwo.images.jpg.image_url} alt={"image of " + characterTwo.name}/>
                    {characterTwo.about ? <p>{characterTwo.about}</p> : <p>No info found on {characterTwo.name}</p>}
                </div>
            </div> : <div id="starting-characters">
            
            <h1 id="h1-fave">Choose your favorites!</h1>
            <button className="next-button" id="start-button" onClick={makeQuery}>Start</button>
            </div>}
            {characterOne && characterTwo ? <button className="next-button" onClick={makeQuery}>Next character!</button> : null}
        </div>
    );
};

export default Character;