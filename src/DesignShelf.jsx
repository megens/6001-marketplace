import React, { Component } from "react";
import DesignSearch from "./DesignSearch.jsx";
import DesignSearchResults from "./DesignSearchResults.jsx";

class DesignShelf extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <>
        <DesignSearch />
        <DesignSearchResults show={this.props.show} />
      </>
    );
  };
}

export default DesignShelf;
