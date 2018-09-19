import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import Article from './components/Article';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    user: 'JessJelly',
    user_id: '5b768ab1a3ba998cb60bf7b1'
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        {/* <Route exact path="/topics/:topic" render={(props) => <Articles {...props} />} /> */}
        {<Route exact path="/" component={Articles} />}
        {<Route path="/topics/:topic" component={Articles} />}
        {<Route path="/articles/:article" render={(props) => <Article {...props} user={this.state.user_id} />} />}
      </div>
    );
  }
}

export default App;
