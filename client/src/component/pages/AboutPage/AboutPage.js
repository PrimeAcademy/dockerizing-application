import React, { Component } from 'react';
import {
    Button,
    Grid,
} from '@material-ui/core';

class AboutPage extends Component {
    onNavToDocker = (event) => {
        window.open('https://www.docker.com/resources/what-container', '_blank');
    }

    render() {
        return (
            <div className="pgContainer">
                <div className="pageTitle">
                    <h2>About Docker Containers</h2>
                </div>

                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <img src="/images/container-what-is-container.png" alt="Docker Diagram" />
                    </Grid>
                    <Grid item xs={7}>
                        <div className="vr vr_x2">
                            <h3 className="vr vr_x2">Package Software into Standardized Units for Development, Shipment and Deployment</h3>

                            <p>A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another. A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.</p>

                            <p>Container images become containers at runtime and in the case of Docker containers - images become containers when they run on Docker Engine. Available for both Linux and Windows-based applications, containerized software will always run the same, regardless of the infrastructure. Containers isolate software from its environment and ensure that it works uniformly despite differences for instance between development and staging.</p>

                            <p>Docker containers that run on Docker Engine:</p>
                            
                            <ul>
                                <li><strong>Standard:</strong> Docker created the industry standard for containers, so they could be portable anywhere</li>
                                <li><strong>Lightweight:</strong> Containers share the machine’s OS system kernel and therefore do not require an OS per application, driving higher server efficiencies and reducing server and licensing costs</li>
                                <li><strong>Secure:</strong> Applications are safer in containers and Docker provides the strongest default isolation capabilities in the industry</li>
                            </ul>
                        </div>

                        <div className="vr vr_x4">
                            <p><i>This information was provided by the <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker.com</a> site. To learn more about docker take a look at the docker website.</i></p>
                            <Button variant="contained" color="primary" onClick={this.onNavToDocker}>Checkout Docker</Button>
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={7}>
                        <div className="vr vr_x2">
                            <h3 className="vr vr_x2">Docker Containers Are Everywhere: Linux, Windows, Data center, Cloud, Serverless, etc.</h3>

                            <p>Docker container technology was launched in 2013 as an open source <a href="https://www.docker.com/products/docker-enterprise" target="_blank" rel="noopener noreferrer">Docker Engine</a>.</p>

                            <p>It leveraged existing computing concepts around containers and specifically in the Linux world, primitives known as cgroups and namespaces. Docker's technology is unique because it focuses on the requirements of developers and systems operators to separate application dependencies from infrastructure.</p>

                            <p>Success in the Linux world drove a partnership with Microsoft that brought Docker containers and its functionality to Windows Server (sometimes referred to as <a href="https://www.docker.com/products/windows-containers" target="_blank" rel="noopener noreferrer">Docker Windows containers</a>).</p>

                            <p>Technology available from Docker and its open source project, Moby has been leveraged by all major data center vendors and cloud providers. Many of these providers are leveraging Docker for their container-native IaaS offerings. Additionally, the leading open source serverless frameworks utilize Docker container technology.</p>
                        </div>

                        <div className="vr vr_x2">
                            <p><i>This information was provided by the <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker.com</a> site. To learn more about docker take a look at the docker website.</i></p>
                            <Button variant="contained" color="primary" onClick={this.onNavToDocker}>Checkout Docker</Button>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <img src="/images/Windows-Diagrams-Docker-today.png" alt="Windows and Docker" />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default AboutPage;
