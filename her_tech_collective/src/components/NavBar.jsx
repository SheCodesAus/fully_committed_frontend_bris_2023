import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div id="navlinks">
            <img src= "/logo.png" alt="Logo" className="logo" />
            <div className="menu-toggle" onClick={toggleMenu}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`hamburger-icon ${menuOpen ? "open" : ""}`}
                >
                <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/profiles/">The Collective</Link>
                <Link to="/account/:id/">My account</Link>
                <Link to="/login/">Login</Link>
                <Link to="/register/">Register</Link>
                <Link to="/profiles/create/">Create new profile</Link>
            </nav>

            <Outlet />
        </div>
    );
}

export default NavBar;