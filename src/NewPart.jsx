import React, { Component } from "react";
import { connect } from "react-redux";
import ShopShelf from "./ShopShelf.jsx";
import BrickShelf from "./BrickShelf.jsx";

class NewPart extends Component {
  constructor() {
    super();
    this.state = {
      dimensions: "",
      depth: "standard",
      color: "",
      unitPrice: 0.05,
      imgPath: "/uploads/ .jpg",
      type: "brick"
    };
  }

  dimensions_ChangeHandler = e => {
    this.setState({ dimensions: e.target.value });
  };
  depth_ChangeHandler = e => {
    this.setState({ depth: e.target.value });
  };
  color_ChangeHandler = e => {
    this.setState({ color: e.target.value });
  };
  unitPrice_ChangeHandler = e => {
    this.setState({ unitPrice: e.target.value });
  };
  imgPath_ChangeHandler = e => {
    this.setState({ imgPath: e.target.value });
  };
  type_ChangeHandler = e => {
    this.setState({ type: e.target.value });
  };

  submitHandler = evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("dimensions", this.state.dimensions);
    data.append("depth", this.state.depth);
    data.append("color", this.state.color);
    data.append("inStock", 10000);
    data.append("unitPrice", this.state.unitPrice);
    data.append("seller", "house");
    data.append("imgPath", this.state.imgPath);
    data.append("includesPlan", false);
    data.append("type", this.state.type);

    fetch("/new-part", { method: "POST", body: data });

    alert("Part uploaded");
    //    this.props.rD.history.push("/seller-page"); // push the User experience to a new path
  };
  render = () => {
    return (
      <div className="main-container">
        <form onSubmit={this.submitHandler}>
          <h2>Start New Part</h2>
          <div>
            Dimensions:
            <input
              type="text"
              value={this.state.dimensions}
              onChange={this.dimensions_ChangeHandler}
            />
          </div>
          <div>
            depth:
            <input
              type="text"
              value={this.state.depth}
              onChange={this.depth_ChangeHandler}
            />
          </div>
          <div>
            color:
            <input
              type="text"
              value={this.state.color}
              onChange={this.color_ChangeHandler}
            />
          </div>
          <div>
            unit price:
            <input
              type="text"
              value={this.state.unitPrice}
              onChange={this.unitPrice_ChangeHandler}
            />
          </div>
          <div>
            img Path:
            <input
              type="text"
              value={this.state.imgPath}
              onChange={this.imgPath_ChangeHandler}
            />
          </div>
          <div>
            type:
            <input
              type="text"
              value={this.state.type}
              onChange={this.type_ChangeHandler}
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        <BrickShelf />
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    sellerStatus: state.sellerStatus,
    currentItemContainer: state.currentItemContainer,
    currentDesignCart: state.currentDesignCart
  }; // THIS WILL CHANGE
};

export default connect(mapStateToProps)(NewPart);
