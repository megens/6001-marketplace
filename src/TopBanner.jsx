import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, BrowserRouter } from "react-router-dom";
import LinkButton from "./LinkButton.jsx";

class TopBanner extends Component {
  constructor() {
    super();
  }

  render = () => {
    return (
      <>
        <div className="top-banner">
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
        <div className="banner">
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

export default connect(mapStateToProps)(TopBanner);
