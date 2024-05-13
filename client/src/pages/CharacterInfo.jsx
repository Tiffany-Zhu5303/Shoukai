import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import "./Anime.css";

const CharacterInfo = () => {
    const {id} = useParams();
    const [character, setCharacter] = useState([]);
    const [characterAnimes, setCharacterAnimes] = useState([]);
    
    useEffect(() => {
        const getCharacter = () => {
            fetch(`http://localhost:3000/getCharacter/${id}`, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                console.log("data", data);
                setCharacter(data);
                setCharacterAnimes(data.characterAnimes)
            })
        }

        getCharacter();
    }, []);

    return(
        <div className="characterInfo-page">
            {character ? <div className="characterInfo">
                {character.characterName && character.characterNameJPN ? 
                (<h3 className="character-name">{character.characterName} ({character.characterNameJPN})</h3>) 
                : <h3 className="character-name">{character.characterName}</h3>}
                {character.characterImg ? <img src={character.characterImg}/> : null}
                {characterAnimes && Object.keys(characterAnimes).length > 0 ? Object.keys(characterAnimes).map((item) => {
                    return(
                        <li key={characterAnimes[item].anime.mal_id}>
                            <Link to={"/anime/"+characterAnimes[item].anime.mal_id+"/favorite"}>
                                {characterAnimes[item].anime.title}
                            </Link>
                        </li>
                    );
                }) : null}
                {character.characterInfo ? <p>About: {character.characterInfo}</p> : <p>No info found for {character.characterName}</p>}
            </div> : null}
        </div>
    );
};

export default CharacterInfo