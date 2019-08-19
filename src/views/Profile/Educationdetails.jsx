import React from "react";
import Datetime from "react-datetime";
import Moment from 'moment';
import _ from 'underscore';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from '@material-ui/core/Button';
import InputLabel from "@material-ui/core/InputLabel";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { addeducationDetails } from "../../actions/Profileactions";
import { updateEducation } from "../../actions/Profileactions";
import moment from "moment";

const styles = theme => ({
    dateLabel: {
        fontSize: '12px'
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    addMore: {
        float: 'right'
    }
});
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            universityName: '',
            fieldOfStudy: '',
            degree: '',
            fieldState: { universityNameState: [], fieldOfStudyState: [], degreeState: [], },
            fromDate: new Date(),
            toDate: new Date(),
            userId: reactLocalStorage.get('userId', ""),
            EducationArr: [{}],
        }
        if (this.state.userId === '' || this.state.userId === 'undefined') {
            this.props.history.push('/');
        }
    }
    handleEducationChange = (idx) => (evt) => {
        const newEducation = this.state.EducationArr.map((education, sidx) => {
            if (idx !== sidx) return education;

            let fieldState = this.state.fieldState[evt.target.name + 'State'];
            fieldState.splice(idx, 1);
            let fieldsObj = { ...this.state.fieldState, [evt.target.name + 'State']: fieldState };
            this.setState({ fieldState: fieldsObj });
            return { ...education, [evt.target.name]: evt.target.value };
        });
        this.setState({ EducationArr: newEducation });
    }
    handleAddEducation = () => {
        this.setState({ EducationArr: this.state.EducationArr.concat([{}]) });
    }

    handleRemoveEducation = (idx) => () => {
        this.setState({ EducationArr: this.state.EducationArr.filter((s, sidx) => idx !== sidx) });
    }
    handlefromDate(date, idx) {
        const newEducation = this.state.EducationArr.map((education, sidx) => {
            if (idx !== sidx) {
                return education;
            }
            else {
                return { ...education, fromDate: date._d };
            }
        })
        this.setState({ dateOpen: false });
        this.setState({ EducationArr: newEducation });
    }
    handletoDate(date, idx) {
        const newEducation = this.state.EducationArr.map((education, sidx) => {
            if (idx !== sidx) {
                return education;
            }
            else {
                return { ...education, toDate: date._d };
            }
        })
        this.setState({ dateOpen: false });
        this.setState({ EducationArr: newEducation });
    }
    componentDidMount() {
        let th = this;
        setTimeout(
            function () {
                if (th.props.profileData && th.props.profileData.length > 0 && this.props.profileData[0].education.length > 0) {
                    this.setState({ EducationArr: th.props.profileData[0].education });
                    // this.setState({ universityName: th.props.profileData[0].education[0].universityName });
                    // this.setState({ fieldOfStudy: th.props.profileData[0].education[0].fieldOfStudy });
                    // this.setState({ degree: th.props.profileData[0].education[0].degree });
                    // this.setState({ fromDate: th.props.profileData[0].education[0].fromDate });
                    // this.setState({ toDate: th.props.profileData[0].education[0].toDate });
                }
            }.bind(this),
            700
        );
    }
    compare = (fromDate, toDate) => {
        var momentA = moment(fromDate, "DD/MM/YYYY");
        var momentB = moment(toDate, "DD/MM/YYYY");
        if (momentA > momentB) return 1;
        else if (momentA < momentB) return -1;
        else return 0;
    }
    handleSave() {
        let th = this;
        let chk = 0;
        this.state.EducationArr.map((eduval, edukey) => {
            if (!_.isEmpty(eduval)) {
                if (this.state.universityName === '' && this.state.fieldOfStudy === '' && this.state.degree === '') {
                    chk = 1;
                    let unvState = this.state.fieldState.universityNameState,
                        studyState = this.state.fieldState.fieldOfStudyState,
                        degreeState = this.state.fieldState.degreeState;
                    unvState.push(edukey);
                    studyState.push(edukey);
                    degreeState.push(edukey);
                    this.setState({
                        fieldState: this.state.fieldState
                    });
                } else {
                    if (this.state.universityName === '') {
                        chk = 1;
                        let unvState = this.state.fieldState.universityNameState;
                        unvState.push(edukey);
                        this.setState({
                            fieldState: this.state.fieldState
                        });
                    }
                    if (this.state.fieldOfStudy === '') {
                        chk = 1;
                        let studyState = this.state.fieldState.fieldOfStudyState;
                        studyState.push(edukey);
                        this.setState({
                            fieldState: this.state.fieldState
                        });
                    }
                    if (this.state.degree === '') {
                        chk = 1;
                        let degreeState = this.state.fieldState.degreeState;
                        degreeState.push(edukey);
                        this.setState({
                            fieldState: this.state.fieldState
                        });
                    }
                    if (chk === 0) {

                    }
                }
            } else {
                chk = 1;
                let unvState = this.state.fieldState.universityNameState,
                    studyState = this.state.fieldState.fieldOfStudyState,
                    degreeState = this.state.fieldState.degreeState;
                unvState.push(edukey);
                studyState.push(edukey);
                degreeState.push(edukey);
                this.setState({
                    fieldState: this.state.fieldState
                });
            }
        })
        // return false;
        let data = {
            educationData: this.state.EducationArr,
            activetab: 2,
            "_id": th.state.userId
        };
        fetch(BasePath + '/educationcreate', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(function (res) {
            th.setState({ loader: false });
            if (res.status === 200) {
                th.props.handleStepChange();
            }
        }).catch((err) => {
            th.props.handleNotification(err.message, "danger");
        })
    }
    handleBack = () => {
        this.props.handleBack();
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <form className={classes.form}>
                    <GridContainer className='titlegrid'>
                        <GridItem xs={12} sm={12} md={6}>
                            <h3>Education details</h3>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <a onClick={this.handleAddEducation} className={classes.addMore}>Add more</a>
                        </GridItem>
                    </GridContainer>
                    <br />
                    {this.state.EducationArr.map((education, idx) => (
                        <GridContainer key={idx}>
                            <GridItem xs={12} sm={12} md={12}>
                                {this.state.EducationArr.length > 1 && idx !== 0 ? (<a onClick={this.handleRemoveEducation(idx)} className={classes.addMore}>Remove</a>) :
                                    ('')
                                }
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <FormControl fullWidth>
                                    <CustomInput
                                        labelText="University name *"
                                        error={this.state.fieldState.universityNameState.includes(idx)}
                                        formControlProps={{
                                            fullWidth: true,
                                            className: classes.customFormControlClasses,
                                        }}
                                        inputProps={{
                                            name: "universityName",
                                            onChange: this.handleEducationChange(idx),
                                            value: education.universityName,
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <CustomInput
                                        labelText="Field of study *"
                                        error={this.state.fieldState.fieldOfStudyState.includes(idx)}
                                        formControlProps={{
                                            fullWidth: true,
                                            className: classes.customFormControlClasses
                                        }}
                                        inputProps={{
                                            name: "fieldOfStudy",
                                            onChange: this.handleEducationChange(idx),
                                            value: education.fieldOfStudy,
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <CustomInput
                                        labelText="Degree *"
                                        error={this.state.fieldState.degreeState.includes(idx)}
                                        formControlProps={{
                                            fullWidth: true,
                                            className: classes.customFormControlClasses
                                        }}
                                        inputProps={{
                                            name: "degree",
                                            onChange: this.handleEducationChange(idx),
                                            value: education.degree,
                                        }}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                {/* <InputLabel className={classes.dateLabel}>From date</InputLabel> */}
                                <Datetime
                                    timeFormat={false}
                                    className="merritos-textdate"
                                    open={this.state.dateOpen}
                                    onChange={event => this.handlefromDate(event, idx)}
                                    value={Moment(education.fromDate).format('DD/MM/YYYY')}
                                    inputProps={{ placeholder: 'From date', disabled: false }}
                                />
                                {/* <InputLabel className={classes.dateLabel}>To date</InputLabel> */}
                                <Datetime
                                    timeFormat={false}
                                    className="merritos-textdate"
                                    name="toDate"
                                    open={this.state.dateOpen}
                                    onChange={event => this.handletoDate(event, idx)}
                                    value={Moment(education.toDate).format('DD/MM/YYYY')}
                                    inputProps={{ placeholder: 'To date', disabled: false }}
                                />
                            </GridItem>
                        </GridContainer>
                    ))}
                    <GridContainer>
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
