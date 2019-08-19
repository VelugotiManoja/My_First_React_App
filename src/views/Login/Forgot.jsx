import React from "react";
import PropTypes from "prop-types";
import BasePath from '../../basepath';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import bgImage from "assets/img/merritos-blue-small.png";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import amber from '@material-ui/core/colors/amber';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockOutline from "@material-ui/icons/LockOutline";

const variantIcon = {
  success: CheckCircleIcon,
  info: InfoIcon,
  error: ErrorIcon,
  warning: WarningIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      br: false,
      email: "",
      emailState: "",
      notification: "",
      showResults: true,
      color: "info",
      loader: false,
    };
    this.forgotHandleChange = this.forgotHandleChange.bind(this);
  }

  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
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
  change(event) {
    if (this.verifyEmail(event.target.value, 0)) {
      this.setState({ [event.target.name + "State"]: "success" });
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({ [event.target.name + "State"]: "error" });
      this.setState({ [event.target.name]: event.target.value });
    }
  }
  forgotHandleChange = () => {
    let th = this;
    if (this.state.emailState === "" || this.state.emailState === "error") {
      this.setState({ emailState: "error" });
    } else {
      th.setState({ loader: true });
      fetch(BasePath + '/forgotpassword', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ email: this.state.email })
      }).then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
          if (data.length === 0) {
            th.setState({ loader: false });
            th.setState({ notification: data.message });
            th.setState({ color: "error" });
            th.showNotification('br');
            th.setState({ emailState: "error" });
          }
          else {
            th.setState({ showResults: false });
            th.setState({ loader: false });
            th.setState({ "email": "" });
            th.setState({ "emailState": "" })
          }
        }).catch((err) => {
          th.setState({ loader: false });
          th.setState({ notification: err.message });
          th.showNotification('br');
          th.setState({ color: "error" });
        })
    }
  }
  backHandleChange = () => {
    this.props.history.push("/App/Login");
  }
  keydownHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.forgotHandleChange();
    }
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ br: false });
  };
  render() {
    const { classes } = this.props;
    const verifyR = <div class="loginHeight">
      <Card login className={classes[this.state.cardAnimaton]} >
        <img className="merritos-login-logo" src={bgImage} />
        <h3 className={classes.cardTitle}><b>Your account is successfully identified</b></h3>
        <CardBody>
          <div class="verifydiiv">
            Please check your email for reset your password
        </div>
          <br />
          <div className="wrapper">
            <Button onClick={this.backHandleChange} className="emailbtn">Go to Sign in</Button>
          </div>
        </CardBody>
      </Card>
    </div>
    const formR = <form onKeyPress={(e) => e.key === 'Enter' ? this.forgotHandleChange() : ''}>
      <Card login className={classes[this.state.cardAnimaton] + ' ' + classes.cardDiv}>
        <img className="merritos-login-logo" src={bgImage} alt=".." />
          <h3 className={classes.cardTitle}><b>Recover your password</b></h3><br />
        <CardBody className={classes.forgotcardBodyCustom}>
          <div className='recover'>
            <p className="forgot-pass">Please enter your email address to reset your password</p>
          </div>
            <CustomInput
              success={this.state.loginPasswordState === "success"}
              error={this.state.loginPasswordState === "error"}
              labelText="Email *"
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              inputProps={{
                name: "email",
                onChange: event =>
                  this.change(event, "email", "email"),
                value: this.state.loginPassword,
                type: "email"
              }}
            />
          <GridContainer className="forgetbtn">
            <GridItem xs={12} sm={12} md={12}>
              <Button onClick={this.forgotHandleChange} className={"loginbtn " + classes.loginButton}>
                Submit
        </Button>
              <Button onClick={this.backHandleChange} className={"loginbtn forgotbackbtn " + classes.loginButton}>
                Back
        </Button>
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter className={classes.justifyContentCenter}>
        </CardFooter>
      </Card>
    </form>
    return (
      <div className={classes.content}>
        <CircularProgress visible={this.state.loader}></CircularProgress>
        <div className={classes.container}>
          <div>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={this.state.br}
              autoHideDuration={3000}
              onClose={this.handleClose}
            >
              <MySnackbarContentWrapper
                onClose={this.handleClose}
                variant={this.state.color}
                message={this.state.notification}
              />
            </Snackbar>
          </div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4} className={classes.registerdiv}>
              {this.state.showResults ? formR : verifyR}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
