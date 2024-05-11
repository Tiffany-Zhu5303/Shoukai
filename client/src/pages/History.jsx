import React, {useState, useEffect, useContext} from "react";
import { AnimeContext } from "../components/Navbar";
import { Link } from "react-router-dom";
import "./History.css";

const History = () => {
    const [history, setHistory] = useState([]);
    const displayedAnime = useContext(AnimeContext);    

    useEffect(() => {
        const getHistory = () => {
            fetch('http://localhost:3000/getHistory', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                setHistory(data);
                console.log("history", data);
            })
        }
    
        getHistory();
    }, [displayedAnime.anime])

    return (
        <div className="history-page">
            <h1 id="page-title">History</h1>
            <div className="history-list">
                {history && Object.keys(history).length > 0 ? 
                    Object.keys(history).map((item) => 
                        {
                            {console.log("here's one", history[item])}
                            return(
                                <Link to={"/anime/"+history[item].animeId} key={history[item].animeId}>
                                    <div className="history-item">
                                        <img
                                            className="history-image"
                                            src={history[item].animeImg}
                                            alt={history[item].animeImg}
                                        />
                                        <p className="anime-title">{history[item].animeName} {(history[item].animeNameENG)}</p>
                                    </div>
                                </Link>
                            );
                        }
                ) : <div id="empty-history">Nothing yet!</div>}
            </div>
        </div>
    )
}

export default History;