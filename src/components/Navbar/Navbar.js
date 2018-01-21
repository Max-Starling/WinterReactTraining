/* ----- Dependencies ----- */
import React, { Component } from "react";
import { Link } from "react-router-dom";

/* ----- Components ----- */
import NavbarItem from "./NavbarItem/NavbarItem.js";

/* ----- Styles ----- */
import "./Navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <Link to={`/home`}>
          <NavbarItem name={"Home"} />
        </Link>
        <Link to={`/item_II`}>
          <NavbarItem name={"Navbar's item II"} />
        </Link>
        <Link to={`/item_III`}>
          <NavbarItem name={"Navbar's item III"} />
        </Link>
      </div>
    );
  }
}

export default Navbar;
