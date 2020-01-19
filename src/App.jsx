import React, { Component } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Marketplace from "./Marketplace.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = { username: undefined };
  }

  setUsername = username => {
    this.setState({ username: username });
  };

  render = () => {
    console.log("username is " + this.state.username);
    if (this.state.username === undefined) {
      return (
        <>
          <div className="banner">
            <img src="/uploads/lego-man.png" height="100px" />
            <h1 class="no-margin">Brick Exchange</h1>
          </div>
          <Login setUsername={this.setUsername} />
          <Signup setUsername={this.setUsername} />
        </>
      );
    }
    return (
      <>
        <Marketplace />
      </>
    );
  };
}

export default App;
