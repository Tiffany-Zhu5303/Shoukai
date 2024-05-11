import React, {useEffect} from "react";
import { useParams } from "react-router-dom";

const AnimeInfo = () => {
    const {id} = useParams();
    
    useEffect(() => {
        const getAnime = () => {
            fetch(`http://localhost:3000/getAnime/${id}`, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                console.log("data", data);
            })
        }

        getAnime();
    }, [])
    

    return(
        <div>

        </div>
    );
};

export default AnimeInfo;