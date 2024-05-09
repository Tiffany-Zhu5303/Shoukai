import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Anime.css';
import History from '../components/History';

const Anime = () => {
  const [prevAnimes, setPrevAnimes] = useState([]);
  const [anime, setAnime] = useState([]);

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
      setAnime(json.data);
      setHistory(json.data)
    }
  }

  const setHistory = (json) => {
    if(json.title_english && (json.title !== json.title_english)){
      setPrevAnimes((prevAnimes) => [...prevAnimes, {
        name: json.title+' ('+json.title_english+')', 
        image: json.images.jpg.image_url
      }])
    }else{
      setPrevAnimes((prevAnimes) => [...prevAnimes, {
        name: json.title, 
        image: json.images.jpg.image_url
      }])
    }
  }

  return (
    <div className='anime-page'>
      {anime && Object.keys(anime).length > 0 ? 
      <div className='main-container'>
        {anime.title ? (<h3>{anime.title}</h3>) : (null)}
        {anime.title_english ? <h4>({anime.title_english})</h4> : null}
        {anime.images.jpg ? <Link to={'/anime/'+anime.mal_id}><img className="anime-img" src={anime.images.jpg.image_url} alt={anime.title}/></Link>
        : <div></div>}
        <div className='attributes-container'>
          {anime.genres.length > 0 ? (anime.genres.map((genre)=> (<button className='attribute-button'>Genre: {genre.name}</button>))) : (<div></div>)}
          {anime.episodes ? (<button className='attribute-button'>Number of episodes: {anime.episodes}</button>):(<div></div>)}
          {anime.status ? (<button className='attribute-button'>Status: {anime.status}</button>):(<div></div>)}
          {anime.score ? (<button className='attribute-button'>Average score: {anime.score}</button>):(<div></div>)}
          {anime.source ? (<button className='attribute-button'>Source: {anime.source}</button>):(<div></div>)}
        </div>
        <button id="discover-button" onClick={makeQuery}>Discover!</button>
      </div> : 
      <div className='main-container'>
        <h2>Find a new anime to binge!</h2>
        <button id="discover-button" onClick={makeQuery}>Discover!</button>
      </div>}
      <div className='history-container'>
        <History animes={prevAnimes}/>
      </div>
    </div>
  )
}

export default Anime