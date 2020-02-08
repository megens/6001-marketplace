import React, { Component } from "react";
import { connect } from "react-redux";
import ShopShelf from "./ShopShelf.jsx";
import BrickShelf from "./BrickShelf.jsx";

class NewDesign extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      theme: "general",
      image: "",
      instructions: "", // full instructions, not revealed until purchase
      size: "small"
    };
  }
  desc_ChangeHandler = e => {
    this.setState({ description: e.target.value });
  };
  theme_ChangeHandler = e => {
    this.setState({ theme: e.target.value });
  };
  img_ChangeHandler = e => {
    this.setState({ image: e.target.files[0] });
  };
  instr_ChangeHandler = e => {
    this.setState({ instructions: e.target.files[0] });
  };
  submitHandler = evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("username", this.props.username);
    data.append("description", this.state.description);
    data.append("theme", this.state.theme);
    data.append("size", this.state.size);
    data.append("image", this.state.image);
    data.append("instructions", this.state.instructions);
    data.append("designParts", JSON.stringify(this.props.currentDesignCart));

    fetch("/new-design", { method: "POST", body: data });
    this.setState({ description: "" });
    this.setState({ theme: "" });
    this.setState({ image: "" });
    this.setState({ instructions: "" });
    alert("Design update logged");
    this.props.rD.history.push("/seller-page"); // push the User experience to a new path
  };
  render = () => {
    return (
      <div className="main-container">
        <form onSubmit={this.submitHandler}>
          <h2>Start New Design</h2>
          <h4 className="no-margin">New Design:</h4>
          <div>
            Description:
            <input
              type="text"
              value={this.state.description}
              onChange={this.desc_ChangeHandler}
            />
          </div>
          <div>
            Theme:
            <input
              type="text"
              value={this.state.theme}
              onChange={this.theme_ChangeHandler}
            />
          </div>
          <div>
            Image File:
            <input type="file" onChange={this.img_ChangeHandler} />
          </div>
          <div>
            Full Instructions:
            <input type="file" onChange={this.instr_ChangeHandler} />
          </div>
          <input type="submit" value="Upload Design Plans" />
        </form>
        <div className="design-cart">
          <img src="/icons/wrench-image.svg" className="design-cart-icon" />
          <span id="design-cart-count">{88}</span>
          {
            // change this to cart contents size, soon!//
          }
        </div>
        <h2>Specify Parts Inventory</h2>
        <BrickShelf />
        <input
          type="button"
          value="Mark Design Complete"
          onClick={this.completeDesign}
        />
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

export default connect(mapStateToProps)(NewDesign);
