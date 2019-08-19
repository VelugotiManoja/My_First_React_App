import React from "react";
import PropTypes from "prop-types";
import BasePath from '../../basepath';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

import { reactLocalStorage } from 'reactjs-localstorage';
import FormControl from "@material-ui/core/FormControl";
import bgImage from "assets/img/merritos-blue-small.png";

// core components
import Snackbar from '@material-ui/core/Snackbar';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import "assets/css/styles.css";
import avatar from "assets/img/merritos-blue-small.png";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
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
  }
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


class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      br: false,
      registerEmail: "",
      registerEmailState: "",
      registerPassword: "",
      firstName: "",
      lastName: "",
      companyName: '',
      firstNameState: "",
      lastNameState: "",
      companyNameState: '',
      registerPasswordState: "",
      confirmPassword: "",
      confirmPasswordState: "",
      userType: 'individual',
      notification: "",
      color: "info",
      showResults: true,
      loader: false,
      show: true
    };
    this.registerFunc = this.registerFunc.bind(this);
    this.base64_encode = this.base64_encode.bind(this);

  }
  onFocus() {
    this.setState({ firstNameState: "" });
    this.setState({ lastNameState: "" });

  }
  handleChange = event => {
    this.setState({ userType: event.target.value, show: event.target.value === 'individual' ? true : false });
  };
  verifyEmail(value) {
    let emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  verifyPassword(value) {
    let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    if (re.test(value)) {
      return true;
    }
    else {
      return false;
    }
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
          this.setState({ registerEmail: event.target.value });
        } else {
          this.setState({ [stateName + "State"]: "error" });
          this.setState({ registerEmail: event.target.value });
        }
        break;
      case "password":
        if (this.verifyPassword(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
          this.setState({ registerPassword: event.target.value });
        } else {
          this.setState({ [stateName + "State"]: "error" });
          this.setState({ registerPassword: event.target.value });
        }
        break;
      case "confirmpassword":
        if (event.target.value === this.state.registerPassword) {
          this.setState({ [stateName + "State"]: "success" });
          this.setState({ confirmPassword: event.target.value });
        }
        else {
          this.setState({ [stateName + "State"]: "error" });
          this.setState({ confirmPassword: event.target.value });
        }
        break;
      case "text":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" });
          this.setState({ [event.target.name]: event.target.value });
        } else {
          this.setState({ [stateName + "State"]: "error" });
          this.setState({ [event.target.name]: event.target.value });
        }
        break;
      default:
        break;
    }
  }
  registerFunc() {
    let th = this;
    if (this.state.firstNameState === "" || this.state.firstNameState === "error") {
      this.setState({ firstNameState: "error" });
    }
    else if (this.state.lastNameState === "" || this.state.lastNameState === "error") {
      this.setState({ lastNameState: "error" });
    }
    else if (this.state.registerEmailState === "" || this.state.registerEmailState === "error") {
      this.setState({ registerEmailState: "error" });
    }
    else if (this.state.registerPasswordState === "" || this.state.registerPasswordState === "error") {
      this.setState({ registerPasswordState: "error" });
    }
    else if (this.state.confirmPassword !== this.state.registerPassword) {
      this.setState({ confirmPasswordState: "error" });
    }
    else {
      th.setState({ loader: true });
      let encryptedPassword = th.state.registerPassword;
      let encodedpassPassword = th.base64_encode(encryptedPassword);
      let data = { "email": th.state.registerEmail, "password": encodedpassPassword, "userType": 'individual' };
      data.firstName = th.state.firstName;
      data.lastName = th.state.lastName;
      fetch(BasePath + '/registerauth', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
          if (data.length === 1) {
             let encodepass = th.base64_encode(th.state.registerPassword);
            let obj = ({ email: th.state.registerEmail, password: encodepass });
            fetch(BasePath + '/loginauth', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              body: JSON.stringify(obj)
            }).then((resp) => resp.json()) // Transform the data into json
              .then(function (data) {
               // th.setState({ loader: false });
                localStorage.setItem('userType', data.type);
                th.setState({ loader: false });
                if (data.length === 1) {
                  reactLocalStorage.set('userId', data.userId);
                  reactLocalStorage.set('userType', data.type);
                  reactLocalStorage.set('userProfile', data.profile);
                  th.setState({ registerEmail: "" });
            th.setState({ registerEmailState: "" });
            th.setState({ registerPassword: "" });
            th.setState({ registerPasswordState: "" });
            th.setState({ confirmPassword: "" });
            th.setState({ confirmPasswordState: "" });
                      th.props.history.push("/Home?q=success")
                }
              })
                    
          }
          else {
            th.setState({ loader: false });
            th.setState({ notification: data.message });
            th.showNotification('br');
          }
        }).catch((err) => {
          th.setState({ loader: false });
          th.setState({ notification: err.message });
          th.showNotification('br');
          th.setState({ color: "error" });
        });
    }

  }
  loginLink = () => {
    this.props.history.push('/App/Login');
  }
  //encryption for password

  base64_encode(str) {
    if (window.btoa) // Internet Explorer 10 and above
      return window.btoa(unescape(encodeURIComponent(str)));
    else {
      // Cross-Browser Method (compressed)

      // Create Base64 Object
      let Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
          let t = "";
          let n, r, i, s, o, u, a;
          let f = 0;
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
          let t = "";
          let n, r, i;
          let s, o, u, a;
          let f = 0;
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
          let t = "";
          for (let n = 0; n < e.length; n++) {
            let r = e.charCodeAt(n);
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
          let t = "";
          let n = 0;
          let r = 0;
          let c2 = 0;
          let c3 = 0;
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
    const verifyR = <div class="loginHeight">
      <div className={classes.content}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} >
            <div>
              <Card login className={classes[this.state.cardAnimaton]} >
                <img src={avatar} className='emailimage' />
                <h3 className='emailTitle'> Thank you for registering with Merritos</h3>
                <CardBody>
                  <h4 className='message'>
                    Hi {this.state.firstName} {this.state.lastName}, your registration is completed!
                </h4>
                  <div class="verifydiiv">
                    Please login to setup your Merritos account.
              </div>
                  <br />
                  <div className="wrapper">
                    <Button onClick={this.loginLink} className="emailbtn">Go to Sign in</Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </div>
    const formR = <form onKeyPress={(e) => e.key === 'Enter' ? this.registerFunc() : ''}>
      <Card className={classes.loginCard}>
        <img className="merritos-login-logo" src={bgImage} />
        <h3 className={classes.cardTitle}><b>Create your account</b><br />
          <p>Access Merritos ideas with a free account</p>
        </h3>
        <CardBody className={classes.cardBodyCustom}>
          {/* <FormControlLabel className="registration-checkbox" checked={this.state.userType === 'individual'} value="individual" control={<Radio />} label="An individual" onChange={this.handleChange} />
          <FormControlLabel className="registration-checkbox" checked={this.state.userType === 'organization'} value="organization" control={<Radio />} label="An organization" onChange={this.handleChange} /> */}
          <FormControl style={this.state.show ? {} : { display: 'none' }} fullWidth>
            <CustomInput
              labelText="First name *"
              success={this.state.firstNameState === "success"}
              error={this.state.firstNameState === "error"}
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              inputProps={{
                name: "firstName",
                onChange: event =>
                  this.change(event, "firstName", "text"),
                value: this.state.firstName,
                type: "text"
              }}
            />
          </FormControl>
          <FormControl style={this.state.show ? {} : { display: 'none' }} fullWidth>
            <CustomInput
              labelText="Last name *"
              success={this.state.lastNameState === "success"}
              error={this.state.lastNameState === "error"}
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              inputProps={{
                name: "lastName",
                onChange: event =>
                  this.change(event, "lastName", "text"),
                value: this.state.lastName,
                type: "text"
              }}
            />
          </FormControl>
          <FormControl style={!this.state.show ? {} : { display: 'none' }} fullWidth>
            <CustomInput
              labelText="Company name *"
              success={this.state.companyNameState === "success"}
              error={this.state.companyNameState === "error"}
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              inputProps={{
                name: "companyName",
                onChange: event =>
                  this.change(event, "companyName", "text"),
                value: this.state.companyName,
                type: "text"
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <CustomInput
              labelText="Email *"
              success={this.state.registerEmailState === "success"}
              error={this.state.registerEmailState === "error"}
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              inputProps={{
                name: "registerEmail",
                onChange: event =>
                  this.change(event, "registerEmail", "email"),
                value: this.state.registerEmail,
                type: "email"
              }}
            />
          </FormControl>
          <div className="formCategory">
            Password must contains 8 digits with uppercase, lowercase, number and special charcter.
        </div>
          <FormControl fullWidth>
            <CustomInput
              labelText="Password *"
              success={this.state.registerPasswordState === "success"}
              error={this.state.registerPasswordState === "error"}
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              inputProps={{
                name: "registerPassword",
                onChange: event =>
                  this.change(event, "registerPassword", "password"),
                value: this.state.registerPassword,
                type: "password"
              }}
            />
          </FormControl>

          <FormControl fullWidth>
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
                value: this.state.confirmpassword,
                type: "password"
              }}
            />
          </FormControl>

        </CardBody>
        <CardFooter className={"registerjusteycontent " + classes.justifyContentCenter}>
          <GridContainer>
            <GridItem xs={9} sm={9} md={7}>
              <div onClick={this.loginLink} className="registrationAlready">
                Already have an account? Sign in
       </div>
            </GridItem>
            <GridItem xs={1} sm={1} md={5}>
              <div className="regbtn">
                <Button onClick={this.registerFunc} className={"loginbtn " + classes.loginButton}>
                  Register
        </Button>
              </div>
            </GridItem>
          </GridContainer>
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
RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(RegisterPage);