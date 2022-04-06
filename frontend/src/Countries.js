import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Typography from "@material-ui/core/Typography";





export default function Countries() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <ResponsiveContainer>
                <Typography variant={'h1'}>Countries</Typography>
            </ResponsiveContainer>
        </React.Fragment>
    );
}