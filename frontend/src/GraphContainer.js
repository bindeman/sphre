import React, {useState, useEffect, useRef} from 'react';

import clsx from 'clsx';
import millify from "millify";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { ChartData, ChartArea } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Interaction,
    Legend,
} from 'chart.js';

import 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';

import {CrosshairPlugin, Interpolate} from 'chartjs-plugin-crosshair';

import axios from "axios";
import {changeOpacity, getGraphColor, getGraphLineWidth, graphColors, graphOptions} from './constants'
import {countries, indicators} from './constants'


import { useLocation, Router, Route, Switch } from "react-router";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    CrosshairPlugin
);

Interaction.modes.interpolate = Interpolate


const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        fontFamily: 'Helvetica Neue, Helvetica, Arial',
        letterSpacing: '-0.03em',
        marginTop: 25,

    },
    graph: {
        width: "100%",
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

function GraphContainer(props) {
    // console.log("RENDERING: ", props.indicator)
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    // const [graphData, setGraphData] = React.useState(false);
    const [graphHeading, setGraphHeading] = React.useState(false);
    // const location = useLocation();
    // console.log("DATA THAT I RECEIVED IN CONTAINER", props.data);
    // const iterableData = Object.entries(props.data);
    // console.log("CONTAINER KEYS: ", Object.keys(props.data));

    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        datasets: [],
    });


        useEffect(() => {
            const chart = chartRef.current;
            let datasets2 = [];
            const numberOfLines = props.country.length
            // const countries = Object.entries(props.data);
            // console.log("ITERATING THRU:", props.parsedURL.countries.split(';'));
            props.country.map((entry, index) => {
                // const [countryName, countryData] = iterableData[index];
                const countryName = countries[entry];
                const countryData = props.data[entry];

                // const gradient = chart.ctx.createLinearGradient(0, chart.chartArea.bottom, 0, chart.chartArea.top);
                // gradient.addColorStop(0, changeOpacity(getGraphColor(index).background, 0.36 / numberOfLines));
                // gradient.addColorStop(1, getGraphColor(index).clear);


                // console.log(countryName);
                // console.log(countryData);
                datasets2.push({
                    label: countryName,
                    data: countryData,
                    tension: 0,
                    showLine: true,
                    borderColor: getGraphColor(index).line,
                    borderWidth: getGraphLineWidth(numberOfLines),
                    pointRadius: 2,
                    fill: false
                });
            });


            if (chart) {
                setChartData({
                    datasets: datasets2
                });
            }

            console.log("SETTING CHART", datasets2);

        }, []);




    //     setGraphData(data);
    //   }, []);

    // const parsed = queryString.parse(location.pathname);
    // console.log("QUERY STRING: ", parsed);


    return (
        <div className={classes.root}>
            <CssBaseline />

            <main className={classes.content}>
                {/* <Container maxWidth="lg" className={classes.container}> */}

                {/* <div className={classes.graphImage}>
                    <img className={classes.graphImage} src='https://cdn.britannica.com/42/3842-004-F47B77BC/Flag-Russia.jpg'></img>
                </div> */}
                <div className={classes.graphContainer}>
                <h1 className={classes.graphIndicator}>{props.indicator}</h1>

                    {/* <h1 className={classes.graphSubtitle}>{props.data.country}</h1> */}

                    <div className={classes.statsContainer}>

                        {
                        props.country.map((entry, index) => {

                            const countryName = countries[entry];
                            const countryData = props.data[entry];
                            // console.log("COUNTRY DATA: ", countryData)

                            return(
                                <div> 
                                    <h1 style={{color: getGraphColor(index).line}} className={classes.graphSubtitle}>{countryName}</h1>
                                    
                                    <h1 className={classes.graphTitle}> {

                                        countryData && countryData[0] ? millify(countryData[0].y, {
                                                precision: 2,
                                                lowercase: false,
                                                }) : "--"

                                    }
                                    </h1>
                                </div>
                            )
                        })}

                    </div>                    
                    
                     <Scatter
                        className={classes.graph}
                        data={chartData}
                        ref={chartRef}
                        options={graphOptions}
                    />

                </div>
                   

            </main>
        </div>
    );
}

export default React.memo(GraphContainer);