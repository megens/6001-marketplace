import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./Item.jsx";

class BrickSearchResults extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.updateInventory();
    this.checkInterval = setInterval(this.updateInventory, 60000); // checks database every xxx milliseconds ... every minute
  };

  componentWillUnmount = () => {
    clearInterval(this.checkInterval); // NB to stop the checkinterval running forever while away
  };

  updateInventory = async () => {
    let response = await fetch("/all-items");
    let body = await response.text();
    console.log("/all-items response");
    //console.log(body);
    let parsed = JSON.parse(body);
    this.props.dispatch({ type: "LOAD-ITEMS", payload: parsed });
  };

  render = () => {
    let allCriteria = Object.keys(this.props.brickSearchObj);
    let validCriteria = allCriteria.filter(criterion => {
      return this.props.brickSearchObj[criterion] === true;
    });
    let dimensionsCriteria = validCriteria
      .filter(criterion => criterion.includes("dimensions_"))
      .map(criterion => {
        return criterion.replace("dimensions_", "");
      });

    let colorCriteria = validCriteria
      .filter(criterion => criterion.includes("color_"))
      .map(criterion => {
        return criterion.replace("color_", "");
      });

    let depthCriteria = validCriteria
      .filter(criterion => criterion.includes("depth_"))
      .map(criterion => {
        return criterion.replace("depth_", "");
      });

    console.log(allCriteria);
    console.log(dimensionsCriteria, colorCriteria, depthCriteria);

    let filteredItems = this.props.shopItems.filter(item => {
      //console.log(item);
      return (
        dimensionsCriteria.includes(item.dimensions) &&
        colorCriteria.includes(item.color) &&
        depthCriteria.includes(item.depth)
      );
    });
    return (
      <>
        <div className="main-container" id="brickSearchResults">
          <div className="items-container">
            {filteredItems.map(shopItem => (
              <Item key={shopItem._id} shopItem={shopItem} />
            ))}
          </div>
        </div>
      </>
    );
  };
}
const mapStateToProps = state => {
  return {
    shopItems: state.shopItems,
    shopDesigns: state.shopDesigns,
    brickSearchObj: state.brickSearchObj
  };
};

export default connect(mapStateToProps)(BrickSearchResults);
