import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from '@material-ui/core/Button';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import { addRecommendation } from "../../actions/Profileactions";

const styles = theme => ({
    backButton: {
        marginRight: theme.spacing.unit,
    }
});
class RecommendationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendation: '',
            recommendationState: '',
            userId: reactLocalStorage.get('userId', ""),
            color: 'success',
            notification: '',
        }
        if (this.state.userId === '' || this.state.userId === 'undefined') {
            this.props.history.push('/');
        }
    }
    componentDidMount() {
        let th = this;
        setTimeout(
            function () {
                if (th.props.profileData && th.props.profileData.length > 0 && th.props.profileData[0].recommendation.length > 0) {
                    th.setState({ expertise: th.props.profileData[0].recommendation[0].recommendation });
                }
            }.bind(this),
            700
        );
    }
    change(event) {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.length === 1) {
            this.onFocus();
        }
    }
    onFocus() {
        this.setState({ recommendationState: "" });
    }
    handleSave() {
        let th = this;
        if (this.state.recommendation === "") {
            th.setState({ recommendationState: "error" });
        } else {
            let data = { activetab: 7, recommendationData: { "recommendation": th.state.recommendation, "_id": th.state.userId } };
            fetch(BasePath + '/recommendationcreate', {
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
    keydownHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleSave();
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <form className={classes.form} onKeyPress={(e) => this.keydownHandler(e)}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <FormControl fullWidth>
                                <CustomInput
                                    labelText="Add any recommendations from your professors or colleagues"
                                    success={this.state.recommendationState === "success"}
                                    error={this.state.recommendationState === "error"}
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.customFormControlClasses,
                                    }}
                                    inputProps={{
                                        name: "recommendation",
                                        onChange: event => this.change(event),
                                        value: this.state.recommendation,
                                        onFocus: () => this.onFocus()
                                    }}
                                />
                            </FormControl>
                        </GridItem>
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
RecommendationPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
const profileList = state => ({
    profileData: state.profile.profileData,
    recommendationData: state.profile.recommendation
});
export default connect(profileList, { addRecommendation })(withStyles(styles)(RecommendationPage));
