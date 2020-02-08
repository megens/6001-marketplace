import React, { Component } from "react";
import { connect } from "react-redux";
import ShopShelf from "./ShopShelf.jsx";
import BrickShelf from "./BrickShelf.jsx";

class EditDesign extends Component {
  constructor(props) {
    // because we want to reference props in state
    super(props);
    this.state = {
      description: "",
      theme: "",
      image: "",
      instructions: "", // full instructions, not revealed until purchase
      designParts: [],
      completed: true
    };
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: "SET-CURRENT-CONTAINER-TYPE",
      payload: "currentDesignCart"
    });

    this.props.dispatch({
      type: "EMPTY-ANY-CONTAINER",
      payload: { whichContainer: "currentDesignCart" }
    });

    let designMatch = this.props.shopDesigns.find(design => {
      return design._id === this.props.designId;
    });

    this.setState({
      description: designMatch.description,
      theme: designMatch.theme,
      image: "",
      instructions: "", // full instructions, not revealed until purchase
      designParts: designMatch.designParts,
      completed: designMatch.completed
    });

    designMatch.designParts.forEach(item => {
      this.props.dispatch({
        type: "ADD-TO-ANY-CONTAINER",
        payload: {
          whichContainer: "currentDesignCart",
          item: item.item,
          quantity: item.quantity
        }
      });
    });
  };

  designMatch = this.props.shopDesigns.find(design => {
    return design._id === this.props.designId;
  });

  sum = (a, b) => {
    return a + b;
  };

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

    // WORK FROM HERE RATHER ... REDO

    let data = new FormData();
    data.append("username", this.designMatch.username);
    data.append("_id", this.designMatch._id);
    this.state.description !== ""
      ? data.append("description", this.state.description)
      : "";
    data.append("theme", this.state.theme);
    // size is determined programatically
    data.append("image", this.state.image);
    data.append("instructions", this.state.instructions);
    data.append("designParts", JSON.stringify(this.props.currentDesignCart));
    data.append("formerImgFrontendPath", this.designMatch.imgFrontendPath);
    data.append("formerInstrFrontendPath", this.designMatch.instrFrontendPath);

    fetch("/edit-design", { method: "POST", body: data });
    this.setState({ description: "" });
    this.setState({ theme: "" });
    this.setState({ image: "" });
    this.setState({ instructions: "" });
    this.setState({ completed: false });
    this.setState({ designParts: [] });

    alert("Design update logged");
    this.props.rD.history.push("/seller-page"); // push the User experience to a new path
  };
  render = () => {
    let totalDesignParts = this.props.currentDesignCart
      .map(x => x.quantity)
      .reduce(this.sum, 0);

    return (
      <div className="main-container">
        <form onSubmit={this.submitHandler}>
          <h2>Edit Design</h2>
          <h4 className="no-margin">New Design:</h4>
          <div>
            Edit Description:
            <input
              type="text"
              value={this.state.description}
              onChange={this.desc_ChangeHandler}
            />
          </div>
          <div>
            Edit Theme:
            <input
              type="text"
              value={this.state.theme}
              onChange={this.theme_ChangeHandler}
            />
          </div>
          <div>
            Upload New Image File:
            <input type="file" onChange={this.img_ChangeHandler} />
          </div>
          <div>
            Upload Full Instructions:
            <input type="file" onChange={this.instr_ChangeHandler} />
          </div>
          <input type="submit" value="Upload Design Plans" />
        </form>
        <div className="design-cart">
          <img src="/icons/wrench-image.svg" className="design-cart-icon" />
          <span id="design-cart-count">{totalDesignParts}</span>
          {
            // change this to cart contents size, soon!//
          }
        </div>
        <h2>Design Parts</h2>
        {this.props.currentDesignCart.map((part, index) => {
          return (
            <div key={index}>
              <img src={part.item.imgPath} height="60px" /> x {part.quantity}
            </div>
          );
        })}
        <BrickShelf />
        <input
          type="button"
          value="Flag Design Complete"
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
    currentDesignCart: state.currentDesignCart,
    shopDesigns: state.shopDesigns
  }; // THIS WILL CHANGE
};

export default connect(mapStateToProps)(EditDesign);
