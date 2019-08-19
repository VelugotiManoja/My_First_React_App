import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import avatar from "assets/img/usericon.png";
import arrow from "assets/img/long-arrow-right.png";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from "react-responsive-modal";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import Profile from "./Personaldetails";
import Education from "../Pages/Education.jsx";
import Workexperience from "../Pages/Workexperience.jsx";
import Achivements from "../Pages/Achivements.jsx";
import Expertise from "../Pages/Expertise.jsx";
import Recommendation from "../Pages/Recommendation.jsx";
import Certificates from "./Certificates";
import MentorDetails from "../Pages/MentorDetails.jsx";
import Schedule from "../Pages/Schedule.jsx";
import CreateSchedule from "../Pages/CreateSchedule.jsx";
import Payment from "../Pages/Payment.jsx";
import { fetchprofileData } from "../../actions/Profileactions";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";
import CameraAlt from "@material-ui/icons/CameraAlt";

import "assets/css/styles.css";
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

const VALUES = ["2018-03-22", "2019-03-23"];
const EXAMPLE = [
    {
        data: "2018-11-15",
        status: "status",
        statusB: "Ready for HTML",
        statusE: "In Progress"
    },
    {
        data: "2019-02-25",
        status: "status",
        statusB: "Ready for CSS",
        statusE: "In Progress"
    },
    {
        data: "2019-06-29",
        status: "status",
        statusB: "Ready for JavaScript",
        statusE: "Done"
    }
];
const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    profileIcon: {
        marginTop: '20px !important',
        height: "160px",
        width: "160px",
    },
    imageCard: {
        height: "125px",
        width: "125px",
        borderRadius: "50%"
    },
    inputFile: {
        display: 'none'
    },
    profileEditIcon: {
        bottom: '54px !important',
        left: '216px !important',
        top:'86px !important',
        cursor: 'pointer',
        color: '#b4b4b4',
        position: 'absolute !important'
    },
    cardHeight: {
        height: "350px"
    },
    navcard: {
        marginTop: '0px',
        willChange: 'auto'
    },
    profileInfo: {
        color: '#000000 !important',
        fontWeight: '400 !important',
        fontSize: '22px',
        marginTop: '27px'
    },
    chip: {
        backgroundColor: '#fff !important',
        color: '#333',
        fontSize: '25px'
    },
    starIcon: {
        marginTop: '-63px !important'
    },
    listItemText: {
        fontSize: '0.9rem !important'
    },
    white: {
        color: '#ffffff !important'
    },
    imageArrow: {
        width: '94px !important',
        height: '64px !important'
    },
    button: {
        textTransform: 'none'
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    fullWidth: {
        width: '100%'
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        marginTop: "15px"
    },
 
});
function NoOptionsMessage(props) {
    return (
        <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField fullWidth InputProps={{
            inputComponent,
            inputProps: {
                className: props.selectProps.classes.input,
                inputRef: props.innerRef,
                children: props.children,
                ...props.innerProps,
            },
        }}
            {...props.selectProps.textFieldProps} />
    );
}

function Option(props) {
    return (
        <MenuItem buttonRef={props.innerRef} selected={props.isFocused} component="div" style={{
            fontWeight: props.isSelected ? 500 : 400,
        }}
            {...props.innerProps}>
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip tabIndex={-1} label={props.children} className={classNames(props.selectProps.classes.chip, {
            [props.selectProps.classes.chipFocused]: props.isFocused,
        })} onDelete={props.removeProps.onClick} deleteIcon={<CancelIcon
            {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}
const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            curIdx: 0,
            prevIdx: -1,
            br: false,
            selectedFile: '',
            imageurl: avatar,
            imagearrow: arrow,
            open: false,
            companyName: "",
            companyNameState: "",
            address: "",
            Myclasses: [],
            addressState: "",
            primary: "",
            primaryState: "",
            editData: false,
            showCompany: false,
            showCreateCompany: false,
            show: false,
            postguardpath: avatar,
            userId: reactLocalStorage.get('userId', ""),
            profileInfo: '',
            color: 'info',
            notification: '',
            isCoach: "",
            loader: false,
            goal: '',
            name: '',
            suggestions: []
        }
        this.stepChangeFunc = this.stepChangeFunc.bind(this);
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
    handleSelect = name => value => {
        this.setState({
            goal: value.value,
            name: value.label
        });
    };

    stepChangeFunc(notification, color) {
        this.setState({ notification: notification });
        this.setState({ color: color });
        this.showNotification('br');
    }
    async componentDidMount() {
        let th = this;

        await fetch(BasePath + '/teachingclassesinfo/' + this.state.userId, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (resp) {
                th.state.Myclasses = resp.result;
            });


        if (this.state.userId === '' || this.state.userId === 'undefined') {
            this.props.history.push('/');
        } else {
            this.props.fetchprofileData(this.state.userId);
            th.setState({ loader: true });
            fetch(BasePath + '/goalslist', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
            }).then((resp) => resp.json()) // Transform the data into json
                .then(function (resp) {
                    if (resp.result.length > 0) {
                        let arraydata = resp.result.map(suggestion => ({
                            value: suggestion._id,
                            label: suggestion.goal,
                        }));
                        th.setState({ suggestions: arraydata });
                    }
                });
            setTimeout(function () {
                th.setState({ loader: false });
                th.setState({ isCoach: th.props.profileData[0].isCoach });
                if (th.props.profileData[0].profileImage !== "" && th.props.profileData[0].profileImage !== undefined) {
                    th.setState({ imageurl: BasePath + '/uploads/' + th.props.profileData[0].profileImage });
                }
            }, 500);
        }
    }
    handleChange = event => {
        this.setState({ isCoach: event.target.value });
    };
    handleUpdate = () => {
        let th = this;
        let coachdata = { isCoach: this.state.isCoach, userId: this.state.userId }
        th.setState({ loader: true });
        fetch(BasePath + '/coachupdate', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(coachdata)
        }).then((resp) => resp.json()) // Transform the data into json
            .then(function (resp) {
                th.props.profileData[0].isCoach = coachdata.isCoach;
                th.setState({ loader: false });
            }).catch((err) => {
                th.setState({ loader: false });
            });
    }
    handleGoalUpdate = () => {
        let th = this;
        if (th.state.goal === "") {
            th.setState({ notification: "Please set your goal" });
            th.setState({ color: "danger" });
            th.showNotification('br');
        }
        else {
            let data = { goal: th.state.goal, userId: th.state.userId }
            th.setState({ loader: true });
            fetch(BasePath + '/updategoal', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then((resp) => resp.json()) // Transform the data into json
                .then(function (resp) {
                    th.props.profileData[0].goalinfo[0].goal = th.state.name;
                    th.props.profileData[0].goalinfo[0].suggestions = resp.result;
                    th.setState({ loader: false });
                }).catch((err) => {
                    th.setState({ loader: false });
                });
        }

    }
    fileChangedHandler = (event) => {
        let th = this;
        let userId=th.state.userId;
        let selectedFile = event.target.files[0]
        let formData = new FormData();
        formData.append('file', selectedFile);
        fetch(BasePath + '/savedata', {
            method: 'post',
            body: formData,
            headers:{"userid":userId}
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                let profileImage = BasePath + '/uploads/150/' + data.filename;
                let serdata = { "profileImage": data.filename, "_id": th.state.userId };
                fetch(BasePath + '/userimageupload', {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: JSON.stringify(serdata)
                }).then(function (resp) {
                    th.setState({ imageurl: profileImage });
                }).catch((err) => {
                    th.setState({ notification: err.message });
                    th.setState({ color: 'danger' });
                    th.showNotification('br');
                }
                )
            })
    }
    state = {
        open: false
    };
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    render() {
        const { open } = this.state;
        const { classes, theme, profileData } = this.props;
        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };
        let showCoach = false;
        let profSubMenuList = [
            {
                label: 'Personal details', component:
                    <Profile stepChange={this.stepChangeFunc} />
            },
            {
                label: 'Education', component:
                    <Education stepChange={this.stepChangeFunc} />
            },
            {
                label: 'Workexperience', component:
                    <Workexperience stepChange={this.stepChangeFunc} />
            },
            {
                label: 'Certificates and Documents', component:
                    <Certificates />
            },
            {
                label: 'Achivements', component:
                    <Achivements stepChange={this.stepChangeFunc} />
            },
            {
                label: 'Expertise', component:
                    <Expertise stepChange={this.stepChangeFunc} />
            },
            {
                label: 'Recommendation', component:
                    <Recommendation stepChange={this.stepChangeFunc} />
            }
        ];
        if (profileData && profileData.length > 0 && profileData[0].isCoach === "yes") {
            profSubMenuList.push(
                {
                    label: 'Mentor Details', component:
                        <MentorDetails stepChange={this.stepChangeFunc} />
                },
                {
                    label: 'Schedule', component:
                        <Schedule stepChange={this.stepChangeFunc} />
                },
                {
                    label: 'Payment', component:
                        <Payment stepChange={this.stepChangeFunc} />
                }
            );
        }
        if (profileData && profileData.length > 0 && profileData[0].role === 'Professional') {
            showCoach = true;
        } else {
            showCoach = false;
        }

        let profSubMenuArr = [];
        profSubMenuList.map((mVal) => {
            return profSubMenuArr.push({
                tabButton: mVal.label,
                tabContent: (
                    <Card className={classes.navcard}>
                        <CardBody>
                            {mVal.component}
                        </CardBody>
                    </Card>
                )
            });
        });
        const { curIdx, prevIdx } = this.state;
        const curStatus = EXAMPLE[curIdx].statusB;
        const prevStatus = prevIdx >= 0 ? EXAMPLE[prevIdx].statusB : '';

        return (
            <div>
                <CircularProgress visible={this.state.loader}></CircularProgress>
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
                {/* <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                            

                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem>
                                        <div className="goalLabel first">
                                            {profileData[0].role}
                                        </div>
                                    </GridItem>
                           <GridItem>
                              <div className="disinline">
                                       {profileData[0].profileImage === '' ?(
                                <img src={profileData[0].profileImage} />
                                          ):(
                                <img src={this.state.imageurl} width="150px" height="100px"/>
                                     )}
                              </div>
                              <input
                                 accept="image/*"
                                 className={classes.inputFile}
                                 id="flat-button-file"
                                 multiple
                                 type="file"
                                 onChange={this.fileChangedHandler}
                             />
                     <label htmlFor="flat-button-file">
                        <CameraAlt className={classes.profileEditIcon}/>
                    </label>
                           </GridItem>
                                    <GridItem md={6}>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100px",
                                                margin: "0 auto",
                                                marginTop: "20px",
                                                fontSize: "15px"
                                            }}
                                        >

                                           

                                        </div>
                                        <div className="text-center">
                                            {curStatus}
                                        </div>
                                    </GridItem>
                                    <GridItem md={3}>
                                        <div md={4} className="goalLabel">{profileData[0].goal}</div>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                   
                </GridContainer> */}
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <div className="navpills-custom">
                            <NavPills
                            className="navpills-custom"
                                color="default"
                                horizontal={{
                                    tabsGrid: { xs: 12, sm: 12, md: 3 },
                                    contentGrid: { xs: 12, sm: 12, md: 9 }
                                }}
                                tabs={profSubMenuArr}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
                <Modal open={open} onClose={this.onCloseModal} center className="modelSize">
                    <CreateSchedule stepChange={this.stepChangeFunc} _this={this} />
                </Modal>
            </div>
        );
    }
}
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};
const profileList = state => ({
    profileData: state.profile.profileData,
    userId: state.profile.userId
});

export default connect(profileList, { fetchprofileData })(withStyles(styles, { withTheme: true })(Dashboard));