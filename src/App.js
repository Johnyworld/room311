import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Home from './routes/home';
import Main from './routes/main';
import Header from './component/header';

class App extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className="app-wrap">
        <Header />
        <div className="content">
          <Router>
            <Route exact path="/" component={Home} />
            <Route path="/main" component={Main} />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
