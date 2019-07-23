import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Home from './routes/home';
import Main from './routes/main';
import Header from './component/header';

class App extends Component {
  componentDidMount() {
    // 확대 방지
    document.documentElement.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
          event.preventDefault();
      }
    }, false);

    var lastTouchEnd = 0;
    document.documentElement.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
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
