import { useState } from 'react';
import './Anime.css';
import History from '../components/History';

const Anime = () => {
  const [image, setImage] = useState("");
  const [animeName, setAnimeName] = useState("");
/*   const [genres, setGenres] = useState([]); */
  const [episodes, setEpisodes] = useState(null);
  const [avgScore, setAvgScore] = useState(null);
  const [status, setStatus] = useState(null);
  const [source, setSource] = useState(null);
  const [prevAnimes, setPrevAnimes] = useState([]);
  const [filters, setFilters] = useState([]);

  const makeQuery = () => {
    let query = `https://api.jikan.moe/v4/random/anime`;
    try{callAPI(query)}
    catch{(alert('Something went wrong with that query, try again'))};
  }

  const callAPI = async(query) =>{
    let response = await fetch(query);
    let json = await response.json();

    while(json.data.rating == "Rx - Hentai"){
      console.log("oops", json);
      response = await fetch(query);
      json = await response.json();
    }

    // if(filters.length > 0){
    //   console.log('we r starting with ', json);
    //   console.log('yes there is one so u better check')
    //   await filters.map(async(filter) => {
    //     console.log('checking!');
    //     if(filter.name == 'Episodes'){
    //       console.log('we are filtering episodes');
    //       while(json.data.episodes == filter.value || json.data.rating == "Rx - Hentai"){
    //         console.log('got one');
    //         response = await fetch(query);
    //         json = await response.json();
    //         console.log('this is new right?', json);
    //       }
    //     }else if (filter.name == 'Status'){
    //       while(json.data.status == filter.value || json.data.rating == "Rx - Hentai"){
    //         response = await fetch(query);
    //         json = await response.json();
    //         console.log(json);
    //       }
    //     }else if (filter.name == 'AvgScore'){
    //       while(json.data.score == filter.value || json.data.rating == "Rx - Hentai"){
    //         response = await fetch(query);
    //         json = await response.json();
    //         console.log(json);
    //       }
    //     }});
    // }

    if (json.data.title == null || json.data.images.jpg.image_url == null){
      alert("Something went wrong with that query, try again");
    }else {
      console.log('this is final!!!', json);
      setJsonValues(json);
    }
  }

  const setJsonValues = (json) => {
    if(json.data.title_english && json.data.title !== json.data.title_english){
      setAnimeName(json.data.title+' ('+json.data.title_english+')');
    }else{
      setAnimeName(json.data.title);
    }

    setImage(json.data.images.jpg.image_url);
/*     setGenres(json.data.genres); */
    setEpisodes(json.data.episodes);
    setAvgScore(json.data.score);
    setStatus(json.data.status);
    setSource(json.data.source);
    setHistory(json);
  }

  const setHistory = (json) => {
    if(json.data.title_english && (json.data.title !== json.data.title_english)){
      setPrevAnimes((prevAnimes) => [...prevAnimes, {
        name: json.data.title+' ('+json.data.title_english+')', 
        image: json.data.images.jpg.image_url
      }])
    }else{
      setPrevAnimes((prevAnimes) => [...prevAnimes, {
        name: json.data.title, 
        image: json.data.images.jpg.image_url
      }])
    }
  }

/*   const banGenre = () => {
    genres.map((genre) => {
      setFilters((genre) => [...genre, {
        name: 'Genre',
        value: genre
      }])
    })

    console.log(filter);
  } */

  const banEpisodes = () => {
    setFilters((attributes) => [...attributes, {
      name: 'Episodes', 
      value: episodes
    }])
  }

  const banStatus = () => {
    setFilters((attributes) => [...attributes, {
      name: 'Status', 
      value: status
    }])
  }

  const banAvgScore = () => {
    setFilters((attributes) => [...attributes, {
      name: 'AvgScore', 
      value: avgScore
    }])
  }

  const banSource = () => {
    setFilters((attributes) => [...attributes, {
      name: 'Source', 
      value: source
    }])
  }

  return (
    <div className='anime-page'>
      <div className='main-container'>
        <h2>Find a new anime to binge!</h2>
        {animeName ? (<h3>{animeName}</h3>) : (<div> </div>)}
        {image ? (<img className='characterImg' src={image} alt="character Image"/>
      ) : (<div></div>)}
        <div className='attributes-container'>
        {/*   {genres.length > 0 ? (genres.map((genre)=> (<button className='attribute-button' onClick={banGenre}>Genre: {genre.name}</button>))) : (<div></div>)} */}
          {episodes ? (<button className='attribute-button' onClick={banEpisodes}>Number of episodes: {episodes}</button>):(<div></div>)}
          {status ? (<button className='attribute-button' onClick={banStatus}>Status: {status}</button>):(<div></div>)}
          {avgScore ? (<button className='attribute-button' onClick={banAvgScore}>Average score: {avgScore}</button>):(<div></div>)}
          {source ? (<button className='attribute-button' onClick={banSource}>Source: {source}</button>):(<div></div>)}
        </div>
        <button id="discover-button" onClick={makeQuery}>Discover!</button>
      </div>
      <div className='history-container'>
        <History animes={prevAnimes}/>
      </div>
    </div>
  )
}

export default Anime