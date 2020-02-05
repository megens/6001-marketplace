import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem.jsx";
import LinkButton from "./LinkButton.jsx";

class MyInventory extends Component {
  constructor() {
    super();
  }

  emptyInventory = () => {
    {
      confirm("Delete Entire Inventory?")
        ? this.props.dispatch({
            type: "EMPTY-ANY-CONTAINER",
            payload: { whichContainer: "personalInventory" }
          })
        : "";
    }
  };

  render = () => {
    return (
      <>
        <button type="button" onClick={this.emptyInventory}>
          Empty Inventory
        </button>
        <div className="items-container">
          {this.props.personalInventory.map(cartItem => (
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
    personalInventory: state.personalInventory
  };
};

export default connect(mapStateToProps)(MyInventory);
