import React from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ScrollArea from 'react-scrollbar';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import { connect } from 'react-redux';
import robo from 'assets/img/broken-robot.png';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import RoomIcon from '@material-ui/icons/Room';
import UpdateIcon from '@material-ui/icons/Update';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Container, Row, Col } from 'reactstrap';
//icons
import $ from "jquery";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";
import IconButton from '@material-ui/core/IconButton';
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
import avatarImg from "assets/img/usericon.png";
import { loaderfalse } from '../../actions/Loader';
import { getJobsDashboard, getJobsActivity } from '../../actions/Jobs';
import { fetchprofileData } from "../../actions/Profileactions";
import ListItem from '@material-ui/core/ListItem';

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
    '&li': {
      padding: '0px !important'
    }
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

  button: {
    color: '#4747a0',
    cursor: 'pointer',
    fontWeight: '800',

    [theme.breakpoints.down('xs')]: {
      fontSize: '14px !important',
      padding: '6px'
    },
  },

  search: {
    border: '0.5px solid #737373'
  },
  jobsHead: {
    padding: '1px 0px 20px 0px !important',

  },
  jobsFooter: {
    fontSize: '15px',
    fontWeight: '400 !important',
    textTransform: 'none',
    borderTop: '1px solid #ebeff2',
    background: '#f7f8fa',
    padding: '10px',
    margin: '0px 0px -35px -20px',
    width: '115% !important',
    [theme.breakpoints.down('xs')]: {
      width: '327px !important',
    }
  },
  jobType: {
    color: '#ffffff !important'
  },
  listLabel: {
    [theme.breakpoints.down('xs')]: {
      '& span': {
        fontSize: '15px',
        width: '170px',
        marginTop: '45px',
      },
      '& p': {
        width: '222px !important',
        marginBottom: '63px !important'
      }
    },
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
  backArrowActivity: {
    height: '25px'
  },
  jobsActivity: {
    marginTop: '0px !important',
    [theme.breakpoints.down('xs')]: {
      marginTop: '55px !important'
    }
  },
  heading: {
    padding: '15px',
  },
  classheading: {
    fontWeight: 'bold',
    fontSize: '18px',
    paddingLeft: '0px !important',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '12px !important',
      marginBottom: '10px !important',
      fontSize: '16px'
    }
  },
  jobsHeading: {
    paddingTop: '10px !important',
    paddingLeft: '0px !important',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0px !important'
    }
  },
  joblistContainer: {
    padding: '0px !important',
  },
  trendingJobs: {
    marginRight: '-30px !important'
  },
  jobsData: {
    padding: '0px !important'
  },
  companyProfile: {
    padding: '0px 0px 0px -1px !important'
  },
  searchLabel: {
    paddingRight: '0px !important'
  },
  imageCard: {
    height: "40px",
    width: "40px",
    borderRadius: "50px",
  },
  searchContainer: {
    marginBottom: '20px !important'
  },
  activityContainer: {
    maxWidth: '73% !important',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100% !important'
    }
  },
  jobsnoPadding: {
    padding: '0px !important'
  }
});
var filterlabel = 0
class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      br: false,
      robo: robo,
      showTimeLine: true,
      showJobDetails: false,
      showAppliedJobs: false,
      showJobsList: true,
      showApply: false,
      showFilters: true,
      showSearchList: false,
      showSearchBar: false,
      showProfilewall: false,
      jobType: 'Full time',
      jobTitle: '',
      jobTitleState: '',
      jobLocation: '',
      jobLocationState: '',
      jobDesc: '',
      jobDescState: '',
      jobSearch: '',
      appliedJobSearch: '',
      jobsList: [],
      appliedJobsList: [],
      appliedCandidatesList: [],
      filters: [{ "filters": [], label: 'Company', type: 'companyName' }, { "filters": [], label: 'Job Type', type: 'jobType' }, { "filters": [], label: 'Job Location', type: 'jobLocation' }],
      filtersObj: {},
      selectedIndex: 0,
      applyKey: 0,
      applyUserId: '',
      notification: "",
      color: "info",
      jobdetailsTitle: '',
      jobdetailsType: '',
      jobdetailsDesc: '',
      userType: '',
      loader: false,
      applyOpen: false,
      userId: reactLocalStorage.get('userId'),
      showAppliedcandidates: false,
      companyFilter: '',
      typeFilter: '',
      jobFilter: '',
      active: false,
      companyName: '',
      companyAddress: '',
      companyPhone: '',
      companyWebsite: '',
      appliedJobsList: [],
      imageUrl: '',
      jobsTimeline: '',
      applyType: '',
      relatedJobsList: '',
      allJobs: [],
      loginId: '',
      connectId: '',
      showBackPage: ''
    }
  }
  //For removing duplicate names from filtes
  removeDuplicates(arr) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf($.trim(arr[i])) == -1) {
        unique_array.push($.trim(arr[i]))
      }
    }
    return unique_array
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
    this.props.fetchprofileData(this.state.userId);
    let th = this;
    // th.setState({ jobsTimeline: jobsObj.info });
    th.setState({ showTimeLine: true });
    th.setState({ showJobsList: false });
    th.setState({ showJobDetails: false });
    th.setState({ showAppliedJobs: false });
    th.setState({ showAppliedcandidates: false });
    th.setState({ showSearchList: false });
    th.setState({ showProfilewall: false });
    localStorage.getItem('userType');
    let userType = localStorage.userType;
    if (!userType) {
      this.props.history.push('/');
    }
    th.setState({ showApply: true });
    th.setState({ showFilters: true });
    this.props.getJobsDashboard(this.state.userId);
    this.setState({ showJobs: false });
    //jobs activity timeline
    this.props.getJobsActivity(this.state.userId)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profileImage) {
      this.props.companydata.path = nextProps.profileImage;
    } else if(nextProps.jobsTimeline){
      this.setState({ jobsTimeline: nextProps.jobsTimeline })
    } else if(nextProps.trendingJobs.length > 0){
      this.setState({ allJobs: nextProps.trendingJobs })
    } else if(nextProps.relatedJobsList){
      this.setState({ relatedJobsList: nextProps.relatedJobsList });
    } else if(nextProps.appliedJobsList.length > 0){
      this.setState({ appliedJobsList: nextProps.appliedJobsList });
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
  chatOpen() {
    this.props.history.push('/underconstruction');
  }
  //For getting related job details
  handleJobDetails = (key, type) => {
    var th = this;
    let jobDetails;
    if (type === 'related') {
      jobDetails = { _id: this.state.relatedJobsList[key]._id, userId: th.state.userId };
    }
    else if (type === 'alljobs') {
      jobDetails = { _id: this.state.allJobs[key]._id, userId: th.state.userId };
    }
    else {
      jobDetails = { _id: this.state.jobsList[key]._id, userId: th.state.userId };
    }
    fetch(BasePath + '/jobinfo', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(jobDetails)
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        if (resp.length === 1) {
          th.setState({ showJobDetails: true });
          th.setState({ showJobsList: false });
          th.setState({ showSearchList: false });
          th.setState({ showSearchBar: false });
          th.setState({ showTimeLine: false });
          th.setState({ showBackPage: 'joblist' });
          th.setState({ jobsDetailsList: resp.result.appliedfriends });
          th.setState({ jobdetailsTitle: resp.result.jobinfo.jobTitle });
          th.setState({ jobdetailsType: resp.result.jobinfo.jobType });
          th.setState({ jobdetailsDesc: resp.result.jobinfo.jobDesc });
          th.setState({ jobLocation: resp.result.jobinfo.jobLocation });
          //company info
          th.setState({ companyName: resp.result.jobinfo.companyinfo.companyName });
          th.setState({ companyAddress: resp.result.jobinfo.companyinfo.address });
          th.setState({ companyPhone: resp.result.jobinfo.companyinfo.primary });
          th.setState({ companyWebsite: resp.result.jobinfo.companyinfo.website });
          th.setState({ imageUrl: resp.result.jobinfo.companyinfo.profileImage })
          th.setState({ showAppliedcandidates: false });
          $('#viewOne').trigger('click');
        }
      }).catch((err) => {
        th.setState({ notification: err.message });
        th.setState({ color: 'error' });
        th.showNotification('br');
      })
  }

  //For getting applied jobs 
  handleAppliedjobDetails = (val, key, type) => {
    var th = this;
    // let applied;
    // if (type === 'timeline') {
    //   applied = val.id
    // }
    // else {
    //   applied = val._id
    // }
    let jobDetails;
    if (type === 'related') {
      jobDetails = { _id: this.state.relatedJobsList[key]._id, userId: th.state.userId };
    }
    else if (type === 'alljobs') {
      jobDetails = { _id: this.state.allJobs[key]._id, userId: th.state.userId };
    }
    else {
      jobDetails = { _id: val, userId: th.state.userId };
    }
    fetch(BasePath + '/jobinfo', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(jobDetails)
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        if (resp.length === 1) {
          th.setState({ showJobDetails: true });
          th.setState({ showJobsList: false });
          th.setState({ showTimeLine: false });
          th.setState({ showSearchList: false });
          th.setState({ showSearchBar: false });
          th.setState({ showBackPage: 'timeline' });
          th.setState({ jobsDetailsList: resp.result.appliedfriends });
          th.setState({ jobdetailsTitle: resp.result.jobinfo.jobTitle });
          th.setState({ jobdetailsType: resp.result.jobinfo.jobType });
          th.setState({ jobdetailsDesc: resp.result.jobinfo.jobDesc });
          th.setState({ jobLocation: resp.result.jobinfo.jobLocation });
          //company info
          th.setState({ companyName: resp.result.jobinfo.companyinfo.companyName });
          th.setState({ companyAddress: resp.result.jobinfo.companyinfo.address });
          th.setState({ companyPhone: resp.result.jobinfo.companyinfo.primary });
          th.setState({ companyWebsite: resp.result.jobinfo.companyinfo.website });
          $('#viewOne').trigger('click');
          if (resp.result.jobinfo.companyinfo.profileImage !== "") {
            th.setState({ imageUrl: resp.result.jobinfo.companyinfo.profileImage })
          }
          else if (resp.result.jobinfo.companyinfo.profileImage === "") {
            th.setState({ imageUrl: '' });
          }
          th.setState({ showAppliedcandidates: false });
        }
      }).catch((err) => {
        th.setState({ notification: err.message });
        th.setState({ color: 'error' });
        th.showNotification('br');
      })
  }
  handleActivityjobDetails = (val, key) => {
    var th = this;
    let jobDetails = { _id: val.id, userId: th.state.userId };
    fetch(BasePath + '/jobinfo', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(jobDetails)
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        if (resp.length === 1) {
          th.setState({ showJobDetails: true });
          th.setState({ showJobsList: false });
          th.setState({ showTimeLine: false });
          th.setState({ showSearchList: false });
          th.setState({ showSearchBar: false });
          th.setState({ jobsDetailsList: resp.result.appliedfriends });
          th.setState({ jobdetailsTitle: resp.result.jobinfo.jobTitle });
          th.setState({ jobdetailsType: resp.result.jobinfo.jobType });
          th.setState({ jobdetailsDesc: resp.result.jobinfo.jobDesc });
          th.setState({ jobLocation: resp.result.jobinfo.jobLocation });
          //company info
          th.setState({ companyName: resp.result.jobinfo.companyinfo.companyName });
          th.setState({ companyAddress: resp.result.jobinfo.companyinfo.address });
          th.setState({ companyPhone: resp.result.jobinfo.companyinfo.primary });
          th.setState({ companyWebsite: resp.result.jobinfo.companyinfo.website });
          if (resp.result.jobinfo.companyinfo.profileImage !== "") {
            th.setState({ imageUrl: resp.result.jobinfo.companyinfo.profileImage })
          }
          else if (resp.result.jobinfo.companyinfo.profileImage === "") {
            th.setState({ imageUrl: '' });
          }
          th.setState({ showAppliedcandidates: false });
        }
      }).catch((err) => {
        th.setState({ notification: err.message });
        th.setState({ color: 'error' });
        th.showNotification('br');
      })
  }
  //For applying job
  handleApply = (val, key, type) => {
    this.setState({ applyOpen: true });
    this.setState({ applyKey: key });
    this.setState({ applyType: type });
  }
  handleApplyConfirm = () => {
    let th = this;
    let key = this.state.applyKey;
    let appliedJob;
    if (th.state.applyType === 'related') {
      appliedJob = { "applyJobId": this.state.relatedJobsList[key]._id, "applyUserId": this.state.userId }
    }
    else if (th.state.applyType === 'alljobs') {
      appliedJob = { "applyJobId": this.state.allJobs[key]._id, "applyUserId": this.state.userId }
    }
    else {
      appliedJob = { "applyJobId": this.state.jobsList[key]._id, "applyUserId": this.state.userId }
    }
    th.setState({ applyOpen: false });
    th.setState({ loader: true });
    fetch(BasePath + '/jobsapply', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(appliedJob)
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        if (resp.length === 1) {
          th.setState({ notification: resp.message });
          th.setState({ color: 'success' });
          th.showNotification('br');
          let arraydata = th.state.relatedJobsList;
          let searchData = th.state.jobsList;
          let allJobsData = th.state.allJobs;
          let appliedjobsData = th.state.appliedJobsList;
          if (th.state.applyType === 'related') {
            if (th.state.appliedJobsList.length > 0) {
              appliedjobsData.unshift(th.state.relatedJobsList[key]);
            }
            else {
              appliedjobsData.push(th.state.relatedJobsList[key]);
            }
            if (th.state.jobsList.length > 0) {
              th.state.jobsList.map((val, skey) => {
                if (val._id === th.state.relatedJobsList[key]._id) {
                  th.state.jobsList.splice(skey, 1);
                }
              })
            }
            arraydata.splice(key, 1);
            th.setState({ relatedJobsList: arraydata, appliedJobsList: appliedjobsData });
            th.setState({ loader: false });

          }
          else if (th.state.applyType === 'alljobs') {
            if (th.state.appliedJobsList.length > 0) {
              appliedjobsData.unshift(th.state.allJobs[key]);
            }
            else {
              appliedjobsData.push(th.state.allJobs[key]);
            }
            allJobsData.splice(key, 1);
            th.setState({ allJobs: allJobsData, appliedJobsList: appliedjobsData });
            th.setState({ loader: false });
          }
          else {
            if (th.state.appliedJobsList.length > 0) {
              appliedjobsData.unshift(th.state.jobsList[key]);
            }
            else {
              appliedjobsData.push(th.state.jobsList[key]);
            }
            if (th.state.relatedJobsList.length > 0) {
              th.state.relatedJobsList.map((val, rkey) => {
                if (val._id === th.state.jobsList[key]._id) {
                  th.state.relatedJobsList.splice(rkey, 1);
                }
              })
            }
            searchData.splice(key, 1);
            th.setState({ jobsList: searchData, appliedJobsList: appliedjobsData });
            th.setState({ loader: false });
          }

        }
      }).catch((err) => {
        th.setState({ loader: false });
        th.setState({ notification: err.message });
        th.setState({ color: 'error' });
        th.showNotification('br');
      })
  }
  handleApplyClose = () => {
    this.setState({ applyOpen: false });
  }
  //For searching jobs from db
  handleSearch = (event) => {
    let th = this;
    th.setState({ loader: true });
    th.setState({ jobSearch: event.target.value });
    fetch(BasePath + '/searchdata/' + this.state.userId + "/" + event.target.value + "?", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        th.setState({ loader: false });
        filterlabel = resp.info.length;
        th.setState({ jobsList: resp.info })
        var filterslab = th.state.filters;
        resp.info.map((val, index) => {
          // filterslab[0].filters.push(val.CompanyData.companyName);
          filterslab[1].filters.push(val.jobType);
          filterslab[2].filters.push(val.jobLocation);
          // filterslab[3].filters.push(val.jobTitle);
          th.setState({ filters: filterslab });
        })
        th.setState({ showSearchList: true });
        th.setState({ showJobsList: true });
        th.setState({ showSearchBar: true });
        th.setState({ showJobDetails: false });
      }).catch((err) => {
        this.setState({ loader: false });
        this.setState({ notification: err.message });
        this.setState({ color: 'error' });
        this.showNotification('br');
      });
  }
  //For searching applied jobs
  handleAppliedjobsSearch = (event) => {
    let th = this;
    th.setState({ loader: true });
    th.setState({ appliedJobSearch: event.target.value });
    fetch(BasePath + '/appliedjobssearch/' + this.state.userId + "/" + event.target.value + "?", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        th.setState({ loader: false });
        if (resp.length === 1) {
          th.setState({ appliedJobsList: resp.result })
        }
      }).catch((err) => {
        this.setState({ loader: false });
        this.setState({ notification: err.message });
        this.setState({ color: 'error' });
        this.showNotification('br');
      });
  }
  //For filtering jobs with title location type companyname
  handleFilter = (e, cval, type) => {
    let userType = localStorage.userType;
    let th = this;
    if (!$(e.target).hasClass('active')) {
      if (this.state.filtersObj[type]) {
        $(e.target).addClass('active');
        this.state.filtersObj[type].$in.push(cval);
      } else {
        $(e.target).addClass('active');
        this.state.filtersObj[type] = { $in: [cval] }
      }
    }
    else {
      var index = this.state.filtersObj[type].$in.indexOf(cval);
      if (index > -1) {
        this.state.filtersObj[type].$in.splice(index, 1);
        $(e.target).removeClass('active');
        if (this.state.filtersObj[type].$in.length < 1)
          delete this.state.filtersObj[type]
      }
    }
    if (userType === "individual") {
      var data = 'all'
    }
    else {
      var data = this.state.userId
    }
    let filterObj = { filtersObj: this.state.filtersObj, type: data, userId: th.state.userId };
    fetch(BasePath + '/filterjobsearchdata', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(filterObj)
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        if (resp.length === 1) {
          th.setState({ jobsList: resp.info });
          th.setState({ showAppliedcandidates: false });
          th.setState({ showJobDetails: false });
          th.setState({ showAppliedJobs: false });
          th.setState({ showJobs: false });
          th.setState({ showJobsList: true });
        }
      }).catch((err) => {
        th.setState({ notification: err.message });
        th.setState({ color: 'error' });
        th.showNotification('br');
      })
  }
  searchConnections(e) {
    this.setState({ showSearchBar: true });
    this.setState({ showJobsList: true });
    this.setState({ showTimeLine: false });
    this.setState({ showJobDetails: false });
    this.setState({ showBackPage: 'joblist' });
    this.setState({ jobSearch: "" });
  }
  handleBack = () => {
    if (this.state.showBackPage === 'timeline') {
      this.setState({ showJobsList: false });
      this.setState({ showTimeLine: true });
      this.setState({ showSearchBar: false });
    } else {
      this.setState({ showJobsList: true });
      this.setState({ showTimeLine: false });
      this.setState({ showSearchBar: true });
      this.setState({ showBackPage: 'timeline' });
    }
    this.setState({ showJobDetails: false });
    this.setState({ showAppliedJobs: false });
    this.setState({ showAppliedcandidates: false });
    this.setState({ jobSearch: "" });
  }
  handleActivityBack = () => {
    if (this.state.showBackPage === 'timeline') {
      this.setState({ showJobsList: false });
      this.setState({ showTimeLine: true });
      this.setState({ showSearchBar: false });
      this.setState({ showJobDetails: false });
    } else {
      if (this.state.showJobsList) {
        this.setState({ showJobDetails: true });
        this.setState({ showJobsList: false });
        this.setState({ showSearchBar: false });
      }
      else {
        this.setState({ showJobsList: true });
        this.setState({ showJobDetails: false });
        this.setState({ showSearchBar: true });
      }
      this.setState({ showTimeLine: false });
      this.setState({ showBackPage: 'timeline' });
    }
    this.setState({ jobSearch: "" });
    this.setState({ showAppliedJobs: false });
    this.setState({ showAppliedcandidates: false });
    this.setState({ showSearchList: false });
  }
  // handleProfilewall = (val, key, type) => {
  //   let th = this;
  //   this.setState({ loginId: th.state.userId });
  //   this.props.history.push({
  //     pathname: '/Profilewall/' + val.userId,
  //     state: {
  //       loginId: th.state.userId,
  //       connectId: val.userId
  //     }
  //   })
  // }
  handleProfilewall = (val, key, type) => {
    let th = this;
    this.setState({ loginId: th.state.userId });
    this.props.history.push({
      pathname: '/Connections/' + val.userId,
      state: {
        loginId: th.state.userId,
        connectId: val.userId
      }
    })
  }
  // keydownHandler = (e) => {
  //   if (e.key === 'Enter') {
  //     this.handleSearch();
  //   }
  // }
  // searchKeydownHandle = (e) => {
  //   if (e.key === 'Enter') {
  //     this.handleAppliedjobsSearch();
  //   }
  // }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ br: false });
  };
  componentDidUpdate() {
    setTimeout(() => this.props.loaderfalse(window.location.hash.split('#')[1]), 200);
    // $('.layout-right').show();
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.componentupdate
  }
  mobileTabs = (e, id) => {
    if (id == '#activity-info') {
      $('#layout-left').hide();
    } else {
      $('#layout-left').show();
    }
    $(e.target).closest('ul').find('li').removeClass('activeTab-activity');
    $(e.target).closest('li').addClass('activeTab-activity');
    $('.mobile-card-view').addClass('mobile-disable');
    $(id).removeClass('mobile-disable');
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <CircularProgress visible={this.state.loader}></CircularProgress>
        <Dialog
          open={this.state.applyOpen}
          onClose={this.handleApplyClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to apply for this job?
        </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleApplyClose} className='org-edit-nobtn'>No</Button>
            <Button onClick={this.handleApplyConfirm} className='org-edit-yesbtn'>Yes</Button>
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
            {/* user applied jobs */}
            <Col md="3" className="mobile-view mobile-nav-bar full-height">
              <div className={'full-height'}>
                <label className="label-title">Applied jobs</label>

                <div className="searchbar-leftmenu">
                  <input type="text" placeholder="search applied jobs" onChange={this.handleAppliedjobsSearch} />
                  <i class="material-icons">search</i>
                </div>
                <ScrollArea
                  speed={0.8}
                  className="jobs-scroll-area"
                  contentClassName="content"
                  horizontal={false}>
                  <ul className="leftmenu-navbar">
                    {this.state.appliedJobsList !== undefined && this.state.appliedJobsList.length > 0 ? (
                      this.state.appliedJobsList.map((val, key) => {
                        return (
                          <li className="merritos-left-menulist hideList">
                            <div className="merritos-cell">
                              <div className="merritos-cell-text" onClick={() => this.handleAppliedjobDetails(val._id, key)}>
                                <div>
                                  {val.CompanyData.profileImage !== '' && val.CompanyData.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.CompanyData.profileImage} className="merritos-left-menu-img" alt="..." />) : (
                                    <img alt="Remy Sharp" src={avatarImg} className="merritos-left-menu-noimg" />
                                  )}
                                </div>
                                <div className="profile-names-roles">
                                  <ListItemText primary={val.jobTitle} secondary={val.jobType + " ," + val.jobLocation} />
                                </div>
                              </div>
                              <i class="material-icons" onClick={(e) => { this.chatOpen() }}>
                                chat_bubble_outline
</i>
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

            {/* Search bar */}
            <Col xs="12" sm="12" md="9" style={this.state.showSearchBar ? {} : { display: 'none' }} className="layout-right">

              <Container className="mobileviewheight">
                <Row className="mobileviewrowheight">
                  <Col xs="6" sm="6" md="6">
                    <label class="merritos-sub-headerlabel-nm activity-label">
                      <i class="material-icons back-from-profile" onClick={this.handleActivityBack}>
                        keyboard_arrow_left
                        </i>
                      <div className="titlejob-mobile">
                        Jobs
                      </div>
                    </label>
                  </Col>
                  <Col xs="6" sm="6" md="6">
                    <div className="jobs-searchbar-leftmenu">
                      <input type="text" className="connection-search-bar jobs-search-bar " placeholder="search jobs by job title" value={this.state.jobSearch} onChange={this.handleSearch} />
                      <i class="material-icons">search</i>
                    </div>
                  </Col>
                </Row>
              </Container>

            </Col>
            {/* filters list && search jobs list */}
            <Col xs="12" sm="12" md="9" style={this.state.showSearchList ? {} : { display: 'none' }} className={'layout-right ' + classes.jobsnoPadding}>
              <h4 className="related-jobs">Search jobs</h4>
              <Container>
                <Row>
                  <Col md="12" className="filters-col" style={this.state.showFilters ? {} : { display: 'none' }}>
                    {filterlabel > 0 ? (
                      this.state.filters.map((val, key) => {
                        val.filters = this.removeDuplicates(val.filters)
                        return (
                          val.filters.map((cval, key) => {
                            return (
                              <span className="jobs-filters" value={cval} onClick={(e) => this.handleFilter(e, cval, val.type)}>
                                {'#' + cval}
                              </span>
                            )
                          })
                        )
                      })
                    ) : (
                        ""
                      )}
                  </Col>
                  {this.state.jobsList !== undefined && this.state.jobsList.length > 0 ? (
                    this.state.jobsList.map((val, key) => {
                      return (
                        <Col xs="12" sm="12" md="4" className="jobs-card">
                          <Card className={classes.jobsCard} >
                            <CardBody>
                              <Container className={classes.joblistContainer}>
                                <Row>
                                  <Col xs="2" sm="2" md="2" className="jobs-img-col">
                                    {val.CompanyData.profileImage !== "" && val.CompanyData.profileImage !== undefined ? (<img src={BasePath + '/uploads/' + val.CompanyData.profileImage} />) : (<img src={dummyimg} />)}
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
                            <CardFooter className="job-footer">
                              <Container className="job-buttons">
                                <Row>
                                  <Col xs="6" sm="6" md="6" >
                                    <p variant="contained" color="secondary" className={classes.button} onClick={() => this.handleJobDetails(key, 'search')}>Job details</p>
                                  </Col>
                                  <Col xs="6" sm="6" md="6">
                                    <p variant="contained" color="secondary" className={classes.button} onClick={() => this.handleApply(val, key, 'search')}>Apply job</p>
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
            {/*related jobs list */}
            <Col xs="12" sm="12" md="9" style={this.state.showJobsList ? {} : { display: 'none' }} className={'layout-right ' + classes.jobsnoPadding}>
              <h4 className="related-jobs">Recommended jobs</h4>
              <Container>
                <Row>
                  {this.state.relatedJobsList !== undefined && this.state.relatedJobsList.length > 0 ? (
                    this.state.relatedJobsList.map((val, key) => {
                      return (
                        <Col xs="12" sm="12" md="4" className="jobs-card">
                          <Card className={classes.jobsCard} >
                            <CardBody>
                              <Container className={classes.joblistContainer}>
                                <Row>
                                  <Col xs="2" sm="2" md="2" className="jobs-img-col">
                                    {val.CompanyData.profileImage !== "" && val.CompanyData.profileImage !== undefined ? (<img src={BasePath + '/uploads/' + val.CompanyData.profileImage} />) : (<img src={dummyimg} />)}
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
                            <CardFooter className="job-footer">
                              <Container className="job-buttons">
                                <Row>
                                  <Col xs="6" sm="6" md="6" >
                                    <p variant="contained" color="secondary" className={classes.button} onClick={() => this.handleJobDetails(key, 'related')}>Job details</p>
                                  </Col>
                                  <Col xs="6" sm="6" md="6">
                                    <p variant="contained" color="secondary" className={classes.button} onClick={() => this.handleApply(val, key, 'related')}>Apply job</p>
                                  </Col>
                                </Row>
                              </Container>
                            </CardFooter>
                          </Card>
                        </Col>
                      );
                    })
                  ) : (this.state.allJobs !== undefined && this.state.allJobs.length > 0 ? (
                    this.state.allJobs.map((val, key) => {
                      return (
                        <Col xs="12" sm="12" md="4" className="jobs-card custom-row">
                          <Card className={classes.jobsCard} >
                            <CardBody>
                              <Container className={classes.joblistContainer}>
                                <Row>
                                  <Col xs="2" sm="2" md="2" className="jobs-img-col">
                                    {val.CompanyData.profileImage !== "" && val.CompanyData.profileImage !== undefined ? (<img src={BasePath + '/uploads/' + val.CompanyData.profileImage} />) : (<img src={dummyimg} />)}
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
                            <CardFooter className="job-footer">
                              <Container className="job-buttons">
                                <Row>
                                  <Col xs="6" sm="6" md="6" >
                                    <p variant="contained" color="secondary" className={classes.button} onClick={() => this.handleJobDetails(key, 'alljobs')}>Job details</p>
                                  </Col>
                                  <Col xs="6" sm="6" md="6">
                                    <p variant="contained" color="secondary" className={classes.button} onClick={() => this.handleApply(val, key, 'alljobs')}>Apply job</p>
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
                        <div className="nolist-found">
                          <img src={this.state.robo} width="100px" />
                          <br />
                          <div>No jobs list found</div>
                        </div>
                      </div>
                    ))}
                </Row>
              </Container>
            </Col>
            {/* job details && applied jobs details && trending job details*/}
            <Col xs="12" sm="12" md="9" style={this.state.showJobDetails ? {} : { display: 'none' }} className={'layout-right '}>
              <Container className="mobileviewheight">
                <Row className="mobileviewrowheight">
                  <Col xs="6" sm="6" md="6">
                    <label class="merritos-sub-headerlabel-nm  activity-label" >
                      <i class="material-icons back-from-profile" onClick={() => this.handleBack()}>
                        keyboard_arrow_left</i> Profile</label>
                  </Col>
                  <Col xs="6" sm="6" md="6">
                    <label class="jobs-people-label" onClick={(e) => this.searchConnections(e)}>
                      <i class="material-icons">add</i>Search jobs</label>
                    <input className="connection-search-bar" id="connection-search-bar" input type="text" placeHolder="search connections" />
                  </Col>
                </Row>
                <Row>
                  <Col md="4" className="noPadding profile-row" id="layout-left">
                    <Card className="mobile-card-view mobile-disable profile-total-card " id="basic-info">
                      <CardBody className="noPadding">
                        <section class="box-typical">
                          <div className="profile-card">
                            <div className="profile-card-image">
                              {this.state.imageUrl !== "" && this.state.imageUrl !== undefined ? (<img src={BasePath + '/uploads/150/' + this.state.imageUrl} width="110px" />) : (
                                <img alt="Remy Sharp" src={avatarImg} />
                              )}
                            </div>
                            <div className="profile-card-name">{this.state.companyName}</div>
                            <div className="profile-card-status">{this.state.companyPhone}</div>
                            <div className="profile-card-location">{this.state.companyWebsite}</div>
                          </div>
                        </section>
                      </CardBody>
                    </Card>
                    <Card className="mobile-card-view mobile-disable" id="connections-info">
                      <CardBody >

                        <label className="merritos-sub-label-nm">
                          <i className="material-icons">
                            group
                        </i>
                          Applied candidates
                        </label>
                        <ul className="connection-list-details">
                          {this.state.jobsDetailsList !== undefined && this.state.jobsDetailsList.length > 0 ? (
                            this.state.jobsDetailsList.map((value, key) => {
                              return (
                                <li key={key} className="merritos-left-menulist" >
                                  <div className="merritos-cell">
                                    <div>
                                      {value.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + value.profileImage} className="merritos-left-menu-img" alt="..." />) : (
                                        <img alt="Remy Sharp" src={avatarImg} className="merritos-left-menu-noimg" />
                                      )}
                                    </div>
                                    <div className="profile-names-roles" onClick={() => this.handleProfilewall(value, key, 'appliedFriends')}>
                                      <ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} />
                                    </div>
                                  </div>
                                </li>
                              );
                            })
                          ) : (
                              <li className="summary-body"> <span>None of your connections applied for this job</span></li>
                            )}
                        </ul>
                      </CardBody>
                    </Card>

                  </Col>
                  <Col xs="12" sm="12" md="8" className="profile-row">
                    <div className="mobile-card-view mobile-disable" id="activity-info">
                      <Card className="profile-total-card">
                        <CardBody className="jobs-description">
                          <label className="merritos-sub-label-nm desc-labe">
                            <i className="material-icons">assignment</i>
                            Description
							          </label>
                          <h5>{this.state.jobdetailsTitle}</h5>
                          <h6>{"Job type :  " + this.state.jobdetailsType}</h6>
                          <p><span dangerouslySetInnerHTML={{ __html: this.state.jobdetailsDesc }} /></p>
                        </CardBody>
                      </Card>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
            {/* jobs time line */}
            <Col xs="12" sm="12" md="9" style={this.state.showTimeLine ? {} : { display: 'none' }} className={'layout-right layout-hide' + classes.activityContainer}>
              <Container className="mobileviewheight jobs-mobile-activity">
                <Row className="mobileviewrowheight">
                  <Col xs="6" sm="6" md="6">
                    <label className="merritos-sub-headerlabel-nm activity-label">
                      Activity
                    </label>
                  </Col>
                  <Col xs="6" sm="6" md="6">
                    <label className="jobs-people-label" onClick={(e) => this.searchConnections(e)}>
                      <i className="material-icons">add</i>
                      Search jobs
							      </label>
                  </Col>

                </Row>
              </Container>
              <Row>
                <Col md='12' className='jobs-activity-col'>
                  {this.state.jobsTimeline.length > 0 && this.state.jobsTimeline !== "" && this.state.jobsTimeline !== undefined ? (
                    this.state.jobsTimeline.map((val, key) => {
                      return (
                        <Card className={'nbg-color ' + classes.jobsActivity}>
                          <CardBody className='noPadding jobs-card-div'>
                            <div class="jobs-activity-date">
                              {this.dateLongStr(new Date(val.date))}
                              <div className="jobs-timeline-border"></div>
                            </div>
                            <div className="jobs-activity-container">
                              {val.todayActivity.map((val, Akey) => {
                                return (
                                  <div className="todayactivity-container">
                                    {/* <div className="jobs-activity-header">
                                      <div className="ativity-header-img">
                                        {val.profileImage !== '' && val.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.profileImage} className='applied-candidates-details-img' />) : (<img src={dummyimg} className='applied-candidates-details-img' />)}
                                      </div>
                                      <div className="applied-job">
                                        <div onClick={() => this.handleProfilewall(val, key, 'activity')}>{val.name}</div>
                                        <p>{val.role}</p>
                                      </div>
                                    </div> */}
                                    {val.activity.map((val, key) => {
                                      val.userId === this.state.userId ? (val.Name = 'You') : (val.Name = val.Name)
                                      return (
                                        <ListItem>
                                          {val.profileImage !== '' && val.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + val.profileImage} className="jobs-left-menu-img" />) :
                                            (<img src={dummyimg} className="jobs-activity-noimg" />)}
                                          <ListItemText primary={<div><span className='activity-name' onClick={() => this.handleProfilewall(val, key)}>{val.Name}</span>&nbsp;
                                              {"applied for"}&nbsp;<span className='activity-name' onClick={() => this.handleAppliedjobDetails(val.id, key, 'timeline')}>{val.jobTitle}</span>&nbsp;
                                              {"created by"}&nbsp;<span className='activity-company-name'>{val.companyName}</span></div>} secondary={val.time} />
                                        </ListItem>
                                      );
                                    })}
                                  </div>
                                )
                              })}
                            </div>
                          </CardBody>
                        </Card>
                      )
                    })
                  ) : (<div className="full-height full-width">
                    <div className="jobs-noactivity">
                      <i class="material-icons">access_time</i>
                      <h5>No activity found yet</h5>
                    </div>
                    <h4 className="trending-jobs-title">Trending jobs</h4>
                    <Container>
                      <Row className={classes.trendingJobs}>
                        {this.state.relatedJobsList.length > 0 ? (
                          this.state.relatedJobsList !== undefined && this.state.relatedJobsList.length > 0 ? (
                            this.state.relatedJobsList.map((val, key) => {
                              return (
                                <Col xs="12" sm="12" md="4" className="trending-card">
                                  <Card className={classes.jobsCard} >
                                    <CardBody>
                                      <Container className={classes.joblistContainer}>
                                        <Row>
                                          <Col xs="2" sm="2" md="2" className="jobs-img-col">
                                            {val.CompanyData.profileImage !== "" && val.CompanyData.profileImage !== undefined ? (<img src={BasePath + '/uploads/' + val.CompanyData.profileImage} />) : (<img src={dummyimg} />)}
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
                                    <CardFooter className="job-footer">
                                      <Container className="job-buttons">
                                        <Row>
                                          <Col xs="6" sm="6" md="6" >
                                            <p variant="contained" color="secondary" className={classes.button} onClick={() => this.handleAppliedjobDetails(val, key, 'related')}>Job details</p>
                                          </Col>
                                          <Col xs="6" sm="6" md="6">
                                            <p variant="contained" color="secondary" className={classes.button} onClick={() => this.handleApply(val, key, 'related')}>Apply job</p>
                                          </Col>
                                        </Row>
                                      </Container>
                                    </CardFooter>
                                  </Card>
                                </Col>
                              );
                            })
                          ) : (
                              ''
                            )
                        ) : (this.state.allJobs !== undefined && this.state.allJobs.length > 0 ? (
                          this.state.allJobs.map((val, key) => {
                            return (
                              <Col xs="12" sm="12" md="4" className="trending-card custom-row">
                                <Card className={classes.jobsCard} >
                                  <CardBody>
                                    <Container className={classes.joblistContainer}>
                                      <Row>
                                        <Col xs="2" sm="2" md="2" className="jobs-img-col">
                                          {val.CompanyData.profileImage !== "" && val.CompanyData.profileImage !== undefined ? (<img src={BasePath + '/uploads/' + val.CompanyData.profileImage} />) : (<img src={dummyimg} />)}
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
                                  <CardFooter className="job-footer">
                                    <Container className="job-buttons">
                                      <Row>
                                        <Col xs="6" sm="6" md="6" >
                                          <p variant="contained" color="secondary" className={classes.button} onClick={() => this.handleAppliedjobDetails(val, key, 'alljobs')}>Job details</p>
                                        </Col>
                                        <Col xs="6" sm="6" md="6">
                                          <p variant="contained" color="secondary" className={classes.button} onClick={() => this.handleApply(val, key, 'alljobs')}>Apply job</p>
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
                              <div className="nolist-found">
                                <img src={this.state.robo} width="100px" />
                                <br />
                                <div>No jobs list found</div>
                              </div>
                            </div>
                          ))}
                      </Row>
                    </Container>
                  </div>)}
                </Col>
              </Row>
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
              <BottomNavigationAction label="Students" icon={<i class="material-icons">  people_outline</i>} onClick={(e) => this.mobileTabs(e, '#connections-info')} />
              <BottomNavigationAction label="Activities" icon={<i class="material-icons">  assignment_ind</i>} onClick={(e) => this.mobileTabs(e, '#activity-info')} />
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
  profileImage: state.profile.profileImage,
  componentupdate: state.jobs.componentupdate,
  trendingJobs: state.jobs.trendingJobs,
  relatedJobsList: state.jobs.relatedJobsList,
  appliedJobsList: state.jobs.appliedJobsList,
  jobsTimeline: state.jobs.jobsTimeline,
});
export default connect(profileList, { loaderfalse, fetchprofileData, getJobsDashboard, getJobsActivity })(withStyles(styles)(Jobs));
