import React, { Component } from "react";
import { connect } from "react-redux";
import Design from "./Design.jsx";

class DesignSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopDesigns: []
    };
  }

  componentDidMount = () => {
    this.updateInventory();
    this.checkInterval = setInterval(this.updateInventory, 60000); // checks database every xxx milliseconds ... every minute
  };

  componentWillUnmount = () => {
    clearInterval(this.checkInterval); // NB to stop the checkinterval running forever while away
  };

  updateInventory = async () => {
    let response = await fetch("/all-designs");
    let body = await response.text();
    console.log("/all-designs response");
    //console.log(body)
    let parsed = JSON.parse(body);
    this.props.dispatch({ type: "LOAD-DESIGNS", payload: parsed });
  };

  render = () => {
    let allCriteria = Object.keys(this.props.designSearchObj);
    let validCriteria = allCriteria.filter(criterion => {
      return this.props.designSearchObj[criterion] === true;
    });
    let themeCriteria = validCriteria
      .filter(criterion => criterion.includes("theme_"))
      .map(criterion => {
        return criterion.replace("theme_", "");
      });

    let sizeCriteria = validCriteria
      .filter(criterion => criterion.includes("size_"))
      .map(criterion => {
        return criterion.replace("size_", "");
      });

    console.log(allCriteria);
    console.log(themeCriteria, sizeCriteria);

    let filteredDesigns = this.props.shopDesigns.filter(design => {
      //console.log(design);
      return (
        themeCriteria.includes(design.theme) &&
        sizeCriteria.includes(design.size)
      );
    });
    return (
      <>
        <div className="main-container" id="designSearchResults">
          <div className="items-container">
            {this.props.shopDesigns.map(shopDesign => (
              <Design key={shopDesign._id} shopDesign={shopDesign} />
            ))}
          </div>
        </div>
      </>
    );
  };
}
const mapStateToProps = state => {
  return {
    shopDesigns: state.shopDesigns,
    designSearchObj: state.designSearchObj
  };
};

export default connect(mapStateToProps)(DesignSearchResults);
