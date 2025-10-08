import { useState } from "react";
import Image from "next/image";

const CharCard = (props) => {
    // const addFavorite = async() => {
    //     await fetch(`http://localhost:3000/addFavorite`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({characterId: props.id, characterName: props.name, characterAnimes: props.animes,
    //             characterNameJPN: props.name_kanji, characterInfo:props.about, characterImg: props.image_url, type: "character"}),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         alert(data.status);
    //     })
    //     .catch(err => console.log(err));
    // }
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="flex flex-col justify-start items-center w-1/2 h-full p-8">
            <p className="font-bold">{props.name}</p> 
            {props.name_kanji ? <p className="">({props.name_kanji})</p> : <span className="p4"></span>}
            <Image 
            width={400}
            height={400}
            src={props.image_url} 
            alt={props.name}
            className="rounded-xl border-2 border-rose-red"
            onClick={() => setShowDetails(!showDetails)}/>
            {showDetails ?
            <div> 
                {props.about ? <p>{props.about}</p> : <p>No info found on {props.name}</p>}
            </div> : null}
        </div>
    );
};

export default CharCard;