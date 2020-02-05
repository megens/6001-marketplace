import React, { Component } from "react";
import { connect } from "react-redux";

class DesignSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { revealFilter: false };
  }

  allCriteria = Object.keys(this.props.designSearchObj);
  title =
    this.props.currentItemContainer === "cart" ? "Shop" : "Select Design Parts";

  showFilter = () => {
    this.setState({ revealFilter: !this.state.revealFilter });
  };

  handleChange = evt => {
    this.props.dispatch({
      type: "UPDATE-DESIGNSEARCH-OBJ",
      payload: { criterion: evt.target.name, checked: evt.target.checked }
    });
  };

  handleChangeAll = (evt, whichCriterion) => {
    let whichCriteria = this.allCriteria.filter(criterion =>
      criterion.includes(whichCriterion)
    );

    let whichCriteriaAllTrue = whichCriteria.every(
      criterion => this.props.designSearchObj[criterion] === true
    );
    evt.target.checked = !whichCriteriaAllTrue;
    console.log(whichCriteriaAllTrue);
    whichCriteria.forEach(criterion => {
      this.props.dispatch({
        type: "UPDATE-DESIGNSEARCH-OBJ",
        payload: {
          criterion: criterion,
          checked: whichCriteriaAllTrue ? false : true
        }
      });
    });
  };

  render = () => {
    return (
      <div className="main-container">
        <div>
          <h2 className="no-margin" className="inline">
            {this.title} Designs
          </h2>
          <span>
            <button id="filter-button" type="button" onClick={this.showFilter}>
              {this.state.revealFilter ? "HIDE FILTER" : "SHOW FILTER"}
            </button>
          </span>
        </div>
        {this.state.revealFilter && (
          <div className="criteria-container">
            <div className="criterion-container">
              <h4 className="no-margin">Theme</h4>
              <input
                type="button"
                onClick={evt => this.handleChangeAll(evt, "theme_")}
                value="Select All"
              />
              <br />
              <input
                type="checkbox"
                name={"theme_general"}
                id={"testID"}
                checked={this.props.designSearchObj.theme_general}
                onChange={evt => this.handleChange(evt)} // Why is this evt suddenly necessary?
              />
              General
              <br />
              <input
                type="checkbox"
                name={"theme_space"}
                checked={this.props.designSearchObj.theme_space}
                onChange={evt => this.handleChange(evt)}
              />
              Space
              <br />
              <input
                type="checkbox"
                name={"theme_pirates"}
                checked={this.props.designSearchObj.theme_pirates}
                onChange={evt => this.handleChange(evt)}
              />
              Pirates
            </div>
            <div className="criterion-container">
              <h4 className="no-margin">Size</h4>
              <input
                type="button"
                onClick={evt => this.handleChangeAll(evt, "size_")}
                value="Select All"
              />
              <br />
              <input
                type="checkbox"
                name={"size_small"}
                checked={this.props.designSearchObj.size_small}
                onChange={evt => this.handleChange(evt)}
              />
              Small
              <br />
              <input
                type="checkbox"
                name={"size_medium"}
                checked={this.props.designSearchObj.size_medium}
                onChange={evt => this.handleChange(evt)}
              />
              Medium
              <br />
              <input
                type="checkbox"
                name={"size_large"}
                checked={this.props.designSearchObj.size_large}
                onChange={evt => this.handleChange(evt)}
              />
              Large
            </div>
          </div>
        )}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    designSearchObj: state.designSearchObj,
    currentItemContainer: state.currentItemContainer
  };
};
export default connect(mapStateToProps)(DesignSearch);
