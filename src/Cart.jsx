import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, BrowserRouter } from "react-router-dom";
import CartItem from "./CartItem.jsx";
import LinkButton from "./LinkButton.jsx";

class Cart extends Component {
  constructor() {
    super();
  }

  emptyCart = () => {
    {
      confirm("Empty cart without purchase?")
        ? this.props.dispatch({ type: "EMPTY-CART" })
        : "";
    }
  };

  render = () => {
    return (
      <>
        <LinkButton to="/checkout">Check Out</LinkButton>
        <button type="button" onClick={this.emptyCart}>
          Empty Cart
        </button>
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
    cart: state.cart
  };
};

export default connect(mapStateToProps)(Cart);
