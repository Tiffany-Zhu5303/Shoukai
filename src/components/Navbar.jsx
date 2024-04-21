import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
    return (
        <div id="main-page">
            <div className="navbar">
                <h1>Shoukai</h1>
                <div id="navbar-links">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/discover">Discover</Link>
                    <Link className="nav-link" to="/favorites">Favorites</Link>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Navbar;