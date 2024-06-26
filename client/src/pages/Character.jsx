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

    const getAnime = async(char) => {
        let response = await fetch(`https://api.jikan.moe/v4/characters/${char.mal_id}/anime`).catch(err => console.log(err));
        let json = await response.json();
        console.log("charAnime", json);
        return json;
    }

    const callAPI = async(query) => {
        try{
            let responseOne = await fetch(query);
            if(!responseOne.ok){
                throw new Error("Network error!");
            }
            let jsonOne = await responseOne.json();
            let responseTwo = await fetch(query).catch(err => console.log(err));
            if(!responseTwo.ok){
                throw new Error("Network error!");
            }
            
            let jsonTwo = await responseTwo.json();
            let animesOne = await getAnime(jsonOne.data);
            let animesTwo = await getAnime(jsonTwo.data);
            setCharacterOne({...jsonOne.data, animes: animesOne});
            setCharacterTwo({...jsonTwo.data, animes: animesTwo});
        }catch(error){
            console.log("fetch issue: ", error);
        }
    }

    return (
        <div className="character-page">
            {characterOne && characterTwo ? <h1>{characterOne.name} or {characterTwo.name}?</h1> : null}
            {console.log(characterOne, characterTwo)}
            {characterOne && characterTwo ? <div className="characters">
                <CharCard id={characterOne.mal_id} name={characterOne.name} name_kanji={characterOne.name_kanji} 
                image_url={characterOne.images.jpg.image_url} about={characterOne.about} animes={characterOne.animes.data}/>
                <CharCard id={characterTwo.mal_id} name={characterTwo.name} name_kanji={characterTwo.name_kanji} 
                image_url={characterTwo.images.jpg.image_url} about={characterTwo.about} animes={characterTwo.animes.data}/>
            </div> : <div id="starting-characters">
            <h1 id="h1-fave">Choose your favorites!</h1>
            <h4>Add your favorites by clicking on the characters</h4>
            <button className="next-button" id="start-button" onClick={makeQuery}>Start</button>
            </div>}
            {characterOne && characterTwo ? <button className="next-button" onClick={makeQuery}>Shuffle !</button> : null}
        </div>
    );
};

export default Character;