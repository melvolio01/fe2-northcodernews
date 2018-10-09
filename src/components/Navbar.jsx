import React, { Component } from 'react';
import './Navbar.css';
import DropDown from './Dropdown';

class Navbar extends Component {
    state = {
        showDropDown: false
    }
    render() {
        return (
            <nav>
                <div>
                    <button className="home-icon" onClick={() => this.toggleDropDown()}><img id="home-icon" alt="home-icon" src="https://cdn-images-1.medium.com/max/1200/1*LdnSztHVYhhd8K8EqlgCJQ.png"></img></button>
                    {this.state.showDropDown && <DropDown hide={this.hideDropDownOnClick} color={'blue'} />}
                    <p className="user-info">Logged in as: {this.props.user}</p>
                </div>
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

    hideDropDownOnClick = () => {
        // e.preventDefault();
        this.setState({
            showDropDown: false
        });
    }
}

export default Navbar;
