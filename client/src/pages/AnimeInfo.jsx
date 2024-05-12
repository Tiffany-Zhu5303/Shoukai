import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "./Anime.css";

const AnimeInfo = () => {
    const {id} = useParams();
    const [anime, setAnime] = useState([]);
    const [animeGenres, setAnimeGenres] = useState("");
    const [video, setVideo] = useState("");
    
    useEffect(() => {
        const getAnime = () => {
            fetch(`http://localhost:3000/getAnime/${id}`, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                console.log("data", data);
                setAnime(data);

                if(data.animeGenres.length > 0){
                    for(const index in data.animeGenres){
                        if(animeGenres.length === 0){
                            setAnimeGenres(data.animeGenres[index].name);
                        }else{
                            setAnimeGenres(animeGenres + ", " + data.animeGenres[index].name);
                        }
                    }
                }

                if(data.animeTrailer){
                    setVideo(data.animeTrailer.replace("watch?v=", "embed/"));
                    console.log(data.animeTrailer.replace("watch?v=", "embed/"));
                }
            })
        }

        getAnime();
    }, [])
    

    return(
        <div className="animeInfo-page">
            {anime ? <div className="animeInfo">
                {anime.animeName && anime.animeNameENG? (<h3 className="anime-title">{anime.animeName} ({anime.animeNameENG})</h3>) 
                : <h3 className="anime-title">{anime.animeName}</h3>}
                {video ? <iframe className="trailer-video" src={video}></iframe> : <img src={anime.animeImg} alt={anime.animeName} />}
                {anime.animeEpisodes ? <p>Episodes: {anime.animeEpisodes}</p>: <p>Episodes: N/A</p>}
                {anime.animeScore ? <p>Rating: {anime.animeScore}/10</p>: <p>Rating: N/A</p>}
                {anime.animeStatus ? <p>Status: {anime.animeStatus}</p> : <p>Status: N/A</p>}
                {anime.animeSource ? <p>Source: {anime.animeSource} </p>: <p>Source: N/A</p>}
                {animeGenres ? <p>Genres: {animeGenres}</p> : <p>Genres: N/A</p>}
                {anime.animeInfo ? <p>Synopsis: {anime.animeInfo}</p> : <p>No synopsis found for {anime.animeName}</p>}
            </div> : null}
        </div>
    );
};

export default AnimeInfo;