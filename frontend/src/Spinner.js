import React, {useContext, useEffect} from 'react';

import clsx from 'clsx';
import GraphContainer from "./GraphContainer";
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import worldBankService from "./services/worldBankService";
import {countries, indicators} from "./constants";
import {WorldBankContext} from "./WorldBankContext";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


// Inspired by the former Facebook spinners.
function LoadingSpinner(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={23}
                thickness={7}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? '#658546' : '#308fe8'),
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={23}
                thickness={7}
                {...props}
            />
        </Box>
    );
}

export default LoadingSpinner;