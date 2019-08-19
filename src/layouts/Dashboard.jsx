import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import PagesHeader from "components/Header/PagesHeader.jsx";
// import Footer from "components/Footer/Footer.jsx";

import pagesRoutes from "routes/dashboard.jsx";
import orgRoutes from "routes/organization.jsx";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";
import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";
import { connect } from 'react-redux';
import { loadertrue, loaderfalse } from '../actions/Loader'
import $ from "jquery";

class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: reactLocalStorage.get('userType', ""),
    }
  }

  componentDidMount() {
    this.props.loadertrue();
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.location !== nextprops.history.location.pathname) {
      this.props.loadertrue();
    } else if (nextprops.loading === false) {
      $('.layout-hide').show();
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        {this.props.loading ? (<CircularProgress visible='true'></CircularProgress>) : null}
        <div className="full-height">
          <PagesHeader {...rest} />
          <div className="page-content">
            <div className={this.props.loading ? ('full-height page-loading') : ('full-height')} >
              <Switch>
                {this.state.userType === 'organization' ? (
                  orgRoutes.map((prop, key) => {
                    if (prop.collapse) {
                      return null;
                    }
                    if (prop.redirect) {
                      return (
                        <Redirect from={prop.path} to={prop.pathTo} key={key} />
                      );
                    }
                    return (
                      <Route
                        path={prop.path}
                        component={prop.component}
                        key={key}
                      />
                    );
                  })
                ) : (
                    pagesRoutes.map((prop, key) => {
                      if (prop.collapse) {
                        return null;
                      }
                      if (prop.redirect) {
                        return (
                          <Redirect from={prop.path} to={prop.pathTo} key={key} />
                        );
                      }
                      return (
                        <Route
                          path={prop.path}
                          component={prop.component}
                          key={key}
                          onChange={this.closePreloader}
                        />
                      );
                    })
                  )}
              </Switch>
              {/* <Footer white /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

const loaderstate = state => ({
  loading: state.loader.loader,
  location: state.loader.location
})

export default connect(loaderstate, { loadertrue, loaderfalse })(withStyles(pagesStyle)(Pages));
