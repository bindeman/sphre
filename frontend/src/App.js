import logo from './logo.svg';
import './App.css';
import React from "react";
import {Redirect, Route, Switch, useHistory, Router, withRouter, useLocation} from "react-router-dom";
import GraphContent from "./GraphContent";
import { createBrowserHistory } from "history";
import {countries, indicators} from './constants'
import { makeStyles } from '@material-ui/core/styles';



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

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

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
  title: {
    fontSize: 23,
  }
}));


function App() {
  const classes = useStyles();
  const history = createBrowserHistory();
  const [country, setCountry] = React.useState(parsed.countries || "RUS");
  const [indicator, setIndicator] = React.useState(parsed.indicators || "SP.DYN.TFRT.IN");


  const navigateTo = (country, indicator) => {
    return `&graph=true&countries=${country}&indicators=${indicator}`;
    // return `/v2/country/${countries[country]}/indicator/${indicators[indicator]}`;
  }

  const handleCountrySelection = (event, selected) => {
    // <Redirect to={queryConstructor(selectedCountry, "Population")} />
    // alert(country)
    history.push(navigateTo(selected, indicator));
    setCountry(selected);

    
  };

  const handleIndicatorSelection = (event, selected) => {
    // alert(indicator)
    // <Redirect to={queryConstructor(selectedCountry, "Population")} />
    history.push(navigateTo(country, selected)); 
    setIndicator(selected);

  };

  // setCountry(parsed.countries)
  // setIndicator(parsed.indicator)


  return (
    <div className="App">

    <div style={{width: 250, position: 'fixed', backgroundColor: 'light-gray', padding: 40, maxWidth: 300, float: "left", height: "100vh", display: "block", paddingTop: 20}}>
    <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            value={countries[country] || "Multiple"}
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
                freeSolo
                id="free-solo-3-demo"
                disableClearable
                placeholder="Indicator"
                value={indicators[indicator] || "Multiple"}
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

    <Typography variant="h6" className={classes.title}>
            Indicators
          </Typography>
          <div>
            <List dense={true}>
            {tokenizeParsed && tokenizeParsed.countries.map(countryKey => (

              
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      {/* <FolderIcon /> */}
                    </Avatar>
                  </ListItemAvatar>
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
          </div>
      
      </div>
      <div style={{backgroundColor: 'light-gray', marginLeft: 250}}>
      <Router history={history}>
        <Switch>
          <Route path="/:query" component={(props) => <GraphContent {...props} key={window.location.pathname} country={country} indicator={indicator} />}/>
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default withRouter(App);
