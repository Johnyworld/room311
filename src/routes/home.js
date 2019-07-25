import React, { Component } from 'react';
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "47"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.props.history.push({
            pathname: '/main',
            state: { value: this.state.value }
        })
        event.preventDefault();
    }
    
    render() {
        return(
            <div className="home">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        인원:
                        <input type="type" value={this.state.value} maxLength="2" max="72" onChange={this.handleChange} />
                    </label>
                    <div className="button-wrap">
                        <input className="btn" type="submit" value="시작하기" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Home;