import React, { Component } from "react";
import Header from "./components/Header/Header.js";
import Content from "./components/Content/Content.js";
import Footer from "./components/Footer/Footer.js";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Header />
          <Content />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
