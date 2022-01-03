import './App.css';
import React, { Component } from 'react';
import Signup from "./signup";
import Home from './home';
import Login from './login';
import Localst from './components/localst';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Addfield from './components/addfield';
import Counter from './components/counter';
import Uploadfile from './components/uploadfile';

class App extends Component {
  componentDidMount(){
    let token = localStorage.getItem('token');
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/signup">
            <Signup heading="Signup!" />
          </Route>
          <Route exact path="/login">
            <Login heading="Login!" />
          </Route>
          <Route exact path="/localst">
            <Localst heading="Local Storage!" />
          </Route>
          <Route exact path="/addfield">
            <Addfield />
          </Route>
          <Route exact path="/counter">
            <Counter />
          </Route>
          <Route exact path="/uploadfile">
            <Uploadfile />
          </Route>
        </Switch>
      </Router>
    );
  }

}

export default App;
