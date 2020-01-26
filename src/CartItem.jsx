import React, { Component } from "react";

class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    console.log(this.props.cartItem);
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
    } = this.props.cartItem;
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
          <br />
          Quantity in Cart: {this.props.cartQuantity}
        </div>
      </div>
    );
  };
}

export default CartItem;
