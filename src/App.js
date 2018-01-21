/* ----- Dependencies ----- */
import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from 'react-router-dom'

/* ----- Components ----- */
import Header from "./components/Header/Header.js";
import Navbar from "./components/Navbar/Navbar.js";
import Content from "./components/Content/Content.js";
import Footer from "./components/Footer/Footer.js";

/* ----- Styles ----- */
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Header />
          <Navbar />
          <Content />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
