import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class HomePage extends Component {
    onNavToGetStarted = (event) => {
        window.open('https://www.docker.com/get-started', '_blank');
    }

    render() {
        return (
            <div>
                <img src="/images/docker-splash-2.jpg" alt="Docker Whale Being Loaded With Containers" />

                <div className="pgContainer">
                    <div className="pageTitle">
                        <h2>Welcome to Dockerization</h2>
                    </div>

                    <p>Get started by <a href="https://www.docker.com/get-started" target="_blank" rel="noopener noreferrer">downloading Docker</a>. You will be prompted to signup for a free account in order to download the desktop app.</p>

                    <Button
                        onClick={this.onNavToGetStarted}
                        variant="contained"
                        color="primary"
                    >
                            Get Started
                    </Button>
                </div>
            </div>
        );
    }
}

export default HomePage;
