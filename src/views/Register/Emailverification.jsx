import React from "react";
import PropTypes from "prop-types";
import BasePath from '../../basepath';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import SnackbarContent from '@material-ui/core/SnackbarContent';
// core components
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import bgImage from "assets/img/loginimg.png";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "info",
      notification: '',
      br: false
    };
  }
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  showNotification(place) {
    if (!this.state[place]) {
      var x = [];
      x[place] = true;
      this.setState(x);
      setTimeout(
        function () {
          x[place] = false;
          this.setState(x);
        }.bind(this),
        5000
      );
    }
  }
  componentDidMount() {
    let th = this;
    
    let VerifyId = window.location.hash.split('?')[1]
    fetch(BasePath + '/emailverification', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ id: VerifyId })
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        th.props.history.push('/App/Welcome?verify');
      }).catch((err) => {
        th.setState({ notification: err.message });
        th.showNotification('br');
      });
  }
  loginLink = () => {
    this.props.history.push('/App/Welcome');
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <div>
            <Snackbar
              place="br"
              color={this.state.color}
              message={
                this.state.errorMsg
              }
              open={this.state.br}
              closeNotification={() => this.setState({ br: false })}
              close
            />
          </div>
          
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
