import React from "react";
import PropTypes from "prop-types";
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";


// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import bgImage from "assets/img/merritos-blue-small.png";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";
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
      loginEmail: "",
      loginEmailState: "",
      rememberEmail: "",
      rememberPassword: "",
      loginPassword: "",
      loginPasswordState: "",
      notification: "",
      rememberme: false,
      loader: false,
      userId: reactLocalStorage.get('userId', ""),
      color: 'error'
    };
    this.loginFunc = this.loginFunc.bind(this);
    this.base64_encode = this.base64_encode.bind(this);
  }
  rembermeChange = name => event => {
    this.setState({ [name]: event.target.checked });
    if (event.target.checked === true) {
      if (this.state.loginEmailState === "" || this.state.loginEmailState === "error") {
        this.setState({ loginEmailState: "error" });
      }
      else if (this.state.loginPasswordState === "" || this.state.loginPasswordState === "error") {
        this.setState({ loginPasswordState: "error" });
      }
      else {
        var data = { "email": this.state.loginEmail, "password": this.state.loginPassword }
        localStorage.setItem('myData', JSON.stringify(data));
      }
    }
    else {
      localStorage.removeItem('myData');
    }
  }

  componentDidMount() {
    let urlParams = window.location.hash.split('?')[1]
    if (urlParams) {
      this.setState({ showv: true });
    }
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      if (localStorage.myData) {
        let data = JSON.parse(localStorage.myData);
        this.setState({ loginEmail: data.email });
        this.setState({ loginEmailState: "success" });
        this.setState({ loginPassword: data.password });
        this.setState({ loginPasswordState: "success" });
        this.setState({ rememberme: true });
      }
    } else {
      if (reactLocalStorage.get('userType', "") === 'individual') {
        this.props.history.push('/Home');
      } else {
        this.props.history.push('/Organization');
      }
    }
  }

  verifyEmail(value) {
    let emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  showNotification(place) {
    if (!this.state[place]) {
      let x = [];
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

  change(event, stateName, type) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
          this.setState({ loginEmail: event.target.value });
        } else {
          this.setState({ [stateName + "State"]: "error" });
          this.setState({ loginEmail: event.target.value });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" });
          this.setState({ loginPassword: event.target.value });
        } else {
          this.setState({ [stateName + "State"]: "error" });
          this.setState({ loginPassword: event.target.value });
        }
        break;
      default:
        break;
    }
  }

  loginFunc(event) {
    let th = this;
    if (this.state.loginEmailState === "" || this.state.loginEmailState === "error") {
      this.setState({ loginEmailState: "error" });
    }
    else if (this.state.loginPasswordState === "" || this.state.loginPasswordState === "error") {
      this.setState({ loginPasswordState: "error" });
    }
    else {
      th.setState({ loader: true });
      let password = th.state.loginPassword;
      let encodepass = th.base64_encode(password);
      let data = ({ email: th.state.loginEmail, password: encodepass });
      fetch(BasePath + '/loginauth', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
          localStorage.setItem('userType', data.type);
          th.setState({ loader: false });
          if (data.length === 1) {
            reactLocalStorage.set('userId', data.userId);
            reactLocalStorage.set('userType', data.type);
            reactLocalStorage.set('userProfile', data.profile);
            if (data.type === 'individual') {
              if (data.profile === 0) {
                th.props.history.push("/Home")
              }
              else if (data.profile === 1) {
                th.props.history.push('/Home');
              }
            } else if (data.type === 'organization') {
              if (data.profile === 0) {
                th.props.history.push("/Organizationinfo");
              }
              else if (data.profile === 1) {
                th.props.history.push('/Organization');
              }
            }
          } else if (data.length === 2) {
            th.setState({ notification: data.message });
            th.showNotification('br');
            localStorage.removeItem('myData');
            th.setState({ rememberme: false });
            th.setState({ loginEmailState: "error" });
          }
          else if (data.length === 3) {
            th.setState({ notification: data.message });
            th.showNotification('br');
            th.setState({ color: "error" });
            localStorage.removeItem('myData');
            th.setState({ rememberme: false });
          }
          else if (data.length === 0) {
            th.setState({ notification: data.message });
            th.showNotification('br');
            th.setState({ color: "error" });
            localStorage.removeItem('myData');
            th.setState({ rememberme: false });
          }
        }).catch((err) => {
          th.setState({ loader: false });
          th.setState({ notification: err.message });
          th.showNotification('br');
          th.setState({ color: "error" });
          localStorage.removeItem('myData');
          th.setState({ rememberme: false });
        })
    }
  }
  forgotHandleChange = () => {
    this.props.history.push("/App/Forgot");
  }
  registerHandleChange = () => {
    this.props.history.push("/App/Register");
  }
  keydownHandler = (e) => {
    if (e.key === 'Enter') {
      this.loginFunc();
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
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ br: false });
  };

  render() {
    const { classes } = this.props;
    const verifyR = <div class="verifydivlogin">
      Thank you for registration, Account successfully activated
      </div>
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
          <GridContainer justify="center"   >
            <GridItem xs={12} sm={6} md={4} >
              {this.state.showv ? verifyR : null}
              <form onKeyPress={(e) => this.keydownHandler(e)}>
                <Card login className={classes.cardBodyCustom}>
                  <img className="merritos-login-logo" src={bgImage} alt="" />
                  <h3 className={classes.cardTitle}><b>Sign in</b><br />
                    <p>to your professional world</p>
                  </h3>
                  <CardBody className={classes.cardBodyCustom}>
                    <FormControl fullWidth>
                      <CustomInput
                        labelText="Email *"
                        success={this.state.loginEmailState === "success"}
                        error={this.state.loginEmailState === "error"}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        inputProps={{
                          name: "loginEmail",
                          onChange: event =>
                            this.change(event, "loginEmail", "email"),
                          value: this.state.loginEmail,
                          type: "email"
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <CustomInput
                        labelText="Password *"
                        success={this.state.loginPasswordState === "success"}
                        error={this.state.loginPasswordState === "error"}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        inputProps={{
                          name: "loginPassword",
                          onChange: event =>
                            this.change(event, "loginPassword", "password"),
                          value: this.state.loginPassword,
                          type: "password"
                        }}
                      />
                    </FormControl>
                  </CardBody>
                  <CardFooter className={classes.justifyContentCenter}>
                    <GridContainer>
                      <GridItem xs={6} sm={6} md={6}>
                      <div className="login-remember">
                        <FormControlLabel
                          className="login-checkbox"
                          control={
                            <Checkbox
                              className="login-check"
                              checked={this.state.rememberme}
                              onChange={this.rembermeChange('rememberme')}
                              value="rememberme"
                              color="primary"
                            />
                          }
                          label="Remember me"
                        />
                        <div onClick={this.forgotHandleChange} className="login-forgotpassword">
                          Forgot password?
                   </div>
                   </div>
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                        <Button onClick={this.loginFunc} className={"loginbtn " + classes.loginButton}>
                          Login
                    </Button>
                      </GridItem>
                    </GridContainer>
                  </CardFooter>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <div onClick={this.registerHandleChange} className="login-forgotpassword login-register">
                        Don't have an account? Register here!
                   </div>
                    </GridItem>
                  </GridContainer>
                </Card>
              </form>
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
