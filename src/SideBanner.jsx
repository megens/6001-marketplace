import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, BrowserRouter } from "react-router-dom";
import LinkButton from "./LinkButton.jsx";

class SideBanner extends Component {
  constructor() {
    super();
  }

  render = () => {
    return (
      <>
        <div className="side-banner">
          <Link to={"/shop"}>Shop</Link>
          <div>
            <Link to={"/cart"}>
              <img src="/icons/shopping_cart-24px (1).svg" height="50px" />
            </Link>
          </div>
          <img src="/icons/lego-man.png" height="80px" />
          <h2 className="no-margin">The Brick House</h2>
        </div>
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    cart: state.cart,
    cartTotal: state.cartTotal
  }; // THIS WILL CHANGE
};

export default connect(mapStateToProps)(SideBanner);
