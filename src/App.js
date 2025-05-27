// import logo from "./logo.svg";
// import "./App.css";
import React from "react";
import web3 from "./web3";
import lotteryContract from "./lottery";

class App extends React.Component {
  state = {
    manager: "",
  };

  async getManager() {
    const manager = await lotteryContract.methods.manager().call();
    console.log(manager);
    this.setState({ manager });
  }

  componentDidMount() {
    this.getManager();
  }
  render() {
    // console.log(web3);
    // web3.eth.getAccounts().then(console.log);

    return (
      <div className="App">
        <header>
          <h1>Welcome to the Lottery</h1>
          <p>The manager is {this.state.manager}</p>
        </header>
      </div>
    );
  }
}
export default App;
