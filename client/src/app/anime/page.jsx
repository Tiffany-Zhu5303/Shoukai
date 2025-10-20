"use client";
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimeContext } from '../context/AnimeProvider';
import LoadingSpinner from '../components/LoadingSpinner';

const Anime = () => {
  const { anime, setAnime } = useContext(AnimeContext);
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     console.log(anime)
//     const addHistory = () => {
//       fetch('http://localhost:3000/addHistory', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ animeId: anime.mal_id, animeName: anime.title, animeNameENG: anime.title_english, 
//             animeImg: anime.images.jpg.image_url, animeGenres: anime.genres, animeEpisodes: anime.episodes, 
//             animeScore: anime.score, animeSource: anime.source, animeInfo: anime.synopsis, 
//             animeTrailer: anime.trailer.url, animeStatus: anime.status, type: "anime"}),
//       })
//       .then(response => response.json())
//       .then(data => {
//           console.log(data);
//       })
//       .catch(err => console.log(err))
//     }

//     if(anime && Object.keys(anime).length > 0){
//       addHistory();
//     }
    
// }, [anime])

// const addFavorite = () => {
//   fetch('http://localhost:3000/addFavorite', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ animeId: anime.mal_id, animeName: anime.title, animeNameENG: anime.title_english, 
//         animeImg: anime.images.jpg.image_url, animeGenres: anime.genres, animeEpisodes: anime.episodes, 
//         animeScore: anime.score, animeSource: anime.source, animeInfo: anime.synopsis, 
//         animeTrailer: anime.trailer.url, animeStatus: anime.status, type: "anime"}),
//   })
//   .then(response => response.json())
//   .then(data => {
//       alert(data.status);
//   })
//   .catch(err => console.log(err))
// }

  const makeQuery = () => {
    let query = `https://api.jikan.moe/v4/random/anime`;
    try{
      setLoading(true);
      callAPI(query);
    }
    catch{
      alert('Something went wrong with that query, try again');
    }
  }

  const callAPI = async(query) =>{
    let response = await fetch(query);
    let json = await response.json();

    while(json.data.rating === "Rx - Hentai"){
      response = await fetch(query);
      json = await response.json();
    }

    if (json.data.title == null || json.data.images.jpg.image_url == null){
      alert("No title or image found, try again!");
    }else {
      setLoading(false);
      console.log(json.data);
      setAnime(json.data);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center p-16'>
      {anime && Object.keys(anime).length > 0 ? 
        <div className='flex flex-col justify-center items-center' key={anime.mal_id}>
          {anime.title && anime.title_english ? 
          (<p className='text-rose-red text-4xl font-bold'>{anime.title_english}</p>) 
          : <p className='text-rose-red text-4xl font-bold'>{anime.title}</p>}
          
          {anime.images.jpg.image_url ? 
            <Link href={'/anime/'+anime.mal_id}>
              <Image 
              width={400}
              height={400}
              className="max-h-1/2 rounded-xl border border-rose-red shadow-lg mt-8" 
              src={anime.images.jpg.large_image_url} 
              alt={anime.title}/>
            </Link>
          : null}
        </div> : 
        <div className='flex flex-col items-center'>
          <p className='text-4xl'>Find a new anime to binge!</p>
        </div>}
        { loading ? <LoadingSpinner /> : 
        <button className="px-4 py-2 mt-8" onClick={makeQuery}>Discover!</button> }
    </div>
  )
}

export default Anime