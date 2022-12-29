import React from 'react';
import Grid from '@mui/material/Grid';

import {
    Typography,
} from "@material-ui/core";

const style = {
    backgroundColor: "#FF0000",
    padding: "4px",
    color:"#FFFFFF",
    fontSize:"14px"
}

const ReportFooter = ({ title }) => {
   
    return (
        <Grid>
            <Grid xs={12}>
                <Typography
                    style={style}
                    align="center"
                >
                    {title}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ReportFooter