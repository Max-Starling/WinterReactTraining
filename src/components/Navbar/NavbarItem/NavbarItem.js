import React, { Component } from "react";
import "./NavbarItem.scss";

class Navbar extends Component {
  render() {
    return (
        <p className="navbar-item">{this.props.name}</p>
    );
  }
}

export default Navbar;