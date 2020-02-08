import React, { Component } from "react";
import { connect } from "react-redux";
import NewDesign from "./NewDesign.jsx";
import DesignShelf from "./DesignShelf.jsx";
import LinkButton from "./LinkButton.jsx";

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
            value="Get Designer Status?"
            onClick={this.becomeSeller}
          />
        )}
        {this.props.sellerStatus === true && (
          <div>
            <div>
              <LinkButton to="/new-design">Begin New Design</LinkButton>
              {
                //<NewDesign rD={this.props.rD} />
              }
            </div>

            <div>
              <h2>My Designs</h2>
              <DesignShelf show="mine" />
            </div>
          </div>
        )}
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
