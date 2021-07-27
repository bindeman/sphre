import logo from './logo.svg';
import './App.css';
import Dashboard from "./Dashboard";
import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/v2/:query" component={Dashboard}/>
      </Switch>
    </div>
  );
}

export default App;
