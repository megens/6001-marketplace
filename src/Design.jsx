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
      type: this.props.shopping ? "ADD-TO-CART" : "ADD-TO-DESIGN",
      payload: {
        cart: this.props.shopping
          ? this.props.cart
          : this.props.currentDesignCart,
        item: this.props.shopItem,
        quantity: this.state.quantity
      }
    });
    this.setState({ quantity: 0 });
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
            value={this.props.shopping ? "Add To Cart" : "Add To Design"}
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
    currentDesignCart: state.currentDesignCart
  };
};

export default connect(mapStateToProps)(Design);
