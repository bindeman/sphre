import logo from './logo.svg';
import './App.css';
import React, { useEffect } from "react";
import {Redirect, Route, Switch, useHistory, Router, withRouter, useLocation} from "react-router-dom";
import GraphContent from "./GraphContent";
import { createBrowserHistory } from "history";
import {countries, indicators} from './constants'
import { makeStyles } from '@material-ui/core/styles';
import {graphColors} from './constants'




import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import List from '@material-ui/core/List'
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import {List, Avatar, ListItem, ListItemSecondaryAction, ListItemAvatar, ListItemText, IconButton} from '@material-ui/core'
import { render } from 'react-dom';
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
  const [countryArr, setCountryArr] = React.useState(["RU", "US"]);

  const [indicator, setIndicator] = React.useState(`${parsed.indicators !== undefined ? parsed.indicators.split(";") : ["SP.DYN.TFRT.IN"]}`);


  // useEffect(() => {
  //   putStringIntoArr();
  // });


  const navigateTo = (country, indicator) => {
    console.log(`&graph=true&countries=${country}&indicators=${indicator}`)
    return `&graph=true&countries=${country}&indicators=${indicator}`;
    // return `/v2/country/${countries[country]}/indicator/${indicators[indicator]}`;
  }

  const handleCountrySelection = (event, selected) => {
    // <Redirect to={queryConstructor(selectedCountry, "Population")} />
    // alert(country)
    const stringnifiedURL = selected.join(';');
    console.log("SELECTED COUNTRY: ", selected);
    console.log(stringnifiedURL)
    setCountryArr(selected);
    setCountry(selected);
    history.push(navigateTo(stringnifiedURL, indicator.join(';')));

  };

  const handleIndicatorSelection = (event, selected) => {
    // alert(indicator)
    // <Redirect to={queryConstructor(selectedCountry, "Population")} />
    // const stringnifiedURL = queryString.stringify({indicators: selected}, {arrayFormat: 'separator', arrayFormatSeparator: ';'})
    const stringnifiedURL = selected.join(';');
    console.log("SELECTED Indicator: ", selected);
    console.log(stringnifiedURL)
    setIndicator(selected);
    history.push(navigateTo(country.join(';'), stringnifiedURL));

    // history.push(navigateTo(country, selected)); 
    console.log("SELECTED INDICATOR: ", selected);
    // console.log(queryString.stringify({indicators: selected}, {arrayFormat: 'separator', arrayFormatSeparator: ';'}))
    setIndicator(selected);

  };

  // setCountry(parsed.countries)
  // setIndicator(parsed.indicator)


  return (
    <div className="App">

    <div style={{width: 250, position: 'fixed', backgroundColor: 'light-gray', padding: "40px 0 40px 40px", maxWidth: 300, float: "left", height: "100vh", display: "block", paddingTop: 20}}>
    <Autocomplete
            multiple
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            value={country}
            // value={["RU", "FR"]}
            // value={countries[country] || "Multiple"}
            onChange={handleCountrySelection}
            // placeholder="Country"
            options={Object.keys(countries).map((option) => option)}
            renderOption={(option) => <Typography noWrap>{countries[option]}</Typography>}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />

    <Autocomplete
                // multiple
                multiple
                freeSolo
                id="free-solo-3-demo"
                disableClearable
                placeholder="Indicator"
                // value={indicators[indicator] || "Multiple"}
                onChange={handleIndicatorSelection}
                options={Object.keys(indicators).map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(option) => <Typography noWrap>{indicators[option]}</Typography>}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Indicator"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
              />


          <div>
            <List dense={true}>
            <Typography className={classes.categoryTitle}>Countries</Typography>

            { country.map((countryKey, index) => (

              
                <ListItem>
                  {/* <ListItemAvatar disablePadding> */}
                    <div className={classes.listPin} style={{backgroundColor: graphColors[index].line}}>

                    </div>
                  {/* </ListItemAvatar> */}
                  <ListItemText
                    primary={countries[countryKey]}
                    secondary={countryKey}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      {/* <DeleteIcon /> */}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>)
             

            )}
            </List>

            <List dense={true}>
            <Typography className={classes.categoryTitle}>Indicators</Typography>

            { tokenizeParsed.indicators && tokenizeParsed.indicators.split(';').map((indicatorKey, index) => (

              
                <ListItem>
                  {/* <ListItemAvatar disablePadding> */}
                    <div className={classes.listPin}>

                    </div>
                  {/* </ListItemAvatar> */}
                  <ListItemText
                    primary={indicators[indicatorKey]}
                    secondary={indicatorKey}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      {/* <DeleteIcon /> */}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>)
             

            )}
            </List>
          </div>
      
      </div>
      <div style={{backgroundColor: 'light-gray', marginLeft: 250}}>
      <Router history={history}>
        <Switch>
          <Route path="/:query" component={(props) => <GraphContent {...props} key={window.location.pathname} parsedURL={parsed} country={country} indicator={indicator} />}/>
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default withRouter(App);
