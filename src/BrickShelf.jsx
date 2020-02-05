import React, { Component } from "react";
import BrickSearch from "./BrickSearch.jsx";
import BrickSearchResults from "./BrickSearchResults.jsx";

class BrickShelf extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <>
        <BrickSearch />
        <BrickSearchResults />
      </>
    );
  };
}

export default BrickShelf;
