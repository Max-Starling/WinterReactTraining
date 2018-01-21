import React, { Component } from "react";
import headerImg from "../../resources/images/header10.png";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <img src={headerImg} className="header-img" alt="header img" />
      </header>
    );
  }
}

export default Header;
