import React, { Component } from "react";

class Signup extends Component {
  constructor() {
    super();
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
    let response = await fetch("/signup", { method: "POST", body: data });
    let body = await response.text();
    let parsed = JSON.parse(body);
    if (parsed.success) {
      console.log("signup success");
      this.props.setUsername(username);
    }
  };

  render = () => {
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          <h3>SignUp:</h3>
        </div>
        Username:
        <input
          type="text"
          onChange={this.usernameChange}
          value={this.state.usernameInput}
        ></input>{" "}
        Password:
        <input
          type="text"
          onChange={this.passwordChange}
          value={this.state.passwordInput}
        ></input>{" "}
        <input type="submit" value="Sign Up" />
      </form>
    );
    //
  };
}

export default Signup;
