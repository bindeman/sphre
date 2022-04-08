import logo from './logo.svg';
import './App.css';
import React, {useEffect, useContext, useReducer} from "react";
import {Redirect, Route, Switch, useHistory, Router, withRouter, useLocation} from "react-router-dom";
import GraphContent from "./GraphContent";
import { createBrowserHistory } from "history";
import {countries, getGraphColor, indicators} from './constants'
import CountrySelector from './CountrySelector';
import IndicatorSelector from './IndicatorSelector';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import {
  IconButton,
  Box, Toolbar, Button, Menu, AppBar, MenuItem,
  createMuiTheme, createTheme
} from '@mui/material'
import { render } from 'react-dom';
import worldBankService from "./services/worldBankService";
import {WorldBankContext} from "./WorldBankContext";
import {ThemeProvider} from "@emotion/react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Countries from "./Countries";



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
    marginTop: 2,
  },
  content: {
    marginTop: 100,
  },
  hoverStyle: {
    '&:hover': {
      transition: '0.15s',
      transform: 'scale(1.05)'
    },
    '&:active': {
      transition: '0.08s',
      opacity: 0.9,
      transform: 'scale(1.07)'
    },
    transition: '0.15s'
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
  const [country, setCountry] = React.useState(parsed.countries !== undefined ? parsed.countries.split(";") : ["US"]);
  const [indicator, setIndicator] = React.useState(parsed.indicators !== undefined ? parsed.indicators.split(";") : ["SP.DYN.TFRT.IN"]);
  const [graphData, setGraphData] = React.useState({});
  const [darkmode, setDarkmode] = React.useState(true);

  const { graphReducerData, dispatch } = useContext(WorldBankContext);

  const theme = createTheme({
    palette: {
      mode: darkmode ? 'dark' : 'light',
      primary: {
        main: darkmode ? '#FF8C00' : '#3f51b5',
      },
      secondary: {
        main: '#00acf5',
      },
    },
    typography: {
      h1: {
        fontSize: 36,
        fontWeight: 700,
      },
      h2: {
        fontSize: 24,
        fontWeight: 800,
      },
      h3: {
        fontSize: 14,
        fontWeight: 700,
        opacity: 0.7,
      },
      h4: {
        fontSize: 14,
        fontWeight: 500,
        opacity: 0.7,
        marginBottom: 12,
        paddingTop: 12,
      },
      subtitle2: {
        fontSize: 12,
        fontWeight: 400,
        opacity: 0.6,
      },
      body1: {
        fontSize: 15,
        lineHeight: 1.2,
        fontWeight: 500,
      },
      button: {
        fontSize: 14,
        textTransform: 'none',
        fontWeight: 600,
      },
      spacer: {
        marginTop: 20,
      }
    }
  });

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
    // console.log("BEFORE DP", dataPoints);
    const indicatorString = indicator.join(';');
    const countryString = country.join(';');
    history.push(navigateTo(countryString, indicatorString));
  }


  const navigateTo = (country, indicator) => {
    // console.log(`&graph=true&countries=${country}&indicators=${indicator}`)
    return `&graph=true&countries=${country}&indicators=${indicator}`;
  }

  const handleCountrySelection = (selected) => {
    // const stringnifiedURL = selected.join(';');

    setCountry(selected);
    getData(selected, indicator);


  };

  const handleIndicatorSelection = (selected) => {
    // const stringnifiedURL = selected.join(';');

    setIndicator(selected);
    getData(country, selected);


  };

  return (
      <ThemeProvider theme={theme}>
      <Box className="App" sx={{  bgcolor: 'background.paper' }}>
      <Box>
        <AppBar position="fixed" sx={{  bgcolor: 'background.paper', boxShadow: 'none', color: 'text.primary' }}>
          <Toolbar>
            <img className={classes.hoverStyle} src={darkmode ? '/sphrelogo_light.svg' : '/sphrelogo.svg'} alt="logo" />
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
            </IconButton>
              <Menu />
              {/*<Typography onClick={() => history.push('/about')} sx={{ minWidth: 100 }}>About</Typography>*/}
              <Typography onClick={() => history.push('/trends')} sx={{ minWidth: 150 }}>Trends</Typography>
              {/*<Typography onClick={() => history.push('/comparison')} sx={{ minWidth: 100 }}>Comparison</Typography>*/}
              <Typography onClick={() => history.push('/indicators')} sx={{ minWidth: 150 }}>Indicators</Typography>
              <Typography onClick={() => history.push('/countries')} sx={{ minWidth: 150 }}>Countries</Typography>


            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
              <InfoOutlinedIcon/>
            </IconButton>


            {/*<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>*/}
            {/*  Sphre*/}
            {/*</Typography>*/}
          </Toolbar>
        </AppBar>
      </Box>

      <Box className={classes.content}>

    <Box style={{width: 250, position: 'fixed', padding: "40px 0 40px 40px", maxWidth: 300, float: "left", height: "100vh", display: "block", paddingTop: 20}}>

        <CountrySelector options={countries} onSelect={handleCountrySelection} selectedOptions={country} />
        <IndicatorSelector options={indicators} onSelect={handleIndicatorSelection} selectedOptions={indicator} />

          <Box>
          </Box>
      
      </Box>
      <Box style={{marginLeft: 250}}>
      <Router history={history}>
        <Switch>
          <Route path="/countries" key={"Countries"} component={(props) => <Countries {...props} />}/>
          <Route path="/indicators" key={"Indicators"} component={(props) => <GraphContent {...props} country={country} indicator={indicator} />}/>
          <Route path="/:query" key={"Graph"} component={(props) => <GraphContent {...props} country={country} indicator={indicator} />}/>
        </Switch>
      </Router>
      </Box>
      </Box>
    </Box>
    </ThemeProvider>

  );
}

export default withRouter(App);
