import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AnimeContext } from '../components/Navbar';
import './Anime.css';

const Anime = () => {
  const displayedAnime = useContext(AnimeContext);

  useEffect(() => {
    const addHistory = () => {
      fetch('http://localhost:3000/addHistory', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ animeId: displayedAnime.anime.mal_id, animeName: displayedAnime.anime.title, animeNameENG: displayedAnime.anime.title_english, 
            animeImg: displayedAnime.anime.images.jpg.image_url, animeGenres: displayedAnime.anime.genres, animeEpisodes: displayedAnime.anime.episodes, 
            displayedAnimecore: displayedAnime.anime.score, displayedAnimeourece: displayedAnime.anime.source, animeInfo: displayedAnime.anime.synopsis, type: "anime"}),
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
      })
    }

    if(displayedAnime.anime && Object.keys(displayedAnime.anime).length > 0){
      addHistory();
    }
    
}, [displayedAnime.anime])

  const makeQuery = () => {
    let query = `https://api.jikan.moe/v4/random/anime`;
    try{callAPI(query)}
    catch{(alert('Something went wrong with that query, try again'))};
  }

  const callAPI = async(query) =>{
    let response = await fetch(query);
    let json = await response.json();

    while(json.data.rating === "Rx - Hentai"){
      response = await fetch(query);
      json = await response.json();
    }

    if (json.data.title == null || json.data.images.jpg.image_url == null){
      alert("Something went wrong with that query, try again");
    }else {
      console.log(json.data);
      displayedAnime.setAnime(json.data);
    }
  }

  const addFavorite = () => {
    fetch('http://localhost:3000/addFavorite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ animeId: displayedAnime.anime.mal_id, animeName: displayedAnime.anime.title, animeNameENG: displayedAnime.anime.title_english, 
          animeImg: displayedAnime.anime.images.jpg.image_url, animeGenres: displayedAnime.anime.genres, animeEpisodes: displayedAnime.anime.episodes, 
          displayedAnimecore: displayedAnime.anime.score, displayedAnimeourece: displayedAnime.anime.source, animeInfo: displayedAnime.anime.synopsis, type: "anime"}),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
  }

  return (
    <div className='anime-page'>
      {displayedAnime.anime && Object.keys(displayedAnime.anime).length > 0 ? 
        <div className='main-container'>
          {displayedAnime.anime.title && displayedAnime.anime.title_english? (<h3>{displayedAnime.anime.title} ({displayedAnime.anime.title_english})</h3>) 
          : <h3>{displayedAnime.anime.title}</h3>}
          {displayedAnime.anime.images.jpg ? <Link to={'/anime/'+displayedAnime.anime.mal_id}>
            <img className="anime-img" src={displayedAnime.anime.images.jpg.image_url} alt={displayedAnime.anime.title}/></Link>
          : <div></div>}
          <div className='attributes-container'>
            {displayedAnime.anime.genres.length > 0 ? (displayedAnime.anime.genres.map((genre)=> 
              (<button className='attribute-button'>Genre: {genre.name}</button>))) : (<div></div>)}
            {displayedAnime.anime.episodes ? (<button className='attribute-button'>Number of episodes: {displayedAnime.anime.episodes}</button>):(<div></div>)}
            {displayedAnime.anime.status ? (<button className='attribute-button'>Status: {displayedAnime.anime.status}</button>):(<div></div>)}
            {displayedAnime.anime.score ? (<button className='attribute-button'>Average score: {displayedAnime.anime.score}</button>):(<div></div>)}
            {displayedAnime.anime.source ? (<button className='attribute-button'>Source: {displayedAnime.anime.source}</button>):(<div></div>)}
          </div>
          <div className='buttons'>
            <button className="anime-buttons" onClick={makeQuery}>Discover!</button>
            <button className="anime-buttons" onClick={addFavorite}>Favorite</button>
          </div>
        </div> : 
        <div className='main-container'>
          <h2>Find a new anime to binge!</h2>
          <button className="anime-buttons" onClick={makeQuery}>Discover!</button>
        </div>}
    </div>
  )
}

export default Anime