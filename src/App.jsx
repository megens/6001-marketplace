import React, { Component } from "react";
import { Link, Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
//import LinkButton from "./LinkButton.jsx";
import TopBanner from "./TopBanner.jsx";
import SideBanner from "./SideBanner.jsx";
import { RoutesAndPaths } from "./RoutesAndPaths.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <>
        <BrowserRouter>
          <TopBanner />
          <div className="side-and-body">
            <SideBanner />
            <RoutesAndPaths />
          </div>
        </BrowserRouter>
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    username: state.username,
    cart: state.cart,
    cartTotal: state.cartTotal
  }; // THIS WILL CHANGE
};

export default connect(mapStateToProps)(App);
