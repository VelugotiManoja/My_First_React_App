import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import InputLabel from "@material-ui/core/InputLabel"

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { addAchievements } from "../../actions/Profileactions";
import { updateAchievements } from "../../actions/Profileactions";
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
const styles = theme => ({
    backButton: {
        marginRight: theme.spacing.unit,
    }
});
class Achivements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            achievements: '',
            userId: reactLocalStorage.get('userId', ""),
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
                if (th.props.profileData && th.props.profileData.length > 0 && th.props.profileData[0].achievements.length > 0) {
                    th.setState({ achievements: th.props.profileData[0].achievements[0].achievements });
                    const processedHTML = DraftPasteProcessor.processHTML(th.props.profileData[0].achievements[0].achievements);
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
    handleSave() {
        let th = this;
        let s = th.state.achievements;
        let body = "<p>";
        let bodyEnd = "</p>";
        let res = s.substring(s.indexOf(body) + body.length, s.indexOf(bodyEnd));
        if (this.state.achievements === '') {
            th.props.handleNotification("Please write any achivements", "danger");
        }
        else if (res === '') {
            th.props.handleNotification("Please write any achivements", "danger");
        }
        else {
            let data = {
                achievementsData: { "achievements": this.state.achievements, "_id": th.state.userId },
                activetab: 5
            };
            fetch(BasePath + '/achievementscreate', {
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
        this.setState({ achievements: ((draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))) });
    }
    handleBack = () => {
        this.props.handleBack();
    }
    render() {
        const { classes } = this.props;
        const { editorState } = this.state;
        return (
            <div>
                <form className={classes.form}>
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

Achivements.propTypes = {
    classes: PropTypes.object.isRequired,
};
const profileList = state => ({
    profileData: state.profile.profileData,
    achievementsData: state.profile.achievements,
    achievementsUpdate: state.profile.achievementsUpdate
});
export default connect(profileList, { addAchievements, updateAchievements })(withStyles(styles)(Achivements));
