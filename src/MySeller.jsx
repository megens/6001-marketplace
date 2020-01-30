import React, { Component } from "react";
import { connect } from "react-redux";

class MySeller extends Component {
  constructor(props) {
    super(props);
  }

  becomeSeller = async () => {
    this.props.dispatch({
      type: "BECOME-SELLER",
      payload: {
        sellerStatus: this.props.sellerStatus
      }
    });
    let data = new FormData();
    data.append("username", this.props.username);
    let response = await fetch("/become-seller", {
      method: "POST",
      body: data
    });
    let body = await response.text();
    let parsed = JSON.parse(body);
    console.log("completed become-seller", parsed);
  };

  render = () => {
    return (
      <div className="main-container">
        {(this.props.sellerStatus === false ||
          this.props.sellerStatus === undefined) && (
          <input
            type="button"
            value="Get Seller Status?"
            onClick={this.becomeSeller}
          />
        )}

        <div>My Seller Page</div>
        <div>Upload Item For Sale</div>
        {
          // multer form with fields
        }
        <div>My Sale Items</div>
        {
          // all items.map(seller === thisSeller)
        }
      </div>
    );
    //
  };
}

const mapStateToProps = (state, props) => {
  return {
    username: state.username,
    sellerStatus: state.sellerStatus
  };
};

export default connect(mapStateToProps)(MySeller);
