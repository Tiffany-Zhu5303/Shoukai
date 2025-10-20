'use client';

import {useContext} from 'react';
import { AnimeContext } from '../../context/AnimeProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function AnimePage() {
    const { anime, setAnime } = useContext(AnimeContext);

    return (
        <div className='pt-8 flex flex-col justify-center items-center'>
            {anime && Object.keys(anime).length > 0 ? 
                <div className='flex justify-evenly w-full items-start' key={anime.mal_id}>
                    <div className='flex flex-col justify-start w-full px-8'>
                        {anime.title && anime.title_english ? 
                        (<p className='text-rose-red text-4xl font-bold'>{anime.title_english}</p>) 
                        : <p className='text-rose-red text-4xl font-bold'>{anime.title}</p>}
                        
                        {anime.images.jpg.image_url ? 
                            <Image 
                            width={400}
                            height={400}
                            className="mt-8 rounded-xl border border-rose-red" 
                            src={anime.images.jpg.large_image_url} 
                            alt={anime.title}/>
                        : null}
                        {anime.trailer && anime.trailer.embed_url ?
                        <div className='my-8 w-full h-full'>
                            <iframe src={anime.trailer.embed_url} allowFullScreen/>
                        </div> : null}
                    </div>
                    <div className='flex flex-col items-start w-full text-xl pt-12 pr-12'>
                        {anime.synopsis ? (<p className=''><span className='font-bold'>Synopsis:</span> {anime.synopsis}</p>) : <p>No synopsis found</p>}
                        {anime.type ? (<p className=''><span className='font-bold'>Type:</span> {anime.type}</p>):null}
                        {anime.genres.length > 0 ? 
                            <p><span className='font-bold'>Genre:</span> {anime.genres.map((genre)=> (genre.name)).join(", ")}</p> : null}
                        {anime.episodes ? (<p className=''><span className='font-bold'>Number of episodes:</span> {anime.episodes}</p>):null}
                        {anime.duration ? (<p className=''><span className='font-bold'>Duration:</span> {anime.duration}</p>):null}
                        {anime.status ? (<p className=''><span className='font-bold'>Status:</span> {anime.status}</p>):null}
                        {anime.score ? (<p className=''><span className='font-bold'>Average score:</span> {anime.score}</p>):null}
                        {anime.source ? (<p className=''><span className='font-bold'>Source:</span> {anime.source}</p>):null}
                        {anime.url ? (<p className=''><a className='underline' href={anime.url} target="_blank" rel="noopener noreferrer">View on My Anime List!</a></p>):null}

                    </div>
                </div>
                : 
                <div className='flex flex-col items-center'>
                    <p>Error: Anime not found</p>
                </div>
            }
            <Link href="/anime">
                <button className="mt-4 px-4 py-2 rounded-md">Back</button>
            </Link>
        </div>
    );
}