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
import InputLabel from "@material-ui/core/InputLabel";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { addworkExperience } from "../../actions/Profileactions";
import { updateworkExperience } from "../../actions/Profileactions";
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
class workExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            companyNameState: '',
            designation: '',
            designationState: '',
            fromDate: new Date(),
            toDate: new Date(),
            userId: reactLocalStorage.get('userId', ""),
            tr: false,
            color: 'success',
            notification: '',
            workExpArr: [{ fromDate: new Date(),
                toDate: new Date()}]
        }
        if (this.state.userId === '' || this.state.userId === 'undefined') {
            this.props.history.push('/');
        }
    }
    componentDidMount() {
        let th = this;
        setTimeout(
            function () {
                if (th.props.profileData && th.props.profileData.length > 0 && this.props.profileData[0].experience.length > 0) {
                    this.setState({ workExpArr: th.props.profileData[0].experience });
                    // this.setState({ companyName: th.props.profileData[0].experience[0].companyName });
                    // this.setState({ designation: th.props.profileData[0].experience[0].designation });
                    // this.setState({ fromDate: th.props.profileData[0].experience[0].fromDate });
                    // this.setState({ toDate: th.props.profileData[0].experience[0].toDate });
                }
            }.bind(this),
            700
        );
    }
    // change(event) {
    //     this.setState({ [event.target.name]: event.target.value });
    //     if (event.target.value.length === 1) {
    //         this.onFocus();
    //     }
    // }
    onFocus() {
        this.setState({ companyNameState: "" });
        this.setState({ designationState: "" });
    }
    handleWorkexpChange = (idx) => (evt) => {
        const newWorkexperience = this.state.workExpArr.map((workexp, sidx) => {
            if (idx !== sidx) return workexp;
            return { ...workexp, [evt.target.name]: evt.target.value };
        });
        this.setState({ workExpArr: newWorkexperience });
    }
    handleAddExperience = () => {
        this.setState({ workExpArr: this.state.workExpArr.concat([{fromDate: new Date(),
            toDate: new Date()}]) });
    }
    handleRemoveExperience = (idx) => () => {
        this.setState({ workExpArr: this.state.workExpArr.filter((s, sidx) => idx !== sidx) });
    }
   
    handlefromDate(date, idx) {
        const newWorkexperience = this.state.workExpArr.map((workexp, sidx) => {
            if (idx !== sidx) {
                return workexp;
            }
            else {
                return { ...workexp, fromDate: date._d };
            }
        })
        this.setState({ dateOpen: false });
        this.setState({ workExpArr: newWorkexperience });
    }
    handletoDate(date, idx) {
        const newWorkexperience = this.state.workExpArr.map((workexp, sidx) => {
            if (idx !== sidx) {
                return workexp;
            }
            else {
                return { ...workexp, toDate: date._d };
            }
        })
        this.setState({ dateOpen: false });
        this.setState({ workExpArr: newWorkexperience });
     }
    compare(fromDate, toDate) {
        var momentA = moment(fromDate, "DD/MM/YYYY");
        var momentB = moment(toDate, "DD/MM/YYYY");
        if (momentA > momentB) return 1;
        else if (momentA < momentB) return -1;
        else return 0;
    }
    handleSave() {
        let th = this;
        if (this.state.workExpArr.length > 0) {
            let data = {
                experienceData: this.state.workExpArr,
                activetab: 3,
                "_id": th.state.userId
            };
              fetch(BasePath + '/experiencecreate', {
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
    }
    handleBack = () => {
        this.props.handleBack();
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
                <form className={classes.form}>
                    <GridContainer className='titlegrid'>
                        <GridItem xs={12} sm={12} md={6}>
                            <h3>Work experience</h3>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <a onClick={this.handleAddExperience} className={classes.addMore}>Add more</a>
                        </GridItem>
                    </GridContainer>
                    <br />
                    {this.state.workExpArr.map((workexp, idx) => (
                        <GridContainer key={idx}>
                            <GridItem xs={12} sm={12} md={12}>
                                {this.state.workExpArr.length > 1 && idx !== 0 ? (<a onClick={this.handleRemoveExperience(idx)} className={classes.addMore}>Remove</a>) :
                                    ('')
                                }
                            </GridItem>
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
                                            onChange: this.handleWorkexpChange(idx),
                                            value: workexp.companyName,
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
                                            onChange: this.handleWorkexpChange(idx),
                                            value: workexp.designation,
                                            onFocus: () => this.onFocus()
                                        }}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                {/* <InputLabel className={classes.dateLabel}>From date</InputLabel> */}
                                <Datetime
                                    timeFormat={false}
                                    name="fromDate"
                                    className="merritos-textdate"
                                    open={this.state.dateOpen}
                                    onChange={event => this.handlefromDate(event, idx)}
                                    value={Moment(workexp.fromDate).format('DD/MM/YYYY')}
                                    inputProps={{ placeholder: 'From date', disabled: false }}
                                />
                                {/* <InputLabel className={classes.dateLabel}>To date</InputLabel> */}
                                <Datetime
                                    timeFormat={false}
                                    name="toDate"
                                    className="merritos-textdate"
                                    open={this.state.dateOpen}
                                    onChange={event => this.handletoDate(event, idx)}
                                    value={Moment(workexp.toDate).format('DD/MM/YYYY')}
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
