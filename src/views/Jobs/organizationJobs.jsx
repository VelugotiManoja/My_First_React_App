import React from "react";
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import { fetchOrganizationData } from "../../actions/Profileactions";
import { connect } from 'react-redux';
import robo from 'assets/img/broken-robot.png';
import ScrollArea from 'react-scrollbar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import $ from "jquery";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Button from 'components/CustomButtons/Button.jsx';
import AddIcon from '@material-ui/icons/Add';
import RoomIcon from '@material-ui/icons/Room';
import UpdateIcon from '@material-ui/icons/Update';
import InputLabel from "@material-ui/core/InputLabel"
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container, Row, Col } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";
import dummyimg from 'assets/img/default-avatar.png';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import amber from '@material-ui/core/colors/amber';
import PropTypes from "prop-types";
import Snackbar from '@material-ui/core/Snackbar';

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
    card: {
        marginBottom: '10px',
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: '#fbfbfb'
        }
    },
    cardbody: {
        textAlign: "center"
    },
    cardHeight: {
        backgroundColor: "#f1f1f1 !important",
        paddingBottom: "0px",
        marginBottom: "-10px",
        height: '40px !important'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        padding: '10px 10px 10px 30px',
        width: '100%',
        '&:focus': {
            width: 200,
        },
    },
    cardAlign: {
        marginBottom: '-45px'
    },
    addButton: {
        marginTop: '10px !important',
        borderRadius: '19.5px !important',
        left: '15px !important',
        "&:hover": {
            background: '#4747a0 !important'
        },
        "& svg": {
            marginRight: '0px !important'
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0px !important',
            float: 'right !important',
            backgroundColor: '#4747a0 !important',
            borderRadius: '50px !important',
            width: '35px !important',
            height: '35px',

        },
        [theme.breakpoints.down('sm')]: {
            width: '23px',
            marginTop: '-59px',
            backgroundColor: '#4747a0 !important',
        },
        [theme.breakpoints.up('lg')]: {
            backgroundColor: '#4747a0',
            marginBottom: '5px',
            marginTop: '-6px',
            width: '40px',
            height: '40px',
            padding: '0',
            minWidth: '0',
            fontSize: '16px',
            float: 'right'
        },
    },
    createJob: {
        fontWeight: '400 !important',
        marginLeft: '50px !important',
        fontSize: '16px',
        [theme.breakpoints.down('xs')]: {
            width: '230px',
            fontSize: '16px !important',
            marginLeft: '30px !important',
            marginBottom: '6px !important'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '13px'
        },
    },
    filtersCard: {
        marginTop: '0px !important',
        height: '100% !important',
        '& h4': {
            padding: '2px 0px 2px 22px !important'
        },
        [theme.breakpoints.down('xs')]: {
            width: '347px',
            margin: '57px 0px 0px -14px !important',
        }
    },
    jobsCard: {
        margin: '10px 0 !important',
        [theme.breakpoints.down('xs')]: {
        },
        '&li': {
            padding: '0px !important'
        }
    },
    profileCard: {
        margin: '10px 0 !important',
        '&li': {
            padding: '0px !important'
        }
    },
    jobsDetailsCard: {
        [theme.breakpoints.down('xs')]: {
            width: '346px !important',
            margin: '40px 0px 0px -14px'
        },
    },
    Jobs: {
        [theme.breakpoints.down('xs')]: {
            width: '344px !important'
        }
    },
    joblist: {
        marginTop: '20px',
        fontSize: '1.2rem',
        fontWeight: '400',
        [theme.breakpoints.down('xs')]: {
            fontSize: '17px',
            margin: '0px 0 0px -10px !important',
        }
    },
    jobdetails: {
        marginTop: '20px',
        fontSize: '1.2rem',
        fontWeight: '400',
        [theme.breakpoints.down('xs')]: {
            fontSize: '17px',
            marginTop: '5px !important',
            marginBottom: '-20px !important'
        }
    },
    createButton: {
        textTransform: 'none',
        backgroundColor: '#2196f3'
    },
    search: {
        border: '0.5px solid #737373'
    },
    jobsHead: {
        padding: '1px 0px 20px 0px !important',
    },
    jobType: {
        color: '#ffffff !important'
    },
    appCandidatesTable: {
        [theme.breakpoints.down('xs')]: {
            width: 'auto',
            display: 'flex',
            overflowX: 'auto',
            marginLeft: '-13px',
            marginRight: '-16px'
        }
    },
    table: {
        [theme.breakpoints.down('xs')]: {
            minWidth: 95,
        }
    },
    tableHead: {
        backgroundColor: '#757575',
        textAlign: 'left !important',
        [theme.breakpoints.down('xs')]: {
            fontSize: '11px !important',
            paddingRight: 4,
            paddingLeft: 5,
        }
    },
    tableCell: {
        textAlign: 'left !important',
        [theme.breakpoints.down('xs')]: {
            paddingRight: 4,
            paddingLeft: 5,
            fontSize: 'x-small !important'
        }
    },
    tableRow: {
        [theme.breakpoints.down('xs')]: {
            height: '10px !important'
        }
    },

    appliedJobs: {
        marginBottom: '16px'
    },
    hover: {
        cursor: 'pointer',
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            cursor: 'pointer',
            "&:hover": {
                background: '#f1f1f1 !important'
            },
        }
    },
    backArrow: {
        height: '39px',
        marginRight: '-11px',
        [theme.breakpoints.down('xs')]: {
            marginRight: '0px !important',
            marginLeft: '-9px !important'
        }
    },

    heading: {
        padding: '15px',
    },
    classheading: {
        fontWeight: 'bold',
        fontSize: '18px',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '-15px'
        }
    },
    joblistContainer: {
        padding: '0px !important',
    },
    jobsData: {
        padding: '0px !important'
    },
    jobsHeading: {
        paddingTop: '10px !important',
        paddingLeft: '0px !important',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '0px !important'
        }
    },
    noPadding: {

        [theme.breakpoints.down('xs')]: {
            padding: '0px !important',

        },
    },
    jobsFooter: {

        [theme.breakpoints.down('xs')]: {
            padding: '10px 0px !important',

        },
    },
    createButton: {
        color: '#ffffff',
        textTransform: 'none'
    },
    // closeButton: {
    //     color: '#ffffff',
    //     textTransform: 'none',
    //     backgroundColor: '#d9534f !important'
    // },
    companyProfile: {
        padding: '0px 0px 0px -1px !important'
    },
    candidatesName: {
        padding: '0px 0px 0px 5px !important',
        fontWeight: '600',
        marginTop: '2px'
    }
});
class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            br: false,
            robo: robo,
            jobType: 'Full time',
            jobTitle: '',
            jobTitleState: '',
            jobLocation: '',
            jobLocationState: '',
            jobDesc: '',
            jobDescState: '',
            jobSearch: '',
            editorState: EditorState.createEmpty(),
            jobsList: [],
            appliedJobsList: [],
            appliedCandidatesList: [],
            editData: '',
            selectedIndex: 0,
            editKey: 0,
            deleteKey: 0,
            applyKey: 0,
            applyUserId: '',
            notification: "",
            color: "info",
            editable: true,
            userType: '',
            loader: false,
            deleteOpen: false,
            applyOpen: false,
            jobOpen: false,
            userId: reactLocalStorage.get('userId'),
            active: false,
            companyName: '',
            companyAddress: '',
            companyPhone: '',
            companyWebsite: '',
            showJobsList: true,
            showJobDetails: false,
            jobdetailsTitle: '',
            jobdetailsType: '',
            jobdetailsDesc: '',
            imageUrl: '',
            singleProfile: []
        }
    }
    componentDidMount() {
        let th = this;
        th.setState({ showJobsList: true });
        th.setState({ showJobDetails: false });
        this.props.fetchOrganizationData(this.state.userId);
        localStorage.getItem('userType');
        let userType = localStorage.userType;
        if (!userType) {
            this.props.history.push('/');
        }
        th.setState({ showSearch: false });
        th.setState({ showIcon: true });
        th.setState({ showApply: false });
        fetch(BasePath + '/organizationjobslist/' + th.state.userId, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        }).then((resp) => resp.json()) // Transform the data into json
            .then(function (resp) {
                if (resp.length === 1) {
                    th.setState({ jobsList: resp.info.orgjobslist });
                    th.setState({ appliedJobsListInitial: resp.info.appliedJobsList });
                    th.setState({ appliedJobsList: resp.info.appliedJobsList });

                }
            }).catch((err) => {
                th.setState({ notification: err.message });
                th.setState({ color: 'error' });
                th.showNotification('br');
            })
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.profileImage) {
    //         this.props.companydata.path = nextProps.profileImage;
    //     }
    // }
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
    verifyLength(value, length) {
        if (value.length >= length) {
            return true;
        }
        return false;
    }
    //Change events
    //Change event for input
    change(event) {
        if (this.verifyLength(event.target.value, 1)) {
            this.setState({ [event.target.name + "State"]: "success" });
            this.setState({ [event.target.name]: event.target.value });
        } else {
            this.setState({ [event.target.name + "State"]: "error" });
            this.setState({ [event.target.name]: event.target.value });
        }
    }
    //Change event for select
    handleSelectChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    //Change event for texteditor
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
        this.setState({ jobDesc: ((draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))) });
    };
    //Buttons
    AddMoreJobs = () => {
        this.setState({ jobOpen: true });
        this.setState({ showIcon: false });
        this.setState({ jobType: 'Full time' });
    }

    handleCreateJobs = () => {
        let th = this;
        let s = th.state.jobDesc;
        let body = "<p>";
        let bodyEnd = "</p>";
        let res = s.substring(s.indexOf(body) + body.length, s.indexOf("</p>"));
        //For insert data to mongodb
        if (this.state.editData === "") {
            if (this.state.jobTitle === "") {
                this.setState({ jobTitleState: "error" });
            }
            else if (this.state.jobLocation === "") {
                this.setState({ jobLocationState: "error" });
            }
            else if (this.state.jobDesc === "" || res === "") {
                th.setState({ notification: "Please enter job description also" });
                th.setState({ color: 'error' });
                th.showNotification('br');
            }
            else {
                th.setState({ loader: true });
                let createJob = { "organizationId": th.state.userId, "jobTitle": this.state.jobTitle, "jobType": this.state.jobType, "jobLocation": this.state.jobLocation, "jobDesc": this.state.jobDesc }
                fetch(BasePath + '/jobscreate', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify(createJob)
                }).then((resp) => resp.json()) // Transform the data into json
                    .then(function (resp) {
                        if (resp.length === 1) {
                            th.setState({ loader: false });
                            let arraydata = th.state.jobsList;
                            let companyData = resp.info.jobdetails[0];
                            companyData.CompanyData = { profileImage: resp.info.profileImage, companyname: th.props.companydata.companyname, address: th.props.companydata.address };
                            arraydata.unshift(companyData);
                            th.setState({ jobsList: arraydata })
                            th.setState({ editorState: EditorState.createEmpty() });
                            th.setState({ jobTitle: "" });
                            th.setState({ jobTitleState: "" });
                            th.setState({ jobDesc: "" });
                            th.setState({ jobLocation: "" });
                            th.setState({ jobLocationState: "" });
                            th.setState({ jobOpen: false });
                            th.setState({ editData: "" });
                            th.setState({ showJobsList: true });
                        }
                    }).catch((err) => {
                        th.setState({ loader: false });
                        th.setState({ notification: err.message });
                        th.setState({ color: 'error' });
                        th.showNotification('br');
                        th.setState({ showJobsList: true });
                    })
            }
        }
        else {
            //For update data in mongodb
            if (this.state.jobTitle === "") {
                this.setState({ jobTitleState: "error" });
            }
            else if (this.state.jobLocation === "") {
                this.setState({ jobLocationState: "error" });
            }
            else if (res === "") {
                th.setState({ notification: "Please update job description also" });
                th.setState({ color: 'error' });
                th.showNotification('br');
            }
            else {
                th.setState({ loader: true });
                let updateJob = { "jobId": this.state._id, "jobTitle": this.state.jobTitle, "jobType": this.state.jobType, "jobLocation": this.state.jobLocation, "jobDesc": this.state.jobDesc }
                fetch(BasePath + '/jobsupdate', {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify(updateJob)
                }).then((resp) => resp.json()) // Transform the data into json
                    .then(function (resp) {
                        if (resp.length === 1) {
                            th.setState({ loader: false });
                            let arraydata = th.state.jobsList;
                            updateJob.organizationId = th.state._id;
                            let companyData = updateJob
                            companyData.CompanyData = { profileImage: th.state.jobsList[th.state.editKey].CompanyData.profileImage, companyname: th.props.companydata.companyname, address: th.props.companydata.address };
                            companyData.companyName = th.props.companydata.companyname;
                            arraydata[th.state.editKey] = companyData;
                            th.setState({ jobsList: arraydata });
                            let applieddata = th.state.appliedJobsList;
                            applieddata.map((val, key) => {
                                if (val._id === th.state._id) {
                                    applieddata[key].jobTitle = companyData.jobTitle;
                                    applieddata[key].jobType = companyData.jobType;
                                    applieddata[key].jobLocation = companyData.jobLocation;
                                }
                            })
                            th.setState({ appliedJobsList: applieddata });
                            th.setState({ jobOpen: false });
                            th.setState({ jobTitle: "" });
                            th.setState({ jobTitleState: "" });
                            th.setState({ jobType: "" });
                            th.setState({ jobLocation: "" });
                            th.setState({ jobLocationState: "" });
                            th.setState({ jobDesc: "" });
                            th.setState({ editorState: EditorState.createEmpty() });
                            th.setState({ editData: "" });
                            th.setState({ showJobsList: true });
                        }
                    }).catch((err) => {
                        th.setState({ loader: false });
                        th.setState({ notification: err.message });
                        th.setState({ color: 'error' });
                        th.showNotification('br');
                        th.setState({ showJobsList: true });
                    })
            }
        };
    }
    handleClose = () => {
        this.setState({ showIcon: true });
        this.setState({ jobTitle: "" });
        this.setState({ jobTitleState: "" });
        this.setState({ jobLocation: "" });
        this.setState({ jobLocationState: "" });
        this.setState({ editorState: EditorState.createEmpty() });
        this.setState({ jobDesc: "" });
        this.setState({ editData: "" });
        this.setState({ jobOpen: false });
    }
    //For getting row data
    EditClick = (key) => {
        this.setState({ editable: false });
        this.setState({ jobOpen: true });
        this.setState({ editKey: key });
        this.setState({ editData: this.state.jobsList[key] });
        this.setState({ jobTitle: this.state.jobsList[key] }.jobTitle);
        this.setState({ jobLocation: this.state.jobsList[key] }.jobLocation);
        this.setState({ jobTitleState: "success" });
        this.setState({ jobLocationState: "success" });
        this.setState({ jobType: this.state.jobsList[key] }.jobType);
        const processedHTML = DraftPasteProcessor.processHTML(this.state.jobsList[key].jobDesc);
        if (processedHTML.contentBlocks !== null) {
            const contentState = ContentState.createFromBlockArray(processedHTML);
            let editorState = EditorState.createWithContent(contentState);
            this.setState({ editorState: editorState });
        } else {
            this.setState({ editorState: EditorState.createEmpty() });
        }
    }
    //For showing confirmation alert for removing data
    handleDelete = (key) => {
        this.setState({ deleteOpen: true });
        this.setState({ deleteKey: key });
    }
    //For removing data
    handleRemove = () => {
        let th = this;
        let key = this.state.deleteKey;
        let deleteJob = th.state.jobsList[key]._id
        fetch(BasePath + '/jobsdelete', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ deleteJob })
        }).then((resp) => resp.json()) // Transform the data into json
            .then(function (resp) {
                if (resp.length === 1) {
                    th.setState(state => ({
                        jobsList: state.jobsList.filter((row, j) => j !== key
                        ),
                    }));
                    th.setState({ deleteOpen: false });
                    th.setState({ notification: "Job deleted successfully" });
                    th.setState({ color: 'success' });
                    th.showNotification('br');
                }
            }).catch((err) => {
                th.setState({ notification: err.message });
                th.setState({ color: 'error' });
                th.showNotification('br');
            })
    }
    handleDeleteClose = () => {
        this.setState({ deleteOpen: false });
    };
    //Applied candidates list
    handleAppliedCandidate = (id) => {
        var th = this;
        th.setState({ loader: true });
        this.setState({ showProfile: false });
        this.setState({ showJobDetails: true });
        fetch(BasePath + '/jobappliedcandidateslist/' + this.state.appliedJobsList[id]._id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        }).then((resp) => resp.json()) // Transform the data into json
            .then(function (resp) {

                if (resp.length === 1) {
                    th.setState({ loader: false });
                    th.setState({ appliedCandidatesList: resp.info.appliedCandidateslist });
                    th.setState({ companyName: resp.info.jobdetails.CompanyData.companyName });
                    th.setState({ companyAddress: resp.info.jobdetails.CompanyData.address });
                    th.setState({ companyPhone: resp.info.jobdetails.CompanyData.primary });
                    th.setState({ companyWebsite: resp.info.jobdetails.CompanyData.website });
                    if (resp.info.jobdetails.CompanyData.profileImage !== undefined && resp.info.jobdetails.CompanyData.profileImage !== "") {
                        th.setState({ imageUrl: resp.info.jobdetails.CompanyData.profileImage });
                    }
                    th.setState({ jobdetailsTitle: resp.info.jobdetails.jobTitle });
                    th.setState({ jobLocation: resp.info.jobdetails.jobLocation });
                    th.setState({ jobdetailsType: resp.info.jobdetails.jobType });
                    th.setState({ jobdetailsDesc: resp.info.jobdetails.jobDesc });
                    th.setState({ showJobsList: false });
                    th.setState({ showJobDetails: true });
                    $('#viewOne').trigger('click');
                }
            }).catch((err) => {
                th.setState({ loader: false });
                th.setState({ notification: err.message });
                th.setState({ color: 'error' });
                th.showNotification('br');
            });
    }
    //Organization jobs search
    handleAppliedjobsSearch = (event) => {
        let appliedJobs = []
        if (event.target.value !== '' && event.target.value !== undefined) {
            this.state.appliedJobsListInitial.map(item => {
                if ((item.jobTitle).toUpperCase().search((event.target.value).toUpperCase()) >= 0) {
                    appliedJobs.push(item);
                }
            })
            this.setState({ appliedJobsList: appliedJobs });
        } else {
            this.setState({ appliedJobsList: this.state.appliedJobsListInitial });
        }
    }

    //showProfile
    showProfileDetails(value) {
        let th = this;
        th.setState({ loader: true });
        let data = { loginId: th.state.userId, connectId: value.userId };
        fetch(BasePath + '/connectprofileactivity/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {

                if (serdata.length === 1) {
                    th.setState({ loader: false });
                    th.setState({ singleProfile: serdata.global });
                    th.setState({ showJobDetails: false, showProfile: true })
                    $('#viewTwo').trigger('click');
                }
            }).catch((err) => {
                th.setState({ loader: false });
                th.setState({ notification: err.message });
                th.setState({ color: 'error' });
                th.showNotification('br');

            })

    }

    handleBack = () => {
        this.setState({ showJobsList: true });
        this.setState({ showJobDetails: false });
    }
    handleProfileBack = () => {
        this.setState({ showProfile: false });
        this.setState({ showJobDetails: true });
        $('.mobile-card-view').addClass('mobile-disable');
        $('#basic-info').removeClass('mobile-disable');

    }
    mobileTabs = (e, id) => {
        if (id == '#activity-info') {

            $('#layout-left').hide();
        }
        else {
            $('#layout-left').show();
        }
        $('.mobile-card-view').addClass('mobile-disable');
        $(id).removeClass('mobile-disable');
    }
    mobileProfileTabs = (e, id) => {

        $('.mobile-card-view').addClass('mobile-disable');
        $(id).removeClass('mobile-disable');
    }
    // keydownHandler = (e) => {
    //     if (e.key === 'Enter') {
    //         this.handleAppliedjobsSearch();
    //     }
    // }
    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ br: false });
    };
    render() {
        const { classes, companydata } = this.props;
        const { editorState } = this.state;
        if (this.state.editData !== '' && !this.state.editable) {
            this.state.jobTitle = this.state.jobTitle;
            this.state.jobType = this.state.jobType;
            this.state.jobDesc = this.state.jobDesc;
        }
        return (
            <div>
                <CircularProgress visible={this.state.loader}></CircularProgress>
                <Dialog
                    open={this.state.deleteOpen}
                    onClose={this.handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure want to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDeleteClose} className='org-edit-nobtn'>No</Button>
                        <Button onClick={this.handleRemove} className='org-edit-yesbtn'>Yes</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.jobOpen}
                    onClose={this.handleJObClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Add job details"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <form >
                                <CustomInput
                                    success={this.state.jobTitleState === "success"}
                                    error={this.state.jobTitleState === "error"}
                                    labelText="Job title"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: event =>
                                            this.change(event, "jobTitle"),
                                        value: this.state.jobTitle,
                                        name: "jobTitle",
                                    }}
                                />
                                <CustomInput
                                    success={this.state.jobLocationState === "success"}
                                    error={this.state.jobLocationState === "error"}
                                    labelText="Job location"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: event =>
                                            this.change(event, "jobLocation"),
                                        value: this.state.jobLocation,
                                        name: "jobLocation",

                                    }}
                                />
                                <br />
                                <FormControl fullWidth>
                                    <NativeSelect
                                        value={this.state.jobType}
                                        label="Job type"
                                        disableUnderline={true}
                                        className="merritos-textbox"
                                        onChange={this.handleSelectChange('jobType')}
                                        input={<Input name="jobType" id="age-native-label-placeholder" />}
                                        inputProps={{
                                            name: 'jobType',
                                            id: 'age-native-label-placeholder',
                                        }}
                                    >
                                        <option value="Full time">Full time</option>
                                        <option value="Half time">Half time</option>
                                        <option value="Regular">Regular</option>
                                        <option value="Contract">Contract</option>
                                    </NativeSelect>
                                </FormControl>
                                <br /><br />

                                <InputLabel className={classes.label}>Job description</InputLabel>
                                <br />
                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    toolbarClassName="toolbar-class"
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                            </form>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button block className="schedule-dialog-closebtn " onClick={this.handleClose}>Close</Button>
                        <Button block className="schedule-dialog-savebtn " onClick={this.handleCreateJobs}>Save</Button>
                    </DialogActions>
                </Dialog>
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.br}
                        autoHideDuration={3000}
                        onClose={this.handleSnackbarClose}
                    >
                        <MySnackbarContentWrapper
                            onClose={this.handleSnackbarClose}
                            variant={this.state.color}
                            message={this.state.notification}
                        />
                    </Snackbar>
                </div>
                <Container className={'full-height ' + classes.grid}>
                    <Row className={'full-height'}>
                        <Col md="3" className="mobile-view mobile-nav-bar full-height">
                            <div className={'full-height'}>
                                <label className="label-title">Applied jobs</label>
                                <div className="searchbar-leftmenu">
                                    <input type="text" placeholder="search jobs" onChange={this.handleAppliedjobsSearch} />
                                    <i className="material-icons">search</i>
                                </div>
                                <ScrollArea
                                    speed={0.8}
                                    className="connection-scroll-area"
                                    contentClassName="content"
                                    horizontal={false}>
                                    <ul className="leftmenu-navbar">
                                        {this.state.appliedJobsList !== undefined && this.state.appliedJobsList.length > 0 ? (
                                            this.state.appliedJobsList.map((val, key) => {
                                                return (
                                                    <li key={key} className="merritos-left-menulist hideList" onClick={() => this.handleAppliedCandidate(key)}>
                                                        <div className="merritos-cell">
                                                            <div>


                                                                {val.CompanyData.profileImage !== undefined && val.CompanyData.profileImage !== "" ? (<img src={BasePath + '/uploads/20/' + val.CompanyData.profileImage} className="merritos-left-menu-img" alt="..." />) : (
                                                                    <img alt="Remy Sharp" src={dummyimg} className="merritos-left-menu-noimg" />
                                                                )}
                                                            </div>
                                                            <div className="profile-names-roles profile-names-roles-org">
                                                                <ListItemText primary={val.jobTitle} secondary={val.jobType + " ," + val.jobLocation} />
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        ) : (
                                                <div className="full-height full-width">
                                                    <div className="nolist-found">
                                                        <img src={this.state.robo} width="100px" />
                                                        <br />
                                                        <div className="no-jobslist">No applied jobs to show</div>
                                                    </div>
                                                </div>
                                            )}
                                    </ul>
                                </ScrollArea>
                            </div>
                            <div>
                                <Card>

                                </Card>
                            </div>
                        </Col>


                        <Col xs="12" sm="12" md="9" style={this.state.showJobsList ? {} : { display: 'none' }} className={'layout-right'}>


                            <Container className="mobileviewheight">
                                <Row className="mobileviewrowheight">
                                    <Col xs="6" sm="6" md="6">
                                        <label className="merritos-sub-headerlabel-nm activity-label">
                                            Jobs list
                                    </label>
                                    </Col>
                                    <Col xs="6" sm="6" md="6">
                                        <Button variant="fab" color="primary" aria-label="Add" className={classes.addButton}
                                            onClick={this.AddMoreJobs} ><AddIcon />
                                        </Button>
                                    </Col>

                                    {this.state.jobsList !== undefined && this.state.jobsList.length > 0 ? (
                                        this.state.jobsList.map((val, key) => {
                                            return (
                                                <Col xs="12" sm="12" md="4" key={key} className={"jobs-card custom-row " + classes.noPadding}>
                                                    <Card className={classes.jobsCard} >
                                                        <CardBody>
                                                            <Container className={classes.joblistContainer}>
                                                                <Row>
                                                                    <Col xs="2" sm="2" md="2" className="jobs-img-col">
                                                                        {val.CompanyData.profileImage !== "" && val.CompanyData.profileImage !== undefined ? (<img src={BasePath + '/uploads/150/' + val.CompanyData.profileImage} />) : (<img src={dummyimg} />)}
                                                                    </Col>
                                                                    <Col xs="10" sm="10" md="10" className={classes.jobsData}>
                                                                        <div className="job-title">
                                                                            {val.jobTitle}
                                                                        </div>
                                                                        <p className="company-name">{val.companyName}</p>
                                                                        <p className="company-name"> <UpdateIcon className="job-icons" />{val.jobType}</p>
                                                                        <p className="company-name"> <RoomIcon className="job-icons" />{val.jobLocation}</p>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </CardBody>
                                                        <CardFooter className={"job-footer " + classes.jobsFooter}>
                                                            <Container className="job-buttons">
                                                                <Row>
                                                                    <Col xs="6" sm="6" md="6" className="btn-col">
                                                                        <p variant="contained" color="secondary" className={"del-btn edit-btn"} onClick={() => this.EditClick(key)}>Edit</p>
                                                                    </Col>
                                                                    <Col xs="6" sm="6" md="6" className="btn-col">
                                                                        <p variant="contained" className={"del-btn"} onClick={() => this.handleDelete(key)}>Delete</p>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </CardFooter>
                                                    </Card>
                                                </Col>
                                            );
                                        })
                                    ) : (
                                            <div className="full-height full-width">
                                                <div className="nolist-found no-list-job">
                                                    <img src={this.state.robo} width="100px" />
                                                    <br />
                                                    <div>No search results found</div>
                                                </div>
                                            </div>
                                        )}
                                </Row>
                            </Container>
                        </Col>
                        <Col xs="12" sm="12" md="9" style={this.state.showProfile ? {} : { display: 'none' }} className={'layout-right'}>
                            <Container className="mobileviewheight">
                                <Row className="mobileviewrowheight">
                                    <Col xs="6" sm="6" md="6">
                                        <label className="merritos-sub-headerlabel-nm activity-label">
                                            <i className="material-icons back-from-profile" onClick={this.handleProfileBack}>
                                                keyboard_arrow_left
                                             </i>
                                             {this.state.singleProfile.length > 0 ? ( <p className={classes.firstName}>{this.state.singleProfile[0].profile.firstName+"'s profile"}</p>):(<p>Profile</p>)}
                                        </label>
                                    </Col>
                                </Row>
                                {this.state.singleProfile.length > 0 ? (
                                    <Row>
                                        <Col md="4" className="mobile-card-view mobile-disable profile-row noPadding" id="profile-basic-info">
                                            <Card className={classes.profileCard}>
                                                <CardBody className="noPadding">
                                                    {this.state.singleProfile.length > 0 ? (
                                                        <section class="box-typical">
                                                            <div class="profile-card">
                                                                <div class="profile-card-image">
                                                                    {this.state.singleProfile[0].profile.profileImage !== undefined ? (<img src={BasePath + '/uploads/150/' + this.state.singleProfile[0].profile.profileImage} width="110px" />) : (
                                                                        <img src={dummyimg} width="110px" alt="..." />
                                                                    )}
                                                                </div>
                                                                <div class="profile-card-name">{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName}</div>
                                                                <div class="profile-card-status">{this.state.singleProfile[0].profile.role}</div>
                                                                <div class="profile-card-location">{this.state.singleProfile[0].profile.city}</div>

                                                            </div>
                                                            <div class="profile-statistic tbl">
                                                                <div class="tbl-row connect-row">
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
                                                            <article class="merritos-education-info">
                                                                <label class="merritos-sub-label">
                                                                    <i class="material-icons">school</i>
                                                                    Education
						                                </label>
                                                                <ul class="exp-timeline">
                                                                    {this.state.singleProfile[0].profile.education.length > 0 ? (
                                                                        this.state.singleProfile[0].profile.education.map((value, index) => {
                                                                            return (<li class="exp-timeline-item">
                                                                                <div class="dot"></div>
                                                                                <div class="tbl">
                                                                                    <div class="tbl-row">
                                                                                        <div class="tbl-cell">
                                                                                            <div class="exp-timeline-range">{new Date(value.fromDate).getFullYear()} - {new Date(value.toDate).getFullYear()}</div>
                                                                                            <div class="exp-timeline-status">{value.universityName}</div>
                                                                                            <div class="exp-timeline-location">{value.fieldOfStudy}</div>
                                                                                        </div>
                                                                                        <div class="tbl-cell tbl-cell-logo">
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
                                                            <article class="merritos-education-info">
                                                                <label class="merritos-sub-label">
                                                                    <i class="material-icons">
                                                                        work
</i>
                                                                    Experience
							</label>
                                                                <ul class="exp-timeline">
                                                                    {this.state.singleProfile[0].profile.experience.length > 0 ? (
                                                                        this.state.singleProfile[0].profile.experience.map((value, index) => {
                                                                            return (<li class="exp-timeline-item">
                                                                                <div class="dot"></div>
                                                                                <div class="tbl">
                                                                                    <div class="tbl-row">
                                                                                        <div class="tbl-cell">
                                                                                            <div class="exp-timeline-range">{new Date(value.fromDate).getFullYear()} - {new Date(value.toDate).getFullYear()}</div>
                                                                                            <div class="exp-timeline-status">{value.companyName}</div>
                                                                                            <div class="exp-timeline-location">{value.designation}</div>
                                                                                        </div>
                                                                                        <div class="tbl-cell tbl-cell-logo">
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
                                                    ) : ('')}
                                                </CardBody>
                                            </Card>

                                        </Col>
                                        <Col md="8" className="profile-row mobile-card-view mobile-disable" id="profile-summary-info">
                                            <Card className={classes.profileCard} >
                                                <CardBody className="noPadding summary-label">
                                                    <label class="merritos-sub-label-nm">
                                                        <i class="material-icons">group</i>
                                                        Summary
							                </label>
                                                    <div class="summary-body">
                                                        <span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName + "  didn't add any summary"}</span>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                ) : ('')}
                            </Container>
                        </Col>
                        <Col xs="12" sm="12" md="9" style={this.state.showJobDetails ? {} : { display: 'none' }} className='layout-right'>
                            <Container className="mobileviewheight">
                                <Row className="mobileviewrowheight">
                                    <Col xs="6" sm="6" md="6">
                                        <label className="merritos-sub-headerlabel-nm activity-label">
                                            <i className="material-icons back-from-profile" onClick={this.handleBack}>
                                                keyboard_arrow_left
                                             </i>
                                            Jobs details
                                        </label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="12" md="4" className="noPadding" id="layout-left">
                                        <Card className={"mobile-card-view mobile-disable profile-total-card " + classes.profileCard} id="basic-info">
                                            <CardBody className="noPadding">
                                                <section className="box-typical">
                                                    <div className="profile-card">
                                                        <div className="profile-card-image">
                                                            {this.state.imageUrl !== '' ? (<img src={BasePath + '/uploads/150/' + this.state.imageUrl} width="110px" />) : (
                                                                <img src={dummyimg} width="110px" alt="..." />
                                                            )}
                                                        </div>
                                                        <div className="profile-card-name">{this.state.companyName}</div>
                                                        <div className="profile-card-status">{this.state.companyPhone}</div>
                                                        <div className="profile-card-location">{this.state.companyWebsite}</div>

                                                    </div>
                                                </section>

                                            </CardBody>
                                        </Card>
                                        <Card className={"mobile-card-view mobile-disable " + classes.profileCard} id="connections-info">
                                            <CardBody >
                                                <label className="merritos-sub-label-nm">
                                                    <i className="material-icons">
                                                        group
                                                </i>
                                                    Applied candidates
                                                </label>
                                                <ul className="connection-list-details">

                                                    {this.state.appliedCandidatesList !== undefined && this.state.appliedCandidatesList.length > 0 ? (
                                                        this.state.appliedCandidatesList.map((value, key) => {
                                                            return (
                                                                <li key={key} className="merritos-left-menulist" >
                                                                    <div className="merritos-cell" onClick={() => this.showProfileDetails(value)}>
                                                                        <div>
                                                                            {value.profileImage !== undefined && value.profileImage !== '' ? (<img src={BasePath + '/uploads/20/' + value.profileImage} className="merritos-left-menu-img" alt="..." />) : (
                                                                                <img alt="Remy Sharp" src={dummyimg} className="merritos-left-menu-img" />
                                                                            )}
                                                                        </div>
                                                                        <div className="profile-names-roles">
                                                                            <ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            );
                                                        })
                                                    ) : (
                                                            <li className="summary-body"> <span>None of your candidates applied for this job</span></li>
                                                        )}
                                                </ul>
                                            </CardBody>
                                        </Card>

                                    </Col>
                                    <Col xs="12" sm="12" md="8" className="profile-row">
                                        <Card className={"mobile-card-view mobile-disable " + classes.profileCard} id="activity-info">
                                            <CardBody className="jobs-description">
                                                <label className="merritos-sub-label-nm">
                                                    <i className="material-icons">assignment</i>
                                                    Description
							          </label>
                                                <h5>{this.state.jobdetailsTitle}</h5>
                                                <h6>{"Job type :  " + this.state.jobdetailsType}</h6>
                                                <p><span dangerouslySetInnerHTML={{ __html: this.state.jobdetailsDesc }} /></p>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                {this.state.showJobDetails ? (
                    <div className="mobile-view-port">
                        <BottomNavigation
                            showLabels
                            className={"merritos-bottomnav " + classes.bottomNav}
                        >
                            <BottomNavigationAction label="Info" icon={<i class="material-icons">  perm_identity</i>} onClick={(e) => this.mobileTabs(e, '#basic-info')} id="viewOne" />
                            <BottomNavigationAction label="Applied candidates" icon={<i class="material-icons">  people_outline</i>} onClick={(e) => this.mobileTabs(e, '#connections-info')} />
                            <BottomNavigationAction label="Activities" icon={<i class="material-icons">  assignment_ind</i>} onClick={(e) => this.mobileTabs(e, '#activity-info')} />
                        </BottomNavigation>
                    </div>
                ) : null}
                {this.state.showProfile ? (
                    <div className="mobile-view-port">
                        <BottomNavigation
                            showLabels
                            className={"merritos-bottomnav " + classes.bottomNav}
                        >
                            <BottomNavigationAction label="Info" icon={<i class="material-icons">  perm_identity</i>} onClick={(e) => this.mobileProfileTabs(e, '#profile-basic-info')} id="viewTwo" />

                            <BottomNavigationAction label="Summary" icon={<i class="material-icons">  assignment_ind</i>} onClick={(e) => this.mobileProfileTabs(e, '#profile-summary-info')} />
                        </BottomNavigation>
                    </div>
                ) : null}
            </div>
        );
    }
}
const profileList = state => ({
    companydata: state.profile.companydata,
    userId: state.profile.userId,
    profileImage: state.profile.profileImage
});
export default connect(profileList, { fetchOrganizationData })(withStyles(styles)(Jobs));