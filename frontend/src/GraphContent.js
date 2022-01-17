import React from 'react';

import GraphContainer from "./GraphContainer";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(5),
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