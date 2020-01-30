import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, BrowserRouter } from "react-router-dom";
import LinkButton from "./LinkButton.jsx";

class TopBanner extends Component {
  constructor() {
    super();
  }

  render = () => {
    return (
      <>
        <div className="top-banner">
          <img src="/icons/lego-man.png" height="80px" />
          <h2 className="no-margin">The Brick House</h2>
        </div>
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    username: state.username
  };
};

export default connect(mapStateToProps)(TopBanner);
