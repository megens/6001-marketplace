import React, { Component } from "react";
import { Link, Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
//import LinkButton from "./LinkButton.jsx";
import { RoutesAndPaths } from "./RoutesAndPaths.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <>
        <BrowserRouter>
          <div className="nav-container">
            <Link to={"/shop"}>Shop</Link>
            <span className="shopping-cart">
              <Link to={"/cart"}>
                <img
                  src="/icons/shopping_cart-24px (1).svg"
                  className="cart-icon"
                  height="50px"
                />
                <span id="cart-count">{this.props.cartTotal}</span>
                {
                  // change this to cart contents size, soon!//
                }
              </Link>
            </span>
          </div>
          <RoutesAndPaths />
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
