import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import robo from 'assets/img/broken-robot.png';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import dummyimg from 'assets/img/default-avatar.png';
import CardFooter from "components/Card/CardFooter.jsx";
//icons
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Container, Row, Col } from 'reactstrap';
import { getClassesList, getMyClassesList, getCoursesList, getClassActivity } from "../../actions/Classes";
import { buyCourse, trainersUnmount } from "../../actions/Trainers";
import { fetchprofileData } from "../../actions/Profileactions";
import avatarImg from "assets/img/usericon.png";
import Clock from '../Dashboard/clock.jsx';
import $ from "jquery";
import ScrollArea from 'react-scrollbar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Media, Player, controls } from 'react-media-player'
import Modal from '@material-ui/core/Modal';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import classNames from 'classnames';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import amber from '@material-ui/core/colors/amber';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { loaderfalse } from '../../actions/Loader';
import CreateSchedule from "../Pages/CreateSchedule.jsx";

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
    bottomNav: {
        top: 'auto',
        bottom: 0,
        position: 'fixed',
        width: '100%',
        left: 0,
        borderTop: "solid 1px #999",
        marginTop: 0,
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
const { PlayPause,
    CurrentTime,
    Progress,
    SeekBar,
    Duration,
    MuteUnmute,
    Volume,
    Fullscreen, } = controls

function Videoplayer({ src }) {
    return (
        <div tabIndex="-1" className="videoplayer">
            <video className="videodisplay" controls src={BasePath + '/' + src}>
            </video>
        </div>
    );
};

function Iframe({ src }) {
    return (
        <div tabIndex="-1" className="videoplayer">
            <iframe className="videodisplay" src={src} />
        </div>
    );
};

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 4, paddingRight: 20 }}>
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
        borderRadius: '6px',
    },
    tabroot: {
        backgroundColor: theme.palette.background.paper
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
    cardmargin: {
        paddingTop: 0,
        marginTop: '30px',
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
    imageCard: {
        height: "100px",
        width: "100px",
        borderRadius: "50px"
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
        height: "48px",
        width: "48px",
        borderRadius: "50px"
    },
    label: {
        textTransform: 'none',
        fontWeight: '800',
        textColorPrimary: '#3677b5',
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
    buttonclock: {
        margin: theme.spacing.unit / 2,
        backgroundColor: "#1f91f3 !important",
        color: "#fff !important",
        borderRadius: "5px",
        textTransform: "none",
        '& p': {
            paddingTop: 0,
            background: '#1f91f3 !important',
        },
    },
    grid: {
        [theme.breakpoints.down('xs')]: {
            marginTop: "20px"
        }
    },
    gridList: {
        '& label': {
            fontSize: '16px',
        }
    },
    gridListItem: {
        '& span': {
            fontSize: '18px',
            fontFamily: "'Titillium Web', Helvetica, Arial, sans-serif",
            fontWeight: 'bold'
        },
        '& label': {
            fontSize: '16px',
        }
    },
    button: {
        margin: theme.spacing.unit / 2,
        backgroundColor: "#1f91f3 !important",
        color: "#fff !important",
        borderRadius: "5px",
        textTransform: "none"
    },
    buttonStudent: {
        margin: '0px !important',
        padding: '0px 60px !important',
    },
    rating: {
        color: '#0094DA'
    },
    indicator: {
        backgroundColor: '#0094DA',
        color: '#0094DA'
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
    tabContainer: {
        boxShadow: '3px 3px 10px #777',
        marginTop: '10px',
        backgroundColor: '#F9F9F9',
        minHeight: '400px'
    },
    chip: {
        margin: theme.spacing.unit,
        fontSize: '14px',
        fontWeight: '300',
    },

    appheader: {
        display: '-webkit-inline-box',
    },
    navhighlight: {
        background: '#eae8e8'
    },
    mobilecard: {
        [theme.breakpoints.down('xs')]: {
            display: 'none !important',
        }
    },
    studenttile: {
        border: '1px solid rgba(0, 0, 0, 0.09)',
        borderRadius: '3px',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
        width: 'auto !important',
        margin: '3px',
        '& li': {
            padding: '5px 5px',
            textAlign: 'center',
            verticalAlign: 'middle',
            alignItems: 'center',
        }
    },
    studentflot: {
        float: 'left',
    },
    cardList: {
        marginBottom: '0px !important'
    },
    cardListstudent: {
        padding: '0 !important',
        float: 'left',
        margin: '0 15px',
    },
    listBorder: {
        padding: 0,

        '& img': {
            width: '100%'
        }
    },
    classSearch: {
        padding: '10px'
    },
    statscust: {
        marginTop: '0px',
    },
    buttoncustom: {
        color: '#ffffff !important',
    },
    header: {
        margin: 0,
        lineHeight: '24px',
        padding: '0 7px',
    },
    classmentorname: {
        fontSize: '14px',
        color: '#2196f3',
        float: 'right',
        paddingRight: '15px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '-11px',
            paddingTop: '5px',
        }
    },
    scroll: {
        maxHeight: '35vh',
        overflow: 'auto',
    },
    materialIcons: {
        position: 'relative !important',
        left: '112px',
        marginTop: '15px',
        color: '#2196f3',
    },
    searchbox: {
        width: '33% !important',
        float: 'right',
        [theme.breakpoints.down('xs')]: {
            width: '100% !important',
            marginTop: '5px'
        }
    },
    heading: {
        padding: '25px',
    },
    classheading: {
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#5d5d5d',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '10px !important',
            fontSize: '14px'
        }
    },
    customtile: {
        height: '263px !important',
        [theme.breakpoints.down('xs')]: {
            height: '234px !important',
        }
    },
    customdates: {
        border: '0px',
        padding: 0,
        margin: '1px',
        fontWeight: '100 !important',
    },
    pointer: {
        cursor: 'pointer',
    },
    media: {
        display: 'block',
    },
    mediaplayer: {
        background: '#000000',
    },
    mediacontrols: {
        background: '#000000',
        height: '45px',
    },
    classbody: {
        minHeight: '100%',
    },
    defaultbody: {
        paddingTop: '15px',
    },
    backArrowActivity: {
        height: '25px'
    },
    classActivity: {
        marginTop: '0px !important',
        [theme.breakpoints.down('xs')]: {
            marginTop: '43px !important',
        }
    },
    activityContainer: {
        maxWidth: '73% !important',
        padding: '0 15px',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100% !important'
        }
    }
});

class Classes extends React.Component {
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
            singleProfile: '',
            myClassesList: [],
            classesList: [],
            coursesList: [],
            classActivity: [],
            searchCoursesList: [],
            open: false,
            scheduleOpen: false,
            scheduleText: '',
            demoOpen: false,
            myclassSearch: '',
            courseSearch: '',
            recordings: '',
            demoVideo: "uploads/demo.mp4",
            classVideo: '',
            classRecordingOpen: false,
            classes: true,
            searchquery: false,
            showActivity: false,
            classOpen: false
        }

        if (!this.state.userId) {
            this.props.history.push('/');
        }
        this.notificationshowFunc = this.notificationshowFunc.bind(this);
    }
    dateLongStr(date) {
        const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        const month = mS[date.getMonth()];
        const dt = date.getDate();
        const year = date.getFullYear();
        return dt + " " + month + " " + year;
    }
    componentDidMount() {
        if (this.props.location.state && this.props.location.state.text === 'find') {
            this.findclasses();
        }
        let data = { userId: this.state.userId }
        this.props.fetchprofileData(this.state.userId);
        this.props.getClassesList(this.state.userId);
        this.props.getMyClassesList(this.state.userId);
        this.props.getClassActivity(this.state.userId);
        this.props.getCoursesList(data);
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.classBuyInfo) {
            this.props.coursesList.map((item, key) => {
                if (item.schedule.scheduleId === nextprops.classBuyInfo.scheduleId) {
                    this.props.coursesList.splice(key, 1)
                }
            })
            this.props.myClassesList.push(nextprops.classBuyInfo.result);
            this.setState({ searchCoursesList: nextprops.searchcourses })
            this.setState({ notification: "Thanks for buying course" });
            this.setState({ color: "success" });
            this.showNotification('br');
        } else if (nextprops.error) {
            this.setState({ notification: nextprops.error.message });
            this.setState({ color: "error" });
            this.showNotification('br');
        } else if (nextprops.classActivityList) {
            this.setState({ myClassesList: nextprops.myClassesList });
            this.setState({ classActivity: nextprops.classActivityList });
            this.setState({ coursesList: nextprops.coursesList });
            this.setState({ searchCoursesList: nextprops.searchcourses });
            if (this.props.profileData[0].isCoach === "yes") {
                this.setState({ classesList: nextprops.classesList });
            }
        }
        this.props.trainersUnmount();
    }

    shouldComponentUpdate(nextprops) {
        return nextprops.componentupdate
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
    handleProfilewall = (val, key, type) => {
        let th = this;
        this.setState({ loginId: th.state.userId });
        this.props.history.push({
            pathname: '/Connections/' + val,
            state: {
                loginId: th.state.userId,
                connectId: val
            }
        })
    }
    showProfileDetails(value, key) {
        let th = this;
        this.setState({ recordings: "" });
        this.setState({ singleProfile: value });
        this.setState({ searchCoursesList: [] });
        setTimeout(function () {
            $('#viewOne').trigger('click');
        });

        fetch(BasePath + '/classrecordings/' + value.scheduleId, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(response => {
                if (response.length === 1) {
                    th.setState({ recordings: response.info });
                }
            })
    }
    fullscreen = (e) => {
        alert(5);
        $('#joinClass').addClass('fullscreenDisplay')
    }
    joinClass = () => {
        let th = this;
        let data = { scheduleId: this.state.singleProfile.scheduleId, userName: th.props.profileData[0].firstName + th.props.profileData[0].lastName, type: this.state.singleProfile.courseType };
        fetch(BasePath + '/joinclass', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {
                if (serdata.length === 1) {
                    const h = $('.heightCal').height();
                    // alert(h);
                    // $('#joinClass').html("<iframe src='"+serdata.url+"' ></iframe>")
                    window.open(serdata.url)
                }
                else {
                    if(serdata.length === 3){
                        th.setState({ notification: serdata.message });
                        th.setState({ color: 'error' });
                        th.showNotification('br');
                    }
                    else{
                    th.setState({ notification: "Server not connected. Try again later" });
                    th.setState({ color: 'error' });
                    th.showNotification('br');
                    }
                }
            }).catch((err) => {
                th.setState({ notification: err.message });
                th.setState({ color: 'error' });
                th.showNotification('br');
            })
    }
    notificationshowFunc(notification, color) {
        this.setState({ notification: notification });
        this.setState({ color: color });
        this.showNotification('br');
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleTabChange = (event, value) => {
        this.setState({ tabValue: value });
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    chatOpen() {
        this.props.history.push('/underconstruction');
    }
    handleMyClassSearch = (e) => {
        let mySearchClass = []
        if (e != '') {
            this.props.myClassesList.map(item => {
                if ((item.courseName).toUpperCase().search((e).toUpperCase()) >= 0) {
                    mySearchClass.push(item);
                }
            })
            this.setState({ myClassesList: mySearchClass });
        } else {
            this.setState({ myClassesList: this.props.myClassesList });
        }
    };
    handleTeachingSearch = (event) => {
        let teachingSearchClass = [];
        if (event.target.value) {
            this.props.classesList.map(item => {
                if ((item.courseName).toUpperCase() === (event.target.value).toUpperCase()) {
                    teachingSearchClass.push(item);
                }
            })
            this.setState({ classesList: teachingSearchClass });
        } else {
            this.setState({ classesList: this.props.myClassesList });
        }
    };
    handleJoinClassButton = () => {
        this.setState({ singleProfile: '' });
        this.setState({ recordings: '' });
    };

    handelCreateClassButton = () => {
        this.setState({ open: true });
    };
    onCloseModal = () => {
        this.setState({ open: false });
    };
    handelBuyCourse = (course) => {
        let data = { userId: this.state.userId, scheduleId: course.schedule.scheduleId, mentorId: course.mentorId };
        this.props.buyCourse(data);
    }
    stepChangeFunc = (notification, color) => {
        this.setState({ notification: notification });
        this.setState({ color: color });
        this.showNotification('br');
    }
    onError = () => {
        this.setState({ notification: "Transaction declined due to techincal reason" });
        this.setState({ color: 'danger' });
        this.showNotification('br');
    }
    onCancel = () => {
        this.setState({ notification: "Transaction cancled" });
        this.setState({ color: 'danger' });
        this.showNotification('br');
    }
    handleDialogClose = () => {
        this.setState({ open: false });
    };
    handelScheduleDialogOpen = (course) => {
        this.setState({ scheduleText: course.schedule.syllabus });
        this.setState({ scheduleOpen: true });
    };
    handelScheduleDialogClose = () => {
        this.setState({ scheduleText: '' });
        this.setState({ scheduleOpen: false });
    };
    handelDemoDialogOpen = () => {
        this.setState({ demoOpen: true });
    };
    handelDemoDialogClose = () => {
        this.setState({ demoOpen: false });
    };
    searchclasses = (e) => {
        if (e === null || e === "") {
            this.setState({ searchquery: false });
        } else {
            this.setState({ searchquery: true });
        }
        let data = { userId: this.state.userId, searchtext: e };
        this.props.getCoursesList(data);
    };
    onOpenModal = (t) => {
        if (t == 'p') {
            this.setState({ open: true });
        }
        else {
            this.props.history.push({
                pathname: '/Classes',
                state: {
                    text: 'find'
                }
            });
        }
    };
    mobileTabs = (e, id) => {
        if (id == '#activity-info') {
            $('.layout-left').hide();
            $('.profile-row').hide();
        } else {
            $('.layout-left').show();
            $('.profile-row').show();
        }
        $(e.target).closest('ul').find('li').removeClass('activeTab-activity');
        $(e.target).closest('li').addClass('activeTab-activity');
        $('.mobile-card-view').addClass('mobile-disable');
        $(id).removeClass('mobile-disable');
    }
    myclasskeydownHandler = (e) => {
        if (e.key === 'Enter') {
            this.handleMyClassSearch();
        }
    }
    backtoActivity = () => {
        this.setState({ singleProfile: "" });
        this.setState({ searchquery: false });
        $('.profile-row').show();
    };
    handelClassRecordingOpen = (val) => {
        this.setState({ classVideo: val.playback.format.url })
        this.setState({ classRecordingOpen: true })
    };
    handelClassRecordingClose = () => {
        this.setState({ classVideo: '' })
        this.setState({ classRecordingOpen: false })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ br: false });
    };
    findclasses = () => {
        this.setState({ singleProfile: '' });
        this.setState({ classes: false });
    };
    handleActivityBack = () => {
        this.setState({ searchCoursesList: [] });
        this.setState({ classes: true });
        this.setState({ searchquery: false });
    };
    handelViewClass = (val) => {
        if (this.props.classesList.filter(e => { return e.scheduleId === val.scheduleId }).length > 0) {
            this.showProfileDetails(this.props.classesList.filter(e => { return e.scheduleId === val.scheduleId })[0], 0)
        } else if (this.props.myClassesList.filter(e => { return e.scheduleId === val.scheduleId }).length > 0) {
            this.showProfileDetails(this.props.myClassesList.filter(e => { return e.scheduleId === val.scheduleId })[0], 0)
        } else {
            let th = this;
            this.setState({ recordings: "" });
            fetch(BasePath + '/singleclassdata/' + val.mentorUserId + '/' + val.scheduleId, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then((resp) => resp.json()) // Transform the data into json
                .then(response => {
                    if (response.length === 1) {
                        th.setState({ singleProfile: response.result });
                        $('#viewOne').trigger('click');
                    }
                })
        }
    };
    handleCreateClass = () => {
        this.setState({ classOpen: true });
    }
    handleClassClose = () => {
        this.setState({ classOpen: false });
    }
    componentDidUpdate() {
        this.props.loaderfalse(window.location.hash.split('#')[1]);
    }
    render() {
        const { open } = this.state;
        const { classes, theme } = this.props;
        const client = {
            sandbox: 'AQnNPdq8rAEzPmSK4jE-9UdfUvOA4N9BVMZaCKVjfAU7tGwhKyXEVBQGxQuiiE4b2-Tl63yHwAmILw0L',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
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
                                <label className="label-title">Enrolled classes</label>
                                {/*  <i className="material-icons searchbar-leftmenuarrow">
                                    arrow_drop_down
                    </i>*/}
                                <div className="searchbar-leftmenu">
                                    <input type="text" placeholder="search your classes" onChange={(event) => this.handleMyClassSearch(event.target.value)} />
                                    <i className={"material-icons " + classes.pointer}>search</i>
                                </div>
                                <ScrollArea
                                    speed={0.8}
                                    className="connection-scroll-area"
                                    contentClassName="content"
                                    horizontal={false}>
                                    <ul className="leftmenu-navbar">
                                        {this.state.myClassesList.length > 0 && this.state.myClassesList !== undefined ? (
                                            this.state.myClassesList.map((value, key) => {
                                                return (
                                                    <li key={key} className="merritos-left-menulist hideList">
                                                        <div className="merritos-cell">
                                                            <div className="merritos-cell-text" onClick={() => this.showProfileDetails(value, key)}>
                                                                <div>
                                                                    {value.mentorImage !== undefined ? (<img src={BasePath + '/uploads/20/' + value.mentorImage} className="merritos-left-menu-img" alt="..." />) : (
                                                                        <img alt="Remy Sharp" src={this.state.imageUrl} className="merritos-left-menu-noimg" />
                                                                    )}
                                                                </div>
                                                                <div className="profile-names-roles">
                                                                    <ListItemText primary={value.courseName} secondary={value.startDate} />
                                                                </div>
                                                            </div>
                                                            <i className="material-icons" onClick={(e) => { this.chatOpen() }}>chat_bubble_outline</i>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        ) : (
                                                <div className="full-height full-width">
                                                    <div className="nolist-found classes-norecording">
                                                        <img src={this.state.robo} width="100px" />
                                                        <br />
                                                        <div className="no-jobslist">No enrolled classes to show</div>
                                                    </div>
                                                </div>
                                            )}
                                    </ul>
                                </ScrollArea>
                                {this.props.profileData[0].isCoach === "yes" ? (
                                    <div className="merritos-left-menutraining">
                                        <label className="label-title">Train</label>
                                        <span onClick={this.handleCreateClass} className={"addClass classesaction "+classes.newClass} >
                                            <p className="jss368 jss376 jss397 text-16 font-30 text-right create-class-label pt-16 px-63">Create class</p>
                                            <span className="material-icons jss311 text-56 classes-create-class" aria-hidden="true">add_circle</span>
                                        </span>
                                        {/*  <i class="material-icons searchbar-leftmenuarrow">
                                            arrow_drop_down</i>*/}
                                        <ul className="leftmenu-navbar">
                                            <ScrollArea
                                                speed={0.8}
                                                className="connection-scroll-area"
                                                contentClassName="content"
                                                horizontal={false}>
                                                {this.state.classesList.length > 0 && this.state.classesList !== undefined ? (
                                                    this.state.classesList.map((value, key) => {
                                                        return (
                                                            <li className="merritos-left-menulist hidelist" key={key}>
                                                                <div className="merritos-cell">
                                                                    <div className="merritos-cell-text" onClick={() => this.showProfileDetails(value, key)}>
                                                                        <div>
                                                                            {value.mentorImage !== undefined ? (<img src={BasePath + '/uploads/20/' + value.mentorImage} className="merritos-left-menu-img" alt="..." />) : (
                                                                                <img alt="Remy Sharp" src={this.state.imageUrl} className="merritos-left-menu-noimg" />
                                                                            )}
                                                                        </div>
                                                                        <div className="profile-names-roles  profile-names-roles-trainer">
                                                                            <ListItemText primary={value.courseName} secondary={value.startDate} />
                                                                        </div>
                                                                    </div>
                                                                    <i className="material-icons" onClick={(e) => { this.chatOpen() }}>chat_bubble_outline</i>
                                                                </div>
                                                            </li>
                                                        )
                                                    })) : (
                                                        <GridContainer>
                                                            <GridItem xs={12} sm={12} md={12} className="full-height">
                                                                <div className="full-height full-width">
                                                                    <div className="nolist-found classes-norecording">
                                                                        <img src={this.state.robo} width="100px" />
                                                                        <br />
                                                                        <div>No teaching classes</div>
                                                                    </div>
                                                                </div>
                                                            </GridItem>
                                                        </GridContainer>
                                                    )}
                                            </ScrollArea>
                                        </ul>
                                    </div>
                                ) : ('')}

                            </div>

                        </Col>

                        <Col md="9" className={'layout-right layout-hide' + classes.activityContainer}>
                            <Container className='mobileviewheight'>
                                <Row className="mobileviewrowheight">
                                    {this.state.singleProfile !== undefined && this.state.singleProfile ? (
                                        <Col xs="6" sm="6" md="6">
                                            <label className="merritos-sub-headerlabel-nm activity-label">
                                                <i className="material-icons back-from-profile" onClick={() => this.backtoActivity()}>
                                                    keyboard_arrow_left
 </i>
                                                Profile
                                         </label>
                                        </Col>
                                    ) : (this.state.classes ? (
                                        <Col xs="6" sm="6" md="6" >
                                            <label className='merritos-sub-headerlabel-nm activity-label'>Activity</label></Col>
                                    ) : (
                                            <Col xs="6" sm="6" md="6">
                                                <label className="merritos-sub-headerlabel-nm activity-label">
                                                    <i className="material-icons back-from-profile" onClick={this.handleActivityBack}>
                                                        keyboard_arrow_left</i>
                                                    <div className="titleclasses-mobile">
                                                        Classes
                                                    </div>
                                                </label>
                                            </Col>
                                        ))}
                                    {(this.state.singleProfile !== undefined && this.state.singleProfile) || this.state.classes ? (
                                        <Col xs="6" sm="6" md="6">
                                            <label className="jobs-people-label" onClick={this.findclasses} >
                                                <i className="material-icons">
                                                    add</i>Find a class</label>
                                        </Col>
                                    ) : (
                                            <Col xs="6" sm="6" md="6">
                                                <div className="jobs-searchbar-leftmenu">
                                                    <input type="text" className="connection-search-bar classes-search-bar " placeholder="search courses by course title" onChange={(event) => { this.searchclasses(event.target.value) }} />
                                                    <i class="material-icons" >search</i>
                                                </div>
                                            </Col>
                                        )}
                                </Row>
                                {this.state.singleProfile !== undefined && this.state.singleProfile ? (
                                    <Row>
                                        <Col md="4" className="noPadding profile-row">
                                            <Card className="mobile-card-view mobile-disable profile-total-card " id="basic-info">
                                                <CardBody className="noPadding">

                                                    <section class="box-typical">
                                                        <div className="profile-card">
                                                            <div className="profile-card-image">
                                                                {this.state.singleProfile.mentorImage !== undefined ? (<img src={BasePath + '/uploads/150/' + this.state.singleProfile.mentorImage} width="110px" />) : (
                                                                    <img src={this.state.imageUrl} width="110px" alt="..." />
                                                                )}
                                                            </div>
                                                            <div className="profile-card-name">{this.state.singleProfile.mentorName}</div>
                                                            <div className="profile-card-status">{this.state.singleProfile.mentorRole}</div>
                                                            <div className="profile-card-location">{this.state.singleProfile.mentorCity}</div>
                                                            {this.state.singleProfile.type !== "demo" ? (
                                                                <button type="button" className="btn btn-rounded" onClick={this.joinClass}>{this.state.singleProfile.courseType}</button>
                                                            ) : null}
                                                        </div>
                                                    </section>
                                                </CardBody>
                                            </Card>

                                            <Card className="mobile-card-view mobile-disable " id="connections-info">
                                                <CardBody >
                                                    <label className="merritos-sub-label-nm">
                                                        <i class="material-icons" >
                                                            group
                                                       </i>

                                                        Students
                                               {/* <i class="material-icons">
                                                            arrow_drop_down
                                                            </i>*/}
                                                    </label>
                                                    <ul className="connection-list-details">
                                                        {this.state.singleProfile.buyers.length > 0 ? this.state.singleProfile.buyers.map((value, index) => {
                                                            return (
                                                                <li key={index} className="merritos-left-menulist" onClick={() => this.handleProfilewall(value.userId)}>
                                                                    <div className="merritos-cell">
                                                                        <div>
                                                                            {value.profileImage !== undefined ? (<img src={BasePath + '/uploads/150/' + value.profileImage} className="merritos-left-menu-img" alt="..." />) : (
                                                                                <img alt="Remy Sharp" src={this.state.imageUrl} className="merritos-left-menu-noimg" />
                                                                            )}
                                                                        </div>
                                                                        <div className="profile-names-roles">
                                                                            <ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        }) : (
                                                                <li className="summary-body"> <span>None of your students found for this class</span></li>
                                                            )}
                                                    </ul>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md="8" className="layout-right-content">
                                            <div className="mobile-card-view mobile-disable mobile-right-activity" id="activity-info">
                                                <Card className="nm profile-total-card">
                                                    <CardBody className={"noPadding " + classes.classbody}>
                                                        <div>
                                                            <label className="merritos-sub-label-nm">
                                                                <i className="material-icons">assignment</i>
                                                                Class details
							                                </label>
                                                            <div className="classes-syllabus">
                                                                <p><ListItemText primary={this.state.singleProfile.courseName} secondary={this.state.singleProfile.startDate} /></p>
                                                                <p><span>Start at <span>{this.state.singleProfile.startTime}&nbsp;&nbsp;</span></span>
                                                                    <span>End at <span>{this.state.singleProfile.endTime}&nbsp;&nbsp;</span></span></p>
                                                                <p>Maximum people <span>{this.state.singleProfile.maxPeople}</span></p>
                                                            </div>
                                                        </div>
                                                        <label className="merritos-sub-label-nm">
                                                            <i className="material-icons">assignment</i>
                                                            Syllabus
							                    </label>
                                                        <div className="classes-syllabus">
                                                            <span dangerouslySetInnerHTML={{ __html: this.state.singleProfile.syllabus }} />
                                                        </div>
                                                        {this.state.singleProfile.type !== "demo" ? (
                                                            <div>
                                                                <label className="merritos-sub-label-nm">
                                                                    <i className="material-icons">videocam</i>
                                                                    Class Recordings
							                        </label>
                                                                {this.state.recordings !== undefined && this.state.recordings ? (
                                                                    !Array.isArray(this.state.recordings) ? (
                                                                        <Card onClick={() => this.handelClassRecordingOpen(this.state.recordings)}>
                                                                            <Container>
                                                                                <Row>
                                                                                    <Col md="4">
                                                                                        <img src={this.state.recordings.playback.format.preview.images.image[0].$t} alt="..." />
                                                                                    </Col>
                                                                                    <Col md="8">
                                                                                        <div>
                                                                                            <label>Date:</label>
                                                                                            <span>{" " + this.state.recordings.Date}</span>
                                                                                        </div>
                                                                                        <div>
                                                                                            <label>Start Time: </label>
                                                                                            <span>{" " + this.state.recordings.startTime + " "}</span>
                                                                                            <label> End Time: </label>
                                                                                            <span>{" " + this.state.recordings.endTime}</span>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Container>
                                                                        </Card>
                                                                    ) : (
                                                                            this.state.recordings.map((val, key) => (
                                                                                <Card key={key} onClick={() => this.handelClassRecordingOpen(val)}>
                                                                                    <Container>
                                                                                        <Row>
                                                                                            <Col md="4">
                                                                                                <img src={val.playback.format.preview.images.image[0].$t} alt="..." />
                                                                                            </Col>
                                                                                            <Col md="8">
                                                                                                <div>
                                                                                                    <label>Date</label>
                                                                                                    <span>{val.Date}</span>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <label>Start Time</label>
                                                                                                    <span>{val.startTime}</span>
                                                                                                    <label>End Time</label>
                                                                                                    <span>{val.endTime}</span>
                                                                                                </div>
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </Container>
                                                                                </Card>
                                                                            )))
                                                                ) : (
                                                                        <Container>
                                                                            <Row>
                                                                                <Col xs={12} sm={12} md={12} className="full-height">
                                                                                    <div className="full-height full-width">
                                                                                        <div className="nolist-found classes-norecording">
                                                                                            <img src={this.state.robo} width="100px" />
                                                                                            <br />
                                                                                            <div>Class doesnot have recordings.</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                        </Container>)}
                                                            </div>
                                                        ) : null}
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        </Col>
                                    </Row>
                                ) :
                                    (
                                        <Row>
                                            {/* <Col md='12' className='jobs-activity-col'> */}
                                            {this.state.classes ? (
                                                <Col md='12' className='jobs-activity-col'>
                                                    {this.state.classActivity !== undefined && this.state.classActivity.length > 0 ? (
                                                        this.state.classActivity.map((val, key) => {
                                                            return (
                                                                <Card key={key} className={'nbg-color ' + classes.classActivity}>
                                                                    <CardBody className='noPadding jobs-card-div'>
                                                                        <div class="jobs-activity-date">
                                                                            {this.dateLongStr(new Date(val.date))}
                                                                            <div className="jobs-timeline-border"></div>
                                                                        </div>
                                                                        <div className="jobs-activity-container">
                                                                            {val.todayActivity.map((val, key) => {
                                                                                return (
                                                                                    <div key={key} className="todayactivity-container">
                                                                                        {/* <div className="jobs-activity-header">
                                                                                            <div className="ativity-header-img">
                                                                                                {val.profileImage !== '' && val.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.profileImage} className='applied-candidates-details-img' />) : (<img src={dummyimg} className='applied-candidates-details-img' />)}
                                                                                            </div>
                                                                                            <div className="applied-job" >
                                                                                                <div onClick={() => this.handleProfilewall(val, key, 'appliedFriends')}>{val.name}</div>
                                                                                                <p>{val.role}</p>
                                                                                            </div>
                                                                                        </div> */}
                                                                                        {val.activity.map((val, key) => {
                                                                                            val.userId === this.state.userId ? (val.Name = 'You') : (val.Name = val.Name)
                                                                                            val.mentorUserId === this.state.userId ? (val.mentorName = 'You') : (val.mentorName = val.mentorName)
                                                                                            return (
                                                                                                <div key={key}>
                                                                                                    {/* <Col xs="2" sm="2" md="1" className="jobs-activity-col-1">
                                                                                                            <div class="activity-time">{val.time}</div>
                                                                                                        </Col>
                                                                                                        <Col xs="3" sm="3" md="1" className="jobs-activity-col-2">
                                                                                                            {val.mentorProfileImage !== '' && val.mentorProfileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.mentorProfileImage} className='jobs-activity-img' />) : (<img src={dummyimg} className='jobs-activity-img' />)}
                                                                                                        </Col>
                                                                                                        <Col xs="7" sm="7" md="10" className='jobs-activity-col-3'>
                                                                                                            <div onClick={() => this.handelViewClass(val)}>
                                                                                                                {val.CourseName}
                                                                                                            </div>
                                                                                                            <p>{val.mentorName}</p>
                                                                                                            <label>{val.text}</label>
                                                                                                            <ul className="jobs-activity-likes">
                                                                                                                <li><a>0 Comments</a></li>
                                                                                                                <li><a>0 Likes</a></li>
                                                                                                            </ul>
                                                                                                        </Col> */}
                                                                                                    {/* <Col md="1" className="jobs-activity-col-2">
                                                                                                            {val.mentorProfileImage !== '' && val.mentorProfileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.mentorProfileImage} className='jobs-activity-img' />) : (<img src={dummyimg} className='jobs-activity-img' />)}
                                                                                                        </Col> */}

                                                                                                    {val.typeOfActivity === 'bought' ? (
                                                                                                        <ListItem>
                                                                                                            {val.profileImage !== '' && val.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.profileImage} className="jobs-left-menu-img" />) :
                                                                                                                (<img src={dummyimg} className="jobs-activity-noimg" />)}
                                                                                                            <ListItemText primary={<div>
                                                                                                                <span className='activity-name' onClick={() => this.handleProfilewall(val.userId)}>{val.Name}&nbsp;</span>
                                                                                                                <span>{val.typeOfActivity}</span>&nbsp;<span className='activity-name' onClick={() => this.handelViewClass(val)}>{val.CourseName}</span>&nbsp;
                                                                                                            {"created by "}<span className='activity-name' onClick={() => this.handleProfilewall(val.mentorUserId)}>{val.mentorName}</span>
                                                                                                            </div>} secondary={val.time} />
                                                                                                        </ListItem>
                                                                                                        // <Row className="jobs-activity-row">
                                                                                                        //     <Col md="1" xs="2" sm="2" className="jobs-activity-col-2">
                                                                                                        //         {val.profileImage !== '' && val.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.profileImage} className="merritos-left-menu-img" />) :
                                                                                                        //             (<img src={dummyimg} className="merritos-left-menu-noimg" />)}
                                                                                                        //     </Col>
                                                                                                        //     <Col md='11' xs="10" sm="10" className='jobs-activity-col-3'>
                                                                                                        //         <span className='activity-name' onClick={() => this.handleProfilewall(val.userId)}>{val.Name + " "}</span><span>{val.typeOfActivity}</span>&nbsp;<span className='activity-name' onClick={() => this.handelViewClass(val)}>{val.CourseName}</span>{" " + "created by" + " "}<span className='activity-name' onClick={() => this.handleProfilewall(val.mentorUserId)}>{val.mentorName}</span><p className="activity-time">{val.time}</p>
                                                                                                        //     </Col></Row>

                                                                                                    ) : (<ListItem>
                                                                                                        {val.mentorProfileImage !== '' && val.mentorProfileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.mentorProfileImage} className="jobs-left-menu-img" />) :
                                                                                                            (<img src={dummyimg} className="jobs-activity-noimg" />)}
                                                                                                        <ListItemText primary={<div>
                                                                                                            <span className='activity-name' onClick={() => this.handleProfilewall(val.userId)}>{val.Name}&nbsp;</span><span>{val.typeOfActivity}</span>&nbsp;<span className='activity-name' onClick={() => this.handelViewClass(val)}>{val.CourseName}</span>
                                                                                                        </div>} secondary={val.time} />
                                                                                                    </ListItem>
                                                                                                            // <Row className="jobs-activity-row">
                                                                                                            //     <Col md="1" xs="2" sm="2" className="jobs-activity-col-2">
                                                                                                            //         {val.mentorProfileImage !== '' && val.mentorProfileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.mentorProfileImage} className="merritos-left-menu-img" />) :
                                                                                                            //             (<img src={dummyimg} className="merritos-left-menu-noimg" />)}
                                                                                                            //     </Col>
                                                                                                            //     <Col md='11' xs="10" sm="10" className='jobs-activity-col-3'>
                                                                                                            //         <span className='activity-name'>{val.Name + " "}</span><span>{val.typeOfActivity}</span>&nbsp;<span className='activity-name' onClick={() => this.handelViewClass(val)}>{val.CourseName}</span><p className="activity-time">{val.time}</p>
                                                                                                            //     </Col>
                                                                                                            // </Row>
                                                                                                        )}
                                                                                                </div>
                                                                                            );
                                                                                        })}
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            )
                                                        })) : (
                                                            <Container className="full-height full-width">
                                                                <div className="jobs-noactivity">
                                                                    <i class="material-icons">access_time</i>
                                                                    <h5>No activity found yet</h5>
                                                                </div>
                                                                <Row>
                                                                    <Col md={12} className='classes-padding'>
                                                                        <label className='class-search-text'>Suggested classes</label>
                                                                    </Col>
                                                                    {this.state.coursesList.length > 0 && this.state.coursesList !== undefined ? (this.state.coursesList.map((course, key) => (
                                                                        <Col key={key} xs={12} sm={6} md={4} className="jobs-card custom-row">
                                                                            <Card className="class-tile-card">
                                                                                <CardBody className="classes-header class-tile-header">
                                                                                    <p className={classes.header}>{course.schedule.courseName}</p>
                                                                                    <span className={classes.classmentorname}>by {course.mentorName}</span>
                                                                                </CardBody>
                                                                                <CardBody className={'dates ' + classes.customdates}>
                                                                                    <div >
                                                                                        <strong>STARTS</strong>
                                                                                        {course.schedule.startTime.split(' ')[3] + ' ' + course.schedule.startTime.split(' ')[0].slice(0, 3) + ' ' + course.schedule.startTime.split(' ')[1] + ' ' + course.schedule.startTime.split(' ')[2]}
                                                                                        <span></span>
                                                                                    </div>
                                                                                    <div className={classes.displaytime}>
                                                                                        <strong>ENDS</strong>
                                                                                        {course.schedule.endTime.split(' ')[3] + ' ' + course.schedule.endTime.split(' ')[0].slice(0, 3) + ' ' + course.schedule.endTime.split(' ')[1] + ' ' + course.schedule.endTime.split(' ')[2]}
                                                                                    </div>
                                                                                    <Clock text="Starts in: " time={course.schedule.startTime} />
                                                                                    <div onClick={() => this.handelScheduleDialogOpen(course)}>
                                                                                        <i className={"material-icons " + classes.pointer}> schedule </i>
                                                                                        <p className={classes.pointer}>Schedule</p>
                                                                                    </div>
                                                                                    <div onClick={this.handelDemoDialogOpen}>
                                                                                        <i className={"material-icons " + classes.pointer}> videocam </i>
                                                                                        <p className={classes.pointer}>Demo</p>
                                                                                    </div>
                                                                                </CardBody>
                                                                                <CardFooter className="job-footer">
                                                                                    <Container className="job-buttons">
                                                                                        <Row>
                                                                                            <Col xs="4" sm="4" md="4" className="classes-states">
                                                                                                <strong className="classes-tile-strong">MAX PEOPLE</strong>
                                                                                                {course.schedule.maxPeople}
                                                                                            </Col>
                                                                                            <Col xs="4" sm="4" md="4" className="classes-states">
                                                                                                <strong className="classes-tile-strong">JOINED</strong>
                                                                                                {course.schedule.buyers.length}
                                                                                            </Col>
                                                                                            <Col xs="4" sm="4" md="4">
                                                                                                <Button variant="contained" size="small" color="primary" className={classes.button} disabled={course.schedule.maxPeople <= course.schedule.buyers.length} onClick={() => this.handelBuyCourse(course)}>
                                                                                                    Buy
                                                    </Button>
                                                                                                {/* <PaypalExpressBtn env='sandbox' client={client} currency='INR' total={1} onError={this.onError} onSuccess={() => this.handelBuyCourse(key)} onCancel={this.onCancel} /> */}
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </Container>
                                                                                </CardFooter>
                                                                            </Card>
                                                                        </Col>
                                                                    ))) : (
                                                                            <Col xs={12} sm={12} md={12} className="full-height">
                                                                                <div className="full-height full-width">
                                                                                    <div className="nolist-found">
                                                                                        <img src={this.state.robo} width="100px" />
                                                                                        <br />
                                                                                        <div>Suggested courses not found</div>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        )}
                                                                </Row>
                                                            </Container>
                                                        )}
                                                </Col>
                                            ) : (
                                                    <Col md='12' className='class-activity-col'>
                                                        <Container>
                                                            {this.state.searchquery ? (
                                                                <Row>
                                                                    <Col md={12} className="noPadding">
                                                                        <label className='class-search-text'>Search result</label>
                                                                    </Col>
                                                                    {this.state.searchCoursesList.length > 0 && this.state.searchCoursesList !== undefined ? (
                                                                        this.state.searchCoursesList.map((course, key) => (
                                                                            <Col key={key} xs={12} sm={6} md={4} className="jobs-card custom-row">
                                                                                <Card className="class-tile-card">
                                                                                    <CardBody className="classes-header class-tile-header">
                                                                                        <p className={classes.header}>{course.schedule.courseName}</p>
                                                                                        <span className={classes.classmentorname}>by {course.mentorName}</span>
                                                                                    </CardBody>
                                                                                    <CardBody className={'dates ' + classes.customdates}>
                                                                                        <div >
                                                                                            <strong>STARTS</strong>
                                                                                            {course.schedule.startTime.split(' ')[3] + ' ' + course.schedule.startTime.split(' ')[0].slice(0, 3) + ' ' + course.schedule.startTime.split(' ')[1] + ' ' + course.schedule.startTime.split(' ')[2]}
                                                                                            <span></span>
                                                                                        </div>
                                                                                        <div className={classes.displaytime}>
                                                                                            <strong>ENDS</strong>
                                                                                            {course.schedule.endTime.split(' ')[3] + ' ' + course.schedule.endTime.split(' ')[0].slice(0, 3) + ' ' + course.schedule.endTime.split(' ')[1] + ' ' + course.schedule.endTime.split(' ')[2]}
                                                                                        </div>
                                                                                        <Clock text="Starts in: " time={course.schedule.startTime} />
                                                                                        <div onClick={() => this.handelScheduleDialogOpen(course)}>
                                                                                            <i className={"material-icons " + classes.pointer}> schedule </i>
                                                                                            <p className={classes.pointer}>Schedule</p>
                                                                                        </div>
                                                                                        <div onClick={this.handelDemoDialogOpen}>
                                                                                            <i className={"material-icons " + classes.pointer}> videocam </i>
                                                                                            <p className={classes.pointer}>Demo</p>
                                                                                        </div>
                                                                                    </CardBody>
                                                                                    <CardFooter className="job-footer">
                                                                                        <Container className="job-buttons">
                                                                                            <Row>
                                                                                                <Col xs="4" sm="4" md="4" className="classes-states">
                                                                                                    <strong className="classes-tile-strong">MAX PEOPLE</strong>
                                                                                                    {course.schedule.maxPeople}
                                                                                                </Col>
                                                                                                <Col xs="4" sm="4" md="4" className="classes-states">
                                                                                                    <strong className="classes-tile-strong">JOINED</strong>
                                                                                                    {course.schedule.buyers.length}
                                                                                                </Col>
                                                                                                <Col xs="4" sm="4" md="4">
                                                                                                    <Button variant="contained" size="small" color="primary" className={classes.button} disabled={course.schedule.maxPeople <= course.schedule.buyers.length} onClick={() => this.handelBuyCourse(course)}>
                                                                                                        Buy
                                                    </Button>
                                                                                                    {/* <PaypalExpressBtn env='sandbox' client={client} currency='INR' total={1} onError={this.onError} onSuccess={() => this.handelBuyCourse(key)} onCancel={this.onCancel} /> */}
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </Container>
                                                                                    </CardFooter>
                                                                                </Card>
                                                                            </Col>
                                                                        ))
                                                                    ) : (
                                                                            <Col xs={12} sm={12} md={12} className="full-height">
                                                                                <div className="full-height full-width">
                                                                                    <div className="nolist-found">
                                                                                        <img src={this.state.robo} width="100px" />
                                                                                        <br />
                                                                                        <div>search list not found</div>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        )}
                                                                </Row>
                                                            ) : null}
                                                            {this.state.coursesList.length > 0 && this.state.coursesList !== undefined ? (
                                                                <Row>
                                                                    <Col md={12} className="noPadding">
                                                                        <label className='class-search-text'>Suggested classes</label>
                                                                    </Col>
                                                                    {this.state.coursesList.map((course, key) => (
                                                                        <Col key={key} xs={12} sm={6} md={4} className="jobs-card custom-row">
                                                                            <Card className="class-tile-card">
                                                                                <CardBody className="classes-header class-tile-header">
                                                                                    <p className={classes.header}>{course.schedule.courseName}</p>
                                                                                    <span className={classes.classmentorname}>by {course.mentorName}</span>
                                                                                </CardBody>
                                                                                <CardBody className={'dates ' + classes.customdates}>
                                                                                    <div >
                                                                                        <strong>STARTS</strong>
                                                                                        {course.schedule.startTime.split(' ')[3] + ' ' + course.schedule.startTime.split(' ')[0].slice(0, 3) + ' ' + course.schedule.startTime.split(' ')[1] + ' ' + course.schedule.startTime.split(' ')[2]}
                                                                                        <span></span>
                                                                                    </div>
                                                                                    <div className={classes.displaytime}>
                                                                                        <strong>ENDS</strong>
                                                                                        {course.schedule.endTime.split(' ')[3] + ' ' + course.schedule.endTime.split(' ')[0].slice(0, 3) + ' ' + course.schedule.endTime.split(' ')[1] + ' ' + course.schedule.endTime.split(' ')[2]}
                                                                                    </div>
                                                                                    <Clock text="Starts in: " time={course.schedule.startTime} />
                                                                                    <div onClick={() => this.handelScheduleDialogOpen(course)}>
                                                                                        <i className={"material-icons " + classes.pointer}> schedule </i>
                                                                                        <p className={classes.pointer}>Schedule</p>
                                                                                    </div>
                                                                                    <div onClick={this.handelDemoDialogOpen}>
                                                                                        <i className={"material-icons " + classes.pointer}> videocam </i>
                                                                                        <p className={classes.pointer}>Demo</p>
                                                                                    </div>
                                                                                </CardBody>
                                                                                <CardFooter className="job-footer">
                                                                                    <Container className="job-buttons">
                                                                                        <Row>
                                                                                            <Col xs="4" sm="4" md="4" className="classes-states">
                                                                                                <strong className="classes-tile-strong">MAX PEOPLE</strong>
                                                                                                {course.schedule.maxPeople}
                                                                                            </Col>
                                                                                            <Col xs="4" sm="4" md="4" className="classes-states">
                                                                                                <strong className="classes-tile-strong">JOINED</strong>
                                                                                                {course.schedule.buyers.length}
                                                                                            </Col>
                                                                                            <Col xs="4" sm="4" md="4">
                                                                                                <Button variant="contained" size="small" color="primary" className={classes.button} disabled={course.schedule.maxPeople <= course.schedule.buyers.length} onClick={() => this.handelBuyCourse(course)}>
                                                                                                    Buy
                                                    </Button>
                                                                                                {/* <PaypalExpressBtn env='sandbox' client={client} currency='INR' total={1} onError={this.onError} onSuccess={() => this.handelBuyCourse(key)} onCancel={this.onCancel} /> */}
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </Container>
                                                                                </CardFooter>
                                                                            </Card>
                                                                        </Col>
                                                                    ))}
                                                                </Row>
                                                            ) : (<Row>
                                                                <Col md={12} className="noPadding">
                                                                    <label className='class-search-text'>Suggested classes</label>
                                                                </Col>
                                                                <Col xs={12} sm={12} md={12} className="full-height">
                                                                    <div className="full-height full-width">
                                                                        <div className="nolist-found">
                                                                            <img src={this.state.robo} width="100px" />
                                                                            <br />
                                                                            <div>No course list found</div>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>)}
                                                        </Container>
                                                    </Col>
                                                )}
                                            {/* </Col> */}
                                        </Row>
                                    )}
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Dialog open={this.state.scheduleOpen}
                    onClose={this.handelScheduleDialogClose}
                    aria-labelledby="form-dialog-title"
                    className="classes-schedule-dialog">
                    <DialogTitle id="form-dialog-title" className="merriots-popup-title"> Syllabus <IconButton color="inherit" className="merriots-popup-close" onClick={this.handelScheduleDialogClose} aria-label="Close">
                        <CloseIcon />
                    </IconButton></DialogTitle>
                    <DialogContent className="classes-schedule-dialog-content">
                        <DialogContentText>
                            <span dangerouslySetInnerHTML={{ __html: this.state.scheduleText }} />
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <Modal open={this.state.demoOpen}
                    onClose={this.handelDemoDialogClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    <Videoplayer src={this.state.demoVideo} />
                </Modal>
                <Modal open={this.state.classRecordingOpen}
                    onClose={this.handelClassRecordingClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    <Iframe src={this.state.classVideo} />
                </Modal>
                <CreateSchedule open={this.state.classOpen} onClose={this.handleClassClose} stepChange={this.stepChangeFunc} _this={this} text="classes" />
                {this.state.singleProfile !== undefined && this.state.singleProfile ? (
                    <div className="mobile-view-port">
                        <BottomNavigation
                            showLabels
                            className={"merritos-bottomnav " + classes.bottomNav}
                        >
                            <BottomNavigationAction label="Info" icon={<i class="material-icons">  perm_identity</i>} onClick={(e) => this.mobileTabs(e, '#basic-info')} id="viewOne" />
                            <BottomNavigationAction label="Students" icon={<i class="material-icons">  people_outline</i>} onClick={(e) => this.mobileTabs(e, '#connections-info')} />
                            <BottomNavigationAction label="Activities" icon={<i class="material-icons">  assignment_ind</i>} onClick={(e) => this.mobileTabs(e, '#activity-info')} />
                        </BottomNavigation>
                    </div>
                ) : null}
            </div>
        );
    }
}

Classes.propTypes = {
    classes: PropTypes.object.isRequired,
};
const classesRes = state => ({
    classesList: state.classes.classesList,
    myClassesList: state.classes.myClassesList,
    coursesList: state.classes.coursesList,
    classActivityList: state.classes.classactivity,
    searchcourses: state.classes.searchcourses,
    profileData: state.profile.profileData,
    componentupdate: state.classes.componentupdate,
    classBuyInfo: state.trainers.classBuyInfo,
    error: state.trainers.error,
});


export default connect(classesRes, { loaderfalse, getClassesList, getMyClassesList, fetchprofileData, buyCourse, trainersUnmount, getCoursesList, getClassActivity })(withStyles(styles, { withTheme: true })(Classes));
