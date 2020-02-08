import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LinkButton from "./LinkButton.jsx";

class Design extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0 };
  }

  quantity = item => {
    return item.quantity;
  };

  sum = (a, b) => {
    return a + b;
  };

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

  addPartsGap = (designParts, personalInventory) => {
    let designPartsWithGap = designParts.map(designPart => {
      let inventoryMatch = personalInventory.find(part => {
        return part.item._id === designPart.item._id;
      }); // inventoryMatch is the corresponding part in your personalInventory
      let inventoryQuantity = inventoryMatch ? inventoryMatch.quantity : 0; // if part in inventory, log amt
      designPart.gap = Math.max(0, designPart.quantity - inventoryQuantity);
      return designPart;
    });
    return designPartsWithGap;
  };

  render = () => {
    const {
      _id,
      username,
      description,
      imgFrontendPath,
      instrFrontendPath,
      designParts
    } = this.props.shopDesign;

    let designPartsWithGap = this.addPartsGap(
      designParts,
      this.props.personalInventory
    );

    let totalCart = designParts.map(this.quantity).reduce(this.sum, 0);
    let totalGap = designPartsWithGap.map(x => x.gap).reduce(this.sum, 0);

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
          Total parts: {totalCart}
          <input
            type="submit"
            value={"Add To " + this.props.currentItemContainer}
          ></input>
        </form>
        Designer: {username}
        Missing Pieces: {totalGap}
        {this.props.username === username && this.props.show === "mine" ? (
          <Link to={"/edit-design/" + _id}>Edit Design</Link>
        ) : (
          <></>
        )}
        {this.props.username === username && this.props.show === "mine" ? (
          <Link to={"/delete-design/" + _id}>Delete Design</Link>
        ) : (
          <></>
        )}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    cart: state.cart,
    currentItemContainer: state.currentItemContainer,
    currentDesignCart: state.currentDesignCart,
    personalInventory: state.personalInventory
  };
};

export default connect(mapStateToProps)(Design);
