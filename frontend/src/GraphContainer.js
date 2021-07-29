import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import millify from "millify";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {Scatter} from 'react-chartjs-2';
import axios from "axios";
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
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
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
    const [graphData, setGraphData] = React.useState(false);
    const [graphHeading, setGraphHeading] = React.useState(false);
    const location = useLocation();



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
                    const ctx = canvas.getContext("2d")
                    const gradient = ctx.createLinearGradient(0, 0, 0, 350);
                    gradient.addColorStop(0, "rgba(50, 173, 252, 0.2)");
                    gradient.addColorStop(1, "rgba(50, 173, 252, 0.0)");
        
                    return {
                    labels: props.data.labels,
                    datasets: [
                        {
                            label: 'Population',
                            data: props.data.data,
                            tension: 0, 
                            showLine: true,
                            backgroundColor: gradient,
                            borderColor: "#32ADFC",
                            borderWidth: 4,
                            pointRadius: 0,
                        }
                    ],
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

    return (
        <div className={classes.root}>
            <CssBaseline />

            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>

                {/* <div className={classes.graphImage}>
                    <img className={classes.graphImage} src='https://cdn.britannica.com/42/3842-004-F47B77BC/Flag-Russia.jpg'></img>
                </div> */}
                <div className={classes.graphContainer}>
                    {props.data.latestValue && <h1 className={classes.graphTitle}> {
                    
                        millify(props.data.latestValue, {
                                precision: 2,
                                lowercase: false,
                                })
                        }
                    </h1>}

                    <h1 className={classes.graphSubtitle}>{props.data.country}</h1>
                    <h1 className={classes.graphSubtitle}>{props.data.indicator}</h1>
                    
                    
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
                            scales: {
                                xAxes: [{
                                    drawBorder: false,
                                    ticks: { 
                                        display: true,
                                        autoSkip: true,
                                        maxTicksLimit: 12,
                                        drawOnChartArea: false,
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
                                    drawBorder: false,
                                    ticks: { 
                                        display: true,
                                        drawOnChartArea: false,
                                        autoSkip: true,
                                        color: "rgba(0, 0, 0, 0.03)",
                                        maxTicksLimit: 9,
                                        drawBorder: false,
                                        

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
                   

                </Container>
            </main>
        </div>
    );
}