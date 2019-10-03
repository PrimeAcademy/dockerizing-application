import React, { Component } from 'react';
import {
    Grid,
    Typography,
} from '@material-ui/core';
import ColorGenerator from '../../ColorGenerator/ColorGenerator';
import FruitStand from '../../FruitStand/FruitStand';
import EmployeesList from '../../EmployeesList/EmployeesList';

class ToolBoxPage extends Component {
    render() {
        return (
            <div className="pgContainer">
                <div className="pageTitle">
                    <h2>The Tool Box</h2>
                </div>

                <div className="vr vr_x3">
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="h5" component="h3">
                                Color Generator
                            </Typography>

                            <p>A simple randomized color generator that will convert the color to HEXIDECIMAL, RGB, or HSL formats.</p>
                        </Grid>
                        <Grid item xs={4}>
                            <ColorGenerator />
                        </Grid>
                    </Grid>
                </div>

                <div className="vr vr_x3">
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={9}>
                            <FruitStand />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography gutterBottom variant="h5" component="h3">
                                Fruit Stand
                            </Typography>

                            <p>A generated fruit stand with a selection of fruit for a person to pick out their favorite fruits.</p>
                        </Grid>
                    </Grid>
                </div>

                <div className="vr vr_x3">
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={3}>
                            <Typography gutterBottom variant="h5" component="h3">
                                Employees
                            </Typography>

                            <p>Showing a list of employee information that is being stored in a persistent database.</p>
                        </Grid>
                        <Grid item xs={9}>
                            <EmployeesList />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default ToolBoxPage;
