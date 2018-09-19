import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {/* <Route exact path="/topics/:topic" render={(props) => <Articles {...props} />} /> */}
        {<Route exact path="/" component={Articles} />}
        {<Route path="/topics/:topic" component={Articles} />}
      </div>
    );
  }
}

export default App;
