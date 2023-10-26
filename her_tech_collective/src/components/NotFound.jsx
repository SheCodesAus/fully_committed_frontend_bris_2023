import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-info">
                <h1>Oops! You seem to be lost.</h1>
                <p>Here are some helpful links:</p>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/profiles">Her Collective Profiles</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}