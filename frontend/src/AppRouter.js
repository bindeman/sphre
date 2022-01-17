import logo from './logo.svg';
import './App.css';
import React, {useEffect, useContext, useState, useReducer} from "react";
import {Redirect, Route, Switch, useHistory, Router, withRouter, useLocation} from "react-router-dom";
import GraphContent from "./GraphContent";
import { createBrowserHistory } from "history";
import {countries, getGraphColor, indicators} from './constants'
import { makeStyles } from '@material-ui/core/styles';
import {WorldBankContext} from "./WorldBankContext";
import {graphColors} from './constants'
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import App from "./App";


const queryString = require('query-string');


//{arrayFormat: 'separator', arrayFormatSeparator: ';'}
const parsed = queryString.parse(window.location.pathname);
const tokenizeParsed = queryString.parse(window.location.pathname, {arrayFormat: 'separator', arrayFormatSeparator: ';'});




function reducer(state, action) {
  switch(action.type) {
    case "REPLACE_STATE":
      return action.payload;
    case "UPDATE_INDICATOR":
      state[action.indicator] = action.payload;
      return state;
    case "UPDATE_COUNTRY":
      state[action.indicator][action.country] = action.payload;
      return state;
    case "DELETE_COUNTRY":
      delete state[action.indicator][action.country];
      return state;
    case "DELETE_INDICATOR":
      delete state[action.indicator]
      return state;
    default:
      return state;
  }
}

function AppRouter() {
  const history = createBrowserHistory();
  const [graphReducerData, dispatch] = useReducer(reducer,{});

  return (
    <div className="App">
      <div>
      <Router history={history}>
        <Switch>
          <WorldBankContext.Provider value={{ graphReducerData, dispatch }}>
            <Route path="/" component={(props) => <App />}/>
          </WorldBankContext.Provider>
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default withRouter(AppRouter);
