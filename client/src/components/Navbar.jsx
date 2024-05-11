import React, {createContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const AnimeContext = createContext(undefined);

const Navbar = () => {
    const [anime, setAnime] = useState([]);

    return (
        <div id="main-page">
            <AnimeContext.Provider value={{anime, setAnime}}>
                <div className="navbar">
                    <h1>Shoukai</h1>
                    <div id="navbar-links">
                        <Link className="nav-link" to="/">Home</Link>   
                        <Link className="nav-link" to="/anime">Anime</Link>
                        <Link className="nav-link" to="/character">Character</Link>
                        <Link className="nav-link" to="/favorites">Favorites</Link>
                        <Link className="nav-link" to="/history">History</Link>
                    </div>
                </div>
                <Outlet />
            </AnimeContext.Provider>
        </div>
    );
};

export default Navbar;