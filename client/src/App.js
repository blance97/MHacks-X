import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import PrefPage from './Components/PrefPage';


class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ backgroundColor: "#967bb6", minHeight: "100vh" }}>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/" component={PrefPage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
