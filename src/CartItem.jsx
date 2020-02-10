import React, { Component } from "react";
import { connect } from "react-redux";

class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    console.log(this.props.currentItemContainer);
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
    let costStatement = "price / unit: " + unitPrice;
    return (
      <div className="cart-item-container">
        <div className="img-container">
          <img src={imgPath} height="60px" />
        </div>
        <div>
          {this.props.currentItemContainer === "cart" ? costStatement : ""}
          <br />
          number : {this.props.cartQuantity}
          <br />
          {type} : {dimensions}
          <br />
          height: {depth}
          <br />
          color : {color}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    currentItemContainer: state.currentItemContainer
  };
};
export default connect(mapStateToProps)(CartItem);
