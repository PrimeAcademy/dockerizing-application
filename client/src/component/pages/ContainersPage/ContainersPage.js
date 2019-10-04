import React, { Component } from 'react';
import {
    Grid
} from '@material-ui/core';
import DockerInstance from '../../DockerInstance/DockerInstance';
import DockerContainer from '../../DockerContainer/DockerContainer';

class ContainersPage extends Component {
    render() {
        return (
            <div className="pgContainer">
                <div className="pageTitle">
                    <h2>Docker Containers</h2>
                </div>

                <div className="vr vr_x4">
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={4}>
                            <DockerInstance label="Dockerfile">
                                <DockerContainer></DockerContainer>
                            </DockerInstance>
                        </Grid>
                    </Grid>
                </div>

                <div className="vr vr_x2">
                    <DockerInstance label="Docker Compose">
                        <Grid container spacing={3} justify="center">
                            <Grid item xs={4}>
                                <DockerContainer></DockerContainer>
                            </Grid>
                            <Grid item xs={4}>
                                <DockerContainer></DockerContainer>
                            </Grid>
                            <Grid item xs={4}>
                                <DockerContainer></DockerContainer>
                            </Grid>
                        </Grid>
                    </DockerInstance>
                </div>
            </div>
        );
    }
}

export default ContainersPage;
