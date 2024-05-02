import React from "react";
import "../pages/Anime.css";

const History = ({animes}) => {
    return (
        <div className="history-section">
            <h2>History</h2>
            {animes && animes.length > 0 ? (
            animes.map((anime) => (
                <div className="history-item" key={anime.name}>
                    <img
                        className="history-image"
                        src={anime.image}
                        alt="Undefined image of anime"
                    />
                    <p className="anime-title">{anime.name}</p>
                </div>
                )   
            )) : (<div></div>)}
        </div>
    )
}

export default History;