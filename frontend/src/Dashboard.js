import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Chart from './Chart';
import {Line} from 'react-chartjs-2';
import axios from "axios";
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontFamily: 'Helvetica Neue',
        letterSpacing: '-0.03em',

    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
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

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [graphData, setGraphData] = React.useState(false);
    const [graphHeading, setGraphHeading] = React.useState(false);


    useEffect(async () => {
        const response = await axios(
          'https://api.worldbank.org/v2/country/RUS/indicator/SP.POP.TOTL?format=json&per_page=120',
        );
     
        const labels = [];
        const values = [];

        if(response.data[1].length > 0) {
            const item = response.data[1][0]
            setGraphHeading({
                latestValue: item.value,
                indicator: item.indicator.value,
                country: item.country.value,
                date: item.date,
            });
        }

        response.data[1].map(item => {
            values.push(item.value);
            labels.push(item.date);
        });


        console.log(values);
        console.log(labels);        
        console.log(response.data);
        setLoading(false);




        const data = canvas => {
            // const ctx = canvas.getContext("2d")
            // const gradient = ctx.createLinearGradient(0, 0, 0, 350);
            // gradient.addColorStop(0, "rgba(50, 173, 252, 0.4)");
            // gradient.addColorStop(1, "rgba(50, 173, 252, 0.0)");

            return {
            labels: labels,
            datasets: [
                {
                    label: 'Population',
                    data: values,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: "#32ADFC",
                    borderWidth: 4,
                    pointRadius: 0,
                },
            ],
            }
        }


        setGraphData(data);



      });


    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root }>
            <CssBaseline />
            {/* <AppBar position="absolute" className={clsx(classes.appBar)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar> */}

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>

                {/* <div className={classes.graphImage}>
                    <img className={classes.graphImage} src='https://cdn.britannica.com/42/3842-004-F47B77BC/Flag-Russia.jpg'></img>
                </div> */}
                <div className={classes.graphContainer}>
                    <h1 className={classes.graphTitle}>{graphHeading.latestValue}</h1>
                    <h1 className={classes.graphSubtitle}>{graphHeading.country}</h1>
                    <h1 className={classes.graphSubtitle}>{graphHeading.indicator}</h1>

                    
                    {graphData && <Line
                        className={classes.graph}
                        data={graphData}
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
                                        display: false,
                                        autoSkip: true,
                                        maxTicksLimit: 12,
                                        drawOnChartArea: false,
                                    },
                                    gridLines: {
                                        drawTicks: false,
                                        tickMarkLength: 0,
                                        // drawOnChartArea: true,
                                        color: "rgba(0, 0, 0, 0.05)",
                                        drawBorder: false,
                                        tickMarkLength: false,
                                        display: true,

                                    }
                                }],
                                yAxes: [{
                                    drawBorder: false,
                                    ticks: { 
                                        display: false,
                                        drawOnChartArea: false,
                                        autoSkip: true,
                                        color: "rgba(0, 0, 0, 0.05)",
                                        maxTicksLimit: 10,
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
                    />}
                </div>
                   

                </Container>
            </main>
        </div>
    );
}