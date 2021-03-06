import React, { Component } from "react";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { usernameInput: "", passwordInput: "" };
  }
  usernameChange = evt => {
    this.setState({ usernameInput: evt.target.value });
  };

  passwordChange = evt => {
    this.setState({ passwordInput: evt.target.value });
  };

  submitHandler = async evt => {
    evt.preventDefault();
    let username = this.state.usernameInput;
    let password = this.state.passwordInput;
    console.log(username + " " + password);
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    console.log(data);
    let response = await fetch("/login", { method: "POST", body: data });
    let body = await response.text();
    let parsed = JSON.parse(body);
    console.log("success is " + parsed.success);
    if (parsed.success) {
      console.log("login success");
      console.log(parsed);
      this.props.dispatch({
        type: "LOGIN-SUCCESS",
        payload: {
          username,
          cart: parsed.cart,
          designsCart: parsed.designsCart,
          personalInventory: parsed.personalInventory,
          sellerStatus: parsed.sellerStatus
        }
      });
      //this.props.setUsername(username);
    }
  };

  render = () => {
    return (
      <>
        <form className="login-form" onSubmit={this.submitHandler}>
          <div>
            <h3>Log In:</h3>
          </div>
          Username:
          <input
            type="text"
            onChange={this.usernameChange}
            value={this.state.usernameInput}
          ></input>{" "}
          Password:
          <input
            type="password"
            onChange={this.passwordChange}
            value={this.state.passwordInput}
          ></input>{" "}
          <input type="submit" value="Log In" />
        </form>
      </>
    );
    //
  };
}

const mapStateToProps = (state, props) => {
  return { loggedIn: state.loggedIn, username: state.username };
};
// I'M INCLUDING THIS MAPSTATETOPROPS SO I CAN CHECK FOR AND LOG OUT ANY USERS OTHERWISE LOGGED IN. MAYBE COULD DO ELSEWHERE

export default connect(mapStateToProps)(Login);
