"use client";

import { useState } from "react";
import CharCard from "../components/CharCard";

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
            console.log(characterOne);

            setCharacterTwo({...jsonTwo.data, animes: animesTwo});
            console.log(characterTwo);
        }catch(error){
            console.log("fetch issue: ", error);
        }
    }

    return (
        <div className="
            flex flex-col justify-start items-center 
            min-h-screen w-screen overflow-hidden pt-8">
            {characterOne && characterTwo ? <p className="font-bold text-4xl">{characterOne.name} or {characterTwo.name}?</p> : null}
            {characterOne && characterTwo ? 
            <div className="flex justify-evenly items-start w-full">
                <CharCard 
                id={characterOne.mal_id} name={characterOne.name} name_kanji={characterOne.name_kanji} 
                image_url={characterOne.images.jpg.image_url} about={characterOne.about} animes={characterOne.animes.data}/>
                <CharCard id={characterTwo.mal_id} name={characterTwo.name} name_kanji={characterTwo.name_kanji} 
                image_url={characterTwo.images.jpg.image_url} about={characterTwo.about} animes={characterTwo.animes.data}/>
            </div> : <div id="starting-characters">
            <p className="font-bold">Discover your new favorites!</p>
            <button className="next-button" id="start-button" onClick={makeQuery}>Start</button>
            </div>}
            {characterOne && characterTwo ? <button className="px-4 py-2 mt-4" onClick={makeQuery}>Shuffle !</button> : null}
        </div>
    );
};

export default Character;