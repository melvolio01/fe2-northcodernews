import React, { Component } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import DropDown from './Dropdown';

class Navbar extends Component {
    state = {
        showDropDown: false
    }
    render() {
        return (
            <nav>
                <Link onClick={() => this.toggleDropDown()} to="/"><img id="home-icon" src="https://cdn-images-1.medium.com/max/1200/1*LdnSztHVYhhd8K8EqlgCJQ.png"></img></Link>
                {this.state.showDropDown ? <DropDown /> : null}
            </nav>
        );
    };

    toggleDropDown = () => {
        console.log('toggle!');
        this.state.showDropDown ?
            this.setState({
                showDropDown: false
            }) :
            this.setState({
                showDropDown: true
            })
    }
}

export default Navbar;
