import React, { Component } from 'react';
import Seats from '../component/seats';

class Main extends Component {
    render() {
        return(
            <div className="main">
                <Seats howMany={this.props.location.state.value} />
            </div>
        )
    }
}

export default Main;