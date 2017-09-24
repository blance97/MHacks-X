import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './App.css';
import logo from './logo.svg';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import About from './Components/About';
import Results from './Components/Results'
import PrefPage from './Components/PrefPage';
import base from './rebase';
import firebase from 'firebase';


class App extends Component {
  constructor(props) {
    super(props);
    firebase.auth().signInAnonymously().catch((error) => {
      // Handle Errors here.
      let err = {
        code: error.code,
        message: error.message
      }
      console.log(err);
    });

  }

  render() {
    return (
      <div style={{ backgroundColor: "#1976d2", minHeight: "100vh" }}>
        <Router>
          <Container  >
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/about" component={About} />
              <Route path="/pref/:id" component={PrefPage} />
              <Route path="/results/:id" component={Results} />
            </Switch>
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
