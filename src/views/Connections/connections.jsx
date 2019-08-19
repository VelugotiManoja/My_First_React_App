import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import robo from 'assets/img/broken-robot.png';
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";
// Mobile Bottom
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';//icons
import { Container, Row, Col } from 'reactstrap';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import dummyimg from 'assets/img/default-avatar.png';

import { fetchprofileData } from "../../actions/Profileactions";
import ConnectionsRequests from "./connectrequests";
import { getMyConnects, getMyActivity, getMyConnectionsList } from "../../actions/Connection";
import avatarImg from "assets/img/usericon.png";
import ScrollArea from "react-scrollbar";
import $ from "jquery";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import { loaderfalse } from '../../actions/Loader'

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

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};



const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,

        textColorPrimary: '#3677b5',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',


    },
    tabroot: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 0,

    },

    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
        flexGrow: 0,
    },
    tabsIndicator: {
        backgroundColor: '#fff',
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },
    bottomNav: {
        top: 'auto',
        bottom: 0,
        position: 'fixed',
        width: '100%',
        left: 0,
        borderTop: "solid 1px #999",
        marginTop: 0,

    },
    card: {
        borderRadius: "2px",
        cursor: 'pointer',
        "&:hover": {
            '& $icon': {
                color: 'rgb(37, 55, 102)'
            },
            boxShadow: '3px 3px 10px #777'
        }
    },
    grid: {
        [theme.breakpoints.down('xs')]: {
            marginTop: "20px"
        }

    },
    cardbody: {
        textAlign: "center"
    },
    title: {
        color: 'rgb(37, 55, 152)'
    },
    icon: {
        fontSize: "90px",
        color: "#c2cbe4"
    },

    textHeader: {
        color: 'rgb(228, 17, 17)'
    },
    cardHeight: {
        height: "350px"
    },
    tabButton: {
        textTransform: 'none',
        color: 'red'
    },
    imageCard: {
        height: "40px",
        width: "40px",
        borderRadius: "50px",
        marginTop: "6px"
    },
    imageClass: {
        height: "75px",
        width: "75px",
        marginRight: "20px"
    },
    activelabel: {
        textTransform: 'none',
        fontWeight: '800',
        fontFamily: "'Titillium Web', Helvetica, Arial, sans-serif",
        '& span': {
            fontSize: '16px',
            color: '#0094DA'
        }
    },
    button: {
        backgroundColor: "#1f91f3 !important",
        color: "#fff !important",
        borderRadius: "5px",
        textTransform: "none",
        padding: '5px',
        margin: '10px'
    },
    tabContainer: {
        boxShadow: '3px 3px 10px #777',
        marginTop: '10px',
        backgroundColor: '#F9F9F9',
        minHeight: '380px',
        [theme.breakpoints.down('xs')]: {
            minHeight: '200px',
        }
    },
    indicator: {
        backgroundColor: '#0094DA',
        color: '#0094DA'
    },
    label: {
        textTransform: 'none',
        fontWeight: '800',
        fontFamily: "'Titillium Web', Helvetica, Arial, sans-serif",
        '& span': {
            fontSize: '16px',
            color: '#0094DA'
        },
        '& button:active': {
            '& span': {
                color: 'red !important'
            }
        }
    },
    gridList: {
        '& span': {
            fontSize: '18px',
            fontFamily: "'Titillium Web', Helvetica, Arial, sans-serif",
            fontWeight: 'bold',
            color: '#0094DA'
        },
        '& label': {
            fontSize: '16px',
        }
    },
    activityTime: {
        marginLeft: '30px !important'
    },
    rating: {
        color: '#0094DA'
    },
    listBorder: {
        padding: 0,
        '& li:nth-child(1)': {
            padding: 0
        },
        '& img': {
            width: '100%'
        }
    },
    cardList: {
        marginBottom: '0px !important',
        '& img': {
            height: '140px',
            width: '197px'
        },
        '& span': {
            color: '#2196f3',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline'
            }
        },
        [theme.breakpoints.down('xs')]: {
            '& img': {
                height: '120px',
                width: '135px'
            }
        }
    },
    courseName: {
        fontWeight: '900 !important',
        fontSize: '21px !important'
    },
    courseGrid: {
        marginLeft: '0px !important',
        color: '#9c9898',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '2px !important'
        }
    },
    courseList: {
        marginLeft: '18px !important'
    },
    courseDetails: {
        borderBottom: '1px solid #f1f1f1 !important'
    },
    jobsActivity: {
        marginTop: '0px !important',
        [theme.breakpoints.down('xs')]: {
            marginTop: '40px !important'
        }
    },
    rightcontainerjobsActivity: {
        marginTop: '0px !important',
    },
    classheading: {
        fontWeight: 'bold',
        fontSize: '18px',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '25px !important',
            marginBottom: '10px !important',
            fontSize: '14px'
        }
    },
    searchLabel: {
        paddingRight: '0px !important'
    },
    connectionsCard: {
        marginTop: '10px !important'
    },
    firstName: {
        textTransform: 'Capitalize !important'
    }
});
class Connections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            robo: robo,
            userId: reactLocalStorage.get('userId', ""),
            imageUrl: avatarImg,
            color: 'info',
            text: '',
            notification: '',
            br: false,
            value: 0,
            tabValue: 0,
            list: { path: 'uploads/hello.jpg' },
            singleProfile: [],
            searchList: [],
            myconnectionList: 1,
            showBack: false,
            showActivity: true,
            showSearch: false,
            showSingle: false,
            searchText: "",
            prev: 0,
            hisActivity: [],
            peoplemayyouknow: [],
            searchPeople: [],
            myActivity: [],
            btnAction: "Connect",
            myConnects: [],
            searchTab: false,
            profileUpdate: false
        }

        if (!this.state.userId) {
            this.props.history.push('/');
        }
        this.notificationshowFunc = this.notificationshowFunc.bind(this);
        this.connectsAddFunc = this.connectsAddFunc.bind(this);
    }
    componentDidMount() {
        const th = this;
        let urlParams = window.location.hash.split('/')[2]
        if (urlParams) {
            th.showProfileDetails(urlParams);
        }
        $('.classes-right-search').hide();
        this.props.fetchprofileData(this.state.userId);
        this.props.getMyConnects(this.state.userId);
        this.props.getMyActivity(this.state.userId);
    }
    componentWillReceiveProps(next) {
        const th = this;
        var ids = new Array();
        var educations = new Array();
        var companyName = new Array();
        var scheduleId = new Array();
        if (next.profileData[0].education && next.profileData[0].education.length > 0) {
            next.profileData[0].education.map((value, index) => {
                educations.push(value.universityName)
            })
        }
        if (next.profileData[0].experience && next.profileData[0].experience.length > 0) {
            next.profileData[0].experience.map((value, index) => {
                companyName.push(value.companyName)
            })
        }
        if (next.profileData[0].myClass && next.profileData[0].myClass.length > 0) {
            next.profileData[0].myClass.map((value, index) => {
                scheduleId.push(value.scheduleId)
            })
        }
        if (next.myActivity.length > 0) {
            this.setState({ myActivity: next.myActivity });
        }
        if (next.myConnects.length > 0) {
            next.myConnects.map((value, index) => {
                if (value.acceptIds) {
                    value.acceptIds.map((val, key) => {
                        ids.push(val)
                    })
                }
            })
            this.setState({ myConnects: next.myConnects })
        }
        if(next.peopleYoyMayKnow.length === 0) {
            this.props.getMyConnectionsList([this.state.userId, { ids: ids, scheduleId: scheduleId, companyName: companyName, educations: educations }]);
        }
        if (next.peopleYoyMayKnow.length > 0) {
            this.setState({ peoplemayyouknow: next.peopleYoyMayKnow });
        }
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
    dateLongStr(date) {
        const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        const month = mS[date.getMonth()];
        const dt = date.getDate();
        const year = date.getFullYear();
        return dt + " " + month + " " + year;
    }
    searchConnections(e) {
        const th = this;
        var search = '';
        this.setState({ myconnectionList: 0 });
        this.setState({ singleProfile: [] });
        $(e.target).hide();
        $('.connection-search-bar').show();
        $('.classes-right-search').show();

        $('#connection-search-bar').keyup(function () {
            fetch(BasePath + '/getsearchconnectionslist/' + th.state.userId + '?q=' + $(this).val(), {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },

            }).then(resp => resp.json())
                .then(function (serdata) {
                    if (serdata.info.length < 1) {
                        $('.search-contact-row').removeClass('row-flex-nowarp');
                    }
                    else {
                        $('.search-contact-row').addClass('row-flex-nowarp');
                    }
                    th.setState({ searchPeople: serdata.info, searchTab: true })
                }).catch((err) => {

                })
        });
        $('body').on('click', '.next-col-list', function () {
            let w = $(this).parent('div').parent('div').scrollLeft();
            $(this).parent('div').parent('div').animate({ scrollLeft: Number(w) + 300 }, 1000);
        })
        $('body').on('click', '.prev-col-list', function () {
            let w = $(this).parent('div').parent('div').scrollLeft();
            $(this).parent('div').parent('div').animate({ scrollLeft: Number(w) - 300 }, 1000);
        })
    }
    showProfileDetails(value, type) {
        let th = this;
        let profileId;
        if (typeof (value) === 'string') {
            profileId = value;
        } else {
            if (type === 'users') {
                profileId = value.Data[0].userId;
            } else {
                profileId = value.userId;
            }
            th.props.history.push('/Connections/' + profileId)
        }
        th.setState({ showBack: false });
        let data = { loginId: th.state.userId, connectId: profileId };

        fetch(BasePath + '/connectprofileactivity', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {

                fetch(BasePath + '/activityDashboard/' + serdata.global[0].profile.userId, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(resp => resp.json())
                    .then(function (activitydata) {
                        // th.backtoActivitySearch();
                        th.setState({ hisActivity: activitydata.info });
                        if (serdata.length === 1) {
                            th.setState({ singleProfile: serdata.global });
                            th.setState({ showActivity: false, showSingle: true, showSearch: false });
                            $('#viewOne').trigger('click');
                            $('.connect-people-label').show();
                            $('.classes-right-search').hide();
                            if (th.state.singleProfile[0].profile.requestIds.indexOf(th.state.userId) != -1)
                                th.setState({ btnAction: 'Request Pending' })
                            if (th.state.singleProfile[0].profile.sentrequestIds.indexOf(th.state.userId) != -1)
                                th.setState({ btnAction: "Confirm Request" })
                            if (th.state.singleProfile[0].profile.acceptIds.indexOf(th.state.userId) != -1)
                                th.setState({ btnAction: "Disconnect" })
                                th.setState({profileUpdate: true});
                        }
                    })
            })
    }
    notificationshowFunc(notification, color) {
        this.setState({ notification: notification });
        this.setState({ color: color });
        this.showNotification('br');
    }
    handleshowSearch = () => {
        this.setState({ searchList: [], singleProfile: [], showActivity: false, showSingle: false, showSearch: true })
    };

    acceptClick(e, value, id) {
        let th = this;
        const t = e.target;
        let data = { requestId: value.userId, userId: th.state.userId };
        if ($(e.target).hasClass('loadergif'))
            return false;
        $(e.target).addClass('loadergif');
        fetch(BasePath + '/acceptrequest', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {
                if (serdata.length === 1) {
                    $(t).removeClass('loadergif');
                    th.setState({ btnAction: "Disconnect" })
                    th.notificationshowFunc("Accepted successfully", "success");
                }
            }).catch((err) => {
                th.props.notificationShow(err.message, "error");
            })
    }
    chatOpen() {
        this.props.history.push('/underconstruction');
    }
    disconnectClick(e, value, id) {

        let th = this;
        let data = { connectId: value.userId, userId: th.state.userId };
        const t = e.target;
        if ($(e.target).hasClass('loadergif'))
            return false;
        $(e.target).addClass('loadergif');

        fetch(BasePath + '/disconnect', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {
                if (serdata.length === 1) {
                    $(t).removeClass('loadergif');
                    th.setState({ btnAction: "Connect" })
                    th.notificationshowFunc("Unfriend successfully", "success");
                }
            }).catch((err) => {
                th.notificationshowFunc(err.message, "error");

            })

    }
    ButtonClick(e, value, id) {
        let th = this;
        let data = { requestId: value.userId, userId: th.state.userId };
        const t = e.target;
        if ($(e.target).hasClass('loadergif'))
            return false;
        $(e.target).addClass('loadergif');

        fetch(BasePath + '/requestprofile', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {
                if (serdata.length === 1) {
                    $(t).removeClass('loadergif');
                    th.setState({ btnAction: "Request Pending" })
                    th.notificationshowFunc("Request sent successfully", "success");
                }
            }).catch((err) => {
                th.notificationshowFunc(err.message, "error");

            })
    }
    acceptClicks(e, value, id) {
        let th = this;
        const t = e.target;
        let data = { requestId: value.userId, userId: th.state.userId };
        if ($(e.target).hasClass('loadergif'))
            return false;

        $(e.target).addClass('loadergif');
        fetch(BasePath + '/acceptrequest', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {
                if (serdata.length === 1) {
                    let btn = '<button class="connect-detail-btn">Disconnect</button>'

                    $(t).replaceWith(function () {
                        return $(btn).click((e) => {

                            th.disconnectClicks(e, value, id)
                        });
                    });
                    th.notificationshowFunc("Accepted successfully", "success");
                }
            }).catch((err) => {
                th.props.notificationShow(err.message, "error");
            })
    }
    disconnectClicks(e, value, id) {

        let th = this;
        let data = { connectId: value.userId, userId: th.state.userId };
        const t = e.target;
        if ($(e.target).hasClass('loadergif'))
            return false;

        $(e.target).addClass('loadergif');

        fetch(BasePath + '/disconnect', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {
                if (serdata.length === 1) {

                    let btn = '<button class="connect-detail-btn">Connect</button>'

                    $(t).replaceWith(function () {
                        return $(btn).click((e) => {

                            th.ButtonClicks(e, value, id)
                        });
                    });
                    th.notificationshowFunc("Unfriend successfully", "success");
                }
            }).catch((err) => {
                th.notificationshowFunc(err.message, "error");

            })

    }

    ButtonClicks(e, value, id) {
        let th = this;
        let data = { requestId: value.userId, userId: th.state.userId };
        const t = e.target;
        if ($(e.target).hasClass('loadergif'))
            return false;

        $(e.target).addClass('loadergif');
        fetch(BasePath + '/requestprofile', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {
                if (serdata.length === 1) {
                    let btn = '<button class="connect-detail-btn">Request Pending</button>'

                    $(t).replaceWith(function () {
                        return $(btn).click((e) => {


                        });
                    });
                    th.notificationshowFunc("Request sent successfully", "success");
                }
            }).catch((err) => {
                th.notificationshowFunc(err.message, "error");

            })
    }


    connectsAddFunc(data) {
        this.props.myConnects.push(data);
        this.setState({ text: data.userId });


    }
    backtoActivity = () => {
        this.setState({ singleProfile: [] });

    };
    backtoActivitySearch = () => {
        $('.layout-left').show();
        $('.connect-people-label').show();
        $('.connection-search-bar').hide();
        $('.classes-right-search').hide();
        $('#connection-search-bar').val('');
        this.props.history.push('/Connections');
        this.setState({ singleProfile: [] });
        this.setState({ myconnectionList: 1, searchTab: false });
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleTabChange = (event, value) => {
        this.setState({ tabValue: value });
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    keydownHandler = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    }
    mobileTabs = (e, id) => {
        if ($(window).width() < 600) {
            if (id == '#activity-info') {
                $('.layout-right-content').show();
                $('.layout-left').hide();
            }
            else {
                $('.layout-right-content').hide();
                $('.layout-left').show();
            }
            $(e.target).closest('ul').find('li').removeClass('activeTab-activity');
            $(e.target).closest('li').addClass('activeTab-activity');
            $('.mobile-card-view').addClass('mobile-disable');
            $(id).removeClass('mobile-disable');
        }
    }
    handleSearch = () => {
        let th = this;
        let data = { userId: th.state.userId, text: th.state.connectSearch };
        fetch(BasePath + '/connectionsearchdata', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()) // Transform the data into json
            .then(function (resp) {
                if (resp.length === 1) {
                    th.setState({ searchList: resp.info })
                }
                else if (resp.length === 0) {
                    th.setState({ searchText: "No results found..." })
                }
            }).catch((err) => {
                this.setState({ notification: err.message });
                this.setState({ color: 'error' });
                this.showNotification('br');
            });
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ br: false });
    };
    handelSearchFunction = (e) => {
        let mySearchResult = []
        if (e.target.value != '') {
            this.props.myConnects.map(item => {
                if ((item.firstName + " " + item.lastName).toUpperCase().search((e.target.value).toUpperCase()) >= 0) {
                    mySearchResult.push(item);
                }
            })
            this.setState({ myConnects: mySearchResult });
        } else {
            this.setState({ myConnects: this.props.myConnects });
        }
    }
    componentDidUpdate() {
        setTimeout(() => this.props.loaderfalse(window.location.hash.split('#')[1]), 200);
    }
    shouldComponentUpdate(next) {
        let urlParams = window.location.hash.split('/')[2]
        if (urlParams) {
            return this.state.profileUpdate
        } else {
            return next.componentupdate
        }
    }
    render() {
        const { classes, theme } = this.props;
        return (
            <div className="full-height">
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
                <Container className={'full-height ' + classes.grid}>
                    <Row className="full-height">
                        <Col md="3" className="mobile-view mobile-nav-bar full-height">
                            <div className={'full-height'}>
                                <label className="label-title">Connections</label>
                                {/*
                                    <i className="material-icons searchbar-leftmenuarrow">
                                    arrow_drop_down
                                </i>
                               */}
                                <div className="searchbar-leftmenu">
                                    <input type="text" placeholder="search your connections" onChange={(e) => { this.handelSearchFunction(e) }} />
                                    <i className="material-icons">search</i>
                                </div>
                                <ScrollArea
                                    speed={0.8}
                                    className="connection-scroll-area"
                                    contentClassName="content"
                                    horizontal={false}>
                                    <ul className="leftmenu-navbar">

                                        {this.state.myConnects.length > 0 && this.state.myConnects !== undefined ? (
                                            this.state.myConnects.map((value, key) => {
                                                return (
                                                    <li className="merritos-left-menulist hideList">
                                                        <div className="merritos-cell">
                                                            <div className="merritos-cell-text" onClick={() => this.showProfileDetails(value)}>
                                                                <div>
                                                                    {value.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + value.profileImage} className="merritos-left-menu-img" alt="..." />) : (
                                                                        <img alt="Remy Sharp" src={this.state.imageUrl} className="merritos-left-menu-noimg" />
                                                                    )}
                                                                </div>
                                                                <div className="profile-names-roles">
                                                                    <ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} />


                                                                </div>
                                                            </div>
                                                            <i className="material-icons " onClick={(e) => { this.chatOpen() }}>
                                                                chat_bubble_outline
                                                            </i>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        ) : (
                                                <div className="full-height full-width">
                                                    <div className="nolist-found connects-notfound">
                                                        <img src={this.state.robo} width="100px" />
                                                        <br />
                                                        <div className="no-jobslist">Connections not found</div>
                                                    </div>
                                                </div>
                                            )}
                                    </ul>
                                </ScrollArea>



                                <ConnectionsRequests connectadd={this.connectsAddFunc} notificationShow={this.notificationshowFunc} _this={this} />

                            </div>
                            <div>
                                <Card>

                                </Card>
                            </div>
                        </Col>

                        <Col md="9" className="layout-right layout-hide">

                            <Container className="mobileviewheight">
                                <Row className="mobileviewrowheight">
                                    <Col xs="6" sm="6" md="6">
                                        {this.state.singleProfile.length > 0 ? (

                                            <label className="merritos-sub-headerlabel-nm activity-label">
                                                <i className="material-icons back-from-profile" onClick={() => this.backtoActivitySearch()}>
                                                    keyboard_arrow_left
</i>
                                                <p className={classes.firstName}>{this.state.singleProfile[0].profile.firstName + "'s "}</p>&nbsp;profile
                                        </label>
                                        ) : this.state.myconnectionList > 0 ? (
                                            <label className="merritos-sub-headerlabel-nm activity-label">

                                                Activity
                                    </label>
                                        ) : (
                                                    <label className="merritos-sub-headerlabel-nm activity-label">
                                                        <i className="material-icons back-from-profile" onClick={() => this.backtoActivitySearch()}>
                                                            keyboard_arrow_left
</i>
                                                        <span>Connections</span>
                                                    </label>
                                                )}


                                    </Col>
                                    <Col xs="6" sm="6" md="6">
                                        <label className="connect-people-label" onClick={(e) => this.searchConnections(e)}>
                                            <i className="material-icons">
                                                add
                                                </i>
                                            Connect people
							            </label>
                                        <div className="jobs-searchbar-leftmenu classes-right-search">
                                            <input type="text" className="connection-search-bar" id="connection-search-bar" placeholder="search connections" />
                                            <i className="material-icons">search</i>
                                        </div>

                                    </Col>
                                </Row>
                                {this.state.singleProfile.length > 0 ? (
                                    <Row className="profile-row">
                                        <Col md="4" className="noPadding layout-left">
                                            <Card className="mobile-card-view mobile-disable profile-total-card" id="basic-info">
                                                <CardBody className="noPadding">
                                                    {this.state.singleProfile.length > 0 ? (
                                                        <section className="box-typical">
                                                            <div className="profile-card">
                                                                <div className="profile-card-image">
                                                                    {this.state.singleProfile[0].profile.profileImage !== undefined ? (<img src={BasePath + '/uploads/150/' + this.state.singleProfile[0].profile.profileImage} width="110px" />) : (
                                                                        <img src={this.state.imageUrl} width="110px" alt="..." />
                                                                    )}
                                                                </div>
                                                                <div className="profile-card-name">{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName}</div>
                                                                <div className="profile-card-status">{this.state.singleProfile[0].profile.role}</div>
                                                                <div className="profile-card-location">{this.state.singleProfile[0].profile.city}</div>
                                                                {window.location.hash.split('/')[2] !== undefined && (window.location.hash.split('/')[2]).toString() !== (this.state.userId).toString() ? (
                                                                    <div>
                                                                        <button type="button" className="btn btn-rounded btn-backround-fill btn-activtiy-profile" onClick={(e) => { this.chatOpen() }}>Chat</button>
                                                                        {this.state.btnAction == 'Request Pending' ? (
                                                                            <button type="button" className="btn btn-rounded btn-activtiy-profile">Request Pending</button>
                                                                        ) : this.state.btnAction == 'Confirm Request' ? (
                                                                            <button type="button" className="btn btn-rounded btn-activtiy-profile" onClick={(e) => this.acceptClick(e, this.state.singleProfile[0].profile, 1)}>Confirm Request</button>
                                                                        ) : this.state.btnAction == 'Disconnect' ? (
                                                                            <button type="button" className="btn btn-rounded btn-activtiy-profile" onClick={(e) => this.disconnectClick(e, this.state.singleProfile[0].profile, 1)}>Disconnect</button>
                                                                        ) : (
                                                                                        <button type="button" className="btn btn-rounded" onClick={(e) => this.ButtonClick(e, this.state.singleProfile[0].profile, 1)}>Connect</button>
                                                                                    )
                                                                        }
                                                                    </div>
                                                                ) : null}
                                                            </div>

                                                            <div className="profile-statistic tbl">
                                                                <div className="tbl-row connect-row">
                                                                    <div className="tbl-cell connects-tbl">
                                                                        {this.state.singleProfile[0].connections.length > 0 ? (<b>{this.state.singleProfile[0].connections.length}</b>) : (<b>0</b>)

                                                                        }
                                                                        <br />
                                                                        Connections
								                                    </div>
                                                                    <div className="tbl-cell">
                                                                        <b>{this.state.singleProfile[0].classes.length}</b><br />
                                                                        Classes
								                                     </div>
                                                                </div>
                                                            </div>
                                                            <article className="merritos-education-info">
                                                                <label className="merritos-sub-label">
                                                                    <i className="material-icons">
                                                                        school
</i>
                                                                    Education
							</label>
                                                                <ul className="exp-timeline">
                                                                    {this.state.singleProfile[0].profile.education.length > 0 ? (
                                                                        this.state.singleProfile[0].profile.education.map((value, index) => {
                                                                            return (<li className="exp-timeline-item">
                                                                                <div className="dot"></div>
                                                                                <div className="tbl">
                                                                                    <div className="tbl-row">
                                                                                        <div className="tbl-cell">
                                                                                            <div className="exp-timeline-range">{new Date(value.fromDate).getFullYear()} - {new Date(value.toDate).getFullYear()}</div>
                                                                                            <div className="exp-timeline-status">{value.universityName}</div>
                                                                                            <div className="exp-timeline-location">{value.fieldOfStudy}</div>
                                                                                        </div>
                                                                                        <div className="tbl-cell tbl-cell-logo">
                                                                                            <img src="img/logo-2.png" alt="" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </li>
                                                                            )
                                                                        })
                                                                    ) : (<span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName + "  didn't update any education details"}</span>)}
                                                                </ul>
                                                            </article>
                                                            <article className="merritos-education-info">
                                                                <label className="merritos-sub-label">
                                                                    <i className="material-icons">
                                                                        work
</i>
                                                                    Experience
							</label>
                                                                <ul className="exp-timeline">
                                                                    {this.state.singleProfile[0].profile.experience.length > 0 ? (
                                                                        this.state.singleProfile[0].profile.experience.map((value, index) => {
                                                                            return (<li className="exp-timeline-item">
                                                                                <div className="dot"></div>
                                                                                <div className="tbl">
                                                                                    <div className="tbl-row">
                                                                                        <div className="tbl-cell">
                                                                                            <div className="exp-timeline-range">{new Date(value.fromDate).getFullYear()} - {new Date(value.toDate).getFullYear()}</div>
                                                                                            <div className="exp-timeline-status">{value.companyName}</div>
                                                                                            <div className="exp-timeline-location">{value.designation}</div>
                                                                                        </div>
                                                                                        <div className="tbl-cell tbl-cell-logo">
                                                                                            <img src="img/logo-2.png" alt="" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            )
                                                                        })
                                                                    ) : (<span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName + " didn't update any work experience"} </span>)}

                                                                </ul>
                                                            </article>
                                                        </section>
                                                    ) : null}
                                                </CardBody>
                                            </Card>
                                            <Card className="mobile-card-view mobile-disable" id="connections-info">
                                                {this.state.singleProfile.length > 0 ? (
                                                    <CardBody>
                                                        <label className="merritos-sub-label-nm">
                                                            <i className="material-icons">
                                                                group
                                                            </i>
                                                            Connections
                                                            </label>
                                                        <ul className="connection-list-details">
                                                            {this.state.singleProfile[0].connections.length > 0 ? this.state.singleProfile[0].connections.map((value, index) => {
                                                                return (
                                                                    <li className="merritos-left-menulist" >
                                                                        <div className="merritos-cell">
                                                                            <div>
                                                                                {value.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + value.profileImage} className="merritos-left-menu-img" alt="..." />) : (
                                                                                    <img alt="Remy Sharp" src={this.state.imageUrl} className="merritos-left-menu-noimg" />
                                                                                )}

                                                                            </div>
                                                                            <div className="profile-names-roles">
                                                                                <ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} onClick={() => this.showProfileDetails(value)} />
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            }) : (
                                                                    <li className="summary-body"> <span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName + " have 0 Connections"}</span></li>
                                                                )}
                                                        </ul>
                                                    </CardBody>
                                                ) : null}
                                            </Card>
                                            <Card className="mobile-card-view mobile-disable" id="classes-info">
                                                {this.state.singleProfile.length > 0 ? (
                                                    <CardBody >
                                                        <label className="merritos-sub-label-nm">
                                                            <i class="material-icons">
                                                                airplay
                                                        </i>
                                                            Classes
							                                </label>
                                                        <ul className="connection-list-details">
                                                            {this.state.singleProfile[0].classes.length > 0 ? this.state.singleProfile[0].classes.map((value, index) => {
                                                                return (
                                                                    value.scheduleCourse.length > 0 ? value.scheduleCourse.map((val, index) => {
                                                                        return (
                                                                            <li className="merritos-left-menulist" >
                                                                                <div className="merritos-cell">
                                                                                    <div className="profile-names-roles">
                                                                                        <ListItemText primary={val.courseName} secondary={value.role} />
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    }) : (<li className="summary-body">
                                                                        <span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName + "  didnt join any classes yet"}</span>
                                                                    </li>)
                                                                )
                                                            }) : (
                                                                    <li className="summary-body">
                                                                        <span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName + "  didnt join any classes yet"}</span>
                                                                    </li>
                                                                )}
                                                        </ul>
                                                    </CardBody>
                                                ) : null}
                                            </Card>
                                        </Col>
                                        <Col md="8" className="layout-right-content">
                                            <div className="mobile-card-view mobile-disable mobile-right-activity" id="activity-info">
                                                <Card className="nm profile-total-card">
                                                    <CardBody className="noPadding summary-label">
                                                        <label className="merritos-sub-label-nm">

                                                            <i className="material-icons">
                                                                assignment
                                                            </i>
                                                            Summary
							                            </label>
                                                        <div className="summary-body">
                                                            {this.state.singleProfile[0].profile.summary !== "" ?
                                                                (<span>{this.state.singleProfile[0].profile.summary}</span>
                                                                ) :
                                                                (<span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName + "  didn't add any summary"}</span>)}

                                                        </div>
                                                        <label className="merritos-sub-label-nm">
                                                            <i class="material-icons">
                                                                query_builder
                                                        </i>
                                                            Activity
                                                        </label>
                                                        {this.state.hisActivity.length > 0 ? this.state.hisActivity.map((value, index) => {
                                                            return (
                                                                <Card className={'nbg-color ' + classes.rightcontainerjobsActivity}>
                                                                    <CardBody className='noPadding jobs-card-div'>
                                                                        <div className="jobs-activity-date">
                                                                            {this.dateLongStr(new Date(value.date))}
                                                                            <div className="jobs-timeline-border"></div>
                                                                        </div>
                                                                        <div className="profile-activity-container">
                                                                            {value.todayActivity.map((val, key) => {
                                                                                return (
                                                                                    <div className="todayactivity-container">
                                                                                        {/* <div className="jobs-activity-header">
                                                                                            <div className="ativity-header-img">
                                                                                                {val.profileImage !== '' && val.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.profileImage} className='applied-candidates-details-img' />) : (<img src={dummyimg} className='applied-candidates-details-img' />)}
                                                                                            </div>
                                                                                            <div className="applied-job">
                                                                                                <div onClick={() => this.showProfileDetails(val, 'profile')}>{val.name}</div>
                                                                                                <p>{val.role}</p>
                                                                                            </div>
                                                                                        </div> */}
                                                                                        {val.activity.map((val, key) => {
                                                                                            val.userId === this.state.userId ? (val.Name = 'You') : (val.Name = val.Name)
                                                                                            val.Data[0].userId === this.state.userId ? (val.Data[0].profileName = 'You') : (val.Data[0].profileName = val.Data[0].profileName)
                                                                                            return (
                                                                                                val.type == 'profile' ? (
                                                                                                    <Container>
                                                                                                        {/* <Row className="jobs-activity-row">
                                                                                                            <Col xs="2" sm="2" md="2" className="jobs-activity-col-1">
                                                                                                                <div className="activity-time">{val.time}</div>
                                                                                                            </Col>
                                                                                                            <Col xs="3" sm="3" md="1" className="profile-wall-col-2">
                                                                                                                {val.Data[0].profileImage !== '' && val.Data[0].profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.Data[0].profileImage} className='jobs-activity-img' />) : (<img src={dummyimg} className='jobs-activity-img' />)}
                                                                                                            </Col>
                                                                                                            <Col xs="7" sm="7" md="9" className='classes-activity-col-3'>
                                                                                                                <div onClick={() => this.showProfileDetails(val, 'users')}>
                                                                                                                    {val.Data[0].profileName}
                                                                                                                </div>
                                                                                                                <p>{val.Data[0].role}</p>
                                                                                                                <label>{val.typeOfActivity}</label>
                                                                                                                <ul className="jobs-activity-likes">
                                                                                                                    <li><a>0 Comments</a></li>
                                                                                                                    <li><a>0 Likes</a></li>
                                                                                                                </ul>
                                                                                                            </Col>
                                                                                                        </Row> */}
                                                                                                        {val.typeOfActivity === "sent connection request" ? (
                                                                                                            <ListItem>
                                                                                                                {val.profileImage !== '' && val.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.profileImage} className="jobs-left-menu-img" />) :
                                                                                                                    (<img src={dummyimg} className="jobs-activity-noimg" />)}
                                                                                                                <ListItemText primary={<div><span className='activity-name' onClick={() => this.showProfileDetails(val, 'profile')}>
                                                                                                                    {val.Name}</span>&nbsp;<span>{val.typeOfActivity}</span>&nbsp;{"to "}
                                                                                                                    <span className='activity-name' onClick={() => this.showProfileDetails(val, 'users')}>
                                                                                                                        {val.Data[0].profileName}</span></div>} secondary={val.time} />
                                                                                                            </ListItem>
                                                                                                        ) : (
                                                                                                                <ListItem>
                                                                                                                    {val.profileImage !== '' && val.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.profileImage} className="jobs-left-menu-img" />) :
                                                                                                                        (<img src={dummyimg} className="jobs-activity-noimg" />)}
                                                                                                                    <ListItemText primary={<div><span className='activity-name' onClick={() => this.showProfileDetails(val, 'profile')}>
                                                                                                                        {val.Name}</span>&nbsp;<span>{val.typeOfActivity}</span>&nbsp;{"from "}
                                                                                                                        <span className='activity-name' onClick={() => this.showProfileDetails(val, 'users')}>
                                                                                                                            {val.Data[0].profileName}</span></div>} secondary={val.time} />
                                                                                                                </ListItem>
                                                                                                            )}
                                                                                                    </Container>
                                                                                                ) : null
                                                                                            );
                                                                                        })}
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            );

                                                        }) : <div className="full-height full-width">
                                                                <div className="jobs-noactivity profile-noactivity">
                                                                    <i class="material-icons">access_time</i>
                                                                    <h4>No activity found yet</h4>
                                                                </div>
                                                            </div>}
                                                    </CardBody>
                                                </Card>

                                            </div>
                                        </Col>
                                    </Row>
                                ) : (
                                        <Row>
                                            <Col md='12' className='jobs-activity-col'>
                                                {this.state.myActivity && this.state.myActivity.length > 0 && this.state.myconnectionList > 0 ? (
                                                    this.state.myActivity.map((value, index) => {
                                                        return (
                                                            <Card className={'nbg-color ' + classes.jobsActivity}>
                                                                <CardBody className='noPadding jobs-card-div'>
                                                                    <div className="jobs-activity-date">
                                                                        {this.dateLongStr(new Date(value.date))}
                                                                        <div className="jobs-timeline-border"></div>
                                                                    </div>
                                                                    <div className="jobs-activity-container">
                                                                        {value.todayActivity.map((val, key) => {

                                                                            return (
                                                                                <div className="todayactivity-container">
                                                                                    {/* <div className="jobs-activity-header">
                                                                                            <div className="ativity-header-img">
                                                                                                {val.profileImage !== '' && val.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.profileImage} className='applied-candidates-details-img' />) : (<img src={dummyimg} className='applied-candidates-details-img' />)}
                                                                                            </div>
                                                                                            <div className="applied-job">
                                                                                                <div onClick={() => this.showProfileDetails(val, 'profile')}>{val.name}</div>
                                                                                                <p>{val.role}</p>
                                                                                            </div>
                                                                                        </div> */}
                                                                                    {val.activity.map((val, key) => {
                                                                                        val.userId === this.state.userId ? (val.Name = 'You') : (val.Name = val.Name)
                                                                                        val.Data[0].userId === this.state.userId ? (val.Data[0].profileName = 'You') : (val.Data[0].profileName = val.Data[0].profileName)
                                                                                        return (
                                                                                            val.type == 'profile' ? (
                                                                                                <Container>
                                                                                                    {val.typeOfActivity === "sent connection request" ? (
                                                                                                        <ListItem>
                                                                                                            {val.profileImage !== '' && val.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.profileImage} className="jobs-left-menu-img" />) :
                                                                                                                (<img src={dummyimg} className="jobs-activity-noimg" />)}
                                                                                                            <ListItemText primary={<div><span className='activity-name' onClick={() => this.showProfileDetails(val, 'profile')}>{val.Name}</span>&nbsp;&nbsp;<span>{val.typeOfActivity}</span>{" " + "to" + " "}<span className='activity-name' onClick={() => this.showProfileDetails(val, 'users')}>{val.Data[0].profileName}</span></div>} secondary={val.time} />
                                                                                                        </ListItem>
                                                                                                    ) : (
                                                                                                            <ListItem>
                                                                                                                {val.profileImage !== '' && val.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.profileImage} className="jobs-left-menu-img" />) :
                                                                                                                    (<img src={dummyimg} className="jobs-activity-noimg" />)}
                                                                                                                <ListItemText primary={<div><span className='activity-name' onClick={() => this.showProfileDetails(val, 'profile')}>{val.Name}</span>&nbsp;&nbsp;<span>{val.typeOfActivity}</span>{" " + "from" + " "}<span className='activity-name' onClick={() => this.showProfileDetails(val, 'users')}>{val.Data[0].profileName}</span></div>} secondary={val.time} />
                                                                                                            </ListItem>
                                                                                                        )}

                                                                                                    {/* <Col xs="2" sm="2" md="1" className="jobs-activity-col-1">
                                                                                                                <div className="activity-time">{val.time}</div>
                                                                                                            </Col>
                                                                                                            <Col xs="3" sm="3" md="1" className="jobs-activity-col-2">
                                                                                                                {val.Data[0].profileImage !== '' && val.Data[0].profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.Data[0].profileImage} className='jobs-activity-img' />) : (<img src={dummyimg} className='jobs-activity-img' />)}
                                                                                                            </Col>
                                                                                                            <Col xs="7" sm="7" md="10" className='classes-activity-col-3'>
                                                                                                                <div onClick={() => this.showProfileDetails(val, 'users')}>
                                                                                                                    {val.Data[0].profileName}
                                                                                                                </div>
                                                                                                                <p>{val.Data[0].role}</p>
                                                                                                                <label>{val.typeOfActivity}</label>
                                                                                                                <ul className="jobs-activity-likes">
                                                                                                                    <li><a>0 Comments</a></li>
                                                                                                                    <li><a>0 Likes</a></li>
                                                                                                                </ul>
                                                                                                            </Col> */}

                                                                                                </Container>
                                                                                            ) : null
                                                                                        );
                                                                                    })}
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </CardBody>
                                                            </Card>

                                                        )

                                                    }
                                                    )
                                                ) : (
                                                        <div className="full-width">
                                                            {this.state.myconnectionList > 0 ? (
                                                                <div className="jobs-noactivity">
                                                                    <i class="material-icons">access_time</i>
                                                                    <h5>No activity found yet</h5>
                                                                </div>
                                                            ) : null}
                                                            <Container>
                                                                <h4 style={this.state.searchTab ? {} : { display: 'none' }} className="related-jobs connection-sub-title">Search result</h4>
                                                                {this.state.searchTab ? (
                                                                    this.state.searchPeople.length > 0 ? (
                                                                        <Row className=" search-contact-row">
                                                                            {this.state.searchPeople.length > 0 ? this.state.searchPeople.map((value, index) => {
                                                                                return (
                                                                                    <Col md="3" className="search-contact-tiles jobs-custom-row">
                                                                                        <Card className={classes.connectionsCard}>
                                                                                            <CardBody className="noPadding">
                                                                                                <div className="contact-info" onClick={() => this.showProfileDetails(value)} >
                                                                                                    <div className="profilePic-border">
                                                                                                        {value.profileImage !== undefined ? (<img src={BasePath + '/uploads/150/' + value.profileImage} width="100%" />) : (
                                                                                                            <img src={this.state.imageUrl} width="100%" alt="..." />
                                                                                                        )}
                                                                                                    </div>
                                                                                                    <div className="contact-details">
                                                                                                        <div className="contact-name">
                                                                                                            <label>{value.firstName} {value.lastName}</label>
                                                                                                            <p>{value.role}</p>
                                                                                                        </div>
                                                                                                        <div className="contact-connect">
                                                                                                            {value.requestIds.indexOf(this.state.userId) != -1 ? (
                                                                                                                <button className="connect-detail-btn">Request Pending</button>
                                                                                                            ) : value.sentrequestIds.indexOf(this.state.userId) != -1 ? (
                                                                                                                <button className="connect-detail-btn" onClick={(e) => this.acceptClicks(e, value, index)}>Confirm Request</button>
                                                                                                            ) : value.acceptIds.indexOf(this.state.userId) != -1 ? (
                                                                                                                <button className="connect-detail-btn" onClick={(e) => this.disconnectClicks(e, value, index)}>Disconnect</button>
                                                                                                            ) : (
                                                                                                                            <button className="connect-detail-btn" onClick={(e) => this.ButtonClicks(e, value, index)}>+</button>
                                                                                                                        )
                                                                                                            }
                                                                                                            {/*<i className="material-icons">
                                                                                                    error_outline
                                                                                                </i>*/}

                                                                                                        </div>
                                                                                                    </div>

                                                                                                </div>

                                                                                            </CardBody>
                                                                                        </Card>
                                                                                    </Col>
                                                                                )
                                                                            }) : null}

                                                                            {/* <div>
                                                                    {this.state.searchPeople.length > 3 ? (
                                                                        <div className="next-col-list" >
                                                                            <i className="material-icons">keyboard_arrow_right</i>
                                                                        </div>
                                                                    ) : null}
                                                                    {this.state.prev > 0 ? (
                                                                        <div className="prev-col-list" >
                                                                            <i className="material-icons">keyboard_arrow_left</i>
                                                                        </div>
                                                                    ) : null}
                                                                </div> */}
                                                                        </Row>
                                                                    ) : (
                                                                            <div className="full-width">
                                                                                <div className="nolist-found no-list-job">
                                                                                    <img src={this.state.robo} width="100px" />
                                                                                    <br />
                                                                                    <div>No search results found</div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                ) : null}

                                                                {this.state.peoplemayyouknow && this.state.peoplemayyouknow.length > 0 ? (
                                                                    <h4 className="related-jobs connection-sub-title">People you may know</h4>
                                                                ) : null}

                                                                <Row className="search-contact-row">
                                                                    {this.state.peoplemayyouknow && this.state.peoplemayyouknow.length > 0 ? this.state.peoplemayyouknow.map((value, index) => {
                                                                        return (
                                                                            <Col md="3" className="jobs-custom-row">
                                                                                <Card className={classes.connectionsCard}>
                                                                                    <CardBody className="noPadding">
                                                                                        <div className="contact-info" onClick={() => this.showProfileDetails(value)} >
                                                                                            <div className="profilePic-border">
                                                                                                {value.profileImage !== undefined ? (<img src={BasePath + '/uploads/150/' + value.profileImage} width="100%" />) : (
                                                                                                    <img src={this.state.imageUrl} width="100%" alt="..." />
                                                                                                )}
                                                                                            </div>
                                                                                            <div className="contact-details">

                                                                                                <div className="contact-name">
                                                                                                    <label>{value.firstName} {value.lastName}</label>
                                                                                                    <p>{value.role}</p>
                                                                                                </div>

                                                                                                <div className="contact-connect">
                                                                                                    <button className="connect-detail-btn" onClick={(e) => this.ButtonClicks(e, value, index)}>+</button>
                                                                                                </div>


                                                                                            </div>

                                                                                        </div>


                                                                                    </CardBody>
                                                                                </Card>
                                                                            </Col>
                                                                        )
                                                                    }) : null}
                                                                    {/* {this.state.peoplemayyouknow && this.state.peoplemayyouknow.length < 1 && this.state.searchPeople.length < 1 ? (
                                                            <div className="full-height full-width">
                                                                <div className="nolist-found">
                                                                    <img src={this.state.robo} width="100px" />
                                                                    <br />
                                                                    <div className="no-jobslist">No activity found.</div>
                                                                </div>
                                                            </div>
                                                        ) : null} */}
                                                                    {/* {this.state.searchPeople.length > 0 ? (
                                                            <div>
                                                                {this.state.peoplemayyouknow && this.state.peoplemayyouknow.length > 3 ? (
                                                                    <div className="next-col-list" >
                                                                        <i className="material-icons">keyboard_arrow_right</i>
                                                                    </div>
                                                                ) : null}
                                                                {this.state.prev > 0 ? (
                                                                    <div className="prev-col-list" >
                                                                        <i className="material-icons">keyboard_arrow_left</i>
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        ) : null} */}

                                                                </Row>
                                                            </Container>
                                                        </div>
                                                    )}
                                            </Col>
                                        </Row>
                                    )}
                            </Container>
                        </Col>


                    </Row>
                </Container>
                {this.state.singleProfile.length > 0 ? (
                    <div className="mobile-view-port">
                        <BottomNavigation
                            showLabels
                            className={"merritos-bottomnav " + classes.bottomNav}
                        >
                            <BottomNavigationAction label="Info" icon={<i className="material-icons"> perm_identity</i>} onClick={(e) => this.mobileTabs(e, '#basic-info')} id='viewOne' />
                            <BottomNavigationAction label="Connections" icon={<i className="material-icons">people_outline</i>} onClick={(e) => this.mobileTabs(e, '#connections-info')} />
                            <BottomNavigationAction label="Classes" icon={<i className="material-icons">laptop</i>} onClick={(e) => this.mobileTabs(e, '#classes-info')} />
                            <BottomNavigationAction label="Activity" icon={<i className="material-icons"> assignment_ind</i>} onClick={(e) => this.mobileTabs(e, '#activity-info')} />
                        </BottomNavigation>
                    </div>
                ) : null}
            </div>

        );
    }
}

Connections.propTypes = {
    classes: PropTypes.object.isRequired,
};
const connectionsRes = state => ({
    myConnects: state.connections.myConnects,
    myClasses: state.connections.connectClasses,
    myActivity: state.connections.myActivity,
    peopleYoyMayKnow: state.connections.peopleYoyMayKnow,
    profileData: state.profile.profileData,
    componentupdate: state.connections.componentupdate,
});


export default connect(connectionsRes, { loaderfalse, getMyConnects, fetchprofileData, getMyActivity, getMyConnectionsList })(withStyles(styles, { withTheme: true })(Connections));