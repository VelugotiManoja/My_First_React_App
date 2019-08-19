import React from "react";
import PropTypes from "prop-types";
import { reactLocalStorage } from 'reactjs-localstorage';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux';
// core components
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import robot from "assets/img/robot.png";
import { loaderfalse } from '../../actions/Loader';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            robot: robot,
        };
    }
    componentDidMount(){
        setTimeout(() => this.props.loaderfalse(window.location.hash.split('#')[1]), 100);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="content">
                <div className="container">
                    <div className="accmain">
                        <div className="under-construction-img">
                            <img src={this.state.robot} />
                        </div>
                        <h1 className="acchead">This page is under construction</h1>
                        <h2 className="accsubhead">Please check later</h2>
                    </div>
                </div>
            </div>
        );
    }
}
LoginPage.propTypes = {
    classes: PropTypes.object.isRequired
};


export default connect(null, {loaderfalse})(withStyles(loginPageStyle)(LoginPage));
