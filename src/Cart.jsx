import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, BrowserRouter } from "react-router-dom";
import CartItem from "./CartItem.jsx";
import CartDesign from "./CartDesign.jsx";
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

  sum = (a, b) => {
    return a + b;
  };

  render = () => {
    console.log(this.props.designsCart);
    //console.log(this.props.designsCart[0].design.description);
    //console.log(this.props.designsCart[0].design.unitPrice.toFixed(2));
    let totalDesignCartCost = this.props.designsCart
      .map(x => 1 * x.design.unitPrice) // only 1 design at a time
      .reduce(this.sum, 0);

    let totalPartCartCost = this.props.cart
      .map(x => x.quantity * x.item.unitPrice)
      .reduce(this.sum, 0);

    return (
      <>
        <LinkButton to="/checkout">Check Out</LinkButton>
        <button type="button" onClick={this.emptyCart}>
          Empty Cart
        </button>
        <div id="balance-div">
          Total Cost $ {(totalDesignCartCost + totalPartCartCost).toFixed(2)}
        </div>
        <br />
        <div id="balance-div">
          Total Design Cost $ {totalDesignCartCost.toFixed(2)}
        </div>
        <div className="items-container">
          {this.props.designsCart.map(cartDesign => (
            <CartDesign key={cartDesign.design._id} cartDesign={cartDesign} />
          ))}
        </div>

        <div id="balance-div">
          Total Part Cost $ {totalPartCartCost.toFixed(2)}
        </div>
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
    designsCart: state.designsCart
  };
};

export default connect(mapStateToProps)(Cart);
