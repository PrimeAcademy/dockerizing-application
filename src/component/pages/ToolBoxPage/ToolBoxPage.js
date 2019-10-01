import React, { Component } from 'react';
import {
    Grid,
    Typography,
} from '@material-ui/core';
import ColorGenerator from '../../ColorGenerator/ColorGenerator';

class ToolBoxPage extends Component {
    render() {
        return (
            <div className="pgContainer">
                <div className="pageTitle">
                    <h2>The Tool Box</h2>
                </div>

                <Grid container spacing={3} justify="center">
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h4" component="h3">
                            Color Generator
                        </Typography>

                        <p>A simple randomized color generator that will convert the color to HEXIDECIMAL, RGB, or HSL formats.</p>
                    </Grid>
                    <Grid item xs={4}>
                        <ColorGenerator />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ToolBoxPage;
