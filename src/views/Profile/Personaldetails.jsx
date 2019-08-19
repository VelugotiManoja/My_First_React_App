import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Button from '@material-ui/core/Button';
import InputLabel from "@material-ui/core/InputLabel"
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from "jquery";
const styles = theme => ({
    backButton: {
        marginRight: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    title: {
        textAlign: 'center'
    }
});
class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            br: false,
            firstName: '',
            firstNameState: '',
            lastName: '',
            lastNameState: '',
            email: '',
            emailState: '',
            phoneNumber: '',
            phoneNumberState: '',
            street: '',
            state: '',
            city: '',
            country: '',
            pinCode: '',
            role: "",
            isCoach: 'yes',
            dummyImage: 'http://100dayscss.com/codepen/upload.svg',
            profileImage: '',
            userId: reactLocalStorage.get('userId', ""),
            color: 'success',
            notification: ''
        };
        if (this.state.userId === '' || this.state.userId === 'undefined') {
            this.props.history.push('/');
        }
    }
    verifyEmail(value) {
        let emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value)) {
            return true;
        }
        return false;
    }
    verifyNumber = (number) => {
        var numbers = /^[0-9]+$/;
        if (number.match(numbers)) {
            return true;
        } else {
            return false;
        }
    }
    change(event) {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.length === 1) {
            this.onFocus();
        }
    }
    onFocus() {
        this.setState({ firstNameState: "" });
        this.setState({ lastNameState: "" });
        this.setState({ phoneNumberState: "" });
        this.setState({ emailState: "" });
    }
    componentDidMount() {
        let th = this;
        setTimeout(
            function () {
                if (th.props.profileData && th.props.profileData.length > 0) {
                    this.setState({ firstName: th.props.profileData[0].firstName });
                    this.setState({ lastName: th.props.profileData[0].lastName });
                    this.setState({ email: th.props.profileData[0].email });
                    this.setState({ phoneNumber: th.props.profileData[0].phoneNumber });
                    this.setState({ street: th.props.profileData[0].street });
                    this.setState({ state: th.props.profileData[0].state });
                    this.setState({ city: th.props.profileData[0].city });
                    this.setState({ lastName: th.props.profileData[0].lastName });
                    this.setState({ country: th.props.profileData[0].country });
                    this.setState({ pinCode: th.props.profileData[0].pinCode });
                    this.setState({ role: th.props.profileData[0].role });
                    this.setState({ goal: th.props.profileData[0].goal });
                    this.setState({ dummyImage: BasePath + '/uploads/150/' + th.props.profileData[0].profileImage });
                    this.setState({ profileImage: th.props.profileData[0].profileImage });
                }
            }.bind(this),
            700
        );
    }
    handleSelectChange = name => event => {
        this.setState({ [name]: event.target.value });
        if (event.target.value === "Professional") {
            this.setState({ showCouch: true });
        }
        else {
            this.setState({ showCouch: false });
        }
    };
    handleCoachChange = event => {
        this.setState({ isCoach: event.target.value });
    };
    upploadbtn = (e, n) => {
        $('#contained-button-file' + n).trigger('click');
    }
    fileChangedHandler = (event) => {
        var th = this;
        let FileUploadPath = event.target.files[0].name;
        let Extension = FileUploadPath.substring(
            FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        //The file uploaded is an image
        if (Extension == "jpeg" || Extension == "jpg") {
            let selectedFile = event.target.files[0];
            let userId = th.state.userId;
            let formData = new FormData();
            formData.append('file', selectedFile);
            fetch(BasePath + '/savedata', {
                method: 'post',
                body: formData,
                headers: { "userid": userId }
            })
                .then((resp) => resp.json()) // Transform the data into json
                .then(function (data) {
                    let updateImg = BasePath + '/uploads/150/' + data.filename;
                    th.setState({ profileImage: data.filename, dummyImage: updateImg });
                });
        }
        //The file upload is NOT an image
        else {
            this.props.stepChange('Photo only allows file types of JPG, JPEG', 'danger');
        }
    }
    ButtonClick() {
        var th = this;
        if (this.state.profileImage === "") {
            this.props.handleNotification('Please upload a profile image', 'danger');
        } else if (this.state.role === "") {
            this.props.handleNotification('Please select a role', 'danger');
        } else if (this.state.firstName === "") {
            th.setState({ firstNameState: "error" });
        } else if (this.state.lastName === "") {
            this.setState({ lastNameState: "error" })
        } else if (!this.verifyEmail(this.state.email)) {
            this.setState({ emailState: "error" })
        } else if (!this.verifyNumber(this.state.phoneNumber)) {
            this.setState({ phoneNumberState: "error" })
        } else {
            var data = {
                role: th.state.role,
                "firstName": th.state.firstName,
                "lastName": th.state.lastName,
                "email": th.state.email,
                "phoneNumber": th.state.phoneNumber,
                "street": th.state.street,
                "state": th.state.state,
                "city": th.state.city,
                "country": th.state.country,
                "pinCode": th.state.pinCode,
                "userId": th.state.userId,
                profileImage: th.state.profileImage,
                // activetab: 1
            }
            if (this.state.role === 'Professional')
                data.isCoach = this.state.isCoach;
            fetch(BasePath + '/createpersonalinfo', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(function (res) {
                th.setState({ loader: false });
                if (res.status === 200) {
                    // th.props.handleStepChange();
                    th.props.stepChange("Profile Updated successfully ", "success");
                }
            }).catch((err) => {
                // th.props.handleNotification(err.message, "danger");
                th.props.stepChange(err.message, "danger");
            })
        }
    }
    keydownHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.ButtonClick();
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <form className={classes.form} onKeyPress={(e) => this.keydownHandler(e)}>
                    <h3 className='wizardTitle'>Personal information</h3><br />
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <div className="fileUpload-tiles profilePic">
                                {/* <h4 className={classes.title}>Profile image</h4> */}
                                <div className="body">
                                    <div class="dropzone">
                                        <div class="content">
                                            <img src={this.state.dummyImage} className="uploadImg" />
                                            <span class="filename"></span>
                                            <input className={classes.input} id="contained-button-file" name="ssc" onChange={this.fileChangedHandler}
                                                type="file" />
                                        </div>
                                    </div>
                                </div>
                                <div className="upload-btn">
                                    <label onClick={(e) => this.upploadbtn(e, "")} for="file-1">
                                        <i class="fa fa-camera"></i>
                                        <span>Choose Picture</span>
                                    </label>
                                    {/* <Button variant="contained" component="span" className={classes.button} onClick={(e) => this.upploadbtn(e, "")}>
                                        Upload
                            </Button> */}

                                </div>
                            </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8}>
                            {/* <h4>Personal details</h4>
                            <br /> */}
                            <FormControl fullWidth>
                                {/* <InputLabel shrink htmlFor="age-native-label-placeholder">
                                    I am currently
                                </InputLabel> */}
                                <NativeSelect
                                    className="merritos-textbox"
                                    label="I am currently"
                                    value={this.state.role}
                                    onChange={this.handleSelectChange('role')}
                                    input={<Input name="role" id="age-native-label-placeholder" />}
                                    inputProps={{
                                        name: 'role',
                                        id: 'age-native-label-placeholder',
                                    }}
                                >
                                    <option value="">I am currently</option>
                                    <option value="Student">A student</option>
                                    <option value="Outofcollege">Out of college</option>
                                    <option value="Professional">A proffessional</option>
                                </NativeSelect>
                            </FormControl>
                            <FormControl fullWidth>
                                <CustomInput
                                    labelText="First name *"
                                    success={this.state.firstNameState === "success"}
                                    error={this.state.firstNameState === "error"}
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.customFormControlClasses,
                                    }}
                                    inputProps={{
                                        name: "firstName",
                                        onChange: event => this.change(event),
                                        value: this.state.firstName,
                                        onFocus: () => this.onFocus()
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <CustomInput
                                    labelText="Last name *"
                                    success={this.state.lastNameState === "success"}
                                    error={this.state.lastNameState === "error"}
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.customFormControlClasses,
                                    }}
                                    inputProps={{
                                        name: "lastName",
                                        onChange: event => this.change(event),
                                        value: this.state.lastName,
                                        onFocus: () => this.onFocus()
                                    }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <FormControl fullWidth>
                                <CustomInput
                                    labelText="Email *"
                                    success={this.state.emailState === "success"}
                                    error={this.state.emailState === "error"}
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.customFormControlClasses,
                                    }}
                                    inputProps={{
                                        name: "email",
                                        onChange: event => this.change(event),
                                        value: this.state.email,
                                        onFocus: () => this.onFocus()
                                    }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <FormControl fullWidth>
                                <CustomInput
                                    labelText="Phone number *"
                                    success={this.state.phoneNumberState === "success"}
                                    error={this.state.phoneNumberState === "error"}
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.customFormControlClasses,
                                    }}
                                    inputProps={{
                                        name: "phoneNumber",
                                        onChange: event => this.change(event),
                                        value: this.state.phoneNumber,
                                        onFocus: () => this.onFocus()
                                    }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem style={this.state.showCouch ? {} : { display: 'none' }} xs={12} sm={12} md={6}>
                            <FormControl>
                                <h5>Do you want to be a learning coach? <br />
                                    <FormControlLabel checked={this.state.isCoach === 'yes'} value="yes" control={<Radio />} label="Yes" onChange={this.handleCoachChange} />
                                    <FormControlLabel checked={this.state.isCoach === 'no'} value="no" control={<Radio />} label="No" onChange={this.handleCoachChange} />
                                </h5>
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                    <h3 className='wizardTitle'>Additional information</h3><br />
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <FormControl fullWidth>
                                <CustomInput
                                    labelText="Street *"
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.customFormControlClasses,
                                    }}
                                    inputProps={{
                                        name: "street",
                                        onChange: event => this.change(event),
                                        value: this.state.street
                                    }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <FormControl fullWidth>
                                <CustomInput
                                    labelText="Village/City *"
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.customFormControlClasses,
                                    }}
                                    inputProps={{
                                        name: "city",
                                        onChange: event => this.change(event),
                                        value: this.state.city
                                    }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <FormControl fullWidth>
                                <CustomInput
                                    labelText="State *"
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.customFormControlClasses,
                                    }}
                                    inputProps={{
                                        name: "state",
                                        onChange: event => this.change(event),
                                        value: this.state.state
                                    }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <FormControl fullWidth>
                                <CustomInput
                                    labelText="Country *"
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.customFormControlClasses,
                                    }}
                                    inputProps={{
                                        name: "country",
                                        onChange: event => this.change(event),
                                        value: this.state.country
                                    }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <FormControl fullWidth>
                                <CustomInput
                                    labelText="Pincode *"
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.customFormControlClasses,
                                    }}
                                    inputProps={{
                                        name: "pinCode",
                                        onChange: event => this.change(event),
                                        value: this.state.pinCode
                                    }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <Button style={{ float: 'right' }} variant="contained"
                                color="primary" onClick={() => this.ButtonClick()}
                            >
                                Update
                            </Button>
                            {/* <Button
                                style={{ float: 'right' }}
                                disabled={true}
                                className={classes.backButton}
                            >
                                Back
                            </Button> */}
                        </GridItem>
                    </GridContainer>
                </form>
            </div>
        );
    }
}
PersonalPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
const profileList = state => ({
    profileData: state.profile.profileData,
});
export default connect(profileList, {})(withStyles(styles)(PersonalPage));
