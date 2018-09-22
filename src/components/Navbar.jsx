import React, { Component } from 'react';
import './Navbar.css';
import DropDown from './DropDown';

class Navbar extends Component {
    state = {
        showDropDown: false
    }
    render() {
        return (
            <nav>
                <button className="home-icon" onClick={() => this.toggleDropDown()}><img id="home-icon" src="https://cdn-images-1.medium.com/max/1200/1*LdnSztHVYhhd8K8EqlgCJQ.png"></img></button>
                {this.state.showDropDown ? <DropDown hide={this.hideDropDownOnClick} color={'blue'} /> : null}
            </nav>
        );
    };

    toggleDropDown = () => {
        this.state.showDropDown ?
            this.setState({
                showDropDown: false
            }) :
            this.setState({
                showDropDown: true
            })
    }

    hideDropDownOnClick = (e) => {
        console.log('dont refresh')
        e.preventDefault();
        this.setState({
            showDropDown: false
        });
    }
}

export default Navbar;
