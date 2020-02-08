import React, { Component } from "react";
import { Link, Route, BrowserRouter, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Logout from "./Logout.jsx";
import ShopShelf from "./ShopShelf.jsx";
import MySeller from "./MySeller.jsx";
import NewDesign from "./NewDesign.jsx";
import EditDesign from "./EditDesign.jsx";
import DeleteDesign from "./DeleteDesign.jsx";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";
import MyInventory from "./MyInventory.jsx";

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
    this.props.dispatch({
      type: "SET-CURRENT-CONTAINER-TYPE",
      payload: "cart"
    });
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

  renderCheckout = () => {
    console.log("running checkout");
    return <Checkout />;
  };

  renderShopShelf = () => {
    console.log("render shop");
    this.props.dispatch({
      type: "SET-CURRENT-CONTAINER-TYPE",
      payload: "cart"
    });
    return <ShopShelf />;
  };

  renderSalesPage = routerData => {
    console.log("become seller");
    return <MySeller rD={routerData} />;
  };

  renderNewDesign = routerData => {
    this.props.dispatch({
      type: "SET-CURRENT-CONTAINER-TYPE",
      payload: "currentDesignCart"
    });
    return <NewDesign rD={routerData} />;
  };

  renderEditDesign = routerData => {
    let designId = routerData.match.params.designId;
    this.props.dispatch({
      type: "SET-CURRENT-CONTAINER-TYPE",
      payload: "currentDesignCart"
    });
    return <EditDesign designId={designId} rD={routerData} />;
  };

  renderDeleteDesign = routerData => {
    let designId = routerData.match.params.designId;
    this.props.dispatch({
      type: "SET-CURRENT-CONTAINER-TYPE",
      payload: "currentDesignCart"
    });
    return <DeleteDesign designId={designId} rD={routerData} />;
  };

  renderMyInventory = () => {
    console.log("render inventory");
    this.props.dispatch({
      type: "SET-CURRENT-CONTAINER-TYPE",
      payload: "personalInventory"
    });
    return <MyInventory />; // shopType = cart or design
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
        <Route exact={true} path="/new-design/" render={this.renderNewDesign} />
        <Route
          exact={true}
          path="/edit-design/:designId"
          render={this.renderEditDesign}
        />
        <Route
          exact={true}
          path="/delete-design/:designId"
          render={this.renderDeleteDesign}
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
    sellerStatus: state.sellerStatus,
    currentItemContainer: state.currentItemContainer,
    shopDesigns: state.shopDesigns
  }; // THIS WILL CHANGE
};

let RoutesAndPaths = connect(mapStateToProps)(Routes);

export { RoutesAndPaths };
