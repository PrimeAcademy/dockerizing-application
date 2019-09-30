import React, { Component } from 'react';
import {
    Grid
} from '@material-ui/core';

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
                            <div className="dockerShell">
                                <div className="dockerShell-label">Dockerfile</div>
                                
                                <div className="dockerPanel">
                                    <div className="dockerPanel-label">Container</div>

                                    <div className="dockerPanel">Application</div>
                                    <div className="dockerPanel">Bins \ Libs</div>
                                </div>

                                <div className="dockerPanel">
                                    <div className="dockerPanel-label">Docker</div>
                                </div>
                                <div className="dockerPanel dockerPanel_outlined">
                                    <div className="dockerPanel-label">Host Operating System</div>
                                </div>
                                <div className="dockerPanel dockerPanel_outlined">
                                    <div className="dockerPanel-label">Infrastructure</div>
                                </div>

                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className="vr vr_x2">
                    <div className="dockerShell">
                        <div className="dockerShell-label">Docker Compose</div>

                        <Grid container spacing={3} justify="center">
                            <Grid item xs={4}>
                                <div className="dockerPanel">
                                    <div className="dockerPanel-label">Container</div>

                                    <div className="dockerPanel">App 1</div>
                                    <div className="dockerPanel">Bins \ Libs</div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="dockerPanel">
                                    <div className="dockerPanel-label">Container</div>

                                    <div className="dockerPanel">App 2</div>
                                    <div className="dockerPanel">Bins \ Libs</div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="dockerPanel">
                                    <div className="dockerPanel-label">Container</div>

                                    <div className="dockerPanel">App 3</div>
                                    <div className="dockerPanel">Bins \ Libs</div>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="dockerPanel">
                                    <div className="dockerPanel-label">Docker</div>
                                </div>
                                <div className="dockerPanel dockerPanel_outlined">
                                    <div className="dockerPanel-label">Host Operating System</div>
                                </div>
                                <div className="dockerPanel dockerPanel_outlined">
                                    <div className="dockerPanel-label">Infrastructure</div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContainersPage;
