import React from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav>
            <Link to="/">NavBar</Link>
            <NavLink to="/topics/coding" activeStyle={{
                fontWeight: 'bold',
                borderBottom: '5px solid white'
            }}>Coding</NavLink>
            <NavLink to="/topics/football" activeStyle={{
                fontWeight: 'bold',
                color: 'red'
            }}>Football</NavLink>
            <NavLink to="/topics/cooking" activeStyle={{
                fontWeight: 'bold',
                color: 'red'
            }}>Cooking</NavLink>
        </nav>
    );
};

export default Navbar;