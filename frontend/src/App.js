import logo from './logo.svg';
import './App.css';
import Dashboard from "./Dashboard";
import React from "react";
import {Redirect, Route, Switch, useHistory, Router, withRouter} from "react-router-dom";
import { createBrowserHistory } from "history";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const countries = {
  "Russia": "RUS",
  "United States": "USA",
  "France": "FR",
  "China": "CN",
  "Mexico": "MX",
}

const indicators = {
  "Fertility Rate": "SP.DYN.TFRT.IN",
  "Population": "SP.POP.TOTL",
  "Net Migration": "SM.POP.NETM",
  "% of Employment": "SL.EMP.WORK.ZS",
  "GDP": "NY.GDP.MKTP.CD"
}





function App() {
  const history = createBrowserHistory();
  // const [country, setCountry] = React.useState("Russia");
  const [indicator, setIndicator] = React.useState("Population");


  const navigateTo = (country, indicator) => {
    return `/v2/country/${countries[country]}/indicator/${indicators[indicator]}`;
  }



  const handleCountrySelection = (event, selected) => {
    // <Redirect to={queryConstructor(selectedCountry, "Population")} />
    // alert(country)
    history.push(navigateTo(selected, indicator));
    // setCountry(selected);
    
    
  };

  const handleIndicatorSelection = (event, selected) => {
    // setIndicator(selected);
    // alert(indicator)
    // <Redirect to={queryConstructor(selectedCountry, "Population")} />
    // history.push(navigateTo(country, indicator));    
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
                label="Search input"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />

{/* <Autocomplete
            freeSolo
            id="free-solo-3-demo"
            disableClearable
            placeholder="Indicator"
            onChange={handleIndicatorSelection}
            options={Object.keys(indicators).map((option) => option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          /> */}
      </div>
      <Router history={history}>
      <Switch>
        <Route path="/v2/:query" component={(props) => <Dashboard {...props} key={window.location.pathname}/>}/>
      </Switch>
      </Router>
    </div>
  );
}

export default withRouter(App);
