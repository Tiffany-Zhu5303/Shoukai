import React from "react";
import { Link } from "react-router-dom";
import "../pages/Anime.css";

const History = ({animes}) => {
    return (
        <div className="history-section">
            <h4>History</h4>
            {animes && animes.length > 0 ? (
            animes.map((anime) => (
                <Link to={"/anime/"+anime.id}>
                    <div className="history-item" key={anime.name}>
                        <img
                            className="history-image"
                            src={anime.image}
                            alt="Undefined image of anime"
                        />
                        <p className="anime-title">{anime.name}</p>
                    </div>
                </Link>
                )   
            )) : (<div id="empty-history">Nothing yet!</div>)}
        </div>
    )
}

export default History;