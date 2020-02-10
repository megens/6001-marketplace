import React, { Component } from "react";
import { connect } from "react-redux";

class CartDesign extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    console.log("in cart design");
    const {
      _id,
      description,
      imgFrontendPath,
      instrFrontendPath,
      designParts,
      theme,
      size,
      completed,
      unitPrice
    } = this.props.cartDesign.design;
    console.log(description);
    let costStatement = "price: " + unitPrice;
    return (
      <div className="cart-item-container">
        <div className="img-container">
          <img src={imgFrontendPath} height="60px" />
        </div>
        <div>
          {description}
          <br />
          {this.props.currentItemContainer === "cart" ? costStatement : ""}
          <br />
        </div>
        Hello
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    currentItemContainer: state.currentItemContainer
  };
};
export default connect(mapStateToProps)(CartDesign);
