import React, {useContext, useEffect} from 'react';

import clsx from 'clsx';
import GraphContainer from "./GraphContainer";
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import worldBankService from "./services/worldBankService";
import {countries, indicators} from "./constants";
import {WorldBankContext} from "./WorldBankContext";


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


function GraphContent(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [graphData, setGraphData] = React.useState({});
    const { graphReducerData, dispatch } = useContext(WorldBankContext);


    const [responseState, setResponseState] = React.useState(null);


    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.container}>
            {
                Object.entries(graphReducerData).map(([indicatorID, indicatorData], index) => {
                    return (
                        <GraphContainer key={`Chart-${index}`} country={props.country} data={indicatorData}
                                        indicator={indicators[indicatorID]}
                        />)

            })

            }
        </div>
    );
}

export default React.memo(GraphContent);