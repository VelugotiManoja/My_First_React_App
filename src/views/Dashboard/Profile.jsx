import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import avatar from "assets/img/maleTeam.jpg";
import arrow from "assets/img/long-arrow-right.png";
import Select from 'react-select';

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
import HorizontalTimeline from "react-horizontal-timeline";
import "assets/css/styles.css";
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
}
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
  [props.selectProps.classes.chipFocused]: props.isFocused, })} onDelete={props.removeProps.onClick} deleteIcon={<CancelIcon
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
Myclasses:[],
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
 
  await fetch(BasePath+'/teachingclassesinfo/' + this.state.userId, {
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
if (th.props.profileData[0].path !== "" && th.props.profileData[0].path !== undefined) {
th.setState({ imageurl: BasePath + '/' + th.props.profileData[0].path });
}
}, 700);
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
{ label: 'Personal details', component:
<Profile stepChange={this.stepChangeFunc} /> },
{ label: 'Education', component:
<Education stepChange={this.stepChangeFunc} /> },
{ label: 'Workexperience', component:
<Workexperience stepChange={this.stepChangeFunc} /> },
{ label: 'Certificates and Documents', component:
<Certificates /> },
{ label: 'Achivements', component:
<Achivements stepChange={this.stepChangeFunc} /> },
{ label: 'Expertise', component:
<Expertise stepChange={this.stepChangeFunc} /> },
{ label: 'Recommendation', component:
<Recommendation stepChange={this.stepChangeFunc} /> }
];
if (profileData && profileData.length > 0 && profileData[0].isCoach === "yes") {
profSubMenuList.push(
{ label: 'Mentor Details', component:
<MentorDetails stepChange={this.stepChangeFunc} /> },
{ label: 'Schedule', component:
<Schedule stepChange={this.stepChangeFunc} /> },
{ label: 'Payment', component:
<Payment stepChange={this.stepChangeFunc} /> }
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
const {curIdx, prevIdx} = this.state;
    const curStatus = EXAMPLE[curIdx].statusB;
    const prevStatus = prevIdx >= 0 ? EXAMPLE[prevIdx].statusB : '';

return (
<div>
  <CircularProgress visible={this.state.loader}></CircularProgress>
  <div>
    <Snackbar place="br" color={this.state.color} message={ this.state.notification } open={this.state.br}
      closeNotification={()=> this.setState({ br: false })}
      close
      />
  </div>
  <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="rose" icon>
          {/* <CardIcon color="rose" className={classes.profileIcon}>
            <img src={this.state.imageurl} className={classes.imageCard} alt="..." />
            <input accept="image/*" className={classes.inputFile} id="flat-button-file" multiple type="file" onChange={this.fileChangedHandler} />
            <label htmlFor="flat-button-file">
              <CameraAlt className={classes.profileEditIcon} />
            </label>
          </CardIcon> */}
         
        
      
          {/* <h4 className={classes.profileInfo}>
            {profileData[0].role}
            <img src={this.state.imagearrow} className={classes.imageArrow} alt='' />
            <span>{profileData[0].goal}</span></h4> */}
            
        </CardHeader>
        <CardBody>
        <GridContainer>
    <GridItem md={3}>
    <div class="goalLabel first">
        {profileData[0].role}
        </div>
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
       
          <HorizontalTimeline
            styles={{
              background: "#f8f8f8",
              foreground: "#1A79AD",
              outline: "#dfdfdf"
            }}
            index={this.state.curIdx}
            indexClick={index => {
              const curIdx = this.state.curIdx;
              this.setState({ curIdx: index, prevIdx: curIdx });
            }}            
            values={EXAMPLE.map(x => x.data)}
          />
        
        </div>
        <div className="text-center">
          {/* any arbitrary component can go here */}
          {curStatus}
        </div>
        </GridItem>
        <GridItem md={3}>
        <div  md={4} class="goalLabel">{profileData[0].goal}</div>
        </GridItem>
        </GridContainer>
        </CardBody>
      </Card>
    </GridItem>
    {/* <GridItem xs={12} sm={12} md={6}>
      <Card>
        <CardBody>
          <Chip label="Guidelines for user" className={classes.chip} />
          {profileData[0].goalinfo.length > 0 && profileData[0].goalinfo !== undefined ? (
          profileData[0].goalinfo[0].suggestions.map((value, key) => {
          return (
          <List component="nav">
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText inset primary={value} />
            </ListItem>
          </List>
          )
          })
          ) : ('')
          }

        </CardBody>
      </Card>
    </GridItem> */}
  </GridContainer>
  <GridContainer>
   

    <GridItem xs={12} sm={3} md={12}>
      <NavPills className={classes.swipebleView} color="rose" horizontal={{
                tabsGrid: { xs: 12, sm: 12, md: 4 },
                contentGrid: { xs: 12, sm: 12, md: 8 }
              }}
        tabs={profSubMenuArr} />
    </GridItem>
    {/* <GridItem xs={12} sm={3} md={3}>
      <Card>
        <CardBody>
          <FormControl style={showCoach ? {} : { display: 'none' }}>
            <h5><b>Do you want to be a learning coach?</b> <br />
              <FormControlLabel checked={this.state.isCoach==='yes' } value="yes" control={<Radio />} label="Yes"
              onChange={this.handleChange} />
              <FormControlLabel checked={this.state.isCoach==='no' } value="no" control={<Radio />} label="No"
              onChange={this.handleChange} />
            </h5>
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleUpdate}>Update</Button>
          </FormControl>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h5><b>Change your goal to next step</b></h5>
          <Select classes={classes} styles={selectStyles} options={this.state.suggestions} components={components}
            value={this.state.single} onChange={this.handleSelect('single')} placeholder="Select your goal" />
          <br />
          <Button variant="contained" color="secondary" fullWidth className={classes.button} onClick={this.handleGoalUpdate}>Update</Button>
        </CardBody>
      </Card>
    </GridItem> */}
  </GridContainer>
  <Modal open={open} onClose={this.onCloseModal} center class="modelSize">
  <CreateSchedule stepChange={this.stepChangeFunc} _this={this}/>
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