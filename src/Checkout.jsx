import React, { Component } from "react";
import { connect } from "react-redux";
import LinkButton from "./LinkButton.jsx";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      saveCartToInventory: true,
      userCcInput: "",
      userCvvInput: "",
      userExpirationInput: "",
      userAddressInput: ""
    };
  }

  toggleSaveCartToInventory = () => {
    this.setState({ saveCartToInventory: !this.state.saveCartToInventory });
  };
  saveToInventory = () => {
    // write cart contents to inventory
    console.log("writing cart contents to inventory");
    if (this.state.saveCartToInventory) {
      this.props.cart.forEach(item => {
        if (item.item.type !== "design") {
          this.props.dispatch({
            type: "ADD-TO-ANY-CONTAINER",
            payload: {
              whichContainer: "personalInventory",
              item: item.item,
              quantity: item.quantity
            }
          });
        }
      });
    }
  };

  onChangeHandler_Cc = event => {
    console.log("New string in input box ", event.target.value);
    this.setState({ userCcInput: event.target.value });
  };
  onChangeHandler_Cvv = event => {
    console.log("New string in input box ", event.target.value);
    this.setState({ userCvvInput: event.target.value });
  };
  onChangeHandler_Expiration = event => {
    console.log("New string in input box ", event.target.value);
    this.setState({ userExpirationInput: event.target.value });
  };
  onChangeHandler_Address = event => {
    console.log("New string in input box ", event.target.value);
    this.setState({ userAddressInput: event.target.value });
  };
  submitPurchaseForm = event => {
    event.preventDefault();
    console.log("do we save to inventory?");
    console.log(this.state.saveCartToInventory);
    if (this.state.saveCartToInventory) {
      this.saveToInventory();
    }
    let alertMsg =
      "purchase complete. " +
      (this.state.saveCartToInventory ? "Parts saved to your inventory." : "");
    alert(alertMsg);
    console.log("purchase form submitted");
    this.props.dispatch({
      type: "EMPTY-ANY-CONTAINER",
      payload: { whichContainer: "cart" }
    });
    this.setState({
      userCcInput: "",
      userCvvInput: "",
      userExpirationInput: "",
      userAddressInput: ""
    });
  };

  render = () => {
    console.log(this.state.saveCartToInventory);
    return (
      <>
        <button type="button" onClick={this.toggleSaveCartToInventory}>
          Save Parts To Inventory?
        </button>
        {this.state.saveCartToInventory ? (
          <h4>Cart contents WILL be saved to your inventory</h4>
        ) : (
          <h4>Cart contents WILL NOT be saved to your inventory</h4>
        )}
        <h4 className="no-margin">Payment Information</h4>
        <form onSubmit={this.submitPurchaseForm} id="payment-form">
          <div id="payment-div">
            <div>
              Credit Card Details
              <input
                type="text"
                onChange={this.onChangeHandler_Cc}
                value={this.state.userCcInput}
              ></input>
            </div>
            <div>
              cvv
              <input
                type="text"
                onChange={this.onChangeHandler_Cvv}
                value={this.state.userCvvInput}
              ></input>
            </div>
            <div>
              Expiration Date
              <input
                type="text"
                onChange={this.onChangeHandler_Expiration}
                value={this.state.userExpirationInput}
              ></input>
            </div>
            <div>
              Shipping Address
              <input
                type="text"
                onChange={this.onChangeHandler_Address}
                value={this.state.userAddressInput}
              ></input>
            </div>
          </div>
          <input type="submit"></input>
        </form>
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    cart: state.cart,
    designsCart: state.designsCart,
    personalInventory: state.personalInventory
  };
};

export default connect(mapStateToProps)(Checkout);
