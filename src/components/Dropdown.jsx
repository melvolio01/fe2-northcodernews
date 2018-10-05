import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const DropDown = (props) => {
    return (
        <div>

            <div className="menu">
                <Link to="/">Home</Link>
                <NavLink to="/topics/coding" activeStyle={{
                    color: '#D1B280',
                    paddingBottom: '2px'
                }}>Coding</NavLink>
                <NavLink to="/topics/football" activeStyle={{
                    color: '#D1B280',
                    paddingBottom: '2px'
                }}>Football</NavLink>
                <NavLink to="/topics/cooking" activeStyle={{
                    color: '#D1B280',
                    paddingBottom: '2px'
                }}>Cooking</NavLink>
            </div>
        </div >
    );
};

export default DropDown;