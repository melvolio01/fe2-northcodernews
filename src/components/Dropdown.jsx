import React from 'react';
import { NavLink } from 'react-router-dom';

const Dropdown = (func) => {
    return (
        <div>
            <div className="menu">
                <NavLink onClick={(e) => func(e)} to="/topics/coding" activeStyle={{
                    color: '#D1B280',
                    paddingBottom: '2px'
                }}>Coding</NavLink>
                <NavLink onClick={(e) => func(e)} to="/topics/football" activeStyle={{
                    color: '#D1B280',
                    paddingBottom: '2px'
                }}>Football</NavLink>
                <NavLink onClick={(e) => func(e)} to="/topics/cooking" activeStyle={{
                    color: '#D1B280',
                    paddingBottom: '2px'
                }}>Cooking</NavLink>
            </div>
        </div>
    );
};

export default Dropdown;