import React, { Component } from "react";
import { connect } from "react-redux";
import ShopShelf from "./ShopShelf.jsx";
import BrickShelf from "./BrickShelf.jsx";

class AddDesignToCart extends Component {
  constructor() {
    super();
  }

  quantity = item => {
    return item.quantity;
  };

  sum = (a, b) => {
    return a + b;
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

  unCheck = e => {
    e.preventDefault();
    document.getElementById("design-only").checked = false;
    document.getElementById("design-plus-all").checked = false;
    document.getElementById("design-plus-missing").checked = false;
    this.props.rD.history.goBack();
  };

  AddDesignToCart = (e, designMatch, designPartsWithGap) => {
    e.preventDefault();
    if (document.getElementById("design-only").checked) {
      console.log("design only checked!");
      console.log(designMatch);
      this.props.dispatch({
        type: "ADD-DESIGN-TO-CART",
        payload: designMatch
      });
    }

    if (document.getElementById("design-plus-all").checked) {
      console.log("design plus All checked!");
      console.log(designMatch);
      this.props.dispatch({
        type: "ADD-DESIGN-TO-CART",
        payload: designMatch
      });

      designPartsWithGap.forEach(item => {
        this.props.dispatch({
          type: "ADD-TO-ANY-CONTAINER",
          payload: {
            whichContainer: "cart",
            item: item.item,
            quantity: item.quantity
          }
        });
      });
    }

    if (document.getElementById("design-plus-missing").checked) {
      console.log("design plus missing!");
      console.log(designMatch);
      this.props.dispatch({
        type: "ADD-DESIGN-TO-CART",
        payload: designMatch
      });

      designPartsWithGap.forEach(item => {
        if (item.gap > 0) {
          this.props.dispatch({
            type: "ADD-TO-ANY-CONTAINER",
            payload: {
              whichContainer: "cart",
              item: item.item,
              quantity: item.gap
            }
          });
        }
      });
    }
    this.props.rD.history.push("/cart/");
  };

  render = () => {
    console.log(this.props);
    let designMatch = this.props.shopDesigns.find(design => {
      return design._id === this.props.designId;
    });
    console.log(designMatch);
    const {
      _id,
      username,
      description,
      imgFrontendPath,
      instrFrontendPath,
      designParts
    } = designMatch;

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
      <div>
        <img src={imgFrontendPath} height="300px" />
        <div>Designer: {username}</div>
        <form
          onSubmit={e =>
            this.AddDesignToCart(e, designMatch, designPartsWithGap)
          }
        >
          <b>What would you like to add to Cart?</b>
          <br />
          <input type="radio" name="addDesignRadio" id="design-only" />
          Design Only (
          <span className="number">$ {totalCartCost.toFixed(2)}</span>)
          <br />
          <input type="radio" name="addDesignRadio" id="design-plus-all" />
          Design plus All {totalCart} Parts (
          <span className="number">$ {totalCartCost.toFixed(2)}</span>)
          <br />
          <input type="radio" name="addDesignRadio" id="design-plus-missing" />
          Design plus {totalGap} Parts Missing From Your Inventory (
          <span className="number">$ {totalGapCost.toFixed(2)}</span>)
          <br />
          <input type="submit" value="Add To Cart" />{" "}
          <button onClick={this.unCheck}>Cancel</button>
        </form>
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
    personalInventory: state.personalInventory,
    shopDesigns: state.shopDesigns
  };
};

export default connect(mapStateToProps)(AddDesignToCart);
