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
                <div className='grid grid-cols-[1fr_2fr_2fr_1fr_1fr] gap-4' key={anime.mal_id}>
                    {anime.title && anime.title_english ? 
                    (<p className='text-rose-red text-4xl font-bold col-start-2 col-span-3'>{anime.title_english}</p>) 
                    : <p className='text-rose-red text-4xl font-bold col-start-2 col-span-3'>{anime.title}</p>}
                    
                    {anime.images.jpg.image_url ? 
                        <Image 
                        width={400}
                        height={400}
                        className="rounded-xl border border-rose-red col-start-2" 
                        src={anime.images.jpg.large_image_url} 
                        alt={anime.title}/>
                    : null}
                    <div className='grid grid-rows-auto grid-cols-2 col-span-2'>
                        {anime.synopsis ? 
                            <p className='col-span-2'>
                                <span className='font-bold'>Synopsis:</span> {anime.synopsis}
                            </p> : <p className='col-span-2'>No synopsis found</p>}
                        {anime.genres.length > 0 ? 
                            <p className='col-span-2'>
                                <span className='font-bold'>Genre:</span> {anime.genres.map((genre)=> (genre.name)).join(", ")}
                            </p> : null}
                        {anime.score ? (<p className='col-start-1'><span className='font-bold'>Average score:</span> {anime.score}</p>):null}
                        {anime.episodes ? (<p className='col-start-1'><span className='font-bold'>Number of episodes:</span> {anime.episodes}</p>):null}
                        {anime.duration ? (<p className='col-start-1'><span className='font-bold'>Duration:</span> {anime.duration}</p>):null}
                        {anime.type ? (<p className='col-start-1'><span className='font-bold'>Type:</span> {anime.type}</p>):null}
                        {anime.source ? (<p className='col-start-1'><span className='font-bold'>Source:</span> {anime.source}</p>):null}
                        {anime.trailer && anime.trailer.embed_url ? <p className='font-bold'>Trailer:</p>:null}
                        {anime.status ? (<p className='col-start-1'><span className='font-bold'>Status:</span> {anime.status}</p>):null}
                        {anime.trailer && anime.trailer.embed_url ?
                        <div className='w-full h-full row-span-2 flex items-start'>
                            <iframe src={anime.trailer.embed_url} allowFullScreen/>
                        </div> : null}
                        {anime.url ? (<p className='col-start-1'><a className='underline' href={anime.url} target="_blank" rel="noopener noreferrer">View on My Anime List!</a></p>):null}
                    </div>
                </div>
                : 
                <div className='flex flex-col items-center'>
                    <p>Error: Anime not found</p>
                </div>
            }
            <Link href="/anime">
                <button className="m-4 px-4 py-2 rounded-md">Back</button>
            </Link>
        </div>
    );
}