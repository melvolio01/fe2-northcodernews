import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav>
            <Link to="/">NavBar</Link>
            <Link to="/topics/coding">Coding</Link>
            <Link to="/topics/football">Football</Link>
            <Link to="/topics/cooking">Cooking</Link>
        </nav>
    );
};

export default Navbar;