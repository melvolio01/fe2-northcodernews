import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Articles />
      </div>
    );
  }
}

export default App;
