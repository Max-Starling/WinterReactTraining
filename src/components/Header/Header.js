import React, { Component } from "react";
// import logo from '../logo.svg';
import headerImg from "../../resources/images/header10.png";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <img src={headerImg} className="header-img" alt="header img" />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="qq">Welcome to React</h1>
      </header>
    );
  }
}

export default Header;
