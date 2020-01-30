import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, BrowserRouter } from "react-router-dom";
import CartItem from "./CartItem.jsx";
import LinkButton from "./LinkButton.jsx";

class Cart extends Component {
  constructor() {
    super();
  }

  runCheckout = () => {
    return;
  };

  render = () => {
    return (
      <>
        <LinkButton to="/checkout">Check Out</LinkButton>
        <div className="items-container">
          {this.props.cart.map(cartItem => (
            <CartItem
              key={cartItem.item._id}
              cartItem={cartItem.item}
              cartQuantity={cartItem.quantity}
            />
          ))}
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
  };
};

export default connect(mapStateToProps)(Cart);
