import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import avatar from "assets/img/usericon.png";
import winner from "assets/img/winner.png";
import arrow from "assets/img/long-arrow-right.png";
import Select from 'react-select';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import { Container, Row, Col } from 'reactstrap';
// Mobile Bottom
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MediaQuery from 'react-responsive';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';


import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CameraAlt from "@material-ui/icons/CameraAlt";
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
import classNames from 'classnames';
import Modal from "react-responsive-modal";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

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
import $ from "jquery";

import "assets/css/merritos-modal.css";
import GoalPage from './../Register/Goal';

const VALUES = ["2018-03-22", "2019-03-23"];

var array = [
	{
    state:'svg',
    width:200,
    sq:0,
    color:'#2196f3'
	},
	{
	date:'2018-10-09',
	title:'HTML',
	author:'Roju vamshi',
  startTime:'9 : 27 AM',
  status:2,
  sq:1,
  color:'#2196f3',
  action:''
},
{
  state:'svg',
  width:200,
  sq:2,
  color:'#2196f3'
},
{
	date:'2018-11-17',
	title:'CSS',
  author:'M Siva',
  startTime:'1 : 32 PM',
  status:1,
  sq:3,
  action:'Go to class',
  color:'#2196f3'
},
{
  state:'svg',
  width:200,
  sq:4,
  color:'#2196f3'
},
{
	date:'2019-02-19',
	title:'JavaScript',
	author:'',
  startTime:'',
  status:0,
  sq:5,
  close:true,
  action:'Find a class',
  color:'#2196f3'
},
{
  state:'svg',
  width:200,
  sq:6,
  color:'#2196f3'
},
{
	date:'2019-02-19',
	title:'Nodejs',
	author:'',
  startTime:'',
  status:0,
  sq:7,
  close:true,
  action:'Find a class',
  color:'#2196f3'
},
{
  state:'svg',
  width:200,
  sq:8,
  color:'#2196f3'
},
{
	date:'2019-02-19',
	title:'Dojo',
	author:'',
  startTime:'',
  status:0,
  sq:9,
  close:true,
  action:'Find a class',
  color:'#2196f3'
}
]
var array = [
	{
    state:'svg',
    width:200,
    sq:0,
    color:'#cecece'
  },
  {
    state:'svg',
    width:200,
    sq:1,
    color:'#cecece'
  },
  {
    state:'svg',
    width:200,
    sq:2,
    color:'#cecece'
  },

  {
    state:'svg',
    width:200,
    sq:3,
    color:'#cecece'
  }
]
  

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
    padding: '11px 0px',
    margin: '32px 20px 0',
    fontSize: '16px',
    color: '#5aadef',
    fontWeight: 600,
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
    padding: '7px 0',
    fontSize: '16px',
    color: '#59687f',
    fontWeight: 600,
    marginTop: '20px',
    borderRadius: '0 0 5px 5px',
  },
  statsdiv: {
    borderRight: '1px solid #ebeff2',
    width: '119px',
    float: 'left',
    textAlign: 'center',
  },
  classmentorname: {
    fontSize: '10px',
    color: '#8e9194',
    float: 'right',
    paddingRight: '28px',
  },
  newClass: {
    height: '272px',
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
      custarry:array.slice(0,6),
      suggestions: [],
      anchorGoal: false
    }
    this.stepChangeFunc = this.stepChangeFunc.bind(this);
  }
   componentDidMount() {
        Modal.setAppElement(this.el);
    }
    componentWillMount() {
      this.data = GameInfo.map((game, index) => {
        return ({
          date: game.date,
          component: (
            <div className='container' key={index}>
              <h4>{ game.title}</h4>
              <h7>{ game.subtitle }</h7>
              <hr />
              <p>{ game.content}</p>
              <hr />
            </div>
          )
        });
      });
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


th.setState({custarry:array.slice(0,6)});
if($(window).width()<'600')
th.setState({custarry:array.slice(0,2)});
if($(window).width()<'1020' && $(window).width()>'600')
th.setState({custarry:array.slice(0,4)});
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
        if (th.props.profileData[0].path !== "" && th.props.profileData[0].path !== undefined) {
          th.setState({ imageurl: BasePath + '/' + th.props.profileData[0].path });
        }
      }, 700);
    }
  }
  handleDialogClose = () => {
    this.setState({ open: false });
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
    this.setState({ open: true });
    else
    this.props.history.push('/Trainers');
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  handleClose = () => {
    this.setState({ open: false });
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
   
    if (profileData && profileData.length > 0 && profileData[0].role === 'Professional') {
      
      showCoach = true;
    } else {
      showCoach = false;
    }

    let profSubMenuArr = [];
    
   
    return (
      <div>
    <MediaQuery query="(orientation: portrait)"  query="(orientation: landscape)" query="(min-resolution: 2dppx)" query="(max-device-width: 1224px)">
    
   <Container className="profile-goal">
        <Row className="profile-goal-row">
 <Col  xs="5" sm="3">

    <div class="goalLabel first">
    <div className="disinline">

     <img src={this.state.imageurl} width="80px"/>
</div>
    <div className="profileinfo">
       <ul className="profileInfoList">
         <li> {profileData[0].lastName} {profileData[0].firstName}</li>
         <li> {profileData[0].role}</li>
        
       </ul>
       </div>
        </div>
      	</Col>
       
	
  <Col xs="auto" className="profile-goal-arrow"><i class="material-icons">
forward
</i></Col>
 <Col  xs="5" sm="3">
        <div  md={4} class="goalLabel">
        <ul className="profileInfoListsec" >
          <li>
            <img src={this.state.winner} width="70px" className="disablePic"/>
            {/* <i class="material-icons">stars</i> */}
            </li>
          <li>{profileData[0].goal}</li>
        </ul>
        </div>
        </Col>
		 </Row>
		 </Container>
		  <GridContainer>
        <GridItem md={6}>
        
       <MobileTimeline
            styles={{
              background: "#f8f8f8",
              foreground: "#1A79AD",
              outline: "#dfdfdf"
            }}
            content={this.data} 
          />
        
       
        <div className="text-center">
          
        </div>
       
       
        
    </GridItem>
   
        </GridContainer>
	  
	     <SlidingPane
                isOpen={ this.state.isClassesPane }
                title='Your Classes'
                from='bottom'
                width='100%' 
				 className='merritos-mobile-bottomnav-pane'
                overlayClassName='merritos-mobile-bottomnav-pane-parent'
			    onRequestClose={ () => this.setState({ isClassesPane: false }) }>
				
                {this.state.Myclasses[0]? (
               
                  <GridItem xs={12} sm={6} md={4} >
                  
                  <div className="tile">
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
                  </div>
                </GridItem>
               
              ):(
                <GridItem xs={12} sm={6} md={4}>
                <div className={"tile addClass "+classes.newClass}>
               
                <p className="jss368 jss376 jss397 text-16 font-300 text-center pt-16 px-63">No latest class found..</p>
              </div>
              </GridItem>
              )}
			</SlidingPane>
			  <SlidingPane
                isOpen={ this.state.isJobsPane }
                title='Job Alerts'
                from='bottom'
                width='100%' 
				 className='merritos-mobile-bottomnav-pane'
                 overlayClassName='merritos-mobile-bottomnav-pane-parent'
				 title='Job Alerts'
                
                onRequestClose={ () => this.setState({ isJobsPane: false }) }>
				<GridContainer>
                    <GridItem xs={12} sm={3} md={6}>
          <div className="tiles paddingPx">
          <h4>Jobs</h4>
          
          {this.state.jobList.length>0?(
            <List className="nav-item-list">
{this.state.jobList.map((val,index)=>{
  return(
  <ListItem>
      <ListItemIcon>
        <StarIcon />
        </ListItemIcon>
            <div className="jobType">
            <h4>{val.jobTitle}</h4>
            <div className="jobtypelabel">{val.companyName} - {val.jobType}</div>
            </div>
            </ListItem>
  )
})}
 </List>
          ):(
          <div>
            <label>No jobs list found...</label>
          </div>
          )}
          </div>
          </GridItem>
 
            </GridContainer>
			
			</SlidingPane>
			  <SlidingPane
                isOpen={ this.state.isTipsPane }
                title='Tips'
                from='bottom'
                width='100%' 
				 className='merritos-mobile-bottomnav-pane'
                 overlayClassName='merritos-mobile-bottomnav-pane-parent'
				 title='Tips'
                
                onRequestClose={ () => this.setState({ isTipsPane: false }) }>
				
                <div>Tips</div>
            
			
			</SlidingPane>
			  <SlidingPane
                isOpen={ this.state.isInsightsPane }
                title='Insights'
                from='bottom'
                width='100%' 
				 className='merritos-mobile-bottomnav-pane'
                 overlayClassName='merritos-mobile-bottomnav-pane-parent'
				 title='Insights'
                
                onRequestClose={ () => this.setState({ isInsightsPane: false }) }>
				
                <div>Insights</div>
            
			
			</SlidingPane>
	   <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={"merritos-bottomnav "+classes.bottomNav}
      >
        <BottomNavigationAction label="Classes" icon={<RestoreIcon />} onClick={ () => this.setState({ isClassesPane: true ,isJobsPane: false ,isTipsPane: false ,isInsightsPane: false  }) }/>
        <BottomNavigationAction label="Job Alerts" icon={<FavoriteIcon />}  onClick={ () => this.setState({ isClassesPane: false ,isJobsPane: true ,isTipsPane: false ,isInsightsPane: false  }) }/>
        <BottomNavigationAction label="Tips" icon={<LocationOnIcon />}  onClick={ () => this.setState({ isClassesPane: false ,isJobsPane: false ,isTipsPane: true ,isInsightsPane: false  }) }/>
		<BottomNavigationAction label="Insights" icon={<LocationOnIcon />}  onClick={ () => this.setState({ isClassesPane: false ,isJobsPane: false ,isTipsPane: false ,isInsightsPane: true  }) }/>
      </BottomNavigation>
    </MediaQuery>

		
		<MediaQuery query="(min-device-width: 1224px)" >
    <div>You are Desktop</div>
	
	        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
             
        <CardBody>
        <GridContainer>
    <GridItem md={3}>
    <div class="goalLabel first">
    <div className="disinline">
    {profileData[0].path?(
     
      <img src={profileData[0].path} />
    ):(
      <img src={this.state.imageurl} width="150px"/>
    )}
    </div>
    <div className="disinline">
       <ul className="profileInfoList">
         <li> {profileData[0].lastName} {profileData[0].firstName}</li>
         <li> {profileData[0].role}</li>
         <li> <button className="waves-effect waves-light btn">Verify Now</button></li>
       </ul>
       </div>
        </div>
        </GridItem>
        <GridItem md={6}>
        <div 
          style={{
            width: "100%",
           
            margin: "0 auto",
            marginTop: "100px",
            fontSize: "15px"
          }}
        >
       <label className="emptyprofile-label">What you want to be next </label>
          <HorizontalTimeline
            styles={{
              background: "#f8f8f8",
              foreground: "#1A79AD",
              outline: "#dfdfdf"
            }}
            index={this.state.array}    
            stories={this.state.custarry}
            _this={this}
          />
        
        </div>
        <div className="text-center">
          
        </div>
        </GridItem>
        <GridItem md={3}>
        <Dialog
        fullWidth
            open={this.state.anchorGoal}
          
            aria-labelledby="form-dialog-title"
            message={
              this.state.notification
            }
          >
            <GoalPage />
            <button onClick={()=>this.handleClose()}>Close</button>
          </Dialog>
        <div  md={4} class="goalLabel">
        <ul className="profileInfoListsec" >
        {profileData[0].goal?(
           <li > 
           <img src={this.state.winner} width="100px" />
           <i class="material-icons">
help_outline
</i>
           {/* <i class="material-icons">stars</i> */}
           <label>{profileData[0].goal}</label>
           </li>
        
        ):(
          <li className="disablePic"> 
          <img src={this.state.winner} width="100px" />
          <i class="material-icons">
help_outline
</i>
          {/* <i class="material-icons">stars</i> */}
          <label onClick={this.handleGoal}>Set Your Goal</label>
          </li>
       
        )}
         
        </ul>
        </div>
        </GridItem>
        </GridContainer>
        </CardBody>
      </Card>
    </GridItem>
        </GridContainer>
        <GridContainer>
              <GridItem xs={12} sm={6} md={4}>
              {showCoach?(
                <div className={"tile addClass "+classes.newClass} onClick={()=>this.onOpenModal('p')}>
                  <span className="material-icons jss311 text-56" aria-hidden="true">add_circle</span>
                  <p className="jss368 jss376 jss397 text-16 font-300 text-center pt-16 px-63">Create Class</p>
                </div>
              ):(
              <div className={"tile addClass "+classes.newClass} onClick={()=>this.onOpenModal('s')}>
                  <span className="material-icons jss311 text-56" aria-hidden="true">add_circle</span>
                  <p className="jss368 jss376 jss397 text-16 font-300 text-center pt-16 px-63">Find a Class</p>
                </div>
              )}
              </GridItem>
              {this.state.Myclasses[0]? (
                  <GridItem xs={12} sm={6} md={4} >
                  <div className="tile">
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
                  </div>
                </GridItem>
               
              ):(
                <GridItem xs={12} sm={6} md={4}>
                <div className={"tile addClass "+classes.newClass}>
               
                <p className="jss368 jss376 jss397 text-16 font-300 text-center pt-16 px-63">No latest class found..</p>
              </div>
              </GridItem>
              )}

          <GridItem xs={12} sm={3} md={4} className="dashbord-grids">
            <div class="tile paddingPx">
              <h4>Guidelines for user</h4>
              <List className="nav-item-list">
              {profileData[0].goalinfo && profileData[0].goalinfo.length > 0 && profileData[0].goalinfo !== undefined ? (
                profileData[0].goalinfo[0].suggestions.map((value, key) => {
                  return (
                  
                      <ListItem>
                        <ListItemIcon>
                          <StarIcon />
                        </ListItemIcon>
                        <ListItemText inset primary={value} className="text-item"/>
                      </ListItem>
                   
                  )
                })
              ) : ('')
              }
          </List>
            </div>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3} md={6}>
          <div className="tiles paddingPx">
          <h4>Top news</h4>
          
          {this.state.newfeed.length>0?(
            <List className="nav-item-list">
{this.state.newfeed.map((val,index)=>{
  return(
  <ListItem>
      <ListItemIcon>
        <StarIcon />
        </ListItemIcon>
            <ListItemText inset primary={val.title} className="text-item"/>
            </ListItem>
  )
})}
 </List>
          ):(
          <div>
            <label>No list found...</label>
          </div>
          )}       
          </div>
          </GridItem>
          <GridItem xs={12} sm={3} md={6}>
          <div className="tiles paddingPx">
          <h4>Jobs</h4>
          
          {this.state.jobList.length>0?(
            <List className="nav-item-list">
{this.state.jobList.map((val,index)=>{
  return(
  <ListItem>
      <ListItemIcon>
        <StarIcon />
        </ListItemIcon>
                     
            <div className="jobType">
            <h4>{val.jobTitle}</h4>
            <div className="jobtypelabel">{val.companyName} - {val.jobType}</div>
            </div>
            </ListItem>
  )
})}
 </List>
          ):(
          <div>
            <label>No list found...</label>
          </div>
          )}     
          </div>
          </GridItem>
        </GridContainer>
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
  userId: state.profile.userId
});

export default connect(profileList, { fetchprofileData })(withStyles(styles, { withTheme: true })(Dashboard));