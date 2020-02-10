import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, BrowserRouter } from "react-router-dom";
import LinkButton from "./LinkButton.jsx";

class SideBanner extends Component {
  constructor() {
    super();
  }

  quantity = item => {
    return item.quantity;
  };

  sum = (a, b) => {
    return a + b;
  };

  //cartTotal = this.props.cart.map(quantity).reduce(sum);
  //{if(this.props.cart) {cartTotal = this.props.cart.length}}

  render = () => {
    let totalCart = 0;
    if (this.props.loggedIn) {
      console.log("cart is defined", this.props.cart);
      let totalDesignCart = this.props.designsCart.length;
      let totalPartCart = this.props.cart
        .map(this.quantity)
        .reduce(this.sum, 0);
      totalCart = totalDesignCart + totalPartCart;
    }

    return (
      <>
        <div className="side-banner">
          <div className="shopping-cart">
            <Link to={"/cart"}>
              <img src="/icons/cart-image.svg" className="cart-icon" />
              <span id="cart-count">{totalCart}</span>
              {
                // change this to cart contents size, soon!//
              }
            </Link>
          </div>
          <br />
          {this.props.username !== undefined && (
            <div className="s-link">
              <b>Logged in as :</b>
              <br />
              <i>{this.props.username}</i>
            </div>
          )}
          {(this.props.username === "browsing ..." ||
            this.props.username === undefined) && (
            <div className="s-link">
              <Link to={"/login"}>Log In</Link>
            </div>
          )}
          {/*
          <div className="s-link">
          <Link to={"/signup"}>Sign Up</Link>
          </div>
          */}
          {this.props.username !== "browsing ..." &&
            this.props.username !== undefined && (
              <div className="s-link">
                <Link to={"/logout"}>Log Out</Link>
              </div>
            )}
          {this.props.username !== "browsing ..." &&
            this.props.username !== undefined && (
              <div className="s-link">
                <Link to={"/shop"}>Shop</Link>
              </div>
            )}
          {(this.props.username === "browsing ..." ||
            this.props.username === undefined) && (
            <div className="s-link">
              <Link to={"/browse"}>Browse</Link>
            </div>
          )}

          {this.props.username !== "browsing ..." &&
            this.props.username !== undefined && (
              <div className="s-link">
                <Link to={"/my-inventory"}>My Parts Inventory</Link>
              </div>
            )}

          {this.props.username !== "browsing ..." &&
            this.props.username !== undefined &&
            (this.props.sellerStatus === false ||
              this.props.sellerStatus === undefined) && (
              <div className="s-link">
                <Link to={"/become-seller"}>Become a Designer</Link>
              </div>
            )}
          {this.props.username !== "browsing ..." &&
            this.props.username !== undefined &&
            this.props.sellerStatus === true && (
              <div className="s-link">
                <Link to={"/seller-page"}>My Designs</Link>
              </div>
            )}
          <div className="s-link">
            <Link to={"/upload-part"}>UPLOAD PART (TBD)</Link>
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    loggedIn: state.loggedIn,
    cart: state.cart,
    designsCart: state.designsCart,
    sellerStatus: state.sellerStatus
  }; // THIS WILL CHANGE
};

export default connect(mapStateToProps)(SideBanner);
