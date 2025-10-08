'use client';

import {useContext} from 'react';
import { AnimeContext } from '../../context/AnimeProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function AnimePage() {
    const { anime, setAnime } = useContext(AnimeContext);

    return (
        <div className='pt-8'>
            {anime && Object.keys(anime).length > 0 ? 
                <div className='flex flex-col justify-center items-center' key={anime.mal_id}>
                    {anime.title && anime.title_english ? 
                    (<p className='text-4xl font-bold'>{anime.title_english}</p>) 
                    : <p className='text-4xl font-bold'>{anime.title}</p>}
                    
                    {anime.images.jpg.image_url ? 
                        <Image 
                        width={400}
                        height={400}
                        className="p-8 rounded-xl" 
                        src={anime.images.jpg.large_image_url} 
                        alt={anime.title}/>
                    : null}
                    <div className='flex flex-col'>
                        {anime.genres.length > 0 ? 
                            (anime.genres.map((genre)=> (<p className='attribute-button' key={genre.name}>Genre: {genre.name}</p>))) : null}
                        {anime.episodes ? (<p className='attribute-button'>Number of episodes: {anime.episodes}</p>):null}
                        {anime.status ? (<p className='attribute-button'>Status: {anime.status}</p>):null}
                        {anime.score ? (<p className='attribute-button'>Average score: {anime.score}</p>):null}
                        {anime.source ? (<p className='attribute-button'>Source: {anime.source}</p>):null}
                    </div>
                    <Link href="/anime">
                        <button className="mt-4 px-4 py-2 rounded-md">Back</button>
                    </Link>
                </div>
                : 
                <div className='flex flex-col items-center'>
                    <p>Error: Anime not found</p>
                </div>
            }
        </div>
    );
}