import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "./Anime.css";

const AnimeInfo = () => {
    const {id, from} = useParams();
    const [anime, setAnime] = useState([]);
    const [animeGenres, setAnimeGenres] = useState("");
    const [video, setVideo] = useState("");
    
    useEffect(() => {
        const getAnime = async() => {
            if(from === "history"){
                const response = await fetch(`http://localhost:3000/getAnime/${id}`, {
                    method: 'GET',
                }).catch(err => console.log(err));
                const data = await response.json()
                console.log("data", data);
                setAnime(data);

                let genres = "";
                if(data.animeGenres){
                    for(const index in data.animeGenres){
                        console.log(data.animeGenres[index].name);
                        if(genres.length === 0){
                            genres = data.animeGenres[index].name;
                        }else{
                            genres = genres + ", " + data.animeGenres[index].name;
                        }
                    }
                }

                setAnimeGenres(genres);

                if(data.animeTrailer){
                    setVideo(data.animeTrailer.replace("watch?v=", "embed/"));
                    console.log(data.animeTrailer.replace("watch?v=", "embed/"));
                }
            }else if (from === "favorite"){
                const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
                const data = await response.json();
                if(data.status === 500){
                    alert("something went wrong fetching this data... Try again later!")
                }else{
                    console.log("data", data);
                    setAnime({
                        animeName: data.data.title,
                        animeNameENG: data.data.title_english,
                        animeImg: data.data.images.jpg.image_url,
                        animeEpisodes: data.data.episodes,
                        animeScore: data.data.score,
                        animeStatus: data.data.status,
                        animeSource: data.data.source,
                        animeInfo: data.data.synopsis
                    });

                    let genres = "";
                    if(data.data.genres){
                        for(const index in data.data.genres){
                            console.log(data.data.genres[index].name);
                            if(genres.length === 0){
                                genres = data.data.genres[index].name;
                            }else{
                                genres = genres + ", " + data.data.genres[index].name;
                            }
                        }
                    }

                    setAnimeGenres(genres);

                    if(data.data.trailer.url){
                        setVideo(data.data.trailer.url.replace("watch?v=", "embed/"));
                        console.log(data.data.trailer.url.replace("watch?v=", "embed/"));
                    }
                }
            }
        }

        getAnime();
    }, [])
    

    return(
        <div className="animeInfo-page">
            {anime ? <div className="animeInfo">
                {anime.animeName && anime.animeNameENG? (<h3 className="anime-title">{anime.animeName} ({anime.animeNameENG})</h3>) 
                : <h3 className="anime-title">{anime.animeName}</h3>}
                {video ? <iframe className="trailer-video" src={video} picture-in-picture allowFullScreen></iframe> : <img src={anime.animeImg} alt={anime.animeName} />}
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