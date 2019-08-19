import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import draftToHtml from 'draftjs-to-html';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor'
import BasePath from '../../basepath';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, EditorState, convertToRaw } from 'draft-js';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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
import InputLabel from "@material-ui/core/InputLabel"

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { addExpertise } from "../../actions/Profileactions";
import { updateExpertise } from "../../actions/Profileactions";

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
class ExpertisePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showExpertise: true,
      showedit: false,
      editkey: 0,
      achivId: 0,
      showAdd: true,
      userId: reactLocalStorage.get('userId', ""),
      deleteKey: 0,
      deleteOpen: false,
      expertiseState: '',
      editorState: EditorState.createEmpty()
    }
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  change(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onFocus() {
    this.setState({ expertiseState: "" });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.expertiseUpdate) {
      this.props.profileData[0].expertise[this.state.editkey] = nextProps.expertiseUpdate;
      this.setState({ showExpertise: true });
      this.setState({ editorState: EditorState.createEmpty() });
      this.setState({ expertise: '' });
      this.setState({ showAdd: true });
      this.setState({ showedit: false });
    }
    else if (nextProps.expertiseData) {
      this.setState({ showAdd: true });
      this.setState({ showExpertise: true });
      this.setState({ expertise: "" });
      this.setState({ editorState: EditorState.createEmpty() });
    }
  }

  handleSave() {
    let th = this;
    let s = th.state.expertise;
    let body = "<p>";
    let bodyEnd = "</p>";
    let res = s.substring(s.indexOf(body) + body.length, s.indexOf(bodyEnd));
    if (this.state.expertise === '') {
      th.props.stepChange("Please provide your details", "danger");
    }
    else if (res === '') {
      th.props.stepChange("Please provide your details", "danger");
    }
    else {
      let data = { expertiseData: { "expertise": this.state.expertise, "_id": th.state.userId } };
      th.props.addExpertise(data);
      th.props.stepChange("Expertise details added successfully", "success");
    }
  }
  AddMore() {
    this.setState({ showExpertise: false });
    this.setState({ showedit: false });
    this.setState({ showAdd: false });
    this.setState({ editorState: EditorState.createEmpty() });
    this.setState({ expertise: "" });
  }
  handleEdit(id) {
    let th = this;
    this.setState({ showExpertise: false })
    th.setState({ editkey: id });
    th.setState({ experId: this.props.profileData[0].expertise[id].experId });
    th.setState({ showedit: !th.state.showedit });
    th.setState({ showAdd: false });
    const processedHTML = DraftPasteProcessor.processHTML(this.props.profileData[0].expertise[id].expertise);
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
    let s = th.state.expertise;
    let body = "<p>";
    let bodyEnd = "</p>";
    let res = s.substring(s.indexOf(body) + body.length, s.indexOf(bodyEnd));
    if (this.state.expertise === '') {
      th.props.stepChange("Please provide your details", "danger");
    }
    else if (res === '') {
      th.props.stepChange("Please provide your details", "danger");
    }
    else if (this.state.expertise === "") {
      th.setState({ expertiseState: "error" });
    }
    else {
      let data = {
        expertiseData: {
          "expertise": this.state.expertise,
          "_id": th.state.userId,
          "experId": th.state.experId
        }
      };
      th.props.updateExpertise(data);
      th.props.stepChange("Expertise details updated successfully", "success");
    }
  }

  handleDelete = (key) => {
    this.setState({ deleteOpen: true });
    this.setState({ deleteKey: key });
  }
  //For removing data
  handleRemove = () => {
    let th = this;
    let data = { experId: this.props.profileData[0].expertise[th.state.deleteKey].experId, userId: th.state.userId };
    fetch(BasePath + '/expertisedelete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (serdata) {
        if (serdata.length === 1) {
          th.props.profileData[0].expertise.splice(th.state.deleteKey, 1);
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
  handleClose() {
    this.setState({ showExpertise: !this.state.showExpertise });
    this.setState({ showAdd: true });
    this.setState({ editorState: EditorState.createEmpty() });
    this.setState({ expertise: '' });
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
    this.setState({ expertise: ((draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))) });
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
            <h3>Expertise details</h3>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Button variant="fab" style={this.state.showAdd ? {} : { display: 'none' }} color="primary" aria-label="Add" className="addMore" onClick={() => this.AddMore()}>
              <AddIcon />
            </Button>
          </GridItem>
        </GridContainer>
        <form className={classes.form} style={!this.state.showExpertise ? {} : { display: 'none' }}>
          <br />
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <InputLabel className={classes.label}>
                Add your Expertise here *
                    </InputLabel>
              <br /><br />
              <Editor
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
              <Button variant="contained" color="primary" onClick={() => this.handleSave()} className={classes.button} style={!this.state.showedit ? { float: 'right' } : { display: 'none' }} >Save</Button>
              <Button variant="contained" color="primary" onClick={() => this.handleUpdate()} className={classes.button} style={this.state.showedit ? { float: 'right' } : { display: 'none' }} >Update</Button>
              <Button style={{ float: 'right' }} onClick={() => this.handleClose()} className={classes.backButton}>Close</Button>
            </GridItem>
          </GridContainer>
        </form>
        {this.props.profileData.length > 0 && this.props.profileData[0].expertise.length > 0 && this.props.profileData[0].expertise !== undefined ? (
          this.props.profileData[0].expertise.map((sval, skey) => {
            return (
              <GridContainer className={classes.gridList} key={skey} style={this.state.showExpertise ? {} : { display: 'none' }}>
                <GridItem xs={12} sm={10}>
                  <h1 className={classes.textNote} dangerouslySetInnerHTML={{ __html: sval.expertise }} />
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

ExpertisePage.propTypes = {
  classes: PropTypes.object.isRequired,
};
const profileList = state => ({
  profileData: state.profile.profileData,
  expertiseData: state.profile.expertise,
  expertiseUpdate: state.profile.expertiseUpdate
});
export default connect(profileList, { addExpertise, updateExpertise })(withStyles(styles)(ExpertisePage));
