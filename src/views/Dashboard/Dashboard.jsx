import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import avatar from "assets/img/usericon.png";
import winner from "assets/img/target.png";
import linegoal from "assets/img/linegoal.png";
import arrow from "assets/img/long-arrow-right.png";
import ScrollArea from "react-scrollbar";
import Dialog from '@material-ui/core/Dialog';
import { Container, Row, Col } from 'reactstrap';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MediaQuery from 'react-responsive';
import CardFooter from "components/Card/CardFooter.jsx";
import LocationOnIcon from '@material-ui/icons/LocationOn';


import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CameraAlt from "@material-ui/icons/CameraAlt";
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from "@material-ui/core/FormControl";
import Button from '@material-ui/core/Button';
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
import CardIcon from "components/Card/CardIcon.jsx";

import Profile from "../Pages/Profile.jsx";
import Education from "../Pages/Education.jsx";
import Workexperience from "../Pages/Workexperience.jsx";
import Achivements from "../Pages/Achivements.jsx";
import Expertise from "../Pages/Expertise.jsx";
import Recommendation from "../Pages/Recommendation.jsx";
import Certificates from "../Pages/Certificates.jsx";
import MentorDetails from "../Pages/MentorDetails.jsx";
import Schedule from "../Pages/Schedule.jsx";
import CreateSchedule from "../Pages/CreateSchedule.jsx";
import Payment from "../Pages/Payment.jsx";
import { fetchprofileData } from "../../actions/Profileactions";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";
import { getClassesList, getMyClassesList } from "../../actions/Classes";
import HorizontalTimeline from "components/Timeline/HorizontalTimeline.jsx";
import MobileTimeline from "components/Timeline/HorizontalTimelineContent";
import GameInfo from './content';
import Timeline from "components/Timeline/Timeline.jsx";
import Clock from './clock.jsx'
import "assets/css/styles.css";
import "assets/css/customgrid.css";
import "assets/css/custom.css";
import "assets/css/custommobileview.css";
import "assets/css/jobs.css";
import "assets/css/classes.css";
import "assets/css/merritosform.css";
import "assets/css/login.css";
import "assets/css/accountinfo.css";
import "assets/css/profile.css";
import "assets/css/activityprofile.css";
import "assets/css/listmobile.css";
import "assets/css/wall.css";
import "assets/css/activity.css";
import $ from "jquery";
import timelineData from 'timeline.json'
import "assets/css/merritos-modal.css";
import GoalPage from './../Register/Goal';

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
 import Snackbar from '@material-ui/core/Snackbar';
import avatarImg from "assets/img/usericon.png";
import { loaderfalse } from '../../actions/Loader';

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

var array = timelineData.none;
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  bottomNav: {
    top: 'auto',
    bottom: 0,
    position: 'fixed',
    width: '100%',
    left: 0,
	borderTop: "solid 1px #999",
	marginTop:0,
	
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
    bottom: '5px',
    position: 'absolute',
    left: '120px',
    cursor: 'pointer',
    color: '#b4b4b4'
  },
  cardHeight: {
    height: "350px"
  },
  navcard: {
    marginTop: '10px',
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
  button: {
    margin: theme.spacing.unit,
  },
  name: {
    display: 'block',
    color: '#adb8c2',
    fontSize: '13px',
    fontWeight: '400',
    padding: '17px 27px 0',
    marginBottom: '-26px',
  },
  datesdiv: {
    float: 'left',
    width: '50%',
    textAlign: 'center',
    position: 'relative',
  },
  dates: {
    border: '1px solid #ebeff2',
    borderRadius: '5px',
    padding: '0px 0px',
    margin: '7px 20px 0',
    fontSize: '16px',
    color:'#4747a0',
    overflow: 'auto',
  },
  datesspan: {
    width: '1px',
    height: '40px',
    position: 'absolute',
    right: 0,
    top: 0,
    background: '#ebeff2',
  },
  datesstrong: {
    display: 'block',
    color: '#adb8c2',
    fontSize: '11px',
    fontWeight: '700',
  },
  stats: {
    borderTop: '1px solid #ebeff2',
    background: '#f7f8fa',
    overflow: 'auto',
    padding: '0 0',
    fontSize: '16px',
    color: '#59687f',
    fontWeight: 600,
    marginTop: '7px',
    borderRadius: '0 0 5px 5px',
  },
  statsdiv: {
    borderRight: '1px solid #ebeff2',
    width: '90px',
    float: 'left',
    textAlign: 'center',
  },
  classmentorname: {
    fontSize: '14px',
    color: '#4747a0',
    float: 'right',
    paddingRight: '28px',
  },
  newClass: {
   
  },
  header: {
    margin: 0,
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
		 isPaneOpen: false,
            isClassesPane: false,
			 isJobsPane: false,
			  isTipsPane: false,
			   isInsightsPane: false,
      curIdx: Number(array.length)-1,
      prevIdx: -1,
      br: false,
      selectedFile: '',
      imageurl: avatar,
      linegoal: linegoal,
      winner:winner,
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
      newfeed:[],
      jobList:[],
      array:array,
      suggestions: [],
      timelinetitle:"What do you want to be next ?",
      anchorGoal: false
    }
    this.stepChangeFunc = this.stepChangeFunc.bind(this);
  }
   componentDidMount() {
        Modal.setAppElement(this.el);
      
    }
    componentWillMount() {
     
    }
    closeBar(){
      $('.statusbar').remove();
    }
    closeBarMob(){
      $('.mob-profilebar').remove();
    }
    goToProfile=()=>{
      this.props.history.push('/Profile');
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
  gotoclass = ()=>{
    this.props.history.push({
      pathname: '/Classes',
            state: {
              text: 'find'
            }
    });
  }
  showprofilewall = ()=>{
    this.props.history.push('/Connections/'+this.state.userId)
  }
  handleSelect = name => value => {
    this.setState({
      goal: value.value,
      name: value.label
    });
  };
  addskills=(goal)=>{
    const th = this;
    if($.trim($('.skillinput').val())==''){
      $('.skillinput').after('<span style="color:red;font-size:12px;display:block">Field should not be empty</span>');
      return false
    }
   
    let data = {skill:$('.skillinput').val()}
    fetch(BasePath + '/addskill/'+this.state.userId, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data),
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        $('.Timeline').animate({
          scrollLeft: 0
      });
      $('.prevline').hide();
      var obj = {"date":"2019-02-19",
        "title":$('.skillinput').val(),
        "author":"",
      "startTime":"",
      "status":0,
      "sq":5,
      "close":true,
      "action":"Find a class",
      "color":"#2196f3"}
     
      var t = th.state.array;
        t.unshift(obj);
        th.setState({array:t});
        th.closeskills();
      })
  }
  closeskills(){
   
    $('.popupboxs').hide();
    $('.skillinput').val('');
    $('.skillinput').next('span').remove();
  }
  skillpopup(){
    $('.popupboxs').show();
  }
  backtoActivitySearch = () => {
    $('.mobile-card-view').hide();
    $('#profile-goal').show();
    $('#profile-timeline').show();
   
};
  stepChangeFunc(notification, color) {
    this.setState({ notification: notification });
    this.setState({ color: color });
    this.showNotification('br');
  }
  handleSnackbarClose = (event, reason) => {
    this.setState({ br: false });
};
  async componentDidMount() {
    const th = this;
let goalData = timelineData;
    await fetch(BasePath+'/newsfeed', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then((resp) => resp.json()) 
      .then(function (resp) {
        if(resp.items.length>0)
           th.setState({newfeed:resp.items.slice(0,5)})
      });

      await fetch(BasePath+'/jobsdashboard/'+ this.state.userId, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .then((resp) => resp.json()) 
        .then(function (resp) {
          if (resp.length === 1) {
          if(resp.result && resp.result.relatedjobs && resp.result.relatedjobs.length>0)
             th.setState({jobList:resp.result.relatedjobs.slice(0,5)})
          }
        });
    await fetch(BasePath + '/teachingclassesinfo/' + this.state.userId, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then((resp) => resp.json()) 
      .then(function (resp) {
        resp.result.map(item => {
          let stime = item.startTime.split(' ');
          item.startDate = stime[3]+' '+stime[0].slice(0, 3)+' '+stime[1]+' '+stime[2];
          let etime = item.endTime.split(' ');
          item.endDate = etime[3]+' '+etime[0].slice(0, 3)+' '+etime[1]+' '+etime[2];
        })
        th.setState({Myclasses: resp.result});
      });


    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    } else {
      this.props.fetchprofileData(this.state.userId,function(profile){
        if(profile[0].goal){
         array= profile[0].timeline;
         if(profile[0].timeline && profile[0].timeline.length<1)
         th.setState({timelinetitle:"No data found."})
         }
           else
           {
          
           array= timelineData.none;
           }
           
          th.setState({array:array});
    th.setState({ loader: true });
      });
     

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
        if (th.props.profileData[0].path !== "" && th.props.profileData[0].path !== undefined) {
          th.setState({ imageurl: BasePath + '/' + th.props.profileData[0].path });
        }
      }, 700);
    }
  }
  handleDialogClose = () => {
    this.setState({ open: false });
  };
  shouldComponentUpdate(nextprops) {
    return nextprops.componentupdate
};
componentDidUpdate() {
  this.props.loaderfalse(window.location.hash.split('#')[1]);
};
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
  handleGoal = () => {
    this.setState({ anchorGoal: true });
  }
  handleGoalUpdate = () => {
    let th = this;
    if (th.state.goal === "") {
      th.setState({ notification: "Please set your goal" });
      th.setState({ color: "danger" });
      th.showNotification('br');
    }
    else {
      let timelinelist=[];
      if(timelineData[th.state.goal]){
         timelinelist = timelineData[th.state.goal];
      }
      let data = { goal: th.state.goal, userId: th.state.userId,timeline:timelinelist }
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
  mobileTabs = (e, id) => {
    if ($(window).width() < 600) {
        $("#profile-goal").hide();
        $("#profile-timeline").hide();
        $(e.target).closest('ul').find('li').removeClass('activeTab-activity');
        $(e.target).closest('li').addClass('activeTab-activity');
        $('.mobile-card-view').addClass('mobile-disable');
        $(id).show();
        $(id).removeClass('mobile-disable');
    }
  }
  fileChangedHandler = (event) => {
    let th = this;
    let selectedFile = event.target.files[0]
    let formData = new FormData();
    formData.append('file', selectedFile);
    fetch(BasePath + '/savedata', {
      method: 'post',
      body: formData
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        let path = BasePath + '/' + data.path;
        let serdata = { "path": data.path, "_id": th.state.userId };
        fetch(BasePath + '/userimageupload', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(serdata)
        }).then(function (resp) {
          th.setState({ imageurl: path });
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
  onOpenModal = (t) => {
    if(t=='p')
    {
    this.setState({ open: true });
    }
    else{
    this.props.history.push({
      pathname: '/Classes',
            state: {
              text: 'find'
            }
    });
  }
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  handleClose = () => {
    this.setState({ open: false });
    this.setState({anchorGoal:false});
  };
  render() {
    const { open, anchorGoal } = this.state;
	const { value } = this.state;
    const { classes, theme, profileData } = this.props;
    const isGoalOpen = Boolean(anchorGoal);
    
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
   
    if (profileData && profileData.length > 0 && profileData[0].isCoach == 'yes') {
      
      showCoach = true;
    } else {
      showCoach = false;
    }

    let profSubMenuArr = [];
    
   
    return (
      <div>
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
        <div className="popupboxs">
        <div className="popupcontant">
        <div className="popupheader">
          <h1>Add Skills</h1>
        </div>
        <div className="popupbody">
        <input type="text" placeholder="Ex: Java" className="skillinput"/>
        </div>
        <div className="popupfooter">
        <button className="popupaddbtn" onClick={(e)=>this.addskills(profileData[0].goal)}>Add</button>
        <button className="popupclosebtn" onClick={this.closeskills}>Close</button>
        </div>
        </div>
        <div className="popupmask"></div>
        </div>
        <MediaQuery query="(orientation: portrait)" query="(orientation: landscape)" query="(min-resolution: 2dppx)" query="(max-device-width: 1224px)">


<Container className="profile-goal" id="profile-goal">
<div className="mob-profilebar">
<span onClick={this.goToProfile}>Complete your profile for professional growth</span>
<i class="material-icons" onClick={this.closeBarMob}>
clear
</i>
</div>
  <div className="profile-goal-row">
    <Col xs="5" sm="5">
      <div className="goalLabel first">
        <div className="disinline profile-pic-timeline">
        {profileData[0].profileImage?(
     
     <img src={BasePath + '/uploads/150/'+profileData[0].profileImage} width="80px" />
   ):(
     <img src={this.state.imageurl} width="80px"/>
   )}
         
        </div>
        <div className="profileinfo">
          <ul className="profileInfoListMob">
            <li> {profileData[0].firstName} {profileData[0].lastName}</li>
            <li> </li>

          </ul>
        </div>
      </div>
    </Col>


    <Col xs="3" sm="3" className="profile-goal-arrow">
     <div className={profileData[0].goal?("arrowfill"):("arrowfillnon")}>

     </div>
    
    </Col>
    <Col xs="4" sm="4">
    <div className="arrfrontmob"></div>
      <div md={4} className="goalLabel">
        <ul className="profileInfoListsecMob" >
          <li>
            <img src={this.state.winner} width="80px" className="disablePic" />
            {/* <i className="material-icons">stars</i> */}
          </li>
          <li>{profileData[0].goal}</li>
        </ul>
      </div>

    </Col>
  </div>
</Container>
<Container id="profile-timeline">
  <Row>
    <Col md={6} className="mobile-timeLine">

      {/* {!profileData[0].goal ? (
        <div className="noGoal"  >
          <i className="material-icons" onClick={this.handleGoal}>
            track_changes
</i>
          <div> <label onClick={this.handleGoal}> Set Your Goal </label></div>
        </div>
      ) : null} */}
      <MobileTimeline
        styles={{
          background: "#f8f8f8",
          foreground: "#1A79AD",
          outline: "#dfdfdf"
        }}
        goal={profileData[0].goal}
        content={this.state.array}
        _this={this}
      />

<Dialog
        fullWidth
            open={this.state.anchorGoal}
          onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            message={
              this.state.notification
            }
           
          >
          
            <GoalPage closebox={this.handleClose}/>
           
          </Dialog>


    </Col>
  </Row>
</Container>


  <Container className="mobile-card-view mobile-disable dashboard-mobile-container" id="basic-info">
   <Row >
                          <Col xs="6" sm="6" md="6">
                              
                                  <label className="merritos-sub-headerlabel-nm activity-label">
                                      <i className="material-icons dashboard-mobile-back" onClick={() => this.backtoActivitySearch()}>
                                          keyboard_arrow_left
                                      </i>
                                     Back
                              </label>
                        


                          </Col>
                       
                      </Row>
    <Row>
      {this.state.ooooo? (

        <Col xs={12} sm={6} md={4} >
 {showCoach?(
                <div className={"addClass classesaction "+classes.newClass} onClick={()=>this.onOpenModal('p')}>
                 <p className="jss368 jss376 jss397 text-16 font-30 text-right pt-16 px-63">Create class</p>
                 <span className="material-icons jss311 text-56" aria-hidden="true">add_circle</span>
                </div>
              ):(
              <div className={"addClass classesaction "+classes.newClass} onClick={()=>this.onOpenModal('s')}>
                <p className="jss368 jss376 jss397 text-16 font-30 text-right pt-16 px-63">Find a class</p>
                <span className="material-icons jss311 text-56" aria-hidden="true">add_circle</span>
                </div>
              )}
          <div className="tiles">

            <div>
              <div className="header "><p className={classes.header}>{this.state.Myclasses[0].courseName}</p> <span className={classes.classmentorname}>by {this.state.Myclasses[0].mentorName}</span></div>
              <div className={classes.dates}>
                <div className={classes.datesdiv}>
                  <strong className={classes.datesstrong}>STARTS</strong>
                  {this.state.Myclasses[0].startDate}
                  <span className={classes.datesspan}></span>
                </div>
                <div className={classes.datesdiv}>
                  <strong className={classes.datesstrong}>ENDS</strong>
                  {this.state.Myclasses[0].endDate}
                </div>
                <Clock text="Starts in: " time={this.state.Myclasses[0].startTime} />
              </div>
              <div className={classes.stats}>
                <div className={classes.statsdiv}>
                  <strong className={classes.datesstrong}>MAX PEOPLE</strong>
                  {this.state.Myclasses[0].maxPeople}
                </div>
                <div className={classes.statsdiv}>
                  <strong className={classes.datesstrong}>JOINED</strong>
                  {this.state.Myclasses[0].buyers.length}
                </div>
                <div className={classes.statsdiv}>
                  <Button variant="contained" size="small" color="primary" className={classes.button}>
                    ENTER
                </Button>
                </div>
              </div>
            </div>
          </div>
        </Col>

      ) : (
          <Col xs={12} sm={6} md={4}>
            <div className="tiles paddingPx ">
            {showCoach?(
                <div className={"classesaction "+classes.newClass} onClick={()=>this.onOpenModal('p')}>
                 <p className="jss368 jss376 jss397 text-16 font-30 text-right pt-16 px-63">Create class</p>
                 <span className="material-icons jss311 text-56" aria-hidden="true">add_circle</span><br/><br/><br/>
                 <p className="jss368 jss376 jss397 text-16 font-300 text-center pt-16 px-63">Join a class to reach your goal</p>
                </div>
              ):(
              <div className={"classesaction "+classes.newClass} onClick={()=>this.onOpenModal('s')}>
                <p className="jss368 jss376 jss397 text-16 font-30 text-right pt-16 px-63">Find a class</p>
                <span className="material-icons jss311 text-56" aria-hidden="true">add_circle</span><br/><br/><br/>
                <p className="jss368 jss376 jss397 text-16 font-300 text-center pt-16 px-63">Join a class to reach your goal</p>
                </div>
              )}
             
            </div>
          </Col>
        )}
    </Row>
  </Container>


  <Container className="mobile-card-view mobile-disable dashboard-mobile-container" id="jobs-alerts">
  <Row >
                          <Col xs="6" sm="6" md="6">
                              
                                  <label className="merritos-sub-headerlabel-nm activity-label">
                                      <i className="material-icons dashboard-mobile-back" onClick={() => this.backtoActivitySearch()}>
                                          keyboard_arrow_left
                                      </i>
                                     Back
                              </label>
                        


                          </Col>
                       
                      </Row>
    <Row>
      <Col xs={12} sm={3} md={6}>
        <div className="tiles paddingPx">
          <h4>Jobs</h4>

          {this.state.jobList.length > 0 ? (
            <List className="nav-item-list">
              {this.state.jobList.map((val, index) => {
                return (
                  <ListItem className="dashbordlist">
                     <i class="material-icons">
fiber_manual_record
</i>
                    <div className="jobTypemob">
                      <h4>{val.jobTitle}</h4>
                      <div className="jobtypelabel">{val.companyName}  {val.jobType}</div>
                    </div>
                  </ListItem>
                )
              })}
            </List>
          ) : (
              <div>
                <label>No jobs list found...</label>
              </div>
            )}
        </div>
      </Col>
    </Row>
  </Container>



  <Container className="mobile-card-view mobile-disable dashboard-mobile-container" id="tips">
  <Row >
                          <Col xs="6" sm="6" md="6">
                              
                                  <label className="merritos-sub-headerlabel-nm activity-label">
                                      <i className="material-icons dashboard-mobile-back" onClick={() => this.backtoActivitySearch()}>
                                          keyboard_arrow_left
                                      </i>
                                     Back
                              </label>
                        


                          </Col>
                       
                      </Row>
    <Row>
  <Col xs={12} sm={6} md={3} className="dashbord-grids">
      <div className="tiles paddingPx">
        <h4>Tips</h4>
        <List className="nav-item-list">
          {profileData[0].goalinfo && profileData[0].goalinfo.length > 0 && profileData[0].goalinfo !== undefined ? (
            profileData[0].goalinfo[0].suggestions.map((value, key) => {
              return (

                <ListItem className="dashbordlist">
                  <i class="material-icons">
fiber_manual_record
</i>
<a href='#'>
                  <ListItemText inset primary={value} className="text-item" />
                  </a>
                </ListItem>

              )
            })
          ) : (<div>
            <label className="noResult">Set your goal to get tips</label>
          </div>)
          }
        </List>
      </div>


    </Col>
    </Row>
    </Container>
    <Container className="mobile-card-view mobile-disable dashboard-mobile-container" id="insights">
  <Row >
                          <Col xs="6" sm="6" md="6">
                              
                                  <label className="merritos-sub-headerlabel-nm activity-label">
                                      <i className="material-icons dashboard-mobile-back" onClick={() => this.backtoActivitySearch()}>
                                          keyboard_arrow_left
                                      </i>
                                     Back
                              </label>
                        


                          </Col>
                       
                      </Row>
    <Row>
    <Col xs={12} sm={6} md={3}>
      <div className="tiles paddingPx">
        <h4>Insights</h4>

        {this.state.newfeed.length > 0 ? (
          <List className="nav-item-list">
            {this.state.newfeed.map((val, index) => {
              return (
                <ListItem className="dashbordlist">
                 <i class="material-icons">
fiber_manual_record
</i>
<a href="#">
                  <ListItemText inset primary={val.title} className="text-item" />
                  </a>
                </ListItem>
              )
            })}
          </List>
        ) : (
            <div>
              <label>Get updates on recent jobs</label>
            </div>
          )}
      </div>
    </Col>
    </Row>
    </Container>
     
<BottomNavigation
 
  showLabels
  className={"merritos-bottomnav " + classes.bottomNav}
>
  <BottomNavigationAction label="My classes" icon={<i className="material-icons">desktop_windows</i>} onClick={(e) => this.mobileTabs(e, '#basic-info')} />
  <BottomNavigationAction label="Job alerts" icon={<i className="material-icons">error</i>} onClick={(e) => this.mobileTabs(e, '#jobs-alerts')}  />
  <BottomNavigationAction label="Tips" icon={<LocationOnIcon />} onClick={(e) => this.mobileTabs(e, '#tips')}  />
  <BottomNavigationAction label="Insights" icon={<i className="material-icons">speaker_notes</i>} onClick={(e) => this.mobileTabs(e, '#insights')}  />
</BottomNavigation>
</MediaQuery>


		<MediaQuery query="(min-device-width: 1224px)" >
   
	
	        <Container>
            <Row>
          <Col xs={12} sm={12} md={12} className="timeLineContent">
          {profileData[0].percentage!='100'?(
             <div className="statusbar" >
             <span onClick={this.goToProfile}>
             Complete your profile for professional growth
             </span>
             <i class="material-icons" onClick={this.closeBar}>
clear
</i>
             </div>
          ):null}
         
            <Card className="bgtrans">
             
        <CardBody className="timeline-height">
        <Container className="full-height">
          <Row>
    <Col md={2} >
    <div className="goalLabel first">
    <div className={profileData[0].goal?("vertical-align"):("vertical-align-non")}>
    <div className="profile-pic-timeline">
    {profileData[0].profileImage?(
     
      <img src={BasePath + '/uploads/150/'+profileData[0].profileImage} />
    ):(
      <img src={this.state.imageurl} width="150px"/>
    )}
    </div>
    <div className="profile-label-name" onClick={this.showprofilewall}>
    {profileData[0].firstName} {profileData[0].lastName}
  {profileData[0].flag=='1'?(
    <span> {profileData[0].role}</span>
  ):null}
    
    </div>
        </div>
        </div>
        <div className="arrend"></div>
        </Col>
        <Col md={7}>
        <div>
        {!profileData[0].goal?(<div>
           <label className="emptyprofile-label">
          
           {this.state.timelinetitle} </label>
           <div className="setyourgoal">Select your goal</div>
           </div>
        ):(
          <div>
          <Typography color="textSecondary" className="roadmap_title">
      Goal tracker
    </Typography>
    <div className="label-timelinehit-mob">
    Merritos recommends below skills to reach your goal
        </div>
        </div>
        )}
          
          <HorizontalTimeline
            styles={{
              background: "#f8f8f8",
              foreground: "#1A79AD",
              outline: "#dfdfdf"
            }}
             profile={profileData[0]}
            stories={this.state.array}
            _this={this}
          />
          {profileData[0].goal?(
             <div className="add-skills-to-goal" onClick={this.skillpopup}>
             <label>
             <i class="material-icons">
             add_circle
             </i>
               Add skills
             </label>
                     </div>
          ):(
            <div className="add-skills-to-goal" onClick={this.handleGoal}>
            <label>
                Find more goals
                </label>
           </div>
          )}
       
        </div>
       
        </Col>
        <Col md={3}>
        <div className={profileData[0].goal?"arrfront":"arrfront-non"}></div>
        <Dialog
        fullWidth
            open={this.state.anchorGoal}
          onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            message={
              this.state.notification
            }
           
          >
          
            <GoalPage closebox={this.handleClose}/>
           
          </Dialog>
        <div   className="goalLabel">
        <ul className={profileData[0].goal?("profileInfoListsec"):("profileInfoListsec-non")} >
        {profileData[0].goal?(
           <li className="enablePic"> 
           <div>
           <img src={this.state.winner} width="100px" />
           </div>
           <div>
           <label >{profileData[0].goal}
           <i className="material-icons"  onClick={this.handleGoal}>
            border_color
            </i>
           </label>
           </div>
           </li>
        
        ):(
          <li className="disablePic"> 
          <div>
          <img src={this.state.winner} width="100px" />
          <i className="material-icons"  onClick={this.handleGoal}>
help_outline
</i>

</div>
          {/* <div className="seturgoal">
          <label onClick={this.handleGoal}>
         
          </label>
          </div> */}
          </li>
       
        )}
         
        </ul>
        </div>
        </Col>
        </Row>
        </Container>
        </CardBody>
      </Card>
    </Col>
        </Row>
        </Container>
        <Container>
          <Row>
              <Col xs={12} sm={6} md={3}>
              <div className="tiles dashboardclasses">
              <h4>My classes</h4>
              {showCoach?(
                <div className={"addClass classesaction "+classes.newClass} onClick={()=>this.onOpenModal('p')}>
                 <p className="jss368 jss376 jss397 text-16 font-30 text-right pt-16 px-63">Create class</p>
                 <span className="material-icons jss311 text-56" aria-hidden="true">add_circle</span>
                </div>
              ):(
              <div className={"addClass classesaction "+classes.newClass} onClick={()=>this.onOpenModal('s')}>
                <p className="jss368 jss376 jss397 text-16 font-30 text-right pt-16 px-63">Find a class</p>
                <span className="material-icons jss311 text-56" aria-hidden="true">add_circle</span>
                </div>
              )}
               {this.state.Myclasses[0]? (
              //    <Card className="class-tile-card">
              //    <CardBody className="classes-header class-tile-header">
              //    <p className={classes.header}>{this.state.Myclasses[0].courseName}</p> <span className={classes.classmentorname}>by {this.state.Myclasses[0].mentorName}</span>
              //    </CardBody>
              //    <CardBody className={'dates ' + classes.customdates}>
              //      <div >
              //        <strong>STARTS</strong>
              //        {this.state.Myclasses[0].startDate}
              //        <span></span>
              //      </div>
              //      <div className={classes.displaytime}>
              //        <strong>ENDS</strong>
              //        {this.state.Myclasses[0].endDate}
              //      </div>
              //      <Clock text="Starts in: " time={this.state.Myclasses[0].startTime} />
              //    </CardBody>
              //    <CardFooter className="job-footer">
              //      <Container className="job-buttons">
              //        <Row>
              //          <Col xs="4" sm="4" md="4" className="classes-states">
              //            <strong className="classes-tile-strong">MAX PEOPLE</strong>
              //            {this.state.Myclasses[0].maxPeople}
              //          </Col>
              //          <Col xs="4" sm="4" md="4" className="classes-states">
              //            <strong className="classes-tile-strong">JOINED</strong>
              //            {this.state.Myclasses[0].buyers.length}
              //          </Col>
              //          <Col xs="4" sm="4" md="4">
              //            <Button variant="contained" size="small" color="primary" className={classes.button}>
              //              ENTER
              //        </Button>
              //          </Col>
              //        </Row>
              //      </Container>
              //    </CardFooter>
              //  </Card>
                
                   <div>
                     <div className="header "><p className={classes.header}>{this.state.Myclasses[0].courseName}</p> <span className={classes.classmentorname}>by {this.state.Myclasses[0].mentorName}</span></div>
                     <div className={classes.dates}>
                       <div className={classes.datesdiv}>
                         <strong className={classes.datesstrong}>STARTS</strong>
                         {this.state.Myclasses[0].startDate}
                         <span className={classes.datesspan}></span>
                       </div>
                       <div className={classes.datesdiv}>
                         <strong className={classes.datesstrong}>ENDS</strong>
                         {this.state.Myclasses[0].endDate}
                       </div>
                         <Clock text = "Starts in: " time = {this.state.Myclasses[0].startTime}/>
                     </div>
                     <div className={classes.stats}>
                       <div className={classes.statsdiv}>
                         <strong className={classes.datesstrong}>MAX PEOPLE</strong>
                         {this.state.Myclasses[0].maxPeople}
                       </div>
                       <div className={classes.statsdiv}>
                         <strong className={classes.datesstrong}>JOINED</strong>
                         {this.state.Myclasses[0].buyers.length}
                       </div>
                       <div className={classes.statsdiv}>
                         <Button variant="contained" size="small" color="primary" className={classes.button}>
                           ENTER
                         </Button>
                       </div>
                     
                   </div>
                 </div>
              
              
             ):(
               
               <div className={"addClass "+classes.newClass}>
              
               <p className="noResult">Join a class to reach your goal</p>
             </div>
            
             )}
              </div>
          </Col>  
          <Col xs={12} sm={6} md={3} className="dashbord-grids">
            <div className="tiles paddingPx">
              <h4>Tips</h4>
              <div className="connection-scroll-area-dash">
              <List className="nav-item-list">
              {profileData[0].goalinfo && profileData[0].goalinfo.length > 0 && profileData[0].goalinfo !== undefined ? (
                profileData[0].goalinfo[0].suggestions.map((value, key) => {
                  return (
                  
                      <ListItem className="dashbordlist">
                       <i class="material-icons">
fiber_manual_record
</i>
                        <a href="#">
                        <ListItemText inset primary={value} className="text-item listPadding"/>
                        </a>
                      </ListItem>
                   
                  )
                })
              ) : ( <div>
                <label className="noResult">Set your goal to get tips</label>
              </div>)
              }
          </List>
          </div>
            </div>
           

          </Col>
          <Col xs={12} sm={6} md={3}>
          <div className="tiles paddingPx">
          <h4>Insights</h4>
          <div  className="connection-scroll-area-dash" >
          {this.state.newfeed.length>0?(
            <List className="nav-item-list">
{this.state.newfeed.map((val,index)=>{
  return(
  <ListItem className="dashbordlist">
      <i class="material-icons">
fiber_manual_record
</i>
        <a href="#">
            <ListItemText inset primary={val.title} className="text-item listPadding"/>
            </a>
            </ListItem>
  )
})}
 </List>
          ):(
          <div>
            <label>Get updates on recent jobs</label>
          </div>
          )}  
          </div>     
          </div>
          </Col>
          <Col xs={12} sm={6} md={3}>
          <div className="tiles paddingPx">
          <h4>Job alerts</h4>
          <div className="connection-scroll-area-dash">
          {this.state.jobList.length>0?(
            <List className="nav-item-list">
{this.state.jobList.map((val,index)=>{
  return(
  <ListItem className="dashbordlist">
      <i class="material-icons">
fiber_manual_record
</i>
                     
            <div className="jobType">
            <h4>
              
              <a href="#">{val.jobTitle}</a></h4>
            <div className="jobtypelabel">{val.companyName}  {val.jobType}</div>
            </div>
            </ListItem>
  )
})}
 </List>
 
          ):(
          <div>
            <label className="noResult">Get updates on recent jobs</label>
          </div>
          )} 
          </div>    
          </div>
          </Col>
        </Row>
        </Container>
       
         
       
		</MediaQuery>
          <CreateSchedule open={open}  onClose={this.handleDialogClose} stepChange={this.stepChangeFunc} _this={this} />
      </div>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};
const profileList = state => ({
  profileData: state.profile.profileData,
  userId: state.profile.userId,
  componentupdate: state.profile.componentupdate

});

export default connect(profileList, { loaderfalse,fetchprofileData })(withStyles(styles, { withTheme: true })(Dashboard));
