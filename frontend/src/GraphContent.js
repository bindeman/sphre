import React from 'react';

import GraphContainer from "./GraphContainer";
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import {Box} from "@mui/material";


const useStyles = makeStyles((theme) => ({
    container: {
        margin: 36,
    },
}));

function GraphContent(props) {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            {
                props.indicator.map((indicatorID, index) => {
                return (
                <GraphContainer key={indicatorID} country={props.country} indicator={indicatorID}
                />)
            })
            }
        </Box>
    );
}

export default React.memo(GraphContent);