import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import "./NavBar.css";

function NavBar() {

    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("userId");
        setAuth({ token: null })
    }
    
    console.log(auth)

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    }


    return (
        <>
        <div id="navlinks" className="navbar">
            <Link to="/"><img src= "/logo.png" alt="Logo" className="logo" /></Link>
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
        <div className="nav-menu-container">
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/profiles/">The Collective</Link>

                {auth.token ? (
                    <>
                        <Link to="/account/:id/" onClick={closeMenu}>Hi, {auth.username}</Link>
                        <Link to="/" onClick={handleLogout}>Log Out</Link>
                        <Link to="/profiles/create/">Create new profile</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login/" onClick={closeMenu}>Login</Link>
                        <Link to="/register/" onClick={closeMenu}>Register</Link>
                    </>
                )}
            

            </nav>
            </div>
        </div>
            

            <Outlet />
            
        </>
    );
}

export default NavBar;