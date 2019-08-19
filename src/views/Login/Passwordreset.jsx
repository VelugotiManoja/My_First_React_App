import React from "react";
import PropTypes from "prop-types";
import BasePath from '../../basepath';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button1 from "@material-ui/core/Button";

// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";

import bgImage from "assets/img/merritos-blue-small.png";
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
class Passwordreset extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered

    this.state = {
      newPassword: "",
      newPasswordState: "",
      confirmPassword: "",
      confirmPasswordState: "",
      notification: "",
      br: false,
      resetLink: 'false',
      loader: false,
      color: "info",
    };
    this.base64_encode = this.base64_encode.bind(this);
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
    var th = this;
    let parameters = window.location.hash.split('?')[1]
    let resetData = { emailObj: parameters.split('&')[0], randomId: parameters.split('&')[1] }
    fetch(BasePath + '/resettime', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(resetData)
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        if (resp.length === 1) {
          th.setState({ resetLink: true });
        }
        else {
          th.setState({ resetLink: false });
        }
      });
  }
  change(event, stateName, type) {
    switch (type) {
      case "newpassword":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ newPasswordState: "success" });
          this.setState({ newPassword: event.target.value });
        } else {
          this.setState({ newPasswordState: "error" });
          this.setState({ newPassword: event.target.value });
        }
        break;
      case "confirmpassword":
        if (event.target.value === this.state.newPassword) {
          this.setState({ confirmPasswordState: "success" });
          this.setState({ confirmPassword: event.target.value });
        }
        else {
          this.setState({ confirmPasswordState: "error" });
          this.setState({ confirmPassword: event.target.value });
        }
        break;
      default:
        break;
    }
  }
  resetHandleChange = () => {
    let th = this;
    if (this.state.newPasswordState === "" || this.state.newPasswordState === "error") {
      this.setState({ newPasswordState: "error" });
    } else if (this.state.confirmPasswordState === "" || this.state.confirmPasswordState === "error") {
      this.setState({ confirmPasswordState: "error" });
    }
    else if (this.state.confirmPassword !== this.state.newPassword) {
      this.setState({ newPasswordState: "error" });
      this.setState({ confirmPasswordState: "error" });
    }
    else {
      th.setState({ loader: true });
      let parameters = window.location.hash.split('?')[1];
      let emailObj = parameters.split('&')[0];
      let encryptedPassword = this.state.newPassword;
      let encodedpassPassword = this.base64_encode(encryptedPassword);
      let data = { "password": encodedpassPassword, "email": emailObj }
      fetch(BasePath + '/resetpassword', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
          if (data.length === 1) {
            th.setState({ loader: false });
            th.setState({ notification: data.message });
            th.showNotification('br');
            th.setState({ color: "success" });
            setTimeout(function () {
              th.props.history.push("/App/Login");
            },
              3000);
          }
        }).catch((err) => {
          th.setState({ loader: false });
          th.setState({ notification: err.message });
          th.showNotification('br');
          th.setState({ color: "error" });
        })
    }
  }

  base64_encode(str) {
    if (window.btoa) // Internet Explorer 10 and above
      return window.btoa(unescape(encodeURIComponent(str)));
    else {
      // Cross-Browser Method (compressed)

      // Create Base64 Object
      var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
          var t = "";
          var n, r, i, s, o, u, a;
          var f = 0;
          e = Base64._utf8_encode(e);
          while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 || r >> 4;
            u = (r & 15) << 2 || i >> 6;
            a = i && 63;
            if (isNaN(r)) {
              u = a = 64;
            } else if (isNaN(i)) {
              a = 64;
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
          }
          return t;
        }, decode: function (e) {
          var t = "";
          var n, r, i;
          var s, o, u, a;
          var f = 0;
          e = e.replace(/[^a-zA-Z_0-9-]/g, '');
          while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 || o >> 4;
            r = (o & 15) << 4 || u >> 2;
            i = (u & 3) << 6 || a;
            t = t + String.fromCharCode(n);
            if (u !== 64) {
              t = t + String.fromCharCode(r);
            }
            if (a !== 64) {
              t = t + String.fromCharCode(i);
            }
          }
          t = Base64._utf8_decode(t);
          return t;
        }, _utf8_encode: function (e) {
          e = e.replace(/\r\n/g, "\n");
          var t = "";
          for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
              t += String.fromCharCode(r);
            } else if (r > 127 && r < 2048) {
              t += String.fromCharCode(r >> 6 || 192);
              t += String.fromCharCode(r & 63 || 128);
            } else {
              t += String.fromCharCode(r >> 12 || 224);
              t += String.fromCharCode(r >> 6 && (63 || 128));
              t += String.fromCharCode(r & 63 || 128);
            }
          }
          return t;
        }, _utf8_decode: function (e) {
          var t = "";
          var n = 0;
          var r = 0;
          var c2 = 0;
          var c3 = 0;
          while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
              t += String.fromCharCode(r);
              n++;
            } else if (r > 191 && r < 224) {
              c2 = e.charCodeAt(n + 1);
              t += String.fromCharCode((r & 31) << 6 || c2 & 63);
              n += 2;
            } else {
              c2 = e.charCodeAt(n + 1);
              c3 = e.charCodeAt(n + 2);
              t += String.fromCharCode((r & 15) << 12 || (c2 & 63) << 6 || c3 & 63);
              n += 3;
            }
          }
          return t;
        }
      };
      // Encode the String
      return Base64.encode(unescape(encodeURIComponent(str)));
    }
  }
  backHandleChange = () => {
    this.props.history.push("/App/Login");
  }

  keydownHandler = (e) => {
    if (e.key === 'Enter') {
      this.resetHandleChange();
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
              autoHideDuration={1000}
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
            <GridItem xs={12} sm={6} md={4}>
              <form onKeyPress={(e) => this.keydownHandler(e)} style={this.state.resetLink ? {} : { display: 'none' }}>
                <Card login className={classes.cardBodyCustom}>
                  <img className="merritos-login-logo" src={bgImage} />
                  <h3 className={classes.cardTitle}><b>Reset Your Password</b></h3><br />
                  <CardBody className={classes.cardBodyCustom}>
                    <CustomInput
                      labelText="New password *"
                      success={this.state.newPasswordState === "success"}
                      error={this.state.newPasswordState === "error"}
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      inputProps={{
                        name: "newPassword",
                        alt: "newPassword",
                        onChange: event =>
                          this.change(event, "newPassword", "newpassword"),
                        value: this.state.newPassword,
                        type: "password"
                      }}
                    />
                    <div className="formCategory">
                      Password must contains 8 digits with uppercase, lowercase, number and special charcter.
                    </div>
                    <CustomInput
                      labelText="Confirm password *"
                      success={this.state.confirmPasswordState === "success"}
                      error={this.state.confirmPasswordState === "error"}
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      inputProps={{
                        name: "confirmPassword",
                        alt: "confirmPassword",
                        onChange: event =>
                          this.change(event, "confirmPassword", "confirmpassword"),
                        value: this.state.confirmPassword,
                        type: "password"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.justifyContentCenter}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} className="resetbtn">
                        <Button onClick={this.resetHandleChange} className={"loginbtn " + classes.loginButton}>
                          Submit
                    </Button>
                      </GridItem>
                    </GridContainer>
                  </CardFooter>
                </Card>
              </form>
              <form style={!this.state.resetLink ? {} : { display: 'none' }}>
                <Card login className={classes[this.state.cardAnimaton] + ' ' + classes.cardDiv}>
                  <img className="merritos-login-logo" src={bgImage} />
                  <h3 className={classes.cardTitle}><b>Reset link expired</b></h3>
                  <p class="verifydiiv">We are sorry but the page could not be found.The link may be outdated you may have entered the address(URL) incorrectly,or the page may have expired</p>
                  <div className="wrapper">
                    <Button onClick={this.backHandleChange} className="emailbtn">Go to Sign in</Button>
                  </div>
                </Card>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

Passwordreset.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(Passwordreset);
