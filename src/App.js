import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Detail from './Detail';
import NoMatch from './NoMatch';
import NewAccount from './NewAccount';
import DepositeHistory from './DepositHistory';
import NewDeposit from './NewDeposit';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>Cash Deposite App</h1>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/:accountID/detail" component={Detail}/>
            <Route exact path="/:accountID/deposit-history" component={DepositeHistory}/>
            <Route exact path="/:accountID/cash-deposit" component={NewDeposit}/>
            <Route exact path="/new-account" component={NewAccount}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
