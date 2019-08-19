import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Notifications from '@material-ui/icons/Notifications';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import logoavatar from "assets/img/merritos-white.png";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/GroupAdd';
import WorkIcon from '@material-ui/icons/Work';
import LiveTv from '@material-ui/icons/LiveTv';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from 'components/CustomButtons/Button.jsx';
import DialogActions from '@material-ui/core/DialogActions';
import InputAdornment from "@material-ui/core/InputAdornment";
import LockOutline from "@material-ui/icons/LockOutline";
import $ from "jquery";
import MediaQuery from 'react-responsive';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import amber from '@material-ui/core/colors/amber';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { fetchprofileData, logoutaction, fetchOrganizationData } from "../../actions/Profileactions";


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
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  changepswd: {
    paddingTop: '0px',
    paddingLeft: '30px',
    paddingRight: '0px'
  },
  dialogtitle: {
    marginLeft: '8px'
  },
  pswdbtn: {
    paddingRight: '23px',
    marginTop: '-20px',
    marginBottom: '15px'
  },
  bgBlue: {
    backgroundColor: '#2196f3'
  },
  bgWhite: {
    backgroundColor: '#4747a0'
  },
  menuDiv: {
    backgroundColor: 'transparent',
    marginRight: '20px',
    height: '64px',
    '& button': {
      paddingLeft: '0px !important',
      paddingRight: '0px !important',
      width: '90px'
    }
  },
  menuBar: {
    borderRight: '1px solid rgba(0, 0, 0, 0.2)',
    marginRight: '20px'
  },
  menuDropdown: {
    top: '40px'
  },
  menuTitle: {
    color: '#fff',
    letterSpacing: '1px',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
  },
  menuActive: {
    color: '#fff',
    letterSpacing: '1px',
    backgroundColor: '#3a3a8a'
  },
  notifTab: {
    padding: '0px'
  },
  notifList: {
    width: '350px',
    borderBottom: '1px solid #f3f3f3',
    paddingLeft: '15px',
    paddingRight: '15px',
    marginRight: '-18px'
  },
  notifText: {
    color: '#1d2129',
    fontSize: '12px',
    fontWeight: 400,
    fontFamily: '"Titillium Web", "Helvetica", "Arial", sans-serif'
  },
  icon: {
    fontSize: '1.25rem'
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    textTransform: 'none'
  },
  iconBtn: {
    marginTop: '10px'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mobileMenu: {
    '& div:nth-child(2)': {
      background: '#fff',
      top: '0 !important',
      maxWidth: 'none',
      maxHeight: 'none',
      transition: '.2s ease',
      left: '0 !important',
      right: '0 !important',
      bottom: '0 !important',
      zIndex: -1
    }
  },
  navBarClose: {
    width: '30px',
    margin: '10px 7px',
    float: 'right',
    fontSize: '26px',
    cursor: 'pointer'
  },
  navListOne: {
    marginTop: '41px'
  },
  subicon: {
    marginLeft: '20px',
  },
  primaryinfo: {
    '& svg': {
      marginRight: '0px !important'
    }
  },
  formCategory1: {
    color: '#afafaf',
    margin: '-8px 0px 7px 3px',
    fontSize: '16px',

  }
});

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profAnchorEl: null,
      notifAnchorEl: null,
      cmpyDialogOpen: false,
      menu: 'home',
      userType: reactLocalStorage.get('userType', ""),
      userProfile: reactLocalStorage.get('userProfile', ""),
      anchorEl: null,
      oldPassword: "",
      oldPasswordState: "",
      newPassword: "",
      newPasswordState: "",
      confirmPassword: "",
      confirmPasswordState: "",
      userId: reactLocalStorage.get('userId', ""),
      notification: "",
      notiConnectRequests: [],
      color: 'success'
    };
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }

  shownavbar = () => {

    $('.mobile-nav-bar').animate({ left: '-25px' });
  }
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    //this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  componentDidMount() {
    let menuName = window.location.hash.split('#/')[1];
    this.setState({ open: false, menu: menuName.toLowerCase() });

    $('body').click(function (e) {

      if ($(e.target).parents('.mobile-nav-bar').length == 0 || $(e.target).parents('.hideList').length == 1) {
        if ($(window).width() <= 600)
          $('.mobile-nav-bar').animate({ left: '-400px' });
      }


    });
  }
  componentWillReceiveProps(nextprops) {
    this.setState({ notiConnectRequests: this.props.connectRequests });
  }

  handleProfileMenu = event => {
    this.setState({ profAnchorEl: event.currentTarget });
  };
  handleNotificationMenu = event => {
    this.setState({ notifAnchorEl: event.currentTarget });
  };
  handleLogout = () => {
    this.props.logoutaction();
    reactLocalStorage.set('userId', undefined);
    reactLocalStorage.set('userType', undefined);
    reactLocalStorage.set('userProfile', undefined);
    this.props.history.push('/App/Login');
  };

  handleClose = () => {
    this.setState({ profAnchorEl: null });
    this.setState({ notifAnchorEl: null });
    this.setState({ anchorEl: null });
    this.setState({ open: false });
    this.setState({ oldPassword: null });
    this.setState({ oldPasswordState: null });
    this.setState({ newPassword: null });
    this.setState({ newPasswordState: null });
    this.setState({ confirmPassword: null });
    this.setState({ confirmPasswordState: null });
    this.handleMobileMenuClose();
  };
  handleProfileNavigation = () => {
    this.setState({ menu: null });
    this.state.userType === 'individual' ? (
      this.props.history.push('/Profile')) : (this.props.history.push('/Organizationprofile'));
    this.handleMobileMenuClose();
    this.setState({ profAnchorEl: null });
  }
  AddMoreJobs = () => {
    this.setState({ jobOpen: true });
    this.setState({ showIcon: false });
    this.setState({ jobType: 'Full time' });
  }
  handleAccountNavigation = () => {
    this.setState({ menu: 'account' });
    this.props.history.push('/Accountinfo');
    this.handleMobileMenuClose();
    this.setState({ profAnchorEl: null });
  }
  handleHomeNavigation = () => {
    this.setState({ menu: 'home' });
    this.props.history.push('/Home');
    this.handleMobileMenuClose();
  }
  handleOrgNavigation = () => {
    this.setState({ menu: 'home' });
    this.props.history.push('/Organization');
    this.handleMobileMenuClose();
  }
  
  handleConnectionNavigation = () => {
    this.setState({ menu: 'connections' });
    this.props.history.push('/Connections');
    this.handleMobileMenuClose();
  }
  handleTrainersNavigation = () => {
    this.setState({ menu: 'trainers' });
    this.props.history.push('/Trainers');
    this.handleMobileMenuClose();
  }
  handlePlacementsNavigation = () => {
    this.setState({ menu: 'placements' });
    this.props.history.push('/Placements');
    this.handleMobileMenuClose();
  }
  handleProfile = () => {
    this.setState({ open: true });
  }
  handleClassesNavigation = () => {
    this.setState({ menu: 'classes' });
    this.props.history.push('/Classes');
    this.handleMobileMenuClose();
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
  handleConnectNotifcations(key) {
    this.setState({ notifAnchorEl: null });
    let arraydata = this.state.notiConnectRequests;
    arraydata.splice(key, 1);
    this.setState({ notiConnectRequests: arraydata });
    this.props.history.push('/Connections');
  }
  verifyLength(str) {
    let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return re.test(str);
  }
  change(event, stateName, type) {
    switch (type) {
      case "oldpassword":
        if (this.verifyLength(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
          this.setState({ oldPassword: event.target.value });
        } else {
          this.setState({ [stateName + "State"]: "error" });
          this.setState({ oldPassword: event.target.value });
        }
        break;
      case "newpassword":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" });
          this.setState({ newPassword: event.target.value });
        } else {
          this.setState({ [stateName + "State"]: "error" });
          this.setState({ newPassword: event.target.value });
        }
        break;
      case "confirmPassword":
        if (event.target.value === this.state.newPassword) {
          this.setState({ [stateName + "State"]: "success" });
          this.setState({ confirmPassword: event.target.value });
        }
        else {
          this.setState({ [stateName + "State"]: "error" });
          this.setState({ confirmPassword: event.target.value });
        }
        break;
      default:
        break;
    }

  }
  handleSubmit = () => {
    let th = this;
    if (this.state.oldPasswordState === null || this.state.oldPasswordState === "" || this.state.oldPasswordState === "error") {
      this.setState({ oldPasswordState: "error" });
    }
    else if (this.state.newPasswordState === null || this.state.newPasswordState === "" || this.state.newPasswordState === "error") {
      this.setState({ newPasswordState: "error" });
    }
    else if (this.state.confirmPassword === null || this.state.confirmPassword !== this.state.newPassword) {
      this.setState({ confirmPasswordState: "error" });
    }
    else {
      let Oldpassword = th.base64_encode(th.state.oldPassword);
      let newPassword = th.base64_encode(th.state.newPassword);
      let data = {
        "_id": th.state.userId, "oldpassword": Oldpassword, "newpassword": newPassword
      };
      fetch(BasePath + '/passwordauth', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
          if (data.length === 1) {
            th.setState({ notification: data.message });
            th.showNotification('br');
            th.setState({ color: "success" });
            th.setState({ oldPassword: "" });
            th.setState({ oldPasswordState: "" });
            th.setState({ newPassword: "" });
            th.setState({ newPasswordState: "" });
            th.setState({ confirmPassword: "" });
            th.setState({ confirmPasswordState: "" });
            th.setState({ open: false });
          }
          else {
            th.setState({ notification: data.message });
            th.showNotification('br');
            th.setState({ color: "error" });
          }
        }).catch((err) => {
          th.setState({ notification: err.message });
          th.showNotification('br');
          th.setState({ color: "error" });
        });
    }
  }

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

  render() {
    const { profAnchorEl, notifAnchorEl, anchorEl, mobileMoreAnchorEl, userType, userProfile, menu } = this.state;
    const { classes, profileData, companyData } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const profOpen = Boolean(profAnchorEl);
    const appsOpen = Boolean(notifAnchorEl);
    const connectRequests = this.state.notiConnectRequests;
    const notiCnt = 0; //connectRequests.length + this.props.myConnects.length;
    let menuActiveTab;
    if (this.props.location)
      menuActiveTab = this.props.location.toString().split('/')[1].toLowerCase();
    else
      menuActiveTab = menu;
    const renderMenu = (
      <div>
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
        <Menu
          className={classes.menuDropdown}
          anchorEl={notifAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={appsOpen}
          onClose={this.handleClose}
        >
          <List className={classes.notifTab}>
            {notiCnt > 0 ? (
              !connectRequests && connectRequests.length > 0 ? (
                connectRequests.map((value, key) => {
                  return (
                    <ListItem className={classes.notifList} key={key} button component="a">
                      <ListItemText disableTypography className={classes.notifText} primary={"you have Connect request from  " + value.firstName + " " + value.lastName} onClick={() => this.handleConnectNotifcations(key)} />
                    </ListItem>
                  )
                })
              ) : (
                ''
              )
                  (!this.props.myConnects && this.props.myConnects.length > 0 ? (
                    this.props.myConnects.map((value, key) => {
                      return (
                        <ListItem className={classes.notifList} key={key} button component="a" href="#Connections">
                          <ListItemText disableTypography className={classes.notifText} primary={value.firstName + " " + value.lastName + " has accepted your request"} />
                        </ListItem>
                      )
                    })
                  ) : (
                      ''
                    ))
            ) : (
                <ListItem className={classes.notifList} button component="a">
                  <ListItemText disableTypography className={classes.notifText} primary="There is no new notifications." />
                </ListItem>

              )}
          </List>
        </Menu>
        <Menu
          className="header-Profile-dropdown"
          anchorEl={profAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={profOpen}
          onClose={this.handleClose}
        >
          <MenuItem>
            {profileData[0].firstName ? (
              <ListItemText className='profile-name' inset primary={profileData[0].firstName + ' ' + profileData[0].lastName} secondary={profileData[0].email} />
            ) : (
                companyData && companyData.companyName ? (
                  <ListItemText className='profile-name' inset primary={companyData.companyName} secondary={companyData.email} />
                ) : null
              )}
          </MenuItem>
          <MenuItem onClick={this.handleAccountNavigation} className={classes.primaryinfo}>
            <ListItemIcon className={classes.icon}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Account info" />
          </MenuItem>
          <MenuItem onClick={this.handleProfileNavigation} className={classes.primaryinfo}>
            <ListItemIcon className={classes.icon}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Profile" />
          </MenuItem>
          <MenuItem onClick={this.handleProfile} className={classes.primaryinfo}>
            <ListItemIcon className={classes.icon}>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Change password" />
          </MenuItem>
          <MenuItem onClick={this.handleLogout} className={classes.primaryinfo}>
            <ListItemIcon className={classes.icon}>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
          </MenuItem>
        </Menu>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          aria-describedby="alert-dialog-description"
          message={
            this.state.notification
          }
        >
          <DialogTitle id="alert-dialog-title" className={classes.dialogtitle}>{"Change password"}</DialogTitle>
          <DialogContent className={classes.changepswd}>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
            <form>
              <CustomInput
                success={this.state.oldPasswordState === "success"}
                error={this.state.oldPasswordState === "error"}
                labelText="Old password *"
                id="password"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOutline
                        className={classes.inputAdornmentIcon}
                      />
                    </InputAdornment>
                  ),
                  onChange: event =>
                    this.change(event, "oldPassword", "oldpassword"),
                  value: this.state.oldPassword,
                  name: "oldPassword",
                  type: "password",
                }}
              />
              <div className={classes.formCategory1}>
                Password must contains 8 digits with uppercase, lowercase, number and special charcter.
        </div>
              <CustomInput
                success={this.state.newPasswordState === "success"}
                error={this.state.newPasswordState === "error"}
                labelText="New password *"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOutline
                        className={classes.inputAdornmentIcon}
                      />
                    </InputAdornment>
                  ),
                  onChange: event =>
                    this.change(event, "newPassword", "newpassword"),
                  value: this.state.newPassword,
                  name: "newPassword",
                  type: "password",
                }}
              />
              <CustomInput
                success={this.state.confirmPasswordState === "success"}
                error={this.state.confirmPasswordState === "error"}
                labelText="Confirm password *"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOutline
                        className={classes.inputAdornmentIcon}
                      />
                    </InputAdornment>
                  ),
                  onChange: event =>
                    this.change(event, "confirmPassword", "confirmPassword"),
                  value: this.state.confirmPassword,
                  name: "confirmPassword",
                  type: "password",
                }}
              />
            </form>
          </DialogContent>
          <DialogActions className={classes.pswdbtn}>
            <Button onClick={this.handleClose} className={"loginbtn forgotbackbtn " + classes.loginButton}>
              Cancel
    </Button>
            <Button onClick={this.handleSubmit} className={"loginbtn headersubmit" + classes.loginButton}>
              Save
    </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        className={"mobile-right-menu " + classes.mobileMenu}
      >
        <div onClick={this.handleMobileMenuClose} className={classes.navBarClose}>✕</div>
        <Typography variant="title" color="inherit" className="mobile-menu-logo">

          <a onClick={this.handleHomeNavigation}><img src={logoavatar} alt="Merritos" width='120' /></a>

        </Typography>
        {userType === 'individual' ? (
          <div>
            <MenuItem className={"mobile-menu-list-item " + classes.navListOne} onClick={this.handleHomeNavigation}>
              <ListItemIcon className={classes.icon}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Home" />
            </MenuItem>
            <MenuItem onClick={this.handleConnectionNavigation} className={"mobile-menu-list-item "}>
              <ListItemIcon className={classes.icon}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Connections" />
            </MenuItem>
            <MenuItem onClick={this.handleClassesNavigation} className={"mobile-menu-list-item "}>
              <ListItemIcon className={classes.icon}>
                <LiveTv />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Classes" />
            </MenuItem>
            <MenuItem onClick={this.handlePlacementsNavigation} className={"mobile-menu-list-item "}>
              <ListItemIcon className={classes.icon}>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Jobs" />
            </MenuItem>
          </div>
        ) : null}
        {/* <MenuItem onClick={this.handleNotificationMenu}>
          <ListItemIcon className={classes.icon}>
            <Notifications />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Notifications" />
        </MenuItem> */}
        <MenuItem className={"mobile-menu-list-item "}>
          <ListItemIcon className={classes.icon}>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="User account" />
        </MenuItem>
        <div className={classes.subicon}>
        <MenuItem onClick={this.handleOrgNavigation} className={"mobile-menu-list-item "}>
            <ListItemIcon className={classes.icon}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Home" />
          </MenuItem>
          <MenuItem onClick={this.handleAccountNavigation} className={"mobile-menu-list-item "}>
            <ListItemIcon className={classes.icon}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Account info" />
          </MenuItem>
          <MenuItem onClick={this.handleProfileNavigation} className={"mobile-menu-list-item "}>
            <ListItemIcon className={classes.icon}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Profile" />
          </MenuItem>
          <MenuItem onClick={this.handleProfile} className={"mobile-menu-list-item "}>
            <ListItemIcon className={classes.icon}>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Change password" />
          </MenuItem>
          {/* <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            message={
              this.state.notification
            }
          >
            <DialogContent>
              <CustomInput
                success={this.state.oldPasswordState === "success"}
                error={this.state.oldPasswordState === "error"}
                labelText="Old password *"
                id="password"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOutline
                        className={classes.inputAdornmentIcon}
                      />
                    </InputAdornment>
                  ),
                  onChange: event =>
                    this.change(event, "oldPassword", "oldpassword"),
                  value: this.state.oldPassword,
                  name: "oldPassword",
                  type: "password",
                }}
              />
              <CustomInput
                success={this.state.newPasswordState === "success"}
                error={this.state.newPasswordState === "error"}
                labelText="New password *"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOutline
                        className={classes.inputAdornmentIcon}
                      />
                    </InputAdornment>
                  ),
                  onChange: event =>
                    this.change(event, "newPassword", "newpassword"),
                  value: this.state.newPassword,
                  name: "newPassword",
                  type: "password",
                }}
              />
              <CustomInput
                success={this.state.confirmPasswordState === "success"}
                error={this.state.confirmPasswordState === "error"}
                labelText="Confirm password *"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOutline
                        className={classes.inputAdornmentIcon}
                      />
                    </InputAdornment>
                  ),
                  onChange: event =>
                    this.change(event, "confirmPassword", "confirmPassword"),
                  value: this.state.confirmPassword,
                  name: "confirmPassword",
                  type: "password",
                }}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} className={"loginbtn " + classes.loginButton}>
                Cancel
    </Button>
              <Button onClick={this.handleSubmit} className={"loginbtn forgotbackbtn " + classes.loginButton}>
                Submit
    </Button>
            </DialogActions>
          </Dialog> */}
          <MenuItem onClick={this.handleLogout} className={"mobile-menu-list-item "}>
            <ListItemIcon className={classes.icon}>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
          </MenuItem>
        </div>
      </Menu>
    );

    return (
      <div className={classes.root}>

        <MediaQuery query="(orientation: portrait)" query="(orientation: landscape)" query="(min-resolution: 2dppx)" query="(max-device-width: 1224px)">
          <AppBar position="fixed" className={"merritos-header-mobile " + classes.bgWhite} >
            <Toolbar>
              <div className={"mobileNavBtn " + classes.sectionMobile} onClick={(e) => this.shownavbar(e)}>

                <i className="material-icons">
                  more_vert
</i></div>
              <Typography variant="title" className="navbarmenutitle">{menuActiveTab}</Typography>
              <Typography className={classes.title} variant="title" color="inherit" noWrap>

                {userProfile === '1' ? (
                  <a onClick={this.handleHomeNavigation}><img src={logoavatar} alt="Merritos" width='0' /></a>
                ) :
                  (<a><img src={logoavatar} alt="Merritos" width='150' /></a>)}
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                {userType === 'individual' ? (
                  <Typography variant="title" color="inherit" className={classes.menuBar}>
                    <BottomNavigation
                      onChange={this.handleChange}
                      showLabels
                      className={classes.menuDiv}
                    >
                      <BottomNavigationAction disabled={userProfile === '0'} onClick={this.handleHomeNavigation} className={menuActiveTab === 'home' ? classes.menuActive : classes.menuTitle} label="Home" icon={<PersonIcon className={classes.icon} />} />
                      <BottomNavigationAction disabled={userProfile === '0'} onClick={this.handleConnectionNavigation} className={menuActiveTab === 'connections' ? classes.menuActive : classes.menuTitle} label="Connections" icon={<GroupIcon className={classes.icon} />} />
                      {/* <BottomNavigationAction disabled={userProfile === '0'} onClick={this.handleTrainersNavigation} className={menuActiveTab === 'trainers' ? classes.menuActive : classes.menuTitle} label="Find a GURU" icon={<LibraryBooksIcon className={classes.icon} />} /> */}
                      <BottomNavigationAction disabled={userProfile === '0'} onClick={this.handleClassesNavigation} className={menuActiveTab === 'classes' ? classes.menuActive : classes.menuTitle} label="Classes" icon={<LiveTv className={classes.icon} />} />
                      <BottomNavigationAction disabled={userProfile === '0'} onClick={this.handlePlacementsNavigation} className={menuActiveTab === 'placements' ? classes.menuActive : classes.menuTitle} label="Jobs" icon={<WorkIcon className={classes.icon} />} />
                    </BottomNavigation>
                  </Typography>
                ) : ''}
                {/* <IconButton disabled={userProfile === '0'} className={classes.iconBtn} onClick={this.handleNotificationMenu} color="inherit">
                  <Badge className={classes.margin} badgeContent={notiCnt} color="secondary">
                    <Notifications />
                  </Badge>
                </IconButton> */}
                {userProfile === '1' ? (
                  <IconButton className={classes.iconBtn} onClick={this.handleProfileMenu} color="inherit">
                    {profileData.length > 0 && profileData[0].profileImage !== undefined && profileData[0].profileImage !== "" ? (
                      <img src={BasePath + '/uploads/20/' + profileData[0].profileImage} className="header-profile-img" alt="..." />
                    ) : (
                        companyData.length > 0 && companyData[0].profileImage !== undefined && companyData[0].profileImage !== "" ? (
                          <img src={BasePath + '/uploads/20/' + companyData[0].profileImage} className="header-profile-img" alt="..." />
                        ) : (
                            <AccountCircle />)
                      )}
                  </IconButton>
                ) : (
                    <IconButton aria-haspopup="true" className={classes.iconBtn} onClick={this.handleLogout} color="inherit">
                      <PowerSettingsNew />
                    </IconButton>
                  )}
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} className="mobileNavBtn">
                  <MenuIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1224px)" >
          <AppBar position="fixed" className={"merritos-header-desktop " + classes.bgBlue}>
            <Toolbar>
              <div className={"mobileNavBtn " + classes.sectionMobile} onClick={(e) => this.shownavbar(e)}>

                <i className="material-icons">
                  dehaze
</i></div>
              <Typography className={classes.title} variant="title" color="inherit" noWrap>

                {userProfile === '1' ? (
                  <a onClick={this.handleHomeNavigation}><img src={logoavatar} alt="Merritos" width='150' /></a>
                ) :
                  (<a><img src={logoavatar} alt="Merritos" width='150' /></a>)}
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                {userType === 'individual' ? (
                  <Typography variant="title" color="inherit" className={"merritos-header-bar " + classes.menuBar}>
                    <a href="/#/Home" className={menuActiveTab === 'home' ? classes.menuActive : ''} onClick={this.handleHomeNavigation}>Home</a>
                    <a href="/#/Connections" className={menuActiveTab === 'connections' ? classes.menuActive : ''} onClick={this.handleConnectionNavigation}>Connections</a>
                    <a href="/#/Classes" className={menuActiveTab === 'classes' ? classes.menuActive : ''} onClick={this.handleClassesNavigation}>Classes</a>
                    <a href="/#/Placements" className={menuActiveTab === 'placements' ? classes.menuActive : ''} onClick={this.handlePlacementsNavigation}>Jobs</a>
                  </Typography>
                ) : ''}
                {/* <IconButton disabled={userProfile === '0'} className={classes.iconBtn} onClick={this.handleNotificationMenu} color="inherit">
                  <Badge className={classes.margin} badgeContent={notiCnt} color="secondary">
                    <Notifications />
                  </Badge>
                </IconButton> */}
                {userProfile === '1' ? (
                  <IconButton className={classes.iconBtn} onClick={this.handleProfileMenu} color="inherit">
                    {profileData.length > 0 && profileData[0].profileImage !== undefined && profileData[0].profileImage !== "" ? (
                      <img src={BasePath + '/uploads/20/' + profileData[0].profileImage} className="header-profile-img" alt="..." />
                    ) : (
                        companyData.length > 0 && companyData[0].profileImage !== undefined && companyData[0].profileImage !== "" ? (
                          <img src={BasePath + '/uploads/20/' + companyData[0].profileImage} className="header-profile-img" alt="..." />
                        ) : (
                            <AccountCircle />)
                      )}
                  </IconButton>
                ) : (
                    <IconButton aria-haspopup="true" className={classes.iconBtn} onClick={this.handleLogout} color="inherit">
                      <PowerSettingsNew />
                    </IconButton>
                  )}
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MenuIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </MediaQuery>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
const profileList = state => ({
  profileData: state.profile.profileData,
  companyData: state.profile.companydata,
  location: state.loader.location
});
export default connect(profileList, { logoutaction, fetchprofileData, fetchOrganizationData })(withStyles(styles)(PrimarySearchAppBar));
