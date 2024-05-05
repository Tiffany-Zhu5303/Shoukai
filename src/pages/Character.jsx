import React, {useState} from "react";
import CharCard from "../components/CharCard";
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
            {characterOne && characterTwo ? <h1>{characterOne.name} or {characterTwo.name}?</h1> : null}
            {characterOne && characterTwo ? <div className="characters">
                <CharCard name={characterOne.name} name_kanji={characterOne.name_kanji} 
                image_url={characterOne.images.jpg.image_url} about={characterOne.about} />
                <CharCard name={characterTwo.name} name_kanji={characterTwo.name_kanji} 
                image_url={characterTwo.images.jpg.image_url} about={characterTwo.about} />
            </div> : <div id="starting-characters">
            
            <h1 id="h1-fave">Choose your favorites!</h1>
            <button className="next-button" id="start-button" onClick={makeQuery}>Start</button>
            </div>}
            {characterOne && characterTwo ? <button className="next-button" onClick={makeQuery}>Next character!</button> : null}
        </div>
    );
};

export default Character;