import React, { Component } from "react";
import { connect } from "react-redux";

class Design extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0 };
  }

  quantityChangeHandler = e => {
    this.setState({ quantity: e.target.value });
  };

  addToCart = evt => {
    evt.preventDefault();
    console.log("add to cart");
    if (
      this.props.username === "browsing ..." ||
      this.props.username === undefined
    ) {
      alert("You must be logged in to Add To Cart. Please log in or register");
      return;
    }
    this.props.dispatch({
      type: "ADD-TO-ANY-CONTAINER",
      payload: {
        whichContainer: "cart",
        // SEPARATE CART FOR DESIGN CONTAINER?
        quantity: this.state.quantity
      }
    });
    this.setState({ quantity: 0 });
  };

  calculatePartDiff = () => {
    let partDiffArray = [];
    this.props.currentDesignCart.map(part => {
      let partId = part._id.find(this.props.personalInventory);
      let inventoryQuantity = this.props.personalInventory.match(partId)
        .quantity;
      let designQuantity = part.quantity;
      let gap = (designQuantity - inventoryQuantity).floor(0); // this is all made up code
      if (gap > 0) {
        partDiffArray.push({ item: part, quantity: gap });
      }
    });
    // determine total of gap parts from inventory
    let gapTotal = 88;
    let addGap = confirm(
      "Your personal inventory is missing " +
        gapTotal +
        " parts to build this design. Add these parts to your cart?"
    );
    if (addGap) {
      partDiffArray.forEach(item => {
        this.props.dispatch({
          type: "ADD-TO-ANY-CONTAINER",
          payload: {
            whichContainer: "cart",
            item: item,
            quantity: item.quantity
          }
        });
      });
    }
    return partDiffArray;
  };

  render = () => {
    const {
      _id,
      username,
      description,
      imgFrontendPath,
      instrFrontendPath
    } = this.props.shopDesign;
    return (
      <div className="item-container">
        <div className="img-container">
          {description}
          <br />
          <img src={imgFrontendPath} height="60px" />
          <img src={instrFrontendPath} height="60px" />
          <br />
          price per unit : {"1.00"}
        </div>
        <form onSubmit={this.addToCart}>
          Quantity:{" "}
          <input
            type="number"
            min="0"
            onChange={this.quantityChangeHandler}
            value={this.state.quantity}
          ></input>
          <input
            type="submit"
            value={"Add To " + this.props.currentItemContainer}
          ></input>
        </form>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    cart: state.cart,
    currentItemContainer: state.currentItemContainer,
    currentDesignCart: state.currentDesignCart
  };
};

export default connect(mapStateToProps)(Design);
