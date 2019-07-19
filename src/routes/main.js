import React, { Component } from 'react';
import Seats from '../component/seats';

class Main extends Component {
    componentDidMount() {
        console.log('총 인원 :', this.props.location.state.value);
    }
    render() {
        return(
            <div className="main">
                <Seats howMany={this.props.location.state.value} />
            </div>
        )
    }
}

export default Main;