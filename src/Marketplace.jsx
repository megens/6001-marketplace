import React, { Component } from "react";
import { Link, Route, BrowserRouter } from "react-router-dom";
import LinkButton from "./LinkButton.jsx";

class Marketplace extends Component {
  constructor() {
    super();
  }
  render = () => {
    return <>You're in</>;
  };
  /*
  shop = () => {
    //
  };

  render = () => {
    return (
      <div>
        What would you like to do?
        <LinkButton to="/shop">Shop</LinkButton>
        <LinkButton to="/shop">Become a Seller</LinkButton>
        <LinkButton to="/shop">Visit Seller Page</LinkButton>
      </div>
      <BrowserRouter>
      <p>
        <Link to={"/cart"}>Shopping Cart</Link>
      </p>
      <div>
        <Route exact={true} path="/" render={renderAllItems} />
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
      </div>
    </BrowserRouter>
    );
  };

  */
}

export default Marketplace;
