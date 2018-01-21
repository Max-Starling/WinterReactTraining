import React, { Component } from 'react';
// import logo from '../logo.svg';
import headerImg from '../header10.png';
import './Header.css';

class Header extends Component {
  render() {
    return (
        <header className="App-header">
          <img src={headerImg} className="header-img" alt="header img"/>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
    );
  }
}

export default Header;