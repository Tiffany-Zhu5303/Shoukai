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
            .catch(err => console.log(err));
        }
    
        getHistory();
    }, [displayedAnime.anime]);

    const clearHistory = () => {
        fetch('http://localhost:3000/clearHistory', {
            method: 'DELETE', 
        }).then(alert("Cleared!"))
        .catch(err => console.log(err));

        window.location.reload();
    }

    return (
        <div className="history-page">
            <h1 id="page-title">History</h1>
            <div className="history-list">
                {history && Object.keys(history).length > 0 ? 
                    Object.keys(history).map((item) => 
                        {return(
                            <Link className="history-links" to={"/anime/"+history[item].animeId+"/history"} key={history[item].animeId}>
                                <div className="history-item">
                                    <img
                                        className="history-image"
                                        src={history[item].animeImg}
                                        alt={history[item].animeImg}
                                    />
                                    {history[item].animeNameENG && [history[item].animeNameENG].length > 0 ? 
                                    <p className="anime-title">{history[item].animeName} ({history[item].animeNameENG})</p>
                                    : <p className="anime-title">{history[item].animeName}</p>}
                                </div>
                            </Link>
                        );
                        }
                ) : <div id="empty-history">Nothing yet!</div>}
            </div>
            <button className="clear-button" onClick={clearHistory}>Clear</button>
        </div>
    )
}

export default History;