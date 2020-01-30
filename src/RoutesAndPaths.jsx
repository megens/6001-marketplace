import React, { Component } from "react";
import { Link, Route, BrowserRouter, withRouter } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import ShopShelf from "./ShopShelf.jsx";
import MySeller from "./MySeller.jsx";
import Cart from "./Cart.jsx";
import { connect } from "react-redux";
import Logout from "./Logout.jsx";

class Routes extends Component {
  constructor() {
    super();
  }

  renderBrowseMarket = () => {
    console.log("browseMarket");
    this.props.dispatch({ type: "BROWSE" });
    return <ShopShelf />;
  };

  renderLoginSignup = () => {
    console.log("username is " + this.props.username);
    if (
      this.props.username === undefined ||
      this.props.username === "browsing ..."
    ) {
      return (
        <>
          <Login />
          <Signup />
        </>
      );
    }
    return (
      <>
        <ShopShelf />
      </>
    );
  };

  performLogout = async () => {
    console.log("performing logout");
    let data = new FormData();
    data.append("username", this.props.username);
    data.append("cart", JSON.stringify(this.props.cart));

    console.log("what is happening to my cart?");
    console.log(this.props.cart);

    let response = await fetch("/logout", { method: "POST", body: data });
    let body = await response.text();
    let parsed = JSON.parse(body);
    console.log("completed logout?");
    console.log(parsed);
    this.props.dispatch({
      type: "LOGOUT",
      payload: { username: this.props.username, cart: this.props.cart }
    });
  };

  renderLogout = routerData => {
    console.log("render Logout");
    return <Logout rD={routerData} />;
  };

  renderCart = () => {
    console.log("render cart");
    return <Cart />;
  };

  renderShopShelf = () => {
    console.log("render shop");
    return <ShopShelf />;
  };

  renderSalesPage = () => {
    console.log("become seller");
    return <MySeller />;
  };

  render = () => {
    return (
      <div>
        <Route exact={true} path="/" render={this.renderLoginSignup} />
        <Route exact={true} path="/cart/" render={this.renderCart} />
        <Route exact={true} path="/shop/" render={this.renderShopShelf} />
        <Route exact={true} path="/browse/" render={this.renderBrowseMarket} />
        <Route exact={true} path="/login/" render={this.renderLoginSignup} />
        <Route exact={true} path="/signup/" render={this.renderLoginSignup} />
        <Route exact={true} path="/logout/" render={this.renderLogout} />
        <Route exact={true} path="/checkout/" render={this.renderCheckout} />
        <Route
          exact={true}
          path="/my-inventory/"
          render={this.renderMyInventory}
        />
        <Route
          exact={true}
          path="/become-seller/"
          render={this.renderSalesPage}
        />
        <Route
          exact={true}
          path="/seller-page/"
          render={this.renderSalesPage}
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
    cartTotal: state.cartTotal,
    sellerStatus: state.sellerStatus
  }; // THIS WILL CHANGE
};

let RoutesAndPaths = connect(mapStateToProps)(Routes);

export { RoutesAndPaths };
