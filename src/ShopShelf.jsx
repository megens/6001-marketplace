import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./Item.jsx";
import Search from "./Search.jsx";
import SearchResults from "./SearchResults.jsx";

class ShopShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: []
    };
  }

  reload = async () => {
    let response = await fetch("/all-items");
    let body = await response.text();
    console.log("/all-items response", body);
    let parsed = JSON.parse(body);
    this.props.dispatch({ type: "LOAD-SHELF", payload: parsed });
  };

  render = () => {
    return (
      <div className="shop-shelf">
        <h2>Shop</h2>
        <Search />
        <SearchResults />

        <button onClick={this.reload}> View Shelf </button>
        <div className="items-container">
          {this.props.shopItems.map(shopItem => (
            <Item key={shopItem._id} shopItem={shopItem} />
          ))}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return { shopItems: state.shopItems };
};
export default connect(mapStateToProps)(ShopShelf);
