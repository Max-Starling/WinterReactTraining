/* ----- Dependencies ----- */
import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

/* ----- Components ----- */
//...

/* ----- Styles ----- */
import "./Content.scss";

class Content extends Component {
  render() {
    return (
      // <Router>
        <p class="Content">
          It's content
        </p>
        // <Route path="pth" component={Shop}> </Route>
      // </Router>
    );
  }
}
const Shop = ({match}) => {
  console.log(match.params.pth);
  return (
    <div>
        match.params.pth
    </div>
  )
}
export default Content;
