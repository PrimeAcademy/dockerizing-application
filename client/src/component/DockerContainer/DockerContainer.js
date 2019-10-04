import React, { Component } from 'react';

class DockerContainer extends Component {
    render() {
        const appText = this.props.app ? this.props.app : 'Application';
        const depText = this.props.dependencies ? this.props.dependencies : 'Bins / Libs';
        const labelText = this.props.label ? this.props.label : 'Container';

        return (
            <div className="dockerPanel">
                <div className="dockerPanel-label">{labelText}</div>

                <div className="dockerPanel">{appText}</div>
                <div className="dockerPanel">{depText}</div>
            </div>
        );
    }
}

export default DockerContainer;
