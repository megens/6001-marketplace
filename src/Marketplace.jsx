import React, { Component } from "react";
import { Link, Route, BrowserRouter } from "react-router-dom";
import LinkButton from "./LinkButton.jsx";
import ShopShelf from "./ShopShelf.jsx";

class Marketplace extends Component {
  constructor() {
    super();
  }
  render = () => {
    return (
      <>
        <ShopShelf />
      </>
    );
  };
}

export default Marketplace;
