import React, { Component } from "react";
import { connect } from "react-redux";

class DeleteDesign extends Component {
  constructor(props) {
    // because we want to reference props in state
    super(props);
  }
  deleteDesign = () => {
    let designMatch = this.props.shopDesigns.find(design => {
      return design._id === this.props.designId;
    });

    // WORK FROM HERE RATHER ... REDO
    console.log("id is");
    console.log(designMatch._id);
    let data = new FormData();
    data.append("username", designMatch.username);
    data.append("_id", designMatch._id);
    console.log(data);
    fetch("/delete-design", { method: "POST", body: data });

    alert("Design deleted");
    this.props.rD.history.push("/seller-page"); // push the User experience to a new path
  };
  render = () => {
    return (
      <div>
        <button type="button" onClick={this.deleteDesign}>
          Sure you want to Delete Design?
        </button>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    shopDesigns: state.shopDesigns
  }; // THIS WILL CHANGE
};

export default connect(mapStateToProps)(DeleteDesign);
