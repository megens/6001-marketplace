import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddDesignToCart from "./AddDesignToCart.jsx";
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

  addDesignToCart = evt => {
    evt.preventDefault();
    console.log("add to cart");
    if (
      this.props.username === "browsing ..." ||
      this.props.username === undefined
    ) {
      alert("You must be logged in to Add To Cart. Please log in or register");
      return;
    }

    this.setState({ quantity: 0 });

    return <AddDesignToCart />;
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

    let totalCart = designParts.map(x => x.quantity).reduce(this.sum, 0);
    let totalGap = designPartsWithGap.map(x => x.gap).reduce(this.sum, 0);
    let totalCartCost = designParts
      .map(x => x.quantity * x.item.unitPrice)
      .reduce(this.sum, 0);
    let totalGapCost = designParts
      .map(x => x.gap * x.item.unitPrice)
      .reduce(this.sum, 0);

    return (
      <div className="item-container">
        <div className="img-container">
          <img src={imgFrontendPath} height="95px" />
          <div>Designer: {username}</div>
        </div>
        <div className="description">
          <b>{description}</b>

          {/* don't reveal instructions pre-purchase
          <img src={instrFrontendPath} height="60px" />
          */}
          <div>
            Plan Cost : <span className="number">$1.00</span>
          </div>
          <div>
            Total parts: {totalCart}
            <br />(<span className="number">$ {totalCartCost.toFixed(2)}</span>)
          </div>
          <div>
            Missing Parts: {totalGap}
            <br />(<span className="number">$ {totalGapCost.toFixed(2)}</span>)
          </div>
          {this.props.username === username && this.props.show === "mine" ? (
            <></>
          ) : (
            <div className="d-link">
              <Link to={"/view-design/" + _id}>View Design</Link>
            </div>
          )}
          {this.props.username === username && this.props.show === "mine" ? (
            <div className="d-link">
              <Link to={"/edit-design/" + _id}>Edit</Link>
            </div>
          ) : (
            <></>
          )}
          {this.props.username === username && this.props.show === "mine" ? (
            <div className="d-link">
              <Link to={"/delete-design/" + _id}>Delete</Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    cart: state.cart,
    designsCart: state.designsCart,
    currentItemContainer: state.currentItemContainer,
    currentDesignCart: state.currentDesignCart,
    personalInventory: state.personalInventory
  };
};

export default connect(mapStateToProps)(Design);
