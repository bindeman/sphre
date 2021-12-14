import logo from './logo.svg';
import './App.css';
import React, {useEffect, useContext, useState, useReducer} from "react";
import {Redirect, Route, Switch, useHistory, Router, withRouter, useLocation} from "react-router-dom";
import GraphContent from "./GraphContent";
import { createBrowserHistory } from "history";
import {countries, getGraphColor, indicators} from './constants'
import { makeStyles } from '@material-ui/core/styles';
import {graphColors} from './constants'
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';



import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import List from '@material-ui/core/List'
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import {
  List,
  Avatar,
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Box
} from '@material-ui/core'
import { render } from 'react-dom';
import worldBankService from "./services/worldBankService";
import {WorldBankContext} from "./WorldBankContext";
import App from "./App";
// import IconButton from 'material-ui/core/IconButton';
// import FolderIcon from 'material-ui/icons/FolderIcon';
// import DeleteIcon from 'material-ui/icons/DeleteIcon';


const queryString = require('query-string');
// const location = useLocation();


//{arrayFormat: 'separator', arrayFormatSeparator: ';'}
const parsed = queryString.parse(window.location.pathname);
const tokenizeParsed = queryString.parse(window.location.pathname, {arrayFormat: 'separator', arrayFormatSeparator: ';'});

console.log("QUERY STRING: ", parsed);
console.log("QUERY STRING: ", tokenizeParsed);

const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
      fontFamily: 'Helvetica Neue, Helvetica, Arial',
      letterSpacing: '-0.03em',
  },
  categoryTitle: {
    fontSize: 13,
    textAlign: "left",
    fontWeight: 500,
    marginTop: 40,
    marginBottom: 5,
    marginLeft: 14,
  },
  listPin: {
    minWidth: "6px", 
    height: "21px", 
    flexShrink: 0,

    marginRight: "16px",
    // marginLeft: "16px",
    borderRadius: "3px",
    backgroundColor: "#EBEBEB",
  },
  iconColor: {
    '&': {
      transition: '0.25s',
      color: '#A6A6A6',
    },
    '&:hover': {
      transition: '0.25s',
      color: '#868686',
    },
  },

}));


function reducer(state, action) {
  switch(action.type) {
    case "REPLACE_STATE":
      console.log("UPDATING IT BABY", action.payload)
      return action.payload;
    default:
      return state;
  }
}

function AppRouter() {
  const classes = useStyles();
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
