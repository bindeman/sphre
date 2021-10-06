import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import GraphContainer from "./GraphContainer";
import millify from "millify";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {Scatter} from 'react-chartjs-2';
import axios from "axios";
import {countries, indicators} from './constants'
import { useLocation, Router, Route, Switch } from "react-router";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontFamily: 'Helvetica Neue, Helvetica, Arial',
        letterSpacing: '-0.03em',
    },
    graph: {
        maxWidth: 600,
    },
    graphContainer: {
        maxWidth: '900px',
        display: 'block',
        margin: 'auto',
    },
    graphImage: {
        maxWidth: '100px',
        maxHeight: '80px',
        display: 'block',
        float: 'right'
    },
    graphTitle: {
        textAlign: 'left',
        fontSize: '65px',
        fontWeight: 500,
        marginBottom: '0px',

    },
    graphSubtitle: {
        fontWeight: 400,
        textAlign: 'left',
        fontSize: '25px',
        color: '#B8B8B8',
        marginTop: '0px',


    },
    graphCategory: {
        fontWeight: 500,
        textAlign: 'left',
        fontSize: '20px', 
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // height: '100vh',
        overflow: 'auto',
    },
    container: {
        margin: theme.spacing(5),
        // maxHeight: '80vh',
        // paddingBottom: theme.spacing(4),
    },
    paper: {
        // padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));



export default function GraphContent(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [graphData, setGraphData] = React.useState(null);
    const [graphLabels, setGraphLabels] = React.useState(false);
    const [responseState, setResponseState] = React.useState(null);
    // setTheArray(prevArray => [...prevArray, ...newValue])


    const location = useLocation();



    useEffect(async () => {
            let url;

            const countryString = props.country.join(';');
            // const indicatorString = props.indicator.join(';');
            console.log("REQUEST COUNTRIES: ", props.country.join(';'));
            url = `v2/country/${countryString}/indicator/${props.indicator}`;


        const response = await axios(
          `https://api.worldbank.org/${url}?format=json&per_page=520`,
        );
     
        const datas = {};
        const labels = [];
        const values = [];
        console.log("REQUEST", `https://api.worldbank.org/${url}?format=json&per_page=520&mrnev=250`)
        console.log("RESPONSE", response.data[1]);

        if(response.data[1] && response.data[1].length > 0) {
     
        console.log("LENGTH OF RESPONSE RECEIVED: ", response.data[1].length)
        response.data[1].map((item) => {
            if(item.value !== null) {
                if(datas[item.country.id] == null) {
                    datas[item.country.id] = [];
                }
                datas[item.country.id].push({x: item.date, y: item.value});

            }
        });
        


        if(response.data[1].length > 0) {
            const item = response.data[1][0];
            console.log("setting graph data", datas);
            setGraphData({                
                data: datas,
                labels: labels,
                latestValue: item.value,
                indicator: item.indicator.value,
                country: item.country.value,
                date: item.date,
            });
        }
        console.log("Dict keys", Object.keys(datas));
        // console.log("state", Object.keys(graphData));
        // console.log("STUFF OF KEYS", graphData);

        setLoading(false);
    }
      }, []);



    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
            // <CssBaseline />

                <div className={classes.container}>
                    {!loading && graphData !== [] && 
                        <GraphContainer country={props.country} parsedURL={props.parsedURL} data={graphData}/>
                        
                    }
               </div>
    );
}