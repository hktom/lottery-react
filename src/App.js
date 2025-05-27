import logo from "./logo.svg";
import "./App.css";
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
export default App;
