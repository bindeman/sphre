import React from 'react';

import GraphContainer from "./GraphContainer";
import {makeStyles} from '@mui/styles';
import { Theme } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    container: {
        margin: 36,
    },
}));

function GraphContent(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {
                props.indicator.map((indicatorID, index) => {
                return (
                <GraphContainer key={indicatorID} country={props.country} indicator={indicatorID}
                />)
            })
            }
        </div>
    );
}

export default React.memo(GraphContent);