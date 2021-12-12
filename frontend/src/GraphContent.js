import React, {useEffect} from 'react';

import clsx from 'clsx';
import GraphContainer from "./GraphContainer";
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import worldBankService from "./services/worldBankService";
import {countries, indicators} from "./constants";


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
    },
    paper: {
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
    const [graphData, setGraphData] = React.useState({});

    const [responseState, setResponseState] = React.useState(null);

    const dataPoints = {};

    useEffect(async () => {
        let promises = worldBankService.getCountriesAndIndicatorsOptimized(props.country, props.indicator, dataPoints)
        Promise.all(promises)
            .then((responses) => {
                console.log("RECEIVED ON MY END HERE");
                console.log("DP BRUH", dataPoints);
                setGraphData(dataPoints)
                setLoading(false)
            })
            .catch((err) => {
                console.log("ERROR receiving one", err)
            });
    }, []);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.container}>
            {
                !loading && Object.entries(graphData).map(([indicatorID, indicatorData]) => {
                    return (
                        <GraphContainer country={props.country} data={indicatorData}
                                        indicator={indicators[indicatorID]}
                        />)

            })

            }
        </div>
    );
}