import logo from './logo.svg';
import './App.css';
import React from "react";
import {Redirect, Route, Switch, useHistory, Router, withRouter} from "react-router-dom";
import GraphContent from "./GraphContent";
import { createBrowserHistory } from "history";
import {countries, indicators} from './constants'


import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';








function App() {
  const history = createBrowserHistory();
  const [country, setCountry] = React.useState(undefined);
  const [indicator, setIndicator] = React.useState("Population");


  const navigateTo = (country, indicator) => {
    return `/v2/country/${countries[country]}/indicator/${indicators[indicator]}`;
  }

  const handleCountrySelection = (event, selected) => {
    // <Redirect to={queryConstructor(selectedCountry, "Population")} />
    // alert(country)
    history.push(navigateTo(selected, country));
    setCountry(selected);
    
    
  };

  const handleIndicatorSelection = (event, selected) => {
    // alert(indicator)
    // <Redirect to={queryConstructor(selectedCountry, "Population")} />
    history.push(navigateTo(indicator, selected)); 
    setIndicator(selected);
   
  };

  return (
    <div className="App">

    <div style={{maxWidth: 300, margin: "auto", display: "block", paddingTop: 20}}>
    <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            onChange={handleCountrySelection}
            // placeholder="Country"
            options={Object.keys(countries).map((option) => option)}
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
            onChange={handleIndicatorSelection}
            options={Object.keys(indicators).map((option) => option)}
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
      </div>
      <Router history={history}>
      <Switch>
        <Route path="/v2/:query" component={(props) => <GraphContent {...props} key={window.location.pathname} country={country} indicator={indicator} />}/>
      </Switch>
      </Router>
    </div>
  );
}

export default withRouter(App);
