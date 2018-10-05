import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import Article from './components/Article';
import NewArticle from './components/NewArticle';
import Error from './components/Error';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import * as API from './api.js';

class App extends Component {
  state = {
    userName: '',
    user_id: ''
  }
  render() {
    return (
      <div className="App">
        <Navbar user={this.state.userName} />
        <Switch>
          {<Route exact path="/" render={(props) => <Articles {...props} user={this.state.user_id} />} />}
          {<Route exact path="/topics/:topic" render={(props) => <Articles {...props} user={this.state.user_id} />} />}
          {<Route exact path="/articles/:article" render={(props) => <Article {...props} user={this.state.user_id} />} />}
          {<Route path="/newarticle" component={NewArticle} />}
          {<Route path="/error" component={Error} />}
          {<Route component={Error} />}
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    this.getUserInfo('jessjelly')
  }

  getUserInfo = async (userName) => {
    const res = await (API.getUser(userName))
    const { user } = res.data;
    console.log(user);
    this.setState({
      userName: user.username,
      user_id: user._id
    }, () => {
      console.log(this.state);
    })
  }


}

export default App;
