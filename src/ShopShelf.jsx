import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./Item.jsx";
import Design from "./Design.jsx";
import BrickShelf from "./BrickShelf.jsx";

class ShopShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: []
    };
  }

  shopping = this.props.shopType === "cart"; // true means SHOPPING; false means DESIGNING
  title = this.shopping ? "Shop" : "Select Design Parts";

  reload = async () => {
    let response = await fetch("/all-items");
    let body = await response.text();
    console.log("/all-items response", body);
    let parsed = JSON.parse(body);
    this.props.dispatch({ type: "LOAD-ITEMS", payload: parsed });

    let response2 = await fetch("/all-designs");
    let body2 = await response2.text();
    console.log("/all-designs response", body2);
    let parsed2 = JSON.parse(body2);
    this.props.dispatch({ type: "LOAD-DESIGNS", payload: parsed2 });
  };

  render = () => {
    return (
      <>
        <BrickShelf shopping={this.shopping} />
      </>
    );
  };
}

const mapStateToProps = state => {
  return { shopItems: state.shopItems, shopDesigns: state.shopDesigns };
};
export default connect(mapStateToProps)(ShopShelf);
