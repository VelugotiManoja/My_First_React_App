import React from "react";
import Datetime from "react-datetime";
import Moment from 'moment';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import DialogTitle from '@material-ui/core/DialogTitle';

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
import Button from 'components/CustomButtons/Button.jsx';
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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { getClassesList } from "../../actions/Classes";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

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
    borderBottom: '2px solid #b1b0b0',
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
    margin: '20px 0px 10px 30px !important'
  },
  mediaControls: {
    margin: '0px 0px 10px 30px !important'
  },
  buttons: {
    marginRight: '5px'
  },
  dateLabel: {
    fontSize: '12px'
  },
  textField: {
    marginTop: '23px !important'
  },
  duration: {
    marginTop: '15px !important'
  }
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
      startTime: '00:00',
      endTime: '00:00',
      enterFlag: 0,
      deleteOpen: false,
      open: true
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
            if (data.info && data.info.length > 0) {
              th.setState({ scheduleList: data.info })
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
  verifyNumber = (number) => {
    var numbers = /^[0-9]+$/;
    if (number.match(numbers)) {
      return true;
    } else {
      return false;
    }
  }
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
  //For inserting data to mongo db
  handleSave() {
    let th = this;
    let s = th.state.syllabus;
    let body = "<p>";
    let bodyEnd = "</p>";
    let res = s.substring(s.indexOf(body) + body.length, s.indexOf("</p>"));
    th.setState({ enterFlag: 0 });
    if (this.state.courseName === "") {
      th.setState({ courseNameState: "error" });
    }
    else if (this.state.Duration === "" || !this.verifyNumber(this.state.Duration)) {
      this.setState({ DurationState: "error" })
    }
    else if (this.state.startTime === '00:00') {
      th.props.stepChange("Start time must not be 00:00", "error");
    }
    else if (this.state.endTime === '00:00') {
      th.props.stepChange("End time must not be 00:00", "error");
    }
    else if (this.state.maxPeople === "" || !this.verifyNumber(this.state.maxPeople)) {
      this.setState({ maxPeopleState: "error" })
    }
    else if (this.state.preRequisties === "") {
      this.setState({ preRequistiesState: "error" })
    }
    else if (this.state.syllabus === "" || res === "") {
      th.props.stepChange("Syllabus must not be empty", "error");
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
            if (th.props.text) {
              th.props._this.handleClassClose();
              th.props.getClassesList(th.state.userId);
            } else {
              th.props._this.onCloseModal();
            }
            th.setState({ courseName: "", startDate: new Date(), Duration: '', maxPeople: '', preRequisties: '', startTime: "00:00", endTime: '00:00', editorState: EditorState.createEmpty() })
            if (th.props._this.state.Myclasses !== undefined && th.props._this.state.Myclasses.length > 0) {
              th.props._this.state.Myclasses.push(serdata.info)
            }
            th.props.stepChange("Class created successfully", "success");
          }
        }).catch((err) => {
          th.props.stepChange(err.message, "error");
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
        th.props.stepChange(err.message, "error");
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
          th.props.stepChange(err.message, "error");
        })
    }
  }
  handleClose() {
    let th=this;
    if (th.props.text) {
      th.props._this.handleClassClose();
      th.props.getClassesList(th.state.userId);
    } else {
      th.props._this.onCloseModal();
    }
    this.setState({ courseName: "", startDate: new Date(), Duration: '', maxPeople: '', preRequisties: '', startTime: "00:00", endTime: '00:00', editorState: EditorState.createEmpty() })
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
    const { classes, onClose } = this.props;
    const { editorState } = this.state;
    return (
      <div class='modelSize merritos-popup'>
        <Dialog open={this.props.open}
          onClose={onClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" className="merriots-popup-title"> Schedule a class - {this.state.courseName} <IconButton color="inherit" className="merriots-popup-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton></DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Enter Class Details
           </DialogContentText>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <form className={classes.form} onKeyPress={(e) => this.keydownHandler(e)}>
                  <FormControl fullWidth>
                    <CustomInput
                      labelText="Course name"
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
                        value={Moment(this.state.startDate).format('MM/DD/YYYY')}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.timePicker}>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          label='Start time'
                          id="time"
                          value={this.state.startTime}
                          type="time"
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
                          value={this.state.endTime}
                          type="time"
                          className="merritos-textbox"
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
                  <GridContainer className={classes.duration}>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl fullWidth>
                        <CustomInput
                          success={this.state.DurationState === "success"}
                          error={this.state.DurationState === "error"}
                          labelText="Duration"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            name: "Duration",
                            onChange: event => this.change(event),
                            value: this.state.Duration,
                            onFocus: () => this.onFocus(),
                            type: 'number'
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl fullWidth>
                        <CustomInput
                          success={this.state.maxPeopleState === "success"}
                          error={this.state.maxPeopleState === "error"}
                          labelText="Maximum People"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            name: "maxPeople",
                            onChange: event => this.change(event),
                            value: this.state.maxPeople,
                            onFocus: () => this.onFocus(),
                            type: 'number'
                          }}
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <FormControl fullWidth>
                    <CustomInput
                      success={this.state.preRequistiesState === "success"}
                      error={this.state.preRequistiesState === "error"}
                      labelText="Pre Requisites"
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
                </form>
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={() => this.handleClose()}>
              Close
           </Button>
           <Button onClick={() => this.handleSave()} color="primary">
              Save
           </Button> */}
            <Button block className="schedule-dialog-closebtn" onClick={() => this.handleClose()}>Close</Button>
            <Button block className="schedule-dialog-savebtn" onClick={() => this.handleSave()}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
SchedulePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const classesRes = state => ({
  classesList: state.classes.classesList,
});

export default connect(classesRes, {getClassesList})(withStyles(styles)(SchedulePage));
