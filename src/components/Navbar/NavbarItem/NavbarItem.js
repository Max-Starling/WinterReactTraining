import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./NavbarItem.scss";

class Navbar extends Component {
  render() {
    return (
        <p class="navbar-item">{this.props.name}</p>
    );
  }
}

export default Navbar;