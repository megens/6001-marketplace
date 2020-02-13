import React, { Component } from "react";
import { connect } from "react-redux";

class CartDesign extends Component {
  constructor(props) {
    super(props);
  }

  deleteDesign = _id => {
    console.log("dispatching delete design");
    this.props.dispatch({ type: "DELETE-DESIGN-FROM-CART", payload: _id });
  };

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

    return (
      <div className="cart-design-container">
        <div className="img-container">
          <img src={imgFrontendPath} width="210px" />
        </div>
        <button id="button-x" onClick={() => this.deleteDesign(_id)}>
          X
        </button>
        <div>
          {theme}:<b>{description}</b>
          <br />
          {this.props.currentItemContainer === "cart" ? (
            <div>
              price :{" "}
              <span className="number">${(unitPrice * 1).toFixed(2)}</span>
            </div>
          ) : (
            ""
          )}
          <br />
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    currentItemContainer: state.currentItemContainer,
    designsCart: state.designsCart
  };
};
export default connect(mapStateToProps)(CartDesign);
