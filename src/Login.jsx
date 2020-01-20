import React, { Component } from "react";

class Login extends Component {
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
    console.log(data);

    let response = await fetch("/login", { method: "POST", body: data });
    let body = await response.text();
    let parsed = JSON.parse(body);
    console.log(parsed.success);
    if (parsed.success) {
      console.log("login success");
      console.log("here");
      console.log(parsed);
      this.props.setUsername(username);
    }
  };

  render = () => {
    return (
      <form onSubmit={this.submitHandler}>
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
          type="text"
          onChange={this.passwordChange}
          value={this.state.passwordInput}
        ></input>{" "}
        <input type="submit" value="Log In" />
      </form>
    );
    //
  };
}

export default Login;
