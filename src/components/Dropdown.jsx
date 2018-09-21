import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class DropDown extends Component {
    render() {
        return (
            <div>
                <div className="menu">
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
                </div>
            </div>
        );
    }
}

export default DropDown;