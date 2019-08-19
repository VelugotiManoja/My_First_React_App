import React from "react";
import Datetime from "react-datetime";
import Moment from 'moment';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';

import { ContentState, EditorState, convertToRaw } from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Media, Player, controls } from 'react-media-player';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Edit from "@material-ui/icons/Edit"
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import moment from "moment";
import Clock from '../Dashboard/clock.jsx';

const { PlayPause, MuteUnmute } = controls

const styles = {
  sub: {
    textOverflow: 'ellipsis',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginBottom: '15px'
  },
  button: {
    textTransform: 'none'
  },
  gridList: {
    borderBottom: '2px solid #ececec',
    marginTop: '10px'
  },
  labelNote: {
    color: '#727171',
    fontWeight: "600",
    fontSize: "16px",
    marginLeft: "18px",
    width: '230px',
  },
  textNote: {
    color: '#555555',
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: '1.55em',
    marginTop: '-1px !important'
  },
  editIcon: {
    marginTop: '20px',
    cursor: 'pointer',
    color: '#43a047',
    fontSize: '18px',
    '&:hover': {
      color: '#66bb6a',
    }
  },
  deleteIcon: {
    marginTop: '20px',
    cursor: 'pointer',
    color: '#f44336',
    fontSize: '18px',
    '&:hover': {
      color: '#ec407a',
    }
  },
  gridHead: {
    paddingBottom: '10px',
    borderBottom: '1px solid #b1b0b0',
    fontSize: '1.5rem',
    fontWeight: '400',
    alignItems: 'flex-end'
  },
  demoVideo: {
    height: '200px !important'
  },
  playerwrapper: {
    position: 'relative',
    paddingTop: '56.25%' /* 720 / 1280 = 0.5625 */
  },
  reactplayer: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%'
  },
   mediaPlayer: {
    height: '200px !important',
    margin:'20px 0px 10px 30px !important'
  },
  mediaControls:{
          margin:'0px 0px 10px 30px !important'
  },
  buttons:{
      marginRight:'5px'
  },
  dateLabel: {
    fontSize: '12px'
  },
  textField: {
    marginTop: '23px !important'
  },
  button1:{
    left:'60px'
  },
  button2:{
    left:'35px',
    textTransform: 'none'
  },
  header: {
    margin: 0,
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
  datesdiv: {
    float: 'left',
    width: '50%',
    textAlign: 'center',
    position: 'relative',
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
};
class SchedulePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSchedule: true,
      courseName: '',
      courseNameState: '',
      Duration: '',
      DurationState: '',
      maxPeopleState: '',
      maxPeople: '',
      startDate: new Date(),
      preRequisties: '',
      preRequistiesState: '',
      syllabus: '',
      showedit: false,
      scheduleId: 0,
      showAdd: true,
      userId: reactLocalStorage.get('userId', ""),
      editkey: 0,
      deleteKey: 0,
      scheduleList: [],
      editorState: EditorState.createEmpty(),
      selectedFile: '',
      demoVideo: '',
      dateOpen: false,
      mentorName:'',
      startTime: '',
      endTime: '',
      enterFlag: 0,
      deleteOpen: false
    }
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  componentDidMount() {
    var th = this;
    setTimeout(
      function () {
        fetch(BasePath + '/schedulecourseinfo/' + th.state.userId, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).then(resp => resp.json())
          .then(function (data) {
            if (data.info.scheduleCourse.length > 0) {
              data.info.scheduleCourse.map(item => {
                let stime = item.startTime.split(' ');
                item.startTime = stime[3]+' '+stime[0].slice(0, 3)+' '+stime[1]+' '+stime[2];
                let etime = item.endTime.split(' ');
                item.endTime = etime[3]+' '+etime[0].slice(0, 3)+' '+etime[1]+' '+etime[2];
              })
              th.setState({ scheduleList: data.info.scheduleCourse })
              th.setState({ mentorName: data.info.mentorData.firstName+' '+  data.info.mentorData.lastName})
              th.setState({ showSchedule: true })
              th.setState({ demoVideo: "http://localhost:3800/" + data.info.demoVideo });
            }
        });
      },
      700
    );
  }
  //Change events for text fields
  change(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value.length === 1) {
      this.onFocus();
    }
  }
  onFocus() {
    this.setState({ courseNameState: "" });
    this.setState({ DurationState: "" });
    this.setState({ maxPeopleState: "" });
    this.setState({ preRequistiesState: "" });
  }
  handlestartDate(date) {
    this.setState({ dateOpen: false });
    this.setState({ startDate: date._d });
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
    this.setState({ syllabus: ((draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))) });
  };
  AddMore() {
    let th = this;
    th.setState({ enterFlag: 0 });
    th.setState({ showSchedule: false });
    th.setState({ courseName: "" });
    th.setState({ Duration: "" });
    th.setState({ maxPeople: "" });
    th.setState({ preRequisties: "" });
    th.setState({ syllabus: "" });
    th.setState({ courseNameState: "" });
    th.setState({ DurationState: "" });
    th.setState({ maxPeopleState: "" });
    th.setState({ preRequistiesState: "" });
    th.setState({ startDate: new Date() });
    th.setState({ startTime: "07:30" });
    th.setState({ endTime: "07:30" });
    th.setState({ demoVideo: "" });
    th.setState({ editorState: EditorState.createEmpty() });
    th.setState({ showedit: false });
    th.setState({ showAdd: false });
  }
  compare = (startTime, endTime) =>{
    var momentA = moment(startTime,"HH:mm:ss");
    var momentB = moment(endTime,"HH:mm:ss");
    if (momentA > momentB) return 1;
    else return 0;
}
  //For inserting data to mongo db
  handleSave() {
    let th = this;
    th.setState({ enterFlag: 0 });
    if (this.state.courseName === "") {
      th.setState({ courseNameState: "error" });
    }
    else if (this.state.Duration === "") {
      this.setState({ DurationState: "error" })
    }
    else if (this.state.maxPeople === "") {
      this.setState({ maxPeopleState: "error" })
    }
    else if (this.state.preRequisties === "") {
      this.setState({ preRequistiesState: "error" })
    }
    else if(th.compare(this.state.endTime, this.state.startTime) === 0){
      this.props.stepChange("Endtime and starttime should not be equal", "danger");
    }
    else {
      let data = {
        courseName: th.state.courseName, startDate: th.state.startDate, duration: th.state.Duration,
        maxPeople: th.state.maxPeople, preRequisties: th.state.preRequisties, syllabus: th.state.syllabus,
        demoVideo: th.state.demoVideo, startTime: th.state.startTime, endTime: th.state.endTime, userId: th.state.userId
      };
      fetch(BasePath + '/schedulecoursecreate', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then(resp => resp.json())
        .then(function (serdata) {
          if (serdata.length === 1) {
            let arraydata = th.state.scheduleList;
            arraydata.push(serdata.info);
            th.setState({ scheduleList: arraydata });
            th.setState({ showSchedule: !th.state.showSchedule });
            th.setState({ showAdd: true });
            th.props.stepChange("Mentor details added successfully", "success");
          }
        }).catch((err) => {
          th.props.stepChange(err.message, "danger");
        })
    }
  }
  handleDelete(id) {
    this.setState({ deleteOpen: true });
    this.setState({ deleteKey: id });
  }
  handleRemove = () => {
    let th = this;
    let id = this.state.deleteKey;
    let data = { scheduleId: th.state.scheduleList[id].scheduleId, userId: th.state.userId };
    fetch(BasePath + '/schedulecoursedelete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(function (serdata) {
        if (serdata.length === 1) {
          let arraydata = [];
          arraydata = th.state.scheduleList;
          arraydata.splice(id, 1);
          th.setState({ deleteOpen: false });
          th.setState({ scheduleList: arraydata });
        }
      }).catch((err) => {
        th.props.stepChange(err.messgae, "danger");
      })
  }
  handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
  };
  handleEdit(id) {
    let th = this;
    th.setState({ enterFlag: 1 });
    th.setState({ showSchedule: false });
    th.setState({ editkey: id })
    th.setState({ scheduleId: th.state.scheduleList[id].scheduleId });
    th.setState({ courseName: th.state.scheduleList[id].courseName });
    th.setState({ Duration: th.state.scheduleList[id].duration });
    th.setState({ startTime: th.state.scheduleList[id].startTime });
    th.setState({ endTime: th.state.scheduleList[id].endTime });
    th.setState({ maxPeople: th.state.scheduleList[id].maxPeople });
    th.setState({ startDate: th.state.scheduleList[id].startDate });
    th.setState({ preRequisties: th.state.scheduleList[id].preRequisties });
    th.setState({ syllabus: th.state.scheduleList[id].syllabus });
    th.setState({ demoVideo: th.state.scheduleList[id].demoVideo });
    const processedHTML = DraftPasteProcessor.processHTML(th.state.scheduleList[id].syllabus);
    if (processedHTML.contentBlocks !== null) {
      const contentState = ContentState.createFromBlockArray(processedHTML);
      let editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState: editorState });
    } else {
      this.setState({ editorState: EditorState.createEmpty() });
    }
    th.setState({ showedit: true });
    th.setState({ showAdd: false });

  }
  handleUpdate() {
    let th = this;
    th.setState({ enterFlag: 1 });
    if (this.state.courseName === "") {
      th.setState({ courseNameState: "error" });
    }
    else if (this.state.Duration === "") {
      this.setState({ DurationState: "error" })
    }
    else if (this.state.maxPeople === "") {
      this.setState({ maxPeopleState: "error" })
    }
    else if (this.state.preRequisties === "") {
      this.setState({ preRequistiesState: "error" })
    }
    else {
      let data = {
        courseName: th.state.courseName, startDate: th.state.startDate, duration: th.state.Duration,
        maxPeople: th.state.maxPeople, preRequisties: th.state.preRequisties, syllabus: th.state.syllabus,
        scheduleId: th.state.scheduleId, demoVideo: th.state.demoVideo, userId: th.state.userId,
        startTime: th.state.startTime, endTime: th.state.endTime,
      };
      fetch(BasePath + '/scheduleCourseUpdate', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then(resp => resp.json())
        .then(function (serdata) {
          if (serdata.length === 1) {
            let arraydata = [];
            arraydata = th.state.scheduleList;
            arraydata[th.state.editkey] = data;
            th.setState({ scheduleList: arraydata });
            th.setState({ showSchedule: true })
            th.setState({ showAdd: true });
            th.setState({ showedit: false });
            th.props.stepChange("Mentor details updated successfully", "success");
          }
        }).catch((err) => {
          th.props.stepChange(err.message, "danger");
        })
    }
  }
  handleClose() {
    this.setState({ enterFlag: 0 });
    this.setState({ showSchedule: !this.state.showSchedule });
    this.setState({ showAdd: true });
    this.setState({ showedit: true });
  }
  fileHandleChange = (event) => {
    let th = this;
    let selectedFile = event.target.files[0]
    let formData = new FormData();
    event.target.value = null;
    formData.append('file', selectedFile);
    fetch('http://localhost:3800/savedata', {
      method: 'post',
      body: formData
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        th.setState({ demoVideo: data.path });
        th.setState({ demoVideo: "http://localhost:3800/" + data.path });
      })
  }
  keydownHandler = (e) => {
    var th = this;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (th.state.enterFlag === 0) {
        this.handleSave();
      }
      else {
        this.handleUpdate();
      }
    }
  }
  render() {
    const { classes } = this.props;
    const { editorState } = this.state;
    return (
      <div>
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
            <Button onClick={this.handleDeleteClose} color="primary">No</Button>
            <Button onClick={this.handleRemove} color="primary" autoFocus>Yes</Button>
          </DialogActions>
        </Dialog>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer className={classes.gridHead}>
              <GridItem xs={10} sm={10} md={10}>
                <legend>Schedule details</legend>
              </GridItem>
              <GridItem xs={2} sm={2} md={2}>
                <Button variant="fab" style={this.state.showAdd ? {} : { display: 'none' }} color="primary" aria-label="Add" className={classes.button1} onClick={() => this.AddMore()}>
                  <AddIcon />
                </Button>
              </GridItem>
            </GridContainer>
            <form className={classes.form} style={!this.state.showSchedule ? {} : { display: 'none' }} onKeyPress={(e) => this.keydownHandler(e)}>
              <FormControl fullWidth>
                <CustomInput
                  labelText="Course name *"
                  success={this.state.courseNameState === "success"}
                  error={this.state.courseNameState === "error"}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses,
                  }}
                  inputProps={{
                    name: "courseName",
                    onChange: event => this.change(event),
                    value: this.state.courseName,
                    onFocus: () => this.onFocus()
                  }}
                />
              </FormControl>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel className={classes.dateLabel}>Start date</InputLabel>
                  <Datetime
                    open={this.state.dateOpen}
                    timeFormat={false}
                    name="startDate"
                    onChange={event => this.handlestartDate(event)}
                    value={Moment(this.state.startDate).format('DD/MM/YYYY')}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer className={classes.timePicker}>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      label='Start time'
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      inputProps={{
                        step: 300, // 5 min
                        name: "startTime",
                        onChange: event => this.change(event),
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      label='End time'
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      inputProps={{
                        step: 300, // 5 min
                        name: "endTime",
                        onChange: event => this.change(event),
                      }}
                    />
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <CustomInput
                      success={this.state.DurationState === "success"}
                      error={this.state.DurationState === "error"}
                      labelText="Duration *"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        name: "Duration",
                        onChange: event => this.change(event),
                        value: this.state.Duration,
                        onFocus: () => this.onFocus()
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <CustomInput
                      success={this.state.maxPeopleState === "success"}
                      error={this.state.maxPeopleState === "error"}
                      labelText="Maximum People *"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        name: "maxPeople",
                        onChange: event => this.change(event),
                        value: this.state.maxPeople,
                        onFocus: () => this.onFocus()
                      }}
                    />
                  </FormControl>
                </GridItem>
              </GridContainer>
              <FormControl fullWidth>
                <CustomInput
                  success={this.state.preRequistiesState === "success"}
                  error={this.state.preRequistiesState === "error"}
                  labelText="Pre Requisites *"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses
                  }}
                  inputProps={{
                    name: "preRequisties",
                    onChange: event => this.change(event),
                    value: this.state.preRequisties,
                    onFocus: () => this.onFocus()
                  }}
                />
              </FormControl>
              <GridContainer className={classes.topMargin}>
                <GridItem xs={12} sm={12} md={12}>
                  <p>Syllabus</p>
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={this.onEditorStateChange}
                  />
                </GridItem>
              </GridContainer>
              <h4>Demo videos</h4>
              <input type="file" onChange={this.fileHandleChange} ref="demoVideo" />
              <GridItem xs={6} sm={6} md={6}>
                <video src={this.state.demoVideo} style={{ width: '290px' }} alt="..." />
              </GridItem>
              <GridContainer className={classes.topMargin}>
                <GridItem xs={8} sm={8} md={8} > </GridItem>
                <GridItem xs={8} sm={2} md={2} >
                  <Button variant="outlined" color="primary" onClick={() => this.handleClose()} className={classes.button2}>Close</Button>
                </GridItem>
                <GridItem xs={4} sm={2} md={2}>
                  <Button variant="outlined" color="primary" onClick={() => this.handleSave()} style={!this.state.showedit ? {} : { display: 'none' }} className={classes.button}>Save</Button>
                  <Button variant="outlined" color="primary" onClick={() => this.handleUpdate()} style={this.state.showedit ? {} : { display: 'none' }} className={classes.button}>Update</Button>
                </GridItem>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
        {this.state.scheduleList.length > 0 && this.state.scheduleList !== undefined ? (
          
          this.state.scheduleList.map((sval, skey) => {
            return (
              <GridContainer className={classes.gridList} key={skey} style={this.state.showSchedule ? {} : { display: 'none' }}>
                <GridItem xs={12} sm={10}>
                <GridItem xs={12} startDatesm={6} md={9} >
                <div className="tile">
                <div>
                      <div className="header "><p className={classes.header}>{sval.courseName}</p> <span className={classes.classmentorname}>by {this.state.mentorName}</span></div>
                      <div className={classes.dates}>
                        <div className={classes.datesdiv}>
                          <strong className={classes.datesstrong}>STARTS</strong>
                          {sval.startTime}
                          <span className={classes.datesspan}></span>
                        </div>
                        <div className={classes.datesdiv}>
                          <strong className={classes.datesstrong}>ENDS</strong>
                          {sval.endTime}
                        </div>
                          <Clock time = {sval.startTime}/>
                      </div>
                      <div className={classes.stats}>
                        <div className={classes.statsdiv}>
                          <strong className={classes.datesstrong}>MAX PEOPLE</strong>
                          {sval.maxPeople}
                        </div>
                        <div className={classes.statsdiv}>
                          <strong className={classes.datesstrong}>JOINED</strong>
                          {sval.buyers.length}
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
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <Edit className={classes.editIcon} onClick={() => this.handleEdit(skey)} />
                  <DeleteIcon className={classes.deleteIcon} onClick={() => this.handleDelete(skey)} />
                </GridItem>
              </GridContainer>
            );
          })
        ) : (
            <ListItem style={this.state.showAdd ? {} : { display: 'none' }}>
              <ListItemText primary="No data found" />
            </ListItem>
          )}

      </div>
    );
  }
}
SchedulePage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SchedulePage);
