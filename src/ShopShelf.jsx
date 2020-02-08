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
        {this.props.currentItemContainer === "cart" ? (
          <DesignShelf show="ALL" />
        ) : (
          <></>
        )}
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    currentItemContainer: state.currentItemContainer
  }; // THIS WILL CHANGE
};

export default connect(mapStateToProps)(ShopShelf);
