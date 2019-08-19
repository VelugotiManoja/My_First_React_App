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
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from "@material-ui/icons/Edit"
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
import { addworkExperience } from "../../actions/Profileactions";
import { updateworkExperience } from "../../actions/Profileactions";
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
    color: '#727171',
    fontWeight: "600",
    fontSize: "16px",
    marginLeft: "15px",
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
  topMargin: {
    marginTop: "10px"
  },
  dateLabel: {
    fontSize: '12px'
  },
  backButton: {
    marginRight: theme.spacing.unit,
  }
});
class workExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWorkexperience: true,
      companyName: '',
      companyNameState: '',
      designation: '',
      designationState: '',
      fromDate: new Date(),
      toDate: new Date(),
      showedit: false,
      editkey: 0,
      expId: 0,
      showAdd: true,
      userId: reactLocalStorage.get('userId', ""),
      tr: false,
      color: 'success',
      notification: '',
      deleteKey: 0,
      deleteOpen: false,
      enterFlag: 0
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  change(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value.length === 1) {
      this.onFocus();
    }
  }
  onFocus() {
    this.setState({ companyNameState: "" });
    this.setState({ designationState: "" });
  }
  handletoDate(date) {
    this.setState({ toDate: date._d });
    this.setState({ dateOpen: false });
  }
  handlefromDate(date) {
    this.setState({ fromDate: date._d });
    this.setState({ dateOpen: false });
  }
  AddMore() {
    this.setState({ enterFlag: 0 });
    this.setState({ showWorkexperience: false });
    this.setState({ companyName: '' });
    this.setState({ companyNameState: '' });
    this.setState({ designationState: '' });
    this.setState({ designation: '' });
    this.setState({ fromDate: new Date() });
    this.setState({ toDate: new Date() });
    this.setState({ showAdd: false });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.workExperienceUpdate) {
      this.props.profileData[0].experience[this.state.editkey] = nextProps.workExperienceUpdate;
      this.setState({ showWorkexperience: true });
      this.setState({ companyName: '' });
      this.setState({ designation: '' });
      this.setState({ companyNameState: '' });
      this.setState({ designationState: '' });
      this.setState({ fromDate: new Date() });
      this.setState({ toDate: new Date() });
      this.setState({ showAdd: true });
      this.setState({ showedit: false });
    }
    else if (nextProps.workExperienceData) {
      this.setState({ companyNameState: '' });
      this.setState({ designationState: '' });
      this.setState({ showWorkexperience: true })
      this.setState({ showAdd: true });
    }
  }
  handleEdit(id) {
    let th = this;
    th.setState({ enterFlag: 1 });
    th.setState({ companyName: this.props.profileData[0].experience[id].companyName });
    th.setState({ designation: this.props.profileData[0].experience[id].designation });
    th.setState({ fromDate: this.props.profileData[0].experience[id].fromDate });
    th.setState({ toDate: this.props.profileData[0].experience[id].toDate });
    th.setState({ showWorkexperience: false })
    th.setState({ editkey: id });
    th.setState({ expId: this.props.profileData[0].experience[id].expId });
    th.setState({ showedit: !th.state.showedit });
    th.setState({ showAdd: false });
  }

  handleDelete = (key) => {
    this.setState({ deleteOpen: true });
    this.setState({ deleteKey: key });
  }
  //For removing data
  handleRemove = () => {
    let th = this;
    let data = { expId: th.props.profileData[0].experience[th.state.deleteKey].expId, userId: th.state.userId };
    fetch(BasePath + '/experiencedelete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (serdata) {
        if (serdata.length === 1) {
          th.props.profileData[0].experience.splice(th.state.deleteKey, 1);
          th.setState({ showAdd: true });
          th.setState({ showedit: false });
          th.setState({ deleteOpen: false });
        }
      }).catch((err) => {
        th.props.stepChange(err.message, "danger");
        th.setState({ deleteOpen: false });
      })
  }
  handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
  }
  compare(fromDate, toDate) {
    var momentA = moment(fromDate, "DD/MM/YYYY");
    var momentB = moment(toDate, "DD/MM/YYYY");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
  }
  handleSave() {
    let th = this, chk = 0;
    if (this.state.companyName === "" && this.state.designation === "") {
      th.setState({ companyNameState: "error", designationState: "error" });
    } else {
      if (this.state.companyName === "") {
        chk = 1;
        th.setState({ companyNameState: "error", designationState: "error" });
      }
      if (this.state.designation === "") {
        chk = 1;
        th.setState({ companyNameState: "error", designationState: "error" });
      }
      if (chk === 0) {
        if (th.compare(this.state.toDate, this.state.fromDate) === -1) {
          this.props.stepChange("Todate should not be less than fromdate", "danger");
        } else if (th.compare(this.state.toDate, this.state.fromDate) === 0) {
          this.props.stepChange("Fromdate and todate should not be equal", "danger");
        } else {
          let data = {
            experienceData: [{
              "companyName": th.state.companyName,
              "designation": th.state.designation,
              "fromDate": th.state.fromDate,
              "toDate": th.state.toDate
            }],
            "_id": th.state.userId
          };
          th.props.addworkExperience(data);
          th.props.stepChange("Work experience details added successfully", "success");
        }
      }
    }
  }

  handleUpdate() {
    let th = this;
    th.setState({ enterFlag: 1 });
    if (this.state.companyName === "") {
      th.setState({ companyNameState: "error" });
    }
    else if (this.state.designation === "") {
      this.setState({ designationState: "error" })
    }
    else if (th.compare(this.state.toDate, this.state.fromDate) === -1) {
      this.props.stepChange("Todate should not be less than fromdate", "danger");
    }
    else if (th.compare(this.state.toDate, this.state.fromDate) === 0) {
      this.props.stepChange("Fromdate and todate should not be equal", "danger");
    }
    else {
      let data = {
        experienceData: {
          "companyName": th.state.companyName,
          "designation": th.state.designation,
          "fromDate": th.state.fromDate,
          "toDate": th.state.toDate,
          "_id": th.state.userId,
          "expId": th.state.expId
        }
      };
      th.props.updateworkExperience(data);
      th.props.stepChange("Work experience details Updated successfully", "success");
    }
  }
  handleClose() {
    this.setState({ enterFlag: 0 });
    this.setState({ showWorkexperience: !this.state.showWorkexperience });
    this.setState({ showAdd: true });
    this.setState({ showedit: false });
    this.setState({ companyNameState: '' });
    this.setState({ designationState: '' });
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
            <h3>Workexperience details</h3>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Button variant="fab" style={this.state.showAdd ? {} : { display: 'none' }} color="primary" aria-label="Add" className="addMore" onClick={() => this.AddMore()}>
              <AddIcon />
            </Button>
          </GridItem>
        </GridContainer><br />
        <form className={classes.form} style={!this.state.showWorkexperience ? {} : { display: 'none' }} onKeyPress={(e) => this.keydownHandler(e)}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <CustomInput
                  labelText="Company name *"
                  success={this.state.companyNameState === "success"}
                  error={this.state.companyNameState === "error"}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses,
                  }}
                  inputProps={{
                    name: "companyName",
                    onChange: event => this.change(event),
                    value: this.state.companyName,
                    onFocus: () => this.onFocus()
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <CustomInput
                  labelText="Designation *"
                  success={this.state.designationState === "success"}
                  error={this.state.designationState === "error"}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses
                  }}
                  inputProps={{
                    name: "designation",
                    onChange: event => this.change(event),
                    value: this.state.designation,
                    onFocus: () => this.onFocus()
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
        {this.props.profileData.length > 0 && this.props.profileData[0].experience.length > 0 && this.props.profileData[0].experience !== undefined ? (
          this.props.profileData[0].experience.map((sval, skey) => {
            return (
              <GridContainer className={classes.gridList} key={skey} style={this.state.showWorkexperience ? {} : { display: 'none' }}>
                <GridItem xs={12} sm={10}>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}><div className={classes.labelNote}>Company name</div></GridItem>
                    <GridItem xs={1} sm={1} md={1}>:</GridItem>
                    <GridItem xs={8} sm={8} md={8}><h1 className={classes.textNote}>{sval.companyName}</h1></GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}><div className={classes.labelNote}>Designation</div></GridItem>
                    <GridItem xs={1} sm={1} md={1}>:</GridItem>
                    <GridItem xs={8} sm={8} md={8}><h1 className={classes.textNote}>{sval.designation}</h1></GridItem>
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
                <List>
                  <ListItem style={this.state.showAdd ? {} : { display: 'none' }}>
                    <ListItemText primary="No list found!">
                    </ListItemText>
                  </ListItem>
                </List>
              </GridItem>
            </GridContainer>
          )}
      </div>
    );
  }
}
workExperience.propTypes = {
  classes: PropTypes.object.isRequired,
};
const profileList = state => ({
  profileData: state.profile.profileData,
  workExperienceData: state.profile.workExperience,
  workExperienceUpdate: state.profile.workExperienceUpdate
});
export default connect(profileList, { addworkExperience, updateworkExperience })(withStyles(styles)(workExperience));
