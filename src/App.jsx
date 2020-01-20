import React, { Component } from "react";
import { Link, Route, BrowserRouter } from "react-router-dom";
import LinkButton from "./LinkButton.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Marketplace from "./Marketplace.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = { username: undefined };
  }

  setUsername = username => {
    this.setState({ username: username });
  };

  enterMarket = () => {
    console.log("enterMarket");
  };

  renderLoginSignup = () => {
    console.log("username is " + this.state.username);
    if (this.state.username === undefined) {
      return (
        <>
          <div className="banner">
            <img src="/icons/lego-man.png" height="80px" />
            <h2 className="no-margin">The Brick House</h2>
          </div>
          <Login setUsername={this.setUsername} />
          <Signup setUsername={this.setUsername} />
          {
            <input
              className="indent"
              type="button"
              value="Just Browse"
              onClick={this.enterMarket}
            />
          }
        </>
      );
    }
    return (
      <>
        <Marketplace />
      </>
    );
  };

  renderCart = () => {
    console.log("render cart");
  };

  renderBecomeSeller = () => {
    console.log("become seller");
  };

  render = () => {
    return (
      <>
        <div>
          {/*What would you like to do?
          <LinkButton to="/shop">Shop</LinkButton>
          <LinkButton to="/shop">Become a Seller</LinkButton>
          <LinkButton to="/shop">Visit Seller Page</LinkButton>
          */}
        </div>
        <BrowserRouter>
          <div className="nav-container">
            <span className="shopping-cart">
              <Link to={"/cart"}>
                <img
                  src="/icons/shopping_cart-24px (1).svg"
                  className="cart-icon"
                  height="50px"
                />
                <span id="cart-count">88</span>
                {
                  // change this to cart contents size, soon!//
                }
              </Link>
            </span>
          </div>

          <div>
            <Route exact={true} path="/" render={this.renderLoginSignup} />
            <Route exact={true} path="/cart/" render={this.renderCart} />
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
              path="/completePurchase"
              render={this.renderCompletePurchase}
            />
            <Route
              exact={true}
              path="/pastPurchases"
              render={this.renderPastPurchases}
            />
            */}
          </div>
        </BrowserRouter>
      </>
    );
  };
}

export default App;
