import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor'
import { ContentState, EditorState, convertToRaw } from 'draft-js';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from "@material-ui/icons/Edit"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputLabel from "@material-ui/core/InputLabel"

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { addAchievements } from "../../actions/Profileactions";
import { updateAchievements } from "../../actions/Profileactions";

const styles = theme => ({
  button: {
    textTransform: 'none'
  },
  gridList: {
    borderBottom: '2px solid #ececec',
    marginTop: '10px'
  },
  textNote: {
    color: '#555555',
    fontSize: "16px",
    fontWeight: "400",
    marginLeft: "20px",
    lineHeight: '1.55em'
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
  backButton: {
    marginRight: theme.spacing.unit,
  }
});
class Achivements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAchivements: true,
      achievements: '',
      showedit: false,
      editkey: 0,
      achivId: 0,
      showAdd: true,
      userId: reactLocalStorage.get('userId', ""),
      deleteKey: 0,
      deleteOpen: false,
      editorState: EditorState.createEmpty()
    }
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  AddMore() {
    this.setState({ showAchivements: false });
    this.setState({ showAdd: false });
    this.setState({ showedit: false });
    this.setState({ editorState: EditorState.createEmpty() });
    this.setState({ achievements: "" });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.achievementsUpdate) {
      this.props.profileData[0].achievements[this.state.editkey] = nextProps.achievementsUpdate;
      this.setState({ showAchivements: true });
      this.setState({ editorState: EditorState.createEmpty() });
      this.setState({ achievements: '' });
      this.setState({ showAdd: true });
      this.setState({ showedit: false });
    }

  }
  handleDelete = (key) => {
    this.setState({ deleteOpen: true });
    this.setState({ deleteKey: key });
  }
  //For removing data
  handleRemove = () => {
    let th = this;
    let data = { achivId: this.props.profileData[0].achievements[th.state.deleteKey].achivId, userId: th.state.userId };
    fetch(BasePath + '/achievementsdelete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (serdata) {
        if (serdata.length === 1) {
          th.props.profileData[0].achievements.splice(th.state.deleteKey, 1);
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
  handleSave() {
    let th = this;
    let s = th.state.achievements;
    let body = "<p>";
    let bodyEnd = "</p>";
    let res = s.substring(s.indexOf(body) + body.length, s.indexOf(bodyEnd));
    if (this.state.achievements === '') {
      th.props.stepChange("Please provide your details", "danger");
    }
    else if (res === '') {
      th.props.stepChange("Please provide your details", "danger");
    }
    else {
      let data = {
        achievementsData: { "achievements": this.state.achievements, "_id": th.state.userId }
      };
      th.props.addAchievements(data);
      th.props.stepChange("achievement details added successfully", "success");
      fetch(BasePath + '/achievementscreate', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then((resp) => resp.json()) // Transform the data into json
        .then(function (serdata) {
          if (serdata.length === 1) {
            th.props.profileData[0].achievements.push(serdata.result);
            th.setState({ editorState: EditorState.createEmpty() });
            th.setState({ achievements: '' });
            th.setState({ showAchivements: true });
            th.setState({ showAdd: true });
          }
        }).catch((err) => {
          th.props.stepChange(err.message, "danger");
          th.setState({ deleteOpen: false });
        })
    }
  }
  handleEdit(id) {
    let th = this;
    th.setState({ achievements: this.props.profileData[0].achievements[id].achievements });
    this.setState({ showAchivements: false })
    th.setState({ editkey: id });
    th.setState({ achivId: this.props.profileData[0].achievements[id].achivId });
    th.setState({ showedit: !th.state.showedit });
    th.setState({ showAdd: false });
    const processedHTML = DraftPasteProcessor.processHTML(this.props.profileData[0].achievements[id].achievements);
    if (processedHTML.contentBlocks !== null) {
      const contentState = ContentState.createFromBlockArray(processedHTML);
      let editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState: editorState });
    } else {
      this.setState({ editorState: EditorState.createEmpty() });
    }
  }
  handleUpdate() {
    let th = this;
    let s = th.state.achievements;
    let body = "<p>";
    let bodyEnd = "</p>";
    let res = s.substring(s.indexOf(body) + body.length, s.indexOf("</p>"));
    if (this.state.achievements === '') {
      th.props.stepChange("Please provide your details", "danger");
    }
    else if (res === '') {
      th.props.stepChange("Please provide your details", "danger");
    }
    else if (this.state.achievements === "") {
      th.setState({ achievementsState: "error" });
    }
    else {
      let data = {
        achievementsData: {
          "achievements": this.state.achievements,
          "_id": th.state.userId,
          "achivId": th.state.achivId
        }
      };
      th.props.updateAchievements(data);
      th.props.stepChange("Achivement details updated successfully", "success");
    }
  }
  handleClose() {
    this.setState({ showAchivements: !this.state.showAchivements });
    this.setState({ showAdd: true });
    this.setState({ editorState: EditorState.createEmpty() });
    this.setState({ achievements: '' });
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
    this.setState({ achievements: ((draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))) });
  };
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
        <GridContainer className='titlegrid'>
          <GridItem xs={12} sm={12} md={6}>
            <h3>Achievements</h3>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Button variant="fab" style={this.state.showAdd ? {} : { display: 'none' }} color="primary" aria-label="Add" className="addMore" onClick={() => this.AddMore()}>
              <AddIcon />
            </Button>
          </GridItem>
        </GridContainer>
        <form className={classes.form} style={!this.state.showAchivements ? {} : { display: 'none' }}>
          <br/>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <InputLabel className={classes.label}>
                Add your achivements here *
                    </InputLabel>
              <br /><br />
              <Editor
                success={this.state.projectDescriptionState === "success"}
                error={this.state.projectDescriptionState === "error"}
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                toolbarClassName="toolbar-class"
                onEditorStateChange={this.onEditorStateChange}
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
        {this.props.profileData.length > 0 && this.props.profileData[0].achievements.length > 0 && this.props.profileData[0].achievements !== undefined ? (
          this.props.profileData[0].achievements.map((sval, skey) => {
            return (
              <GridContainer className={classes.gridList} key={skey} style={this.state.showAchivements ? {} : { display: 'none' }}>
                <GridItem xs={8} sm={10}>
                  <h1 className={classes.textNote} dangerouslySetInnerHTML={{ __html: sval.achievements }} />
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
                <List style={this.state.showAdd ? {} : { display: 'none' }}>
                  <ListItem>
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

Achivements.propTypes = {
  classes: PropTypes.object.isRequired,
};
const profileList = state => ({
  profileData: state.profile.profileData,
  achievementsData: state.profile.achievements,
  achievementsUpdate: state.profile.achievementsUpdate
});
export default connect(profileList, { addAchievements, updateAchievements })(withStyles(styles)(Achivements));
