import React, { Component } from "react";
import { connect } from "react-redux";
import BrickShelf from "./BrickShelf.jsx";
import DesignShelf from "./DesignShelf.jsx";

class ShopShelf extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <>
        <BrickShelf />
        <DesignShelf />
      </>
    );
  };
}

export default ShopShelf;
