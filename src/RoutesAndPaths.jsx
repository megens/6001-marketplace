import React, { Component } from "react";
import { Link, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import ShopShelf from "./ShopShelf.jsx";
import Cart from "./Cart.jsx";
import { connect } from "react-redux";

class Routes extends Component {
  constructor() {
    super();
  }

  browseMarket = () => {
    console.log("browseMarket");
    this.props.dispatch({ type: "BROWSE" });
  };

  renderLoginSignup = () => {
    console.log("username is " + this.props.username);
    if (this.props.username === undefined) {
      return (
        <>
          <div className="banner">
            <img src="/icons/lego-man.png" height="80px" />
            <h2 className="no-margin">The Brick House</h2>
          </div>
          <Login />
          <Signup />
          {
            <input
              className="indent"
              type="button"
              value="Just Browse"
              onClick={this.browseMarket}
            />
          }
        </>
      );
    }
    return (
      <>
        <ShopShelf />
      </>
    );
  };

  renderCart = () => {
    console.log("render cart");
    return <Cart />;
  };

  renderShopShelf = () => {
    console.log("render shop");
    return <ShopShelf />;
  };

  renderBecomeSeller = () => {
    console.log("become seller");
  };

  render = () => {
    return (
      <div>
        <Route exact={true} path="/" render={this.renderLoginSignup} />
        <Route exact={true} path="/cart/" render={this.renderCart} />
        <Route exact={true} path="/shop/" render={this.renderShopShelf} />
        <Route exact={true} path="/checkout/" render={this.Checkout} />
        <Route
          exact={true}
          path="/become-seller/"
          render={this.renderBecomeSeller}
        />
        {/*
  <Route exact={true} path="/seller/:sId" render={renderSeller} />
  <Route
    exact={true}
    path="/details/:itemId"
    render={this.renderItemDetail}
  />
  <Route exact={true} path="/reviewer/:rId" render={renderReviewer} />
  <Route exact={true} path="/allSellers" render={renderAllSellers} />
  <Route exact={true} path="/cart" render={this.renderShoppingCart} />
  <Route
    exact={true}
    path="/pastPurchases"
    render={this.renderPastPurchases}
  />
  */}
      </div>
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

let RoutesAndPaths = connect(mapStateToProps)(Routes);

export { RoutesAndPaths };
