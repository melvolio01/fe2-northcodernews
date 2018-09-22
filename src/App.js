import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import Article from './components/Article';
import Error from './components/Error';
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    userName: "jessjelly",
    user_id: '5b768ab1a3ba998cb60bf7b1'
  }
  render() {
    return (
      <div className="App">
        <Navbar user={this.state.userName} />
        <Switch>
          {<Route exact path="/" render={(props) => <Articles {...props} user={this.state.user_id} />} />}
          {<Route path="/topics/:topic" render={(props) => <Articles {...props} user={this.state.user_id} />} />}
          {<Route path="/articles/:article" render={(props) => <Article {...props} user={this.state.user_id} />} />}
          {<Route render={(props) => <Error {...props} message={"404: Page not found"} />} />}
        </Switch>
      </div>
    );
  }
}

export default App;
