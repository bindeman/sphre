import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import millify from "millify";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {Scatter} from 'react-chartjs-2';
import axios from "axios";
import {graphColors} from './constants'
import {countries, indicators} from './constants'


import { useLocation, Router, Route, Switch } from "react-router";
const queryString = require('query-string');




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        fontFamily: 'Helvetica Neue, Helvetica, Arial',
        letterSpacing: '-0.03em',

    },
    graph: {
        width: "100%",
        maxHeight: '100vh',
    },
    statsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 0,
        columnGap: 60,
        [theme.breakpoints.down('sm')]: {
            columnGap: 30,

        },
        marginBottom: 30,
        marginTop: 20,

    },
    graphContainer: {
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
        fontSize: 50,
        transition: "font-size 0.25s",
        letterSpacing: "-1px",
        [theme.breakpoints.up('lg')]: {
            fontSize: 65,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 32,
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 22,
        },
        fontWeight: 500,
        // marginBottom: '50px',
        marginTop: "-20px",
        [theme.breakpoints.down('md')]: {
            marginTop: "-16px"
        },
        marginBottom: 0,
    },
    graphSubtitle: {
        fontWeight: 400,
        textAlign: 'left',
        fontSize: '16px',
        color: '#B8B8B8',
        textTransform: 'uppercase',
        // marginTop: '40px',
    },
    graphIndicator: {
        fontWeight: 400,
        textAlign: 'left',
        fontSize: '22px',
        color: '#B8B8B8',
        marginTop: 0,
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
        // height: 'fit-content',
        overflow: 'auto',
        padding: theme.spacing(6),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(4),
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            borderRadius: 20,

        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1),
            borderRadius: 10,

        },
        backgroundColor: "#fff",
        // maxWidth: 'calc(100% - 250px)',
        borderRadius: 30,

    },
    container: {
        // paddingTop: theme.spacing(4),
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

export default function GraphContainer(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    // const [graphData, setGraphData] = React.useState(false);
    const [graphHeading, setGraphHeading] = React.useState(false);
    const location = useLocation();
    const iterableData = Object.entries(props.data.data);
    console.log("CONTAINER KEYS: ", Object.keys(props.data.data));


    // useEffect(async () => {
    //     // alert(location.pathname);
    //     let url;
    //     if(location.pathname.length < 10) {
    //         url = "/v2/country/RUS/indicator/SP.POP.TOTL";
    //     } else {
    //         url = location.pathname;
    //         // alert(`https://api.worldbank.org${url}?format=json&mrnev=120`);

    //     }
    //     const response = await axios(
    //       `https://api.worldbank.org${url}?format=json&mrnev=120`,
    //     );
     
    //     const labels = [];
    //     const values = [];
    //     const objects = {};

    //     // let i = 0;
    //     if(response.data[1].length > 0) {
    //         // while(response[1][i].value == null) {
    //         //     i++;
    //         // }
    //         const item = response.data[1][0];
    //         setGraphHeading({
    //             latestValue: item.value,
    //             indicator: item.indicator.value,
    //             country: item.country.value,
    //             date: item.date,
    //         });
    //     }

    //     response.data[1].map(item => {
    //         if(item.value !== null) {

    //         values.unshift({x: item.date, y: item.value});
    //         labels.unshift(item.date);
    //         }
    //     });


    //     console.log(values);
    //     console.log(labels);        
    //     console.log(response.data);
    //     setLoading(false);

            const data = canvas => {


                    // const gradient2 = ctx.createLinearGradient(0, 0, 0, 350);
                    // gradient2.addColorStop(0, "rgba(245, 166, 35, 0.2)");
                    // gradient2.addColorStop(1, "rgba(245, 166, 35, 0.0)");

                    let datasets2 = [];
                    // const countries = Object.entries(props.data.data);
                    console.log("ITERATING THRU:", props.parsedURL.countries.split(';'));
                    props.country.forEach((entry, index) => {
                        // const [countryName, countryData] = iterableData[index];
                        const countryName = countries[entry];
                        const countryData = props.data.data[entry];
                        const ctx = canvas.getContext("2d")
                        const gradient = ctx.createLinearGradient(0, 0, 0, 350);
                        gradient.addColorStop(0, graphColors[index].background);
                        gradient.addColorStop(1, graphColors[index].clear);

                        
                        console.log(countryName);
                        console.log(countryData);
                        datasets2.push({
                            label: countryName,
                            data: countryData,
                            tension: 0.15, 
                            showLine: true,
                            backgroundColor: gradient,
                            borderColor: graphColors[index].line,
                            borderWidth: 6,
                            pointRadius: 0,
                        });
                      });

                    // for(const [countryName, countryData] of countries) {
                    //     console.log(countryName);
                    //     console.log(countryData);
                    //     datasets2.push({
                    //         label: countryName,
                    //         data: countryData,
                    //         tension: 0.15, 
                    //         showLine: true,
                    //         backgroundColor: "rgba(50, 173, 252, 0.2)",
                    //         borderColor: "#32ADFC",
                    //         borderWidth: 6,
                    //         pointRadius: 0,
                    //     });
                    // }

                    console.log(datasets2);
        
                    return {
                        
                    labels: props.data.labels,
                    datasets: datasets2,

                    }
                }

    //     setGraphData(data);
    //   }, []);


    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const parsed = queryString.parse(location.pathname);
    console.log("QUERY STRING: ", parsed);

    return (
        <div className={classes.root}>
            <CssBaseline />

            <main className={classes.content}>
                {/* <Container maxWidth="lg" className={classes.container}> */}

                {/* <div className={classes.graphImage}>
                    <img className={classes.graphImage} src='https://cdn.britannica.com/42/3842-004-F47B77BC/Flag-Russia.jpg'></img>
                </div> */}
                <div className={classes.graphContainer}>
                <h1 className={classes.graphIndicator}>{props.data.indicator}</h1>

                    {/* <h1 className={classes.graphSubtitle}>{props.data.country}</h1> */}

                    <div className={classes.statsContainer}>

                        {
                        props.country.map((entry, index) => {

                            const countryName = countries[entry];
                            const countryData = props.data.data[entry];

                            return(
                                <div> 
                                    <h1 style={{color: graphColors[index].line}} className={classes.graphSubtitle}>{countryName}</h1>
                                    
                                    <h1 className={classes.graphTitle}> {
                        
                                        millify(countryData[0].y, {
                                                precision: 2,
                                                lowercase: false,
                                                })

                                    }
                                    </h1>
                                </div>
                            )
                        })}

                    </div>

                    {/* {props.data.latestValue && <h1 className={classes.graphTitle}> {
                    
                        millify(props.data.latestValue, {
                                precision: 2,
                                lowercase: false,
                                })
                        }
                    </h1>} */}

                    
                    
                     <Scatter
                        className={classes.graph}
                        data={data}
                        options={{ 
                            maintainAspectRatio: true, 
                            responsive: true,
                            layout: {
                                padding: {
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                },
                            },
                            legend: {
                                display: false
                             },
                            scales: {
                                xAxes: [{
                                    drawBorder: false,
                                    ticks: { 
                                        display: true,
                                        autoSkip: true,
                                        padding: 10,
                                        maxTicksLimit: 12,
                                        drawOnChartArea: false
                                        // fontColor: '#C0C0C0'

                                    },
                                    gridLines: {
                                        drawTicks: false,
                                        tickMarkLength: 0,
                                        maxTicksLimit: 14,
                                        // drawOnChartArea: true,
                                        color: "rgba(0, 0, 0, 0.03)",
                                        drawBorder: false,
                                        tickMarkLength: false,
                                        display: true,

                                    }
                                }],
                                yAxes: [{
                                    position: 'right',
                                    drawBorder: false,
                                    ticks: { 
                                        display: true,
                                        drawOnChartArea: false,
                                        padding: 10,
                                        autoSkip: true,
                                        color: "rgba(0, 0, 0, 0.03)",
                                        maxTicksLimit: 9,
                                        // fontColor: '#C0C0C0',
                                        drawBorder: false,
                                        callback: function(value, index, values) {
                                            return millify(value, {
                                                precision: 2,
                                                lowercase: false,
                                                })
                                        }
                                     },
                                    gridLines: {
                                        drawTicks: false,
                                        tickMarkLength: 0,
                                        // drawOnChartArea: true,
                                        color: "rgba(0, 0, 0, 0.05)",
                                        drawBorder: false,
                                        tickMarkLength: false,
                                        display: true,

                                    },
                                }],
                            }
                        
                        }}
                    />
                    
                </div>
                   

                {/* </Container> */}
            </main>
        </div>
    );
}