import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import BasePath from '../../basepath';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import InputLabel from "@material-ui/core/InputLabel"

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { addExpertise } from "../../actions/Profileactions";
import { updateExpertise } from "../../actions/Profileactions";
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
const styles = theme => ({
    backButton: {
        marginRight: theme.spacing.unit,
    }
});
class ExpertisePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: reactLocalStorage.get('userId', ""),
            expertise: '',
            editorState: EditorState.createEmpty()
        }
        if (this.state.userId === '' || this.state.userId === 'undefined') {
            this.props.history.push('/');
        }
    }
    componentDidMount() {
        let th = this;
        setTimeout(
            function () {
                if (th.props.profileData && th.props.profileData.length > 0 && th.props.profileData[0].expertise.length > 0) {
                    th.setState({ expertise: th.props.profileData[0].expertise[0].expertise });
                    const processedHTML = DraftPasteProcessor.processHTML(th.props.profileData[0].expertise[0].expertise);
                    if (processedHTML.contentBlocks !== null) {
                        const contentState = ContentState.createFromBlockArray(processedHTML);
                        let editorState = EditorState.createWithContent(contentState);
                        th.setState({ editorState: editorState });
                    } else {
                        th.setState({ editorState: EditorState.createEmpty() });
                    }
                }
            }.bind(this),
            700
        );
    }
    change(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSave() {
        let th = this;
        let s = th.state.expertise;
        let body = "<p>";
        let bodyEnd = "</p>";
        let res = s.substring(s.indexOf(body) + body.length, s.indexOf(bodyEnd));
        if (this.state.expertise === '') {
            th.props.handleNotification("Please write any expertise", "danger");
        }
        else if (res === '') {
            th.props.handleNotification("Please write any expertise", "danger");
        }
        else {
            let data = { activetab: 6, expertiseData: { "expertise": this.state.expertise, "_id": th.state.userId } };
            fetch(BasePath + '/expertisecreate', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(function () {
                th.props.handleStepChange();
            }).catch((err) => {
                th.props.handleNotification(err.message, "danger");
            });
        }
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
                <form className={classes.form} style={!this.state.showExpertise ? {} : { display: 'none' }}>
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
                        <br /><br /><br />
                        <GridItem xs={12} sm={12} md={12} >
                            <Button style={{ float: 'right' }} variant="contained"
                                color="primary" onClick={() => this.handleSave()}
                            >
                                Next
                             </Button>
                            <Button
                                style={{ float: 'right' }}
                                onClick={this.handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                        </GridItem>
                    </GridContainer>
                </form>
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
