import logo from './logo.svg';
import './App.css';
import React, {useEffect, useContext, useReducer} from "react";
import {Redirect, Route, Switch, useHistory, Router, withRouter, useLocation} from "react-router-dom";
import GraphContent from "./GraphContent";
import { createBrowserHistory } from "history";
import {countries, getGraphColor, indicators} from './constants'
import { makeStyles } from '@material-ui/core/styles';
import {graphColors} from './constants'
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import CountrySelector from './CountrySelector';
import IndicatorSelector from './IndicatorSelector';




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
    }, []);

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

    // setCountryArr(selected);
    setCountry(selected);
    getData(selected, indicator);

    // const indicatorString = indicator.join(';');
    // history.push(navigateTo(stringnifiedURL, indicatorString));

  };

  const handleIndicatorSelection = (selected) => {
    const stringnifiedURL = selected.join(';');

    setIndicator(selected);
    getData(country, selected);

    // const countryString = country.join(';');
    // history.push(navigateTo(countryString, stringnifiedURL));

  };

  // setCountry(parsed.countries)
  // setIndicator(parsed.indicator)


  return (
    <div className="App">

    <div style={{width: 250, position: 'fixed', backgroundColor: 'light-gray', padding: "40px 0 40px 40px", maxWidth: 300, float: "left", height: "100vh", display: "block", paddingTop: 20}}>
    {/*<Autocomplete*/}
    {/*        multiple*/}
    {/*        freeSolo*/}
    {/*        id="free-solo-2-demo"*/}
    {/*        disableClearable*/}
    {/*        value={country}*/}
    {/*        getOptionLabel={(option) => countries[option]}*/}
    {/*    // value={["RU", "FR"]}*/}
    {/*        // value={countries[country] || "Multiple"}*/}
    {/*        onChange={handleCountrySelection}*/}
    {/*        // placeholder="Country"*/}
    {/*        options={Object.keys(countries).map((option) => option)}*/}
    {/*        renderOption={(option) =>*/}
    {/*            <ListItem dense={true}>*/}
    {/*              <ListItemAvatar>*/}
    {/*                <img*/}
    {/*                  loading="lazy"*/}
    {/*                  width="30"*/}
    {/*                  // src={`https://flagcdn.com/w20/${option.toLowerCase()}.png`}*/}
    {/*                  src={`https://flagcdn.com/w80/${option.toLowerCase()}.png`}*/}
    {/*                  alt=""*/}
    {/*              />*/}
    {/*              </ListItemAvatar>*/}
    {/*              <ListItemText noWrap*/}
    {/*                primary={countries[option]}*/}
    {/*                secondary={option}*/}
    {/*              />*/}
    {/*            </ListItem>*/}
    {/*        }*/}
    {/*        renderInput={(params) => (*/}
    {/*          <TextField*/}
    {/*            {...params}*/}
    {/*            label="Country"*/}
    {/*            margin="normal"*/}
    {/*            variant="outlined"*/}
    {/*            InputProps={{ ...params.InputProps, type: 'search' }}*/}
    {/*          />*/}
    {/*        )}*/}
    {/*      />*/}

        <CountrySelector options={countries} onSelect={handleCountrySelection} selectedOptions={country} />
        <IndicatorSelector options={indicators} onSelect={handleIndicatorSelection} selectedOptions={indicator} />

        {/*<Autocomplete*/}
        {/*        // multiple*/}
        {/*        multiple*/}
        {/*        id="free-solo-3-demo"*/}
        {/*        disableClearable*/}
        {/*        value={indicator}*/}
        {/*        placeholder="Indicator"*/}
        {/*        renderTags={(tagValue, getTagProps) =>*/}
        {/*            tagValue.map((option, index) => {})*/}
        {/*        }*/}
        {/*        // value={indicators[indicator] || "Multiple"}*/}
        {/*        onChange={handleIndicatorSelection}*/}
        {/*        options={Object.keys(indicators).map((option) => option)}*/}
        {/*        getOptionLabel={(option) => indicators[option]}*/}
        {/*        renderOption={(option) =>*/}
        {/*            <ListItem dense={true}>*/}
        {/*              <ListItemText noWrap*/}
        {/*                            primary={indicators[option]}*/}
        {/*                            secondary={option}*/}
        {/*              />*/}
        {/*            </ListItem>*/}
        {/*        }*/}
        {/*        renderInput={(params) => (*/}
        {/*          <TextField*/}
        {/*            {...params}*/}
        {/*            label="Indicator"*/}
        {/*            margin="normal"*/}
        {/*            variant="outlined"*/}
        {/*            InputProps={{ ...params.InputProps, type: 'search' }}*/}
        {/*          />*/}
        {/*        )}*/}
        {/*      />*/}


          <div>
            {/*<List dense={true}>*/}
            {/*<Typography className={classes.categoryTitle}>Countries</Typography>*/}

            {/*{ country.map((countryKey, index) => (*/}


            {/*    <ListItem>*/}
            {/*      /!* <ListItemAvatar disablePadding> *!/*/}
            {/*        <div className={classes.listPin} style={{backgroundColor: getGraphColor(index).line}}>*/}

            {/*        </div>*/}
            {/*      /!* </ListItemAvatar> *!/*/}
            {/*      <ListItemText*/}
            {/*        primary={countries[countryKey]}*/}
            {/*        secondary={countryKey}*/}
            {/*      />*/}
            {/*      <ListItemSecondaryAction>*/}
            {/*        /!*<IconButton edge="end" aria-label="delete">*!/*/}
            {/*           <RemoveCircleOutlinedIcon className={classes.iconColor} />*/}
            {/*        /!*</IconButton>*!/*/}
            {/*      </ListItemSecondaryAction>*/}
            {/*    </ListItem>)*/}


            {/*)}*/}
            {/*</List>*/}


            {/*<List dense={true}>*/}
            {/*<Typography className={classes.categoryTitle}>Indicators</Typography>*/}

            {/*{ indicator.map((indicatorKey, index) => (*/}


            {/*    <ListItem>*/}
            {/*      /!* <ListItemAvatar disablePadding> *!/*/}
            {/*        <div className={classes.listPin}>*/}

            {/*        </div>*/}
            {/*      /!* </ListItemAvatar> *!/*/}
            {/*      <ListItemText*/}
            {/*        primary={indicators[indicatorKey]}*/}
            {/*        secondary={indicatorKey}*/}
            {/*      />*/}
            {/*      <ListItemSecondaryAction>*/}
            {/*        <IconButton edge="end" aria-label="delete">*/}
            {/*          <RemoveCircleOutlinedIcon className={classes.iconColor} />*/}
            {/*        </IconButton>*/}
            {/*      </ListItemSecondaryAction>*/}
            {/*    </ListItem>)*/}


            {/*)}*/}
            {/*</List>*/}
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
