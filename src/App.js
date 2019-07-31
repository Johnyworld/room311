import React, { Component } from 'react';
import './App.css';

import Main from './component/Main';
import Header from './component/header';

const noTouchZoom = () => {
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSeats: 47
    }
    this._clickHeader = this._clickHeader.bind(this);
    this.initialSubmit = React.createRef();
  }

  componentDidMount() {   
    noTouchZoom();
  }

  _clickHeader() {
    this.initialSubmit.current.cancelSubmit();
  }

  render() {
    return (
      <div className="app-wrap">
        <Header clickHeader={this._clickHeader} />
        <Main totalSeats={this.state.totalSeats} ref={this.initialSubmit} />
      </div>
    );
  }
}

export default App;
