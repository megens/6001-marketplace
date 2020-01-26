import React, { Component } from "react";
import { connect } from "react-redux";

class Item extends Component {
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
      type: "ADD-TO-CART",
      payload: {
        cart: this.props.cart,
        cartTotal: this.props.cartTotal,
        item: this.props.shopItem,
        quantity: this.state.quantity
      }
    });
    this.setState({ quantity: 0 });
  };

  render = () => {
    const {
      _id,
      dimensions,
      depth,
      color,
      inStock,
      unitPrice,
      seller,
      imgPath,
      includesPlan,
      type
    } = this.props.shopItem;
    return (
      <div className="item-container">
        <div className="img-container">
          <img src={imgPath} height="60px" />
          {type} : {dimensions}
          <br />
          height: {depth}
          <br />
          color : {color}
          <br />
          price per unit : {unitPrice}
          <br /># in stock : {parseFloat(inStock).toLocaleString("en")}
        </div>
        <form onSubmit={this.addToCart}>
          Quantity:{" "}
          <input
            type="number"
            min="0"
            max={inStock}
            onChange={this.quantityChangeHandler}
            value={this.state.quantity}
          ></input>
          <input type="submit" value="Add To Cart"></input>
        </form>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    cart: state.cart,
    cartTotal: state.cartTotal
  };
};

export default connect(mapStateToProps)(Item);