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

    const [graphHeading, setGraphHeading] = React.useState(false);
    const location = useLocation();



    useEffect(async () => {
        // alert(location.pathname);
        let url;
        // if(props.country === undefined) {
        //     url = location.pathname;
        // } else {
            url = `v2/country/${props.country}/indicator/${props.indicator}`;
            // alert(`https://api.worldbank.org${url}?format=json&mrnev=120`);

        // }
        // alert(`https://api.worldbank.org/v2/country/${countries[props.country]}/indicator/${indicators[props.indicator]}?format=json&mrnev=120`)
        // const response = await axios(
        //     `https://api.worldbank.org/v2/country/${countries[props.country]}/indicator/${indicators[props.indicator]}?format=json&mrnev=120`
        // );

        const response = await axios(
          `https://api.worldbank.org/${url}?format=json&per_page=520&mrnev=250`,
        );
     
        const datas = {};
        const labels = [];
        const values = [];

        console.log("RESPONSE", response.data[1]);

        // let i = 0;
        if(response.data[1] && response.data[1].length > 0) {
            // while(response[1][i].value == null) {
            //     i++;
            // }
            const item = response.data[1][0];
            setGraphHeading({
                latestValue: item.value,
                indicator: item.indicator.value,
                country: item.country.value,
                date: item.date,
            });
        

        response.data[1].map(item => {
            if(item.value !== null) {
                if(datas[item.country.value] == null) {
                    datas[item.country.value] = [];
                }
                datas[item.country.value].unshift({x: item.date, y: item.value});
            // values.unshift({x: item.date, y: item.value});
            // labels.unshift(item.date);
            }
        });
        


        // console.log(values);
        // console.log(labels);        
        // console.log(response.data);
 


        setGraphData(values);
        setGraphLabels(labels);

        if(response.data[1].length > 0) {
            // while(response[1][i].value == null) {
            //     i++;
            // }
            const item = response.data[1][0];

            setGraphData({
                data: datas,
                labels: labels,
                latestValue: item.value,
                indicator: item.indicator.value,
                country: item.country.value,
                date: item.date,
            });
        }
        setLoading(false);
    }
      }, []);



    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
            // <CssBaseline />

                // <Container maxWidth="lg" className={classes.container}>
                <div className={classes.container}>
                    {!loading &&    
                        <GraphContainer labels={graphLabels} data={graphData}/>
                    }
               </div>
                // </Container>
    );
}