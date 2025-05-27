// import logo from "./logo.svg";
// import "./App.css";
import React from "react";
import web3 from "./web3";
import lotteryContract from "./lottery";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
  };

  async getManager() {
    Promise.all([
      lotteryContract.methods.manager().call(),
      web3.eth.getBalance(lotteryContract.options.address),
      // lotteryContract.methods.players().call(),
    ]).then((values) => {
      console.log(values);
      this.setState({
        manager: values[0],
        balance: values[1],
        // players: values[1],
      });
    });

    // this.setState({ manager, players, balance });
  }

  componentDidMount() {
    this.getManager();
  }
  render() {
    // console.log(web3);
    // web3.eth.getAccounts().then(console.log);

    if (!this.state.manager) {
      return <div>Connect to your metamask to continue 😀 </div>;
    }

    return (
      <div className="App">
        <header>
          <h1>Welcome to the Lottery 🥳</h1>
          <p>The lottery is managed by {this.state.manager}</p>
          <p>
            The balance is {web3.utils.fromWei(this.state.balance, "ether")}{" "}
            ether
          </p>
        </header>
      </div>
    );
  }
}
export default App;
