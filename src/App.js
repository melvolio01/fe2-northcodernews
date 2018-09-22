import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import Article from './components/Article';
import Error404 from './components/Error404';
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    user_id: '5b768ab1a3ba998cb60bf7b1'
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          {<Route exact path="/" render={(props) => <Articles {...props} user={this.state.user_id} />} />}
          {<Route path="/topics/:topic" render={(props) => <Articles {...props} user={this.state.user_id} />} />}
          {<Route path="/articles/:article" render={(props) => <Article {...props} user={this.state.user_id} />} />}
          {<Route component={Error404} />}
        </Switch>
      </div>
    );
  }
}

export default App;
