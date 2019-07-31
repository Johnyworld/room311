import React, { Component } from 'react';
import Seats from './seats';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSeats: this.props.totalSeats,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({totalSeats: event.target.value});
    }

    handleSubmit(event) {
        this.setState({totalSeats: event.target.totalSeats.value, submit: true});
        event.preventDefault();
    }

    cancelSubmit() {
        this.setState({ submit: false });
    }

    _renderInput() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    인원:
                    <input name="totalSeats" type="type" value={this.state.totalSeats} maxLength="2" max="72" onChange={this.handleChange} autoComplete="off" />
                </label>
                <div className="button-wrap">
                    <input className="btn" type="submit" value="시작하기" />
                </div>
            </form>
        )
    }

    _renderMain() {
        return(
            <Seats totalSeats={this.state.totalSeats} />
        )
    }

    render() {
        return (
            <div className="content">
                { this.state.submit ? this._renderMain() : this._renderInput() }
            </div>
        )
    }
}

export default Main;