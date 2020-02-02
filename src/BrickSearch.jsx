import React, { Component } from "react";
import { connect } from "react-redux";

class BrickSearch extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = evt => {
    console.log("handle change");
    console.log(evt.target.name);
    console.log(evt.target.checked);
    console.log("going from ...");
    console.log(this.props.brickSearchObj[evt.target.name]);
    console.log("to dispatch ...");
    this.props.dispatch({
      type: "UPDATE-BRICKSEARCH-OBJ",
      payload: { criterion: evt.target.name, checked: evt.target.checked }
    });
    console.log("now changed ...");
  };

  render = () => {
    return (
      <>
        Dimensions
        <br />
        <input
          type="checkbox"
          name={"dimensions_1x1"}
          defaultChecked={true}
          onChange={evt => this.handleChange(evt)} // Why is this evt suddenly necessary?
        />
        1x1
        <br />
        <input
          type="checkbox"
          name={"dimensions_1x2"}
          defaultChecked={true}
          onChange={evt => this.handleChange(evt)} // Why is this evt suddenly necessary?
        />
        1x2
        <br />
        <input
          type="checkbox"
          name={"dimensions_2x2"}
          defaultChecked={true}
          onChange={evt => this.handleChange(evt)} // Why is this evt suddenly necessary?
        />
        2x2
        <br />
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    brickSearchObj: state.brickSearchObj
  };
};
export default connect(mapStateToProps)(BrickSearch);
