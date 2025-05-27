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
    valueAmount: 0.01,
    errorMessage: "",
    isLoading: false,
    winner: "",
    waitingMessage: "",
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

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      this.setState({
        isLoading: true,
        errorMessage: "",
        waitingMessage: "Waiting for transaction to be mined...",
      });
      const accounts = await web3.eth.getAccounts();
      await lotteryContract.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.valueAmount, "ether"),
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isLoading: false,
        waitingMessage: "",
      });
    }
  };

  pickWinner = async () => {
    this.setState({
      waitingMessage: "Waiting for transaction to be mined...",
    });
    const accounts = await web3.eth.getAccounts();
    await lotteryContract.methods.pickWinner().send({
      from: accounts[0],
    });
    this.setState({ winner: accounts[0] });

    this.setState({
      isLoading: false,
      waitingMessage: `The winner has been picked 🎉 ${accounts[0]}`,
    });
  };

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

        <hr />

        <body>
          <h2>Want to try luck ? </h2>
          <p>
            Each entry costs 0.01 ether.
            <button>Enter</button>
          </p>
          <div> or precise the amount</div>
          {this.state.errorMessage && (
            <div style={{ color: "red" }}>{this.state.errorMessage}</div>
          )}
          <form onSubmit={this.onSubmit}>
            <input
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              placeholder="0.01"
              onChange={(e) => this.setState({ valueAmount: e.target.value })}
            />
            <br />
            {!this.state.isLoading ? (
              <button type="submit">Enter with custom amont </button>
            ) : (
              "Waiting for transaction to be mined..."
            )}
          </form>
        </body>

        <hr />

        <h2> Ready to pick a winner </h2>
        {!this.state.winner ? (
          <button onClick={this.pickWinner}>Pick a winner</button>
        ) : (
          <p>The winner is {this.state.winner} 🥳</p>
        )}

        <i>{this.state.waitingMessage}</i>
      </div>
    );
  }
}
export default App;
