import logo from './logo.svg';
import './App.css';
import React, {useEffect, useContext, useReducer} from "react";
import {Redirect, Route, Switch, useHistory, Router, withRouter, useLocation} from "react-router-dom";
import GraphContent from "./GraphContent";
import { createBrowserHistory } from "history";
import {countries, getGraphColor, indicators} from './constants'
import { makeStyles } from '@material-ui/core/styles';
import CountrySelector from './CountrySelector';
import IndicatorSelector from './IndicatorSelector';
import Typography from '@material-ui/core/Typography';
import {
  IconButton,
  Box, Toolbar, Button, Menu, AppBar, MenuItem
} from '@material-ui/core'
import { render } from 'react-dom';
import worldBankService from "./services/worldBankService";
import {WorldBankContext} from "./WorldBankContext";



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
  appBar: {
    marginTop: theme.spacing(1),
  }

}));

function putStringIntoArr() {
  if (!Array.isArray(tokenizeParsed.countries)) {
      tokenizeParsed.countries = new Array(tokenizeParsed.countries)
  }

  if (!Array.isArray(tokenizeParsed.indicators)) {
    tokenizeParsed.indicators = new Array(tokenizeParsed.indicators)
  }

}

function App() {
  const classes = useStyles();
  const history = createBrowserHistory();
  const [country, setCountry] = React.useState(parsed.countries !== undefined ? parsed.countries.split(";") : ["RU"]);
  const [indicator, setIndicator] = React.useState(parsed.indicators !== undefined ? parsed.indicators.split(";") : ["SP.DYN.TFRT.IN"]);
  const [graphData, setGraphData] = React.useState({});
  const { graphReducerData, dispatch } = useContext(WorldBankContext);
  // const [graphReducerData, dispatch] = useReducer(reducer,{});

    // setIndicator(nope, () => {
    //     getData();
    //     return nope;
    // });
    //TODO MAKE INTO REDUCER AND CALL GET DATA EACH TIME OR SET UP CALLBACK FUNCTION FOR DATA

  const dataPoints = graphReducerData;

    useEffect(async () => {
      getData(country, indicator);
    });

  const getData = (country, indicator) => {
    console.log("BEFORE DP", dataPoints);
    const indicatorString = indicator.join(';');
    const countryString = country.join(';');
    let promises = worldBankService.getCountriesAndIndicatorsOptimized(country, indicator, dataPoints)
    Promise.all(promises)
        .then((responses) => {
          console.log("AFTER DP", dataPoints);
            dispatch({type: "REPLACE_STATE", payload: dataPoints})
            // setGraphData(dataPoints)
            history.push(navigateTo(countryString, indicatorString));
        })
        .catch((err) => {
          console.log("ERROR receiving one", err)
        });
  }


  const navigateTo = (country, indicator) => {
    console.log(`&graph=true&countries=${country}&indicators=${indicator}`)
    return `&graph=true&countries=${country}&indicators=${indicator}`;
    // return `/v2/country/${countries[country]}/indicator/${indicators[indicator]}`;
  }

  const handleCountrySelection = (selected) => {
    const stringnifiedURL = selected.join(';');
    setCountry(selected);
    getData(selected, indicator);
  };

  const handleIndicatorSelection = (selected) => {
    const stringnifiedURL = selected.join(';');

    setIndicator(selected);
    getData(country, selected);

    // const countryString = country.join(';');
    // history.push(navigateTo(countryString, stringnifiedURL));

  };

  return (
    <div className="App">
      <Box>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

    <div style={{width: 250, position: 'fixed', backgroundColor: 'light-gray', padding: "40px 0 40px 40px", maxWidth: 300, float: "left", height: "100vh", display: "block", paddingTop: 20}}>

        <CountrySelector options={countries} onSelect={handleCountrySelection} selectedOptions={country} />
        <IndicatorSelector options={indicators} onSelect={handleIndicatorSelection} selectedOptions={indicator} />

          <div>
          </div>
      
      </div>
      <div style={{backgroundColor: 'light-gray', marginLeft: 250}}>
      <Router history={history}>
        <Switch>
          <Route path="/:query" key={"Graph"} component={(props) => <GraphContent {...props} country={country} indicator={indicator} />}/>
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default withRouter(App);
