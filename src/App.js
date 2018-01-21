/* ----- Dependencies ----- */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

/* ----- Components ----- */
import Header from "./components/Header/Header.js";
import Navbar from "./components/Navbar/Navbar.js";
// import Content from "./components/Content/Content.js";
import Footer from "./components/Footer/Footer.js";

/* ----- Styles ----- */
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Header />
            <Navbar />
            <Switch>
              {/* <Route exact="true "path="/home" component={Home}> </Route> */}
              {/* <Route "path="/item_II" component={Item_II}> </Route> */}
              <Route path="/:pth" component={Content}> </Route>
              <Redirect from="/" to="/home" />
            </Switch>
            {/* <Route exact path="/home" render={() => <p>Welcome</p>}> </Route> */}
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
const Content = ({ match }) => {
  console.log(match.params.pth);
  return (
    <div>
      {match.params.pth}
    </div>
  );
};

export default App;
