import React, { Component } from 'react';

class DockerInstance extends Component {
    render() {
        const labelText = this.props.label ? this.props.label : 'Docker Instance';

        return (
            <div className="dockerShell">
                <div className="dockerShell-label">{labelText}</div>

                <div>
                    {this.props.children}
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
        );
    }
}

export default DockerInstance;
