/* ----- Dependencies ----- */
import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

/* ----- Components ----- */
import NavbarItem from "./NavbarItem/NavbarItem.js";


/* ----- Styles ----- */
import "./Navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <Router>
        <div className="Navbar">
          <Link to={`/item_I`}> <NavbarItem name={"Navbar's item I"}/> </Link>
          <Link to={`/item_II`}> <NavbarItem name={"Navbar's item II"}/> </Link>
          <Link to={`/item_III`}> <NavbarItem name={"Navbar's item III"}/> </Link>
        </div>
      </Router>
    );
  }
}

export default Navbar;
