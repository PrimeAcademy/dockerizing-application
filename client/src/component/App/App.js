import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';

// PAGE COMPONENTS
import navConfig from '../../modules/nav.config';

// COMPONENTS
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class App extends Component {
    render() {
        const pageRoutes = navConfig.map((navData, index) => {
            if (navData.exact) {
                return <Route exact path={navData.path} component={navData.comp} key={index} />;
            }

            return <Route path={navData.path} component={navData.comp} key={index} />;
        });

        return (
            <Router>
                <Switch>
                    <div className="site">
                        <div className="site-hd">
                            <Header />
                        </div>

                        <main className="site-bd">
                            {pageRoutes}
                        </main>

                        <div className="site-ft">
                            <Footer />
                        </div>
                    </div>
                </Switch>
            </Router>
        );
    }
}

export default App;
