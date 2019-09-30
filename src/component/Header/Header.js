
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

// STYLING
import './Header.css';
import navConfig from '../../modules/nav.config';

class Header extends Component {
    state = {
        isNavOpen: false,
    };

    onToggleMobileNav = (event) => {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        });
    }

    render() {
        let navPaneStyles = 'nav-pane';

        if (this.state.isNavOpen) {
            navPaneStyles += ' nav-pane_isOpen';
        }

        const navLinks = navConfig.filter((navData) => navData.mainNav)
            .map((navData, index) => {
                return (<li key={index}>
                            <Link className="navLink" to={navData.path}>{navData.name}</Link>
                        </li>);
            });

        return(
            <header className="appTopper">
                <div className="appTopper-identity">
                    <div className="logo">
                        <svg className="logo-img" viewBox="0 0 720 600">
                            <use xlinkHref="/images/docker-logo.svg#dockerLogo"></use>
                        </svg>
                        <h1 className="logo-text">Docker at Work</h1>
                    </div>
                </div>
                <div className="appTopper-actions">
                    <nav className="nav">
                        <button
                            className="nav-mobileAct"
                            onClick={this.onToggleMobileNav}
                        >
                            Navigation
                        </button>

                        <div className={navPaneStyles}>
                            <div className="nav-pane-hd">
                                <button
                                    className="btnClose"
                                    onClick={this.onToggleMobileNav}
                                >
                                    Close
                                </button>
                            </div>
                            <ul className="nav-pane-list">
                                {navLinks}
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        )
    }
};

export default connect(mapStoreToProps)(Header);
