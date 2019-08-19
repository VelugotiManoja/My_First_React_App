import React from "react";
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Edit from "@material-ui/icons/Edit"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from "@material-ui/core/InputLabel"

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import AddIcon from '@material-ui/icons/Add';

const styles = {
  topMargin: {
    marginTop: "10px"
  },
  button: {
    textTransform: "none"
  },
  gridList: {
    borderBottom: '2px solid #ececec',
    marginTop: '10px'
  },
  labelNote: {
    display: "block",
    color: '#989898',
    fontWeight: "400",
    fontSize: "16px",
    marginLeft: "20px",
    width: '230px',
    float: 'left'
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
  button1:{
    left:'60px'
  },
  button2:{
    left:'35px',
    textTransform: 'none'
  }
};
class MentorDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditor: false,
      mentorDetails: '',
      userId: reactLocalStorage.get('userId', ""),
      showedit: false,
      showAdd: true,
      mentorList: [],
      editorState: EditorState.createEmpty()
    }
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  componentDidMount() {
    var th = this;
    setTimeout(
      function () {
        fetch(BasePath + '/mentorinfo/' + th.state.userId, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).then(resp => resp.json())
          .then(function (data) {
            if (data.info) {
              let arraydata = [];
              arraydata.push({ mentorDetails: data.info })
              th.setState({ mentorList: arraydata });
              th.setState({ showEditor: false });
              th.setState({ showAdd: false });
            }
          });
      },
      700
    );
  }
  AddMore() {
    let th = this;
    th.setState({ showAdd: false });
    th.setState({ showedit: false });
    th.setState({ showEditor: true });
    th.setState({ editorState: EditorState.createEmpty() });
    th.setState({ mentorDetails: "" });
  }
  handleSave() {
    var th = this;
    let s=th.state.mentorDetails;
    let body = "<p>";
    let bodyEnd = "</p>";
    let res = s.substring(s.indexOf(body)+body.length,s.indexOf(bodyEnd));
    if (res === "") {
      th.props.stepChange("Please provide mentor details", "danger");
    }
    else if(th.state.mentorDetails === ""){
      th.props.stepChange("Please provide mentor details", "danger");
    }
    else {
      var data = { "mentorDetails": th.state.mentorDetails, "userId": th.state.userId };
      fetch(BasePath + '/mentordetailscreate', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then(resp => resp.json())
        .then(function (serdata) {
          if (serdata.length === 1) {
            let arraydata = [];
            arraydata.push(data);
            th.setState({ showEditor: false })
            th.setState({ mentorList: arraydata });
            th.setState({ showAdd: false });
            th.props.stepChange("Mentor details added successfully", "success");
          }
        }).catch((err) => {
          th.props.stepChange(err.message, "danger");
        })
    }
  }
  handleUpdate() {
    let th = this;
    let s=th.state.mentorDetails, body = "<p>", bodyEnd = "</p>";
    let res = s.substring(s.indexOf(body)+body.length,s.indexOf(bodyEnd));
    if (res === "") {
      th.props.stepChange("Please provide mentor details", "danger");
    }
    else if(th.state.mentorDetails === ""){
      th.props.stepChange("Please provide mentor details", "danger");
    }
    else {
      let data = { "mentorDetails": th.state.mentorDetails, "userId": th.state.userId };
      fetch(BasePath + '/mentordetailsupdate', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then(resp => resp.json())
        .then(function (serdata) {
          if (serdata.length === 1) {
            let arraydata = [];
            arraydata = th.state.mentorList;
            arraydata[0].mentorDetails = data.mentorDetails;
            th.setState({ mentorList: arraydata });
            th.setState({ showEditor: false });
            th.props.stepChange("Mentor details updated successfully", "success");
          }
        }).catch((err) => {
          th.props.stepChange(err.message, "danger");
        })
    }
  }

  handleEdit() {
    var th = this;
    th.setState({ showEditor: true })
    th.setState({ showedit: true });
    th.setState({ showAdd: false });
    const processedHTML = DraftPasteProcessor.processHTML(th.state.mentorList[0].mentorDetails);
    if (processedHTML.contentBlocks !== null) {
      const contentState = ContentState.createFromBlockArray(processedHTML);
      let editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState: editorState });
    } else {
      this.setState({ editorState: EditorState.createEmpty() });
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
    this.setState({ mentorDetails: ((draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))) });
  };
  closeClick() {
    this.setState({ showAdd: true });
    this.setState({ showEditor: !this.state.showEditor });
  }
  render() {
    const { classes } = this.props;
    const { editorState } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer className={classes.gridHead}>
              <GridItem xs={10} sm={10} md={10}>
                <legend>Mentor details</legend>
              </GridItem>
              <GridItem xs={2} sm={2} md={2} style={this.state.showAdd ? {} : { display: 'none' }}>
                <Button variant="fab" color="primary" aria-label="Add" className={classes.button1} onClick={() => this.AddMore()}>
                  <AddIcon />
                </Button>
              </GridItem>
            </GridContainer>
            <br />
            <form className={classes.form} style={this.state.showEditor ? {} : { display: 'none' }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel className={classes.label}>
                    Mentor details *
                    </InputLabel>
                  <br /> <br />
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={this.onEditorStateChange}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={8} sm={8} md={8} > </GridItem>
                <GridItem xs={8} sm={2} md={2} >
                  <Button variant="outlined" color="primary" onClick={() => this.closeClick()} className={classes.button2}>Close</Button>
                </GridItem>
                <GridItem xs={4} sm={2} md={2}>
                  <Button variant="outlined" color="primary" onClick={() => this.handleSave()} style={!this.state.showedit ? {} : { display: 'none' }} className={classes.button}>Save</Button>
                  <Button variant="outlined" color="primary" onClick={() => this.handleUpdate()} style={this.state.showedit ? {} : { display: 'none' }} className={classes.button}>Update</Button>
                </GridItem>
              </GridContainer>
            </form>
          </GridItem>
          {this.state.mentorList.length > 0 && this.state.mentorList[0].mentorDetails !== undefined ? (
            <GridContainer className={classes.gridList} style={!this.state.showEditor ? {} : { display: 'none' }} >
              <GridItem xs={12} sm={10}>
                <div>
                  <h1 className={classes.textNote} dangerouslySetInnerHTML={{ __html: this.state.mentorList[0].mentorDetails }} />
                </div>
              </GridItem>
              <GridItem xs={12} sm={2}>
                <Edit className={classes.editIcon} onClick={() => this.handleEdit()} />
              </GridItem>
            </GridContainer>
          ) : (
              <GridItem xs={12} sm={12} md={12}>
                <ListItem style={this.state.showAdd ? {} : { display: 'none' }}>
                  <ListItemText className={classes.NavFloat} primary="No data found" />
                </ListItem>
              </GridItem>
            )}

        </GridContainer>
      </div>
    );
  }
}
MentorDetailsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(MentorDetailsPage);
