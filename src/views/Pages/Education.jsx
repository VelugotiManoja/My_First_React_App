import React from "react";
import Datetime from "react-datetime";
import Moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Edit from "@material-ui/icons/Edit"
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputLabel from "@material-ui/core/InputLabel";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { addeducationDetails } from "../../actions/Profileactions";
import { updateEducation } from "../../actions/Profileactions";
import moment from "moment";


const styles = theme => ({
  button: {
    textTransform: 'none'
  },
  gridList: {
    borderBottom: '2px solid #ececec',
    marginTop: '10px'
  },
  labelNote: {
    color: '#727171;',
    fontWeight: "600",
    fontSize: "16px",
    marginLeft: "17px",
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
  dateLabel: {
    fontSize: '12px'
  },
  backButton: {
    marginRight: theme.spacing.unit,
  }
});
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEducation: true,
      universityName: '',
      universityNameState: '',
      fieldOfStudy: '',
      fieldOfStudyState: '',
      DegreeState: '',
      Degree: '',
      fromDate: new Date(),
      toDate: new Date(),
      showedit: false,
      editkey: 0,
      eduId: 0,
      showAdd: true,
      userId: reactLocalStorage.get('userId', ""),
      deleteKey: 0,
      deleteOpen: false,
      dateOpen: false,
      enterFlag: 0
    }
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event) {
    // this.setState({ [event.target.name]: event.target.value });
    if (this.verifyLength(event.target.value, 1)) {
      this.setState({ [event.target.name + "State"]: "success" });
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({ [event.target.name + "State"]: "error" });
      this.setState({ [event.target.name]: event.target.value });
    }
  }
  handletoDate(date) {
    this.setState({ toDate: date._d });
    this.setState({ dateOpen: false });
  }
  handlefromDate(date) {
    this.setState({ fromDate: date._d });
    this.setState({ dateOpen: false })
  }
  AddMore() {
    this.setState({ enterFlag: 0 });
    this.setState({ showEducation: false });
    this.setState({ universityName: '' });
    this.setState({ fieldOfStudy: '' });
    this.setState({ Degree: '' });
    this.setState({ universityNameState: '' });
    this.setState({ fieldOfStudyState: '' });
    this.setState({ DegreeState: '' });
    this.setState({ fromDate: new Date() });
    this.setState({ toDate: new Date() });
    this.setState({ showAdd: false });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.educationUpdate) {
      this.props.profileData[0].education[this.state.editkey] = nextProps.educationUpdate;
      this.setState({ showEducation: true });
      this.setState({ universityName: '' });
      this.setState({ fieldOfStudy: '' });
      this.setState({ Degree: '' });
      this.setState({ universityNameState: '' });
      this.setState({ fieldOfStudyState: '' });
      this.setState({ DegreeState: '' });
      this.setState({ fromDate: new Date() });
      this.setState({ toDate: new Date() });
      this.setState({ showAdd: true });
      this.setState({ showedit: false });
    }
    else if (nextProps.educationData) {
      this.setState({ showEducation: true });
      this.setState({ showAdd: true });
      this.setState({ universityNameState: '' });
      this.setState({ fieldOfStudyState: '' });
      this.setState({ DegreeState: '' });
    }
  }
  compare = (fromDate, toDate) => {
    var momentA = moment(fromDate, "DD/MM/YYYY");
    var momentB = moment(toDate, "DD/MM/YYYY");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
  }
  handleSave() {
    let th = this, chk = 0;
    th.setState({ enterFlag: 0 });
    if (this.state.universityName === "" && this.state.fieldOfStudy === "" && this.state.Degree === "") {
      th.setState({ universityNameState: "error", fieldOfStudyState: "error", DegreeState: "error" });
    } else {
      if (this.state.universityName === "") {
        chk = 1;
        th.setState({ universityNameState: "error" });
      }
      if (this.state.fieldOfStudy === "") {
        chk = 1;
        this.setState({ fieldOfStudyState: "error" });
      }
      if (this.state.Degree === "") {
        chk = 1;
        this.setState({ DegreeState: "error" });
      }
      if (chk === 0) {
        if (th.compare(this.state.toDate, this.state.fromDate) === -1) {
          this.props.stepChange("Todate should not be less than fromdate", "danger");
        } else if (th.compare(this.state.toDate, this.state.fromDate) === 0) {
          this.props.stepChange("Fromdate and todate should not be equal", "danger");
        } else {
          let data = {
            educationData: [{
              "universityName": th.state.universityName,
              "fieldOfStudy": th.state.fieldOfStudy,
              "degree": th.state.Degree,
              "fromDate": th.state.fromDate,
              "toDate": th.state.toDate
            }],
            "_id": th.state.userId
          };
          th.props.addeducationDetails(data);
          this.props.stepChange("Added successfully ", "success");
        }
      }
    }
  }
  handleEdit(id) {
    let th = this;
    th.setState({ enterFlag: 1 });
    th.setState({ universityName: this.props.profileData[0].education[id].universityName });
    th.setState({ fieldOfStudy: this.props.profileData[0].education[id].fieldOfStudy });
    th.setState({ Degree: this.props.profileData[0].education[id].degree });
    th.setState({ fromDate: this.props.profileData[0].education[id].fromDate });
    th.setState({ toDate: this.props.profileData[0].education[id].toDate });
    th.setState({ showEducation: false })
    th.setState({ editkey: id });
    th.setState({ eduId: this.props.profileData[0].education[id].eduId });
    th.setState({ showedit: !th.state.showedit });
    th.setState({ showAdd: false });
  }
  handleUpdate() {
    let th = this;
    th.setState({ enterFlag: 1 });
    if (this.state.universityName === "") {
      th.setState({ universityNameState: "error" });
    }
    else if (this.state.fieldOfStudy === "") {
      this.setState({ fieldOfStudyState: "error" })
    }
    else if (this.state.Degree === "") {
      this.setState({ DegreeState: "error" })
    }
    else if (th.compare(this.state.toDate, this.state.fromDate) === -1) {
      this.props.stepChange("Todate should not be less than fromdate", "danger");
    }
    else if (th.compare(this.state.toDate, this.state.fromDate) === 0) {
      this.props.stepChange("Fromdate and todate should not be equal", "danger");
    }
    else {
      let data = {
        educationData: {
          "universityName": th.state.universityName,
          "fieldOfStudy": th.state.fieldOfStudy,
          "degree": th.state.Degree,
          "fromDate": th.state.fromDate,
          "toDate": th.state.toDate,
          "_id": th.state.userId,
          "eduId": th.state.eduId
        }
      };
      th.props.updateEducation(data);
      th.props.stepChange("Updated successfully", "success");
    }
  }

  handleDelete = (key) => {
    this.setState({ deleteOpen: true });
    this.setState({ deleteKey: key });
  }
  //For removing data
  handleRemove = () => {
    let th = this;
    let data = { eduId: th.props.profileData[0].education[th.state.deleteKey].eduId, userId: th.state.userId };
    fetch(BasePath + '/educationdelete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (serdata) {
        if (serdata.length === 1) {
          th.props.profileData[0].education.splice(th.state.deleteKey, 1);
          th.setState({ showAdd: true });
          th.setState({ showedit: false });
          th.setState({ deleteOpen: false });
        }
      }).catch((err) => {
        th.setState({ notification: err.message });
        th.props.stepChange(err.message, "danger");
        th.setState({ deleteOpen: false });
      })
  }
  handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
  }
  handleClose() {
    this.setState({ enterFlag: 0 });
    this.setState({ showEducation: !this.state.showEducation });
    this.setState({ showAdd: true });
    this.setState({ showedit: false });
    this.setState({ universityNameState: '' });
    this.setState({ fieldOfStudyState: '' });
    this.setState({ DegreeState: '' });
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
        <GridContainer className='titlegrid'>
          <GridItem xs={12} sm={12} md={6}>
            <h3>Education details</h3>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Button variant="fab" color="primary" style={this.state.showAdd ? {} : { display: 'none' }} aria-label="Add" className="addMore" onClick={() => this.AddMore()}>
              <AddIcon />
            </Button>
          </GridItem>
        </GridContainer><br />
        <form className={classes.form} style={!this.state.showEducation ? {} : { display: 'none' }} onKeyPress={(e) => this.keydownHandler(e)}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <CustomInput
                  labelText="University name *"
                  success={this.state.universityNameState === "success"}
                  error={this.state.universityNameState === "error"}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses,
                  }}
                  inputProps={{
                    name: "universityName",
                    onChange: event => this.change(event),
                    value: this.state.universityName
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <CustomInput
                  labelText="Field of study *"
                  success={this.state.fieldOfStudyState === "success"}
                  error={this.state.fieldOfStudyState === "error"}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses
                  }}
                  inputProps={{
                    name: "fieldOfStudy",
                    onChange: event => this.change(event),
                    value: this.state.fieldOfStudy
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <CustomInput
                  labelText="Degree *"
                  success={this.state.DegreeState === "success"}
                  error={this.state.DegreeState === "error"}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses
                  }}
                  inputProps={{
                    name: "Degree",
                    onChange: event => this.change(event),
                    value: this.state.Degree
                  }}
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              {/* <InputLabel className={classes.dateLabel}>From date</InputLabel> */}
              <Datetime
                timeFormat={false}
                className="merritos-textdate"
                name="fromDate"
                open={this.state.dateOpen}
                onChange={event => this.handlefromDate(event)}
                value={Moment(this.state.fromDate).format('DD/MM/YYYY')}
                inputProps={{ placeholder: 'From date', disabled: false }}
              />
              {/* <InputLabel className={classes.dateLabel}>To date</InputLabel> */}
              <Datetime
                timeFormat={false}
                className="merritos-textdate"
                name="toDate"
                open={this.state.dateOpen}
                onChange={event => this.handletoDate(event)}
                value={Moment(this.state.toDate).format('DD/MM/YYYY')}
                inputProps={{ placeholder: 'To date', disabled: false }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.topMargin}>
            <GridItem xs={12} sm={12} md={12} >
              <Button variant="contained" color="primary" onClick={() => this.handleSave()} style={!this.state.showedit ? { float: 'right' } : { display: 'none' }} className={classes.button}>Save</Button>
              <Button variant="contained" color="primary" onClick={() => this.handleUpdate()} style={this.state.showedit ? { float: 'right' } : { display: 'none' }} className={classes.button}>Update</Button>
              <Button style={{ float: 'right' }} onClick={() => this.handleClose()} className={classes.backButton}>Close</Button>
            </GridItem>
          </GridContainer>
        </form>
        {
          this.props.profileData.length > 0 && this.props.profileData[0].education.length > 0 && this.props.profileData[0].education !== undefined ? (
            this.props.profileData[0].education.map((sval, skey) => {
              return (
                <GridContainer className={classes.gridList} key={skey} style={this.state.showEducation ? {} : { display: 'none' }}>
                  <GridItem xs={12} sm={10}>
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3}><div className={classes.labelNote}>University name</div></GridItem>
                      <GridItem xs={1} sm={1} md={1}>:</GridItem>
                      <GridItem xs={8} sm={8} md={8}><h1 className={classes.textNote}>{sval.universityName}</h1></GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3}><div className={classes.labelNote}>Field of study</div></GridItem>
                      <GridItem xs={1} sm={1} md={1}>:</GridItem>
                      <GridItem xs={8} sm={8} md={8}><h1 className={classes.textNote}>{sval.fieldOfStudy}</h1></GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3}><div className={classes.labelNote}>Degree</div></GridItem>
                      <GridItem xs={1} sm={1} md={1}>:</GridItem>
                      <GridItem xs={8} sm={8} md={8}><h1 className={classes.textNote}>{sval.degree}</h1></GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3}><div className={classes.labelNote}>Duration</div></GridItem>
                      <GridItem xs={1} sm={1} md={1}>:</GridItem>
                      <GridItem xs={8} sm={8} md={8}><h1 className={classes.textNote}>{Moment(sval.fromDate).format('DD-MM-YYYY') + "  -  " + Moment(sval.toDate).format('DD-MM-YYYY')}</h1></GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem xs={12} sm={2}>
                    <Edit className={classes.editIcon} onClick={() => this.handleEdit(skey)} />
                    <DeleteIcon className={classes.deleteIcon} onClick={() => this.handleDelete(skey)} />
                  </GridItem>
                </GridContainer>
              )
            })
          ) : (
              <GridContainer>
                <GridItem>
                  <List style={this.state.showAdd ? {} : { display: "none" }}>
                    <ListItem>
                      <ListItemText primary="No list found!">
                      </ListItemText>
                    </ListItem>
                  </List>
                </GridItem>
              </GridContainer>
            )
        }
      </div >
    );
  }
}
ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};
const profileList = state => ({
  profileData: state.profile.profileData,
  educationData: state.profile.education,
  educationUpdate: state.profile.educationUpdate
});

export default connect(profileList, { addeducationDetails, updateEducation })(withStyles(styles)(ProfilePage));
