import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'

function Nav() {

    const navStyle = {
        color: 'white'
    };

    return (
        <nav>
            {/* <h3>App</h3> */}
            <ul className="nav-links">
                <Link style={navStyle} to="/">
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to="/zonemanagement">
                    <li>Zone</li>
                </Link>
                <Link style={navStyle} to="/foodregister">
                    <li>Register</li>
                </Link>
                <Link style={navStyle} to="/foodsearch">
                    <li>Search</li>
                </Link>
                <Link style={navStyle} to="/shoppinglist">
                    <li>List</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;
