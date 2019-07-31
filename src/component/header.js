import React, { Component } from 'react';
import './header.css';

class Header extends Component {
    render() {
        return(
            <header>
                <button onClick={()=>{this.props.clickHeader()}} type="type" className="header-title">ROOM 311</button>
                <div></div>
            </header>
        );
    }
}

export default Header;