import React, {useState, useEffect, useRef, useContext} from 'react';

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
import {WorldBankContext} from "./WorldBankContext";
import worldBankService from "./services/worldBankService";
import LoadingSpinner from "./Spinner";

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


const useStyles = makeStyles((theme) => ({
    root: {
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
    parentContainer: {
        display: 'flex',
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
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [prevDataLoaded, setPrevDataLoaded] = React.useState(false);
    const [lastChartRender, setLastChartRender] = React.useState(null)


    let localGraphOptions = graphOptions;
    const { graphReducerData, dispatch } = useContext(WorldBankContext);

    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    let datasets = [];

    function setData() {
        const chart = chartRef.current;
        const numberOfLines = props.country.length
        props.country.map((entry, index) => {
            // const [countryName, countryData] = iterableData[index];
            const countryName = countries[entry];
            const countryData = graphReducerData[props.indicator][entry];

            const gradient = chart.ctx.createLinearGradient(0, chart.chartArea.bottom, 0, chart.chartArea.top);
            gradient.addColorStop(1, changeOpacity(getGraphColor(index).background, 0.36 / numberOfLines));
            gradient.addColorStop(0, getGraphColor(index).clear);

            datasets.push({
                label: countryName,
                data: countryData,
                tension: 0,
                showLine: true,
                borderColor: getGraphColor(index).line,
                backgroundColor: gradient,
                borderWidth: getGraphLineWidth(numberOfLines),
                pointRadius: 2,
                fill: true,
                pointBackgroundColor: 'rgba(0,0,0,0)',
                pointBorderColor: 'rgba(0,0,0,0)',
            });

            setLoading(false);
            setPrevDataLoaded(false);
            console.log("DATASETS", datasets)
        });


        if (chart) {
            setChartData({
                datasets: datasets
            });
        }
    }



    function setPreviousData() {
        const chart = chartRef.current;
        let numberOfLines = props.country.length;


        let someDataLoaded = false;
        props.country.map((entry, index) => {
            //push if data is already loaded or cached
            if(graphReducerData && graphReducerData[props.indicator] && graphReducerData[props.indicator][entry]) {
                // const [countryName, countryData] = iterableData[index];
                const countryName = countries[entry];
                const countryData = graphReducerData[props.indicator][entry];

                const gradient = chart.ctx.createLinearGradient(0, chart.chartArea.bottom, 0, chart.chartArea.top);
                gradient.addColorStop(1, changeOpacity(getGraphColor(index).background, 0.36 / numberOfLines));
                gradient.addColorStop(0, getGraphColor(index).clear);

                datasets.push({
                    label: countryName,
                    data: countryData,
                    tension: 0,
                    showLine: true,
                    borderColor: getGraphColor(index).line,
                    backgroundColor: gradient,
                    borderWidth: getGraphLineWidth(numberOfLines),
                    pointRadius: 2,
                    fill: true,
                    pointBackgroundColor: 'rgba(0,0,0,0)',
                    pointBorderColor: 'rgba(0,0,0,0)',
                });

                someDataLoaded = true;
                // setLoading(false);
                console.log("PREV DATASETS", datasets)
            }
        });

        setPrevDataLoaded(someDataLoaded);

        if (someDataLoaded && chart) {
            setChartData({
                datasets: datasets
            });
        }
    }

    const dataPoints = graphReducerData;

    useEffect(() => {

        setLoading(true);
        setPreviousData();
        localGraphOptions['animation'] = {
            duration: 0,
        }

        const getData = (country, indicator) => {

            let promises = worldBankService.getCountriesAndIndicatorOptimized(country, indicator, dataPoints)

            if(promises.length > 0) {
                Promise.all(promises)
                    .then((responses) => {
                        console.log("AFTER DP", dataPoints);
                        dispatch({
                            type: "UPDATE_INDICATOR",
                            payload: dataPoints[indicator],
                            indicator: props.indicator
                        })
                        localGraphOptions['animation'] = {
                            duration: 300
                        }
                        console.log("Updated Chart Data");

                        setData();
                        setLastChartRender(Date.now())
                    })
                    .catch((err) => {
                        console.log("ERROR receiving one", err)
                    });
            } else {
                console.log("NOTHING UPDATED", chartData);
                localGraphOptions['animation'] = {
                    duration: 0
                }
                setData();
                setLastChartRender(Date.now())
            }
        }

        getData(props.country, props.indicator);

    }, []);


    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>

                {/*<div className={classes.graphImage}>*/}
                {/*    <img className={classes.graphImage} src='https://cdn.britannica.com/42/3842-004-F47B77BC/Flag-Russia.jpg'></img>*/}
                {/*</div>*/}
                <div className={classes.graphContainer}>

                    <div className={classes.parentContainer}>
                        <h1 className={classes.graphIndicator}>{indicators[props.indicator]}</h1>
                        {loading && <div style={{marginLeft: 'auto', order: 2}}> <LoadingSpinner /></div>}
                    </div>

                    {/* <h1 className={classes.graphSubtitle}>{props.data.country}</h1> */}
                    <div className={classes.statsContainer}>

                        {
                            (prevDataLoaded || !loading) && props.country.map((entry, index) => {

                                const countryName = countries[entry];
                                console.log("INFOTHERE", graphReducerData[props.indicator] && graphReducerData[props.indicator][entry] );
                                const countryData = graphReducerData[props.indicator][entry];
                                // console.log("COUNTRY DATA: ", countryData)

                                return(
                                    <div key={entry}>
                                        <h1 style={{color: getGraphColor(index).line}} className={classes.graphSubtitle}>{countryName}</h1>

                                        <h1 className={classes.graphTitle}> {

                                            countryData && countryData[0] ? millify(countryData[0].y, {
                                                precision: 2,
                                                lowercase: false,
                                            }) : "--   "

                                        }
                                        </h1>
                                    </div>
                                )
                            })}
                    </div>


                    <Scatter
                        className={classes.graph}
                        data={chartData}
                        key={lastChartRender}
                        ref={chartRef}
                        options={graphOptions}
                    />


                </div>
            </main>
        </div>
    );
}

export default React.memo(GraphContainer);