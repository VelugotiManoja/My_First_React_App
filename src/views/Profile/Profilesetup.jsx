import React from "react";
import PropTypes from 'prop-types';
import Datetime from "react-datetime";
import { connect } from 'react-redux';
import Moment from 'moment';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PopPop from 'react-poppop';
import BasePath from '../../basepath';
import withStyles from "@material-ui/core/styles/withStyles";
import { reactLocalStorage } from 'reactjs-localstorage';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import FormControl from "@material-ui/core/FormControl";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Container, Row, Col } from 'reactstrap';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FileImage from "./../../assets/img/file.png"
import { fetchprofileData } from "../../actions/Profileactions";
import { addeducationDetails } from "../../actions/Profileactions";
import { updateEducation } from "../../actions/Profileactions";
import { addworkExperience } from "../../actions/Profileactions";
import { updateworkExperience } from "../../actions/Profileactions";
import { addAchievements } from "../../actions/Profileactions";
import { updateAchievements } from "../../actions/Profileactions";
import { addExpertise } from "../../actions/Profileactions";
import { updateExpertise } from "../../actions/Profileactions";
import { addRecommendation } from "../../actions/Profileactions";
import { updateRecommendation } from "../../actions/Profileactions";
import defaultImg from '../../assets/img/usericon.png';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import $ from "jquery";
import DialogTitle from '@material-ui/core/DialogTitle';
import { loaderfalse } from '../../actions/Loader';


const variantIcon = {
    success: CheckCircleIcon,
    info: InfoIcon,
    error: ErrorIcon,
    warning: WarningIcon,
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    }
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);
const styles = theme => ({
    input: {
        display: 'none'
    }
});
class ProfileSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ssc: FileImage,
            intermediate: FileImage,
            preGraduation: FileImage,
            postGraduation: FileImage,
            profAdd: false,
            addressAdd: false,
            summaryEdit: false,
            educationAdd: false,
            experienceAdd: false,
            achieveAdd: false,
            expertiseAdd: false,
            recommendationAdd: false,
            profileImage: defaultImg,
            firstName: '',
            firstNameState: '',
            lastName: '',
            lastNameState: '',
            email: '',
            emailState: '',
            phoneNumber: '',
            phoneNumberState: '',
            role: "",
            isCoach: 'yes',
            street: '',
            streetState: '',
            city: '',
            cityState: '',
            state: '',
            stateState: '',
            country: '',
            countryState: '',
            pinCode: '',
            pinCodeState: '',
            summary: '',
            summaryState: '',
            universityName: '',
            universityNameState: '',
            fieldOfStudy: '',
            fieldOfStudyState: '',
            degree: '',
            degreeState: '',
            eduStartDate: new Date(),
            eduEndDate: new Date(),
            dateOpen: false,
            eduId: 0,
            color: 'error',
            eduNew: true,
            eduEdit: false,
            companyName: '',
            companyNameState: '',
            designation: '',
            designationState: '',
            expStartDate: new Date(),
            expEndDate: new Date(),
            expNew: true,
            expEdit: false,
            achievements: '',
            achievementsState: '',
            achieveNew: true,
            achieveEdit: false,
            expertise: '',
            expertiseState: '',
            expertiseNew: true,
            expertiseEdit: false,
            recommendation: '',
            recommendationState: '',
            recommendationNew: true,
            recommendationEdit: false,
            alertOpen: false,
            rowId: -1,
            delType: '',
            userId: reactLocalStorage.get('userId', ""),
            crop: {
                aspect: 1,
                width: 50,
                x: 0,
                y: 0,
            },
            croppedImageUrl: '',
            cropShow: false
        };
        if (this.state.userId === '' || this.state.userId === 'undefined') {
            this.props.history.push('/');
        }
    }
    async componentDidMount() {
        this.props.fetchprofileData(this.state.userId);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.educationUpdate) {
            this.props.profileData[0].education[this.state.rowId] = nextProps.educationUpdate;
        }
        if (nextProps.workExperienceUpdate) {
            this.props.profileData[0].experience[this.state.rowId] = nextProps.workExperienceUpdate;
        }
        if (nextProps.achievementsUpdate) {
            this.props.profileData[0].achievements[this.state.rowId] = nextProps.achievementsUpdate;
        }
        if (nextProps.expertiseUpdate) {
            this.props.profileData[0].expertise[this.state.rowId] = nextProps.expertiseUpdate;
        }
        if (nextProps.recommendationUpdate) {
            this.props.profileData[0].recommendation[this.state.rowId] = nextProps.recommendationUpdate;
        }
    }
    uploadbtn = (e, n) => {
        $('#contained-button-file' + n).trigger('click');
    }
    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            let FileUploadPath = e.target.files[0].name;
            let Extension = FileUploadPath.substring(
                FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "jpeg" || Extension == "jpg") {
                // The file uploaded is an image
                // if (e.target.files[0].size > 100000 && e.target.files[0].size < 255000) {
                this.setState({ cropShow: true });
                const reader = new FileReader();
                reader.addEventListener('load', () =>
                    this.setState({ src: reader.result }),
                );
                reader.readAsDataURL(e.target.files[0]);
                // } else {
                //     this.handleNotification('Photo size must be greater than 100kb and less than 255Kb', 'error');
                // }
            } else {
                this.handleNotification('Photo only allows file types of JPG, JPEG', 'error');
            }
        }
    };

    onImageLoaded = (image, pixelCrop) => {
        this.imageRef = image;

        // Make the library regenerate aspect crops if loading new images.
        const { crop } = this.state;

        if (crop.aspect && crop.height && crop.width) {
            this.setState({
                crop: { ...crop, height: null },
            });
        } else {
            this.makeClientCrop(crop, pixelCrop);
        }
    };

    onCropComplete = (crop, pixelCrop) => {
        this.makeClientCrop(crop, pixelCrop);
    };

    onCropChange = crop => {
        this.setState({ crop });
    };

    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                'newFile.jpeg',
            );
            this.setState({ croppedImageUrl })
        }
    }

    getCroppedImg(image, pixelCrop, fileName) {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                this.setState({ blob });
            }, 'image/jpeg');
        });
    }
    profilePicChange = (event) => {
        var th = this;
        let selectedFile = th.state.blob;
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
                fetch(BasePath + '/createpersonalinfo', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify({ profileImage: data.filename, userId: userId })
                }).then(function (res) {
                    th.setState({ loader: false });
                    if (res.status === 200) {
                        let updateImg = BasePath + '/uploads/150/' + data.filename;
                        if (!th.props.profileData[0].profileImage)
                            th.props.profileData[0].percentage = th.props.profileData[0].percentage + 10;
                        th.props.profileData[0].profileImage = data.filename;
                        th.setState({ profileImage: updateImg, cropShow: false });
                        th.handleNotification("Profile image has been updated successfully ", "success");
                    }
                }).catch((err) => {
                    th.handleNotification(err.message, "error");
                })
            });
    }
    fileChangedHandler = (event) => {
        var th = this;
        let type = event.target.name;
        let userId = th.state.userId;
        let selectedFile = event.target.files[0];
        let FileUploadPath = event.target.files[0].name;
        let Extension = FileUploadPath.substring(
            FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "jpeg" || Extension == "jpg") {
            let formData = new FormData();
            formData.append('file', selectedFile);
            fetch(BasePath + '/savedata', {
                method: 'post',
                body: formData,
                headers: { "userid": userId, ext: event.target.name }
            })
                .then((resp) => resp.json()) // Transform the data into json
                .then(function (data) {
                    let path = BasePath + '/' + data.path;
                    let serdata = { "type": type, "path": data.path, "_id": th.state.userId };
                    fetch(BasePath + '/documentsupload', {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        body: JSON.stringify(serdata)
                    }).then(function (res) {
                        th.setState({ loader: false });
                        if (res.status === 200) {
                            if (th.props.profileData[0].ssc === '' && th.props.profileData[0].intermediate === '' && th.props.profileData[0].preGraduation === '' && th.props.profileData[0].postGraduation === '') {
                                th.props.profileData[0].percentage = th.props.profileData[0].percentage + 15;
                            }
                            if (type === "ssc") {
                                th.props.profileData[0].ssc=data.path;
                                th.setState({ ssc: path });
                            }
                            else if (type === "intermediate") {
                                th.props.profileData[0].intermediate=data.path;
                                th.setState({ intermediate: path });
                            }
                            else if (type === "preGraduation") {
                                th.props.profileData[0].preGraduation=data.path;
                                th.setState({ preGraduation: path });
                            }
                            else if (type === "postGraduation") {
                                th.props.profileData[0].postGraduation=data.path;
                                th.setState({ postGraduation: path });
                            }
                        }
                    });

                })
        } else {
            this.handleNotification('Photo only allows file types of JPG, JPEG', 'error');
        }
    }
    showNotification(place) {
        if (!this.state[place]) {
            var x = [];
            x[place] = true;
            this.setState(x);
            setTimeout(
                function () {
                    x[place] = false;
                    this.setState(x);
                }.bind(this),
                3000
            );
        }
    }
    handleNotification = (notification, color) => {
        this.setState({ notification: notification });
        this.setState({ color: color });
        this.showNotification('br');
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
    verifyLength(value, length) {
        if (value.length >= length) {
            return true;
        }
        return false;
    }
    roleChange = name => event => {
        this.setState({ [name]: event.target.value });
        if (event.target.value === "Professional") {
            this.setState({ showCoach: true });
        }
        else {
            this.setState({ showCoach: false });
        }
    };
    coachChange = event => {
        this.setState({ isCoach: event.target.value });
    };
    handletoDate(event, key) {
        this.setState({ [key]: event._d });
        this.setState({ dateOpen: false });
    }
    handlefromDate(event, key) {
        this.setState({ [key]: event._d });
        this.setState({ dateOpen: false })
    }
    compare = (fromDate, toDate) => {
        var momentA = Moment(new Date(fromDate), "DD/MM/YYYY");
        var momentB = Moment(new Date(toDate), "DD/MM/YYYY");
        if (momentA > momentB) return 1;
        else if (momentA < momentB) return -1;
        else return 0;
    }
    profileChange = (event) => {
        if (this.verifyLength(event.target.value, 1)) {
            this.setState({ [event.target.name + "State"]: false });
            this.setState({ [event.target.name]: event.target.value });
        } else {
            this.setState({ [event.target.name + "State"]: true });
            this.setState({ [event.target.name]: event.target.value });
        }
    }
    profileUpdate() {
        var th = this;
        if (this.state.role === "") {
            this.handleNotification('Please select a role', 'error');
        } else if (this.state.firstName === "") {
            th.setState({ firstNameState: true });
        } else if (this.state.lastName === "") {
            this.setState({ lastNameState: true })
        } else if (!this.verifyEmail(this.state.email)) {
            this.setState({ emailState: true })
        } else if (this.state.phoneNumber === '' || !this.verifyNumber(this.state.phoneNumber)) {
            this.setState({ phoneNumberState: true })
        } else {
            var data = {
                role: th.state.role,
                firstName: th.state.firstName,
                lastName: th.state.lastName,
                email: th.state.email,
                phoneNumber: th.state.phoneNumber,
                userId: th.state.userId
            }
            if (this.state.role === 'Professional')
                data.isCoach = this.state.isCoach;
            else
                data.isCoach = 'no';
            fetch(BasePath + '/createpersonalinfo', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(function (res) {
                th.setState({ loader: false });
                if (res.status === 200) {
                    th.props.profileData[0].firstName = data.firstName;
                    th.props.profileData[0].lastName = data.lastName;
                    th.props.profileData[0].email = data.email;
                    th.props.profileData[0].phoneNumber = data.phoneNumber;
                    th.props.profileData[0].role = data.role;
                    th.props.profileData[0].isCoach = data.isCoach;
                    th.handleNotification("Profile Updated successfully ", "success");
                    th.setState({ profAdd: false })
                }
            }).catch((err) => {
                th.handleNotification(err.message, "error");
            })
        }
    }
    addressUpdate() {
        var th = this;
        if (this.state.street === "") {
            th.setState({ streetState: true });
        } else if (this.state.city === "") {
            th.setState({ cityState: true });
        } else if (this.state.state === "") {
            this.setState({ stateState: true })
        } else if (this.state.country === "") {
            this.setState({ countryState: true })
        } else if (this.state.pinCode === "" || !this.verifyNumber(this.state.pinCode)) {
            this.setState({ pinCodeState: true })
        } else {
            var data = {
                street: th.state.street,
                city: th.state.city,
                state: th.state.state,
                country: th.state.country,
                pinCode: th.state.pinCode,
                userId: th.state.userId
            }
            fetch(BasePath + '/createpersonalinfo', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(function (res) {
                th.setState({ loader: false });
                if (res.status === 200) {
                    if (th.props.profileData[0].street === '')
                        th.props.profileData[0].percentage = th.props.profileData[0].percentage + 10;
                    th.props.profileData[0].street = data.street;
                    th.props.profileData[0].city = data.city;
                    th.props.profileData[0].state = data.state;
                    th.props.profileData[0].country = data.country;
                    th.props.profileData[0].pinCode = data.pinCode;
                    th.handleNotification("Address has been Updated successfully ", "success");
                    th.setState({ addressAdd: false })
                }
            }).catch((err) => {
                th.handleNotification(err.message, "error");
            })
        }
    }
    summaryUpdate = () => {
        let th = this;
        if (th.state.summary === "") {
            th.setState({ summaryState: true });
        } else {
            th.setState({ loader: true });
            let reqObj = { summary: th.state.summary, userId: th.state.userId };
            fetch(BasePath + '/summaryupdate', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(reqObj)
            }).then((resp) => resp.json()) // Transform the data into json
                .then(function (data) {
                    if (data.length === 1) {
                        if (th.props.profileData[0].summary === '')
                            th.props.profileData[0].percentage = th.props.profileData[0].percentage + 10;
                        th.props.profileData[0].summary = th.state.summary;
                        th.setState({ loader: false, summaryEdit: false });
                        th.handleNotification(data.message, 'success');
                    } else {
                        th.setState({ loader: false });
                        th.handleNotification(data.message, 'error');
                    }
                }).catch((err) => {
                    th.setState({ loader: false });
                    th.handleNotification(err.message, 'error');
                });
        }
    }
    educationSave() {
        let chk = 0;
        if (this.state.universityName === "" && this.state.fieldOfStudy === "" && this.state.degree === "") {
            this.setState({ universityNameState: true, fieldOfStudyState: true, degreeState: true });
        } else {
            if (this.state.universityName === "") {
                chk = 1;
                this.setState({ universityNameState: true });
            }
            if (this.state.fieldOfStudy === "") {
                chk = 1;
                this.setState({ fieldOfStudyState: true });
            }
            if (this.state.degree === "") {
                chk = 1;
                this.setState({ degreeState: true });
            }
            if (chk === 0) {
                if (this.compare(this.state.eduEndDate, this.state.eduStartDate) === -1) {
                    this.handleNotification("Todate should not be less than fromdate", "error");
                } else if (this.compare(this.state.eduEndDate, this.state.eduStartDate) === 0) {
                    this.handleNotification("Fromdate and todate should not be equal", "error");
                } else {
                    if (this.state.eduNew) {
                        let data = {
                            educationData: [{
                                "universityName": this.state.universityName,
                                "fieldOfStudy": this.state.fieldOfStudy,
                                "degree": this.state.degree,
                                "fromDate": this.state.eduStartDate,
                                "toDate": this.state.eduEndDate
                            }],
                            "_id": this.state.userId
                        };
                        this.props.addeducationDetails(data);
                        if (this.props.profileData[0].education.length === 0)
                            this.props.profileData[0].percentage = this.props.profileData[0].percentage + 10;
                        this.setState({
                            universityName: '', fieldOfStudy: '', degree: '',
                            eduStartDate: new Date(), eduEndDate: new Date(), educationAdd: false
                        });
                        this.handleNotification("Added successfully ", "success");
                    } else {
                        let data = {
                            educationData: {
                                "universityName": this.state.universityName,
                                "fieldOfStudy": this.state.fieldOfStudy,
                                "degree": this.state.degree,
                                "fromDate": this.state.eduStartDate,
                                "toDate": this.state.eduEndDate,
                                "_id": this.state.userId,
                                "eduId": this.state.eduId
                            }
                        };
                        this.props.updateEducation(data);
                        this.setState({
                            universityName: '', fieldOfStudy: '', degree: '',
                            eduStartDate: new Date(), eduEndDate: new Date(),
                            eduNew: true, educationAdd: false, eduEdit: false
                        });
                        this.handleNotification("Updated successfully", "success");
                    }
                }
            }
        }
    }
    educationEdit(id) {
        this.setState({ universityName: this.props.profileData[0].education[id].universityName });
        this.setState({ fieldOfStudy: this.props.profileData[0].education[id].fieldOfStudy });
        this.setState({ degree: this.props.profileData[0].education[id].degree });
        this.setState({ eduStartDate: this.props.profileData[0].education[id].fromDate });
        this.setState({ eduEndDate: this.props.profileData[0].education[id].toDate });
        this.setState({ eduId: this.props.profileData[0].education[id].eduId });
        this.setState({ rowId: id, eduNew: false, eduEdit: !this.state.eduEdit, educationAdd: false });
    }
    deleteAlert = (key, type) => {
        this.setState({ alertOpen: true });
        this.setState({ rowId: key });
        this.setState({ delType: type })
    }
    educationRemove = () => {
        let th = this;
        let data = { eduId: th.props.profileData[0].education[th.state.rowId].eduId, userId: th.state.userId };
        fetch(BasePath + '/educationdelete', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()) // Transform the data into json
            .then(function (serdata) {
                if (serdata.length === 1) {
                    th.props.profileData[0].education.splice(th.state.rowId, 1);
                    if (th.props.profileData[0].education.length === 0)
                        th.props.profileData[0].percentage = th.props.profileData[0].percentage - 10;
                    th.setState({ alertOpen: false });
                }
            }).catch((err) => {
                th.handleNotification(err.message, "error");
                th.setState({ alertOpen: false });
            })
    }
    alertClose = () => {
        this.setState({ alertOpen: false });
    }
    experienceSave() {
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
                if (th.compare(this.state.expEndDate, this.state.expStartDate) === -1) {
                    this.handleNotification("Todate should not be less than fromdate", "error");
                } else if (th.compare(this.state.expEndDate, this.state.expStartDate) === 0) {
                    this.handleNotification("Fromdate and todate should not be equal", "error");
                } else {
                    if (this.state.expNew) {
                        let data = {
                            experienceData: [{
                                "companyName": th.state.companyName,
                                "designation": th.state.designation,
                                "fromDate": th.state.expStartDate,
                                "toDate": th.state.expEndDate
                            }],
                            "_id": th.state.userId
                        };
                        th.props.addworkExperience(data);
                        if (th.props.profileData[0].experience.length === 0)
                            th.props.profileData[0].percentage = th.props.profileData[0].percentage + 10;
                        this.setState({
                            companyName: '', designation: '',
                            expStartDate: new Date(), expEndDate: new Date(), experienceAdd: false
                        });
                        th.handleNotification("Work experience has been added successfully", "success");
                    } else {
                        let th = this;
                        if (this.state.companyName === "") {
                            th.setState({ companyNameState: "error" });
                        }
                        else if (this.state.designation === "") {
                            this.setState({ designationState: "error" })
                        }
                        else if (th.compare(this.state.expEndDate, this.state.expStartDate) === -1) {
                            this.handleNotification("Todate should not be less than fromdate", "error");
                        }
                        else if (th.compare(this.state.expEndDate, this.state.expStartDate) === 0) {
                            this.handleNotification("Fromdate and todate should not be equal", "error");
                        }
                        else {
                            let data = {
                                experienceData: {
                                    "companyName": th.state.companyName,
                                    "designation": th.state.designation,
                                    "fromDate": th.state.expStartDate,
                                    "toDate": th.state.expEndDate,
                                    "_id": th.state.userId,
                                    "expId": th.state.expId
                                }
                            };
                            th.props.updateworkExperience(data);
                            this.setState({
                                companyName: '', designation: '',
                                expStartDate: new Date(), expEndDate: new Date(),
                                expEdit: false, expNew: true, experienceAdd: false
                            });
                            th.handleNotification("Work experience details Updated successfully", "success");
                        }
                    }
                }
            }
        }
    }
    experienceEdit(id) {
        let th = this;
        th.setState({ companyName: this.props.profileData[0].experience[id].companyName });
        th.setState({ designation: this.props.profileData[0].experience[id].designation });
        th.setState({ expStartDate: this.props.profileData[0].experience[id].fromDate });
        th.setState({ expEndDate: this.props.profileData[0].experience[id].toDate });
        th.setState({ expId: this.props.profileData[0].experience[id].expId });
        th.setState({ rowId: id, experienceAdd: true, expNew: false, expEdit: !this.state.expEdit, experienceAdd: false });
    }
    experienceRemove = () => {
        let th = this;
        let data = { expId: th.props.profileData[0].experience[th.state.rowId].expId, userId: th.state.userId };
        fetch(BasePath + '/experiencedelete', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json())
            .then(function (serdata) {
                if (serdata.length === 1) {
                    th.props.profileData[0].experience.splice(th.state.rowId, 1);
                    if (th.props.profileData[0].experience.length === 0)
                        th.props.profileData[0].percentage = th.props.profileData[0].percentage - 10;
                    th.setState({ alertOpen: false });
                }
            }).catch((err) => {
                th.handleNotification(err.message, "error");
                th.setState({ alertOpen: false });
            })
    }
    achievementsSave() {
        let th = this;
        if (this.state.achievements === '') {
            th.setState({ achievementsState: true });
        } else {
            if (this.state.achieveNew) {
                let data = {
                    achievementsData: { achievements: this.state.achievements, _id: th.state.userId }
                };
                th.props.addAchievements(data);
                if (th.props.profileData[0].achievements.length === 0)
                    th.props.profileData[0].percentage = th.props.profileData[0].percentage + 10;
                this.setState({
                    achievements: '', achieveAdd: false
                });
                th.handleNotification("Your achievement has been added successfully", "success");
            } else {
                let data = {
                    achievementsData: {
                        achievements: this.state.achievements,
                        _id: th.state.userId,
                        achivId: th.state.achivId
                    }
                };
                th.props.updateAchievements(data);
                this.setState({
                    achievements: '',
                    achieveEdit: false, achieveNew: true, achieveAdd: false
                });
                th.handleNotification("Your achievement has been updated successfully", "success");
            }
        }
    }
    achievementsRemove = () => {
        let th = this;
        let data = { achivId: this.props.profileData[0].achievements[th.state.rowId].achivId, userId: th.state.userId };
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
                    if (th.props.profileData[0].achievements.length === 0)
                        th.props.profileData[0].percentage = th.props.profileData[0].percentage - 10;
                    th.setState({ alertOpen: false });
                }
            }).catch((err) => {
                th.handleNotification(err.message, "error");
                th.setState({ alertOpen: false });
            })
    }
    expertiseSave() {
        let th = this;
        if (this.state.expertise === '') {
            th.setState({ expertiseState: true });
        } else {
            if (this.state.expertiseNew) {
                let data = {
                    expertiseData: { expertise: this.state.expertise, _id: th.state.userId }
                };
                th.props.addExpertise(data);
                if (th.props.profileData[0].expertise.length === 0)
                    th.props.profileData[0].percentage = th.props.profileData[0].percentage + 10;
                this.setState({
                    expertise: '', expertiseAdd: false
                });
                th.handleNotification("Your expertise has been added successfully", "success");
            } else {
                let data = {
                    expertiseData: {
                        expertise: this.state.expertise,
                        _id: th.state.userId,
                        experId: th.state.experId
                    }
                };
                th.props.updateExpertise(data);
                this.setState({
                    expertise: '',
                    expertiseEdit: false, expertiseNew: true, expertiseAdd: false
                });
                th.handleNotification("Your expertise has been updated successfully", "success");
            }
        }
    }
    expertiseRemove = () => {
        let th = this;
        let data = { experId: this.props.profileData[0].expertise[th.state.rowId].experId, userId: th.state.userId };
        fetch(BasePath + '/expertisedelete', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()) // Transform the data into json
            .then(function (serdata) {
                if (serdata.length === 1) {
                    th.props.profileData[0].expertise.splice(th.state.rowId, 1);
                    if (th.props.profileData[0].expertise.length === 0)
                        th.props.profileData[0].percentage = th.props.profileData[0].percentage - 10;
                    th.setState({ alertOpen: false });
                }
            }).catch((err) => {
                th.handleNotification(err.message, "error");
                th.setState({ alertOpen: false });
            })
    }
    recommendationSave() {
        let th = this;
        if (this.state.recommendation === '') {
            th.setState({ recommendationState: true });
        } else {
            if (this.state.recommendationNew) {
                let data = {
                    recommendationData: { recommendation: this.state.recommendation, _id: th.state.userId }
                };
                th.props.addRecommendation(data);
                if (this.props.profileData[0].recommendation.length === 0)
                    this.props.profileData[0].percentage = this.props.profileData[0].percentage + 10;
                this.setState({
                    recommendation: '', recommendationAdd: false
                });
                th.handleNotification("Your recommendation has been added successfully", "success");
            } else {
                let data = {
                    recommendationData: {
                        recommendation: this.state.recommendation,
                        _id: th.state.userId,
                        recomId: th.state.recomId
                    }
                };
                th.props.updateRecommendation(data);
                this.setState({
                    recommendation: '',
                    recommendationEdit: false, recommendationNew: true, recommendationAdd: false
                });
                th.handleNotification("Your recommendation has been updated successfully", "success");
            }
        }
    }
    recommendationRemove = () => {
        let th = this;
        let data = { recomId: this.props.profileData[0].recommendation[th.state.rowId].recomId, userId: th.state.userId };
        fetch(BasePath + '/recommendationdelete', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()) // Transform the data into json
            .then(function (serdata) {
                if (serdata.length === 1) {
                    th.props.profileData[0].recommendation.splice(th.state.rowId, 1);
                    if (th.props.profileData[0].recommendation.length === 0)
                        th.props.profileData[0].percentage = th.props.profileData[0].percentage - 10;
                    th.setState({ alertOpen: false });
                }
            }).catch((err) => {
                th.handleNotification(err.message, "error");
                th.setState({ alertOpen: false });
            })
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ br: false });
    };
    componentDidUpdate() {
        this.props.loaderfalse(window.location.hash.split('#')[1]);
    }
    shouldComponentUpdate(nextprops) {
        return nextprops.componentupdate
    }
    render() {
        const { classes, profileData } = this.props;
        const { crop, croppedImageUrl, src, cropShow } = this.state;
        let deleteFunc = "";
        if (this.state.delType === 'education')
            deleteFunc = this.educationRemove;
        else if (this.state.delType === 'experience')
            deleteFunc = this.experienceRemove;
        else if (this.state.delType === 'achievement')
            deleteFunc = this.achievementsRemove;
        else if (this.state.delType === 'expertise')
            deleteFunc = this.expertiseRemove;
        else if (this.state.delType === 'recommendation')
            deleteFunc = this.recommendationRemove;

        const educationForm = <div className="tbl-cell">
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={4}>
                        <FormControl>
                            <CustomInput
                                labelText="University name *"
                                error={this.state.universityNameState}
                                formControlProps={{
                                    className: classes.customFormControlClasses,
                                }}
                                inputProps={{
                                    name: "universityName",
                                    onChange: event => this.profileChange(event),
                                    value: this.state.universityName,
                                    class: "merritos-textbox-sm"
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <CustomInput
                                labelText="Field of study *"
                                error={this.state.fieldOfStudyState}
                                formControlProps={{
                                    className: classes.customFormControlClasses
                                }}
                                inputProps={{
                                    name: "fieldOfStudy",
                                    onChange: event => this.profileChange(event),
                                    value: this.state.fieldOfStudy,
                                    class: "merritos-textbox-sm"
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <CustomInput
                                labelText="Degree *"
                                error={this.state.degreeState}
                                formControlProps={{
                                    className: classes.customFormControlClasses
                                }}
                                inputProps={{
                                    name: "degree",
                                    onChange: event => this.profileChange(event),
                                    value: this.state.degree,
                                    class: "merritos-textbox-sm"
                                }}
                            />
                        </FormControl>
                    </Col>
                    <Col xs={12} sm={12} md={4}>
                        {/* <InputLabel className={classes.dateLabel}>From date</InputLabel> */}
                        <Datetime
                            timeFormat={false}
                            className="merritos-textdate-sm"
                            open={this.state.dateOpen}
                            onChange={event => this.handlefromDate(event, 'eduStartDate')}
                            value={Moment(this.state.eduStartDate).format('DD/MM/YYYY')}
                            inputProps={{ placeholder: 'From date', readOnly: true }}
                        />
                        {/* <InputLabel className={classes.dateLabel}>To date</InputLabel> */}
                        <Datetime
                            timeFormat={false}
                            className="merritos-textdate-sm"
                            open={this.state.dateOpen}
                            onChange={event => this.handletoDate(event, 'eduEndDate')}
                            value={Moment(this.state.eduEndDate).format('DD/MM/YYYY')}
                            inputProps={{ placeholder: 'To date', readOnly: true }}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
        const experienceForm = <div className="tbl-cell">
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={4}>
                        <FormControl>
                            <CustomInput
                                labelText="Company name *"
                                error={this.state.companyNameState}
                                formControlProps={{
                                    className: classes.customFormControlClasses,
                                }}
                                inputProps={{
                                    name: "companyName",
                                    onChange: event => this.profileChange(event),
                                    value: this.state.companyName,
                                    class: "merritos-textbox-sm"
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <CustomInput
                                labelText="Designation *"
                                error={this.state.designationState}
                                formControlProps={{
                                    className: classes.customFormControlClasses
                                }}
                                inputProps={{
                                    name: "designation",
                                    onChange: event => this.profileChange(event),
                                    value: this.state.designation,
                                    class: "merritos-textbox-sm"
                                }}
                            />
                        </FormControl>
                    </Col>
                    <Col xs={12} sm={12} md={4}>
                        <Datetime
                            timeFormat={false}
                            className="merritos-textdate-sm"
                            open={this.state.dateOpen}
                            onChange={event => this.handlefromDate(event, 'expStartDate')}
                            value={Moment(this.state.expStartDate).format('DD/MM/YYYY')}
                            inputProps={{ placeholder: 'From date', readOnly: true }}
                        />
                        <Datetime
                            timeFormat={false}
                            className="merritos-textdate-sm"
                            open={this.state.dateOpen}
                            onChange={event => this.handletoDate(event, 'expEndDate')}
                            value={Moment(this.state.expEndDate).format('DD/MM/YYYY')}
                            inputProps={{ placeholder: 'To date', readOnly: true }}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
        const achievementForm = <div className="tbl-cell">
            <form>
                <CustomInput
                    multiline={true}
                    labelText="Add your achievement"
                    error={this.state.achievementsState}
                    formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                    }}
                    inputProps={{
                        name: "achievements",
                        onChange: event => this.profileChange(event),
                        value: this.state.achievements,
                        class: 'merritos-textbox-sm'
                    }}
                />
            </form>
        </div>
        const expertiseForm = <div className="tbl-cell">
            <form>
                <CustomInput
                    multiline={true}
                    labelText="Add your expertise"
                    error={this.state.expertiseState}
                    formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                    }}
                    inputProps={{
                        name: "expertise",
                        onChange: event => this.profileChange(event),
                        value: this.state.expertise
                    }}
                />
            </form>
        </div>
        const recommendationForm = <div className="tbl-cell">
            <form>
                <CustomInput
                    multiline={true}
                    labelText="Add your recommendation"
                    error={this.state.recommendationState}
                    formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                    }}
                    inputProps={{
                        name: "recommendation",
                        onChange: event => this.profileChange(event),
                        value: this.state.recommendation
                    }}
                />
            </form>
        </div>
        return (
            <div>
                <CircularProgress visible={this.state.loader}></CircularProgress>
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.br}
                        autoHideDuration={3000}
                        onClose={this.handleClose}
                    >
                        <MySnackbarContentWrapper
                            onClose={this.handleClose}
                            variant={this.state.color}
                            message={this.state.notification}
                        />
                    </Snackbar>
                </div>
                <Dialog
                    open={this.state.alertOpen}
                    onClose={this.alertClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure want to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.alertClose} className={"loginbtn forgotbackbtn"}>No</Button>
                        <Button onClick={deleteFunc} className={"loginbtn"} autoFocus>Yes</Button>
                    </DialogActions>
                </Dialog>
                <Container justify="center">
                    <Row>
                        <Col xs={12} sm={12} md={8} className="offset-md-2">
                            <h3 className="profile-label text-color"> Profile
                            <span className="profile-right-label"><i className="material-icons">share</i>
                            <i className="material-icons">save_alt</i></span>
                            </h3>
                            
                            <section className="box-typical">
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: profileData[0].percentage + "%" }}>
                                        {profileData[0].percentage + "%"}
                                    </div>
                                </div>
                                <article className="profile-info-item">
                                    <Container>
                                        <Row>
                                            <Col className="noPadding" xs={12} sm={12} md={3}>
                                                <div className="profile-section">
                                                    <img src={profileData[0].profileImage ? BasePath + '/uploads/150/' + profileData[0].profileImage : this.state.profileImage} alt="" />
                                                    <input className={classes.input} id="contained-button-file" type="file" onChange={this.onSelectFile} />
                                                    <p class="profile-pic-edit" onClick={(e) => { this.uploadbtn(e, "") }}>
                                                        <i className="material-icons edit-icon">camera_alt</i>
                                                        <span>Choose picture</span>
                                                    </p>
                                                    <PopPop position="centerCenter"
                                                        open={cropShow}
                                                        closeBtn={true}
                                                    // closeOnEsc={true}
                                                    // onClose={() => { this.setState({ cropShow: false }) }}
                                                    // closeOnOverlay={true}
                                                    >
                                                        <DialogTitle id="alert-dialog-title" className="croptitle">{"Crop image"}</DialogTitle>
                                                        {src && (
                                                            <ReactCrop
                                                                src={src}
                                                                crop={crop}
                                                                onImageLoaded={this.onImageLoaded}
                                                                onComplete={this.onCropComplete}
                                                                onChange={this.onCropChange}
                                                            />
                                                        )}
                                                        <DialogActions className="profileimg-btn">
                                                            <Button onClick={(event) => this.profilePicChange(event)} className={"loginbtn " + classes.loginButton}>
                                                                Save
    </Button>
                                                            <Button onClick={() => { this.setState({ cropShow: false }) }} className={"loginbtn forgotbackbtn " + classes.loginButton}>
                                                                Cancel
    </Button>
                                                        </DialogActions>
                                                    </PopPop>
                                                    {/* {croppedImageUrl && <img alt="Crop" src={croppedImageUrl} />} */}
                                                </div>
                                            </Col>
                                            <Col className="noPadding" xs={12} sm={12} md={6}>
                                                {!this.state.profAdd ? (
                                                    <div className="profile-section">
                                                        <i onClick={() => this.setState({
                                                            profAdd: true,
                                                            addressAdd: false,
                                                            role: profileData[0].role,
                                                            firstName: profileData[0].firstName,
                                                            lastName: profileData[0].lastName,
                                                            email: profileData[0].email,
                                                            phoneNumber: profileData[0].phoneNumber,
                                                            isCoach: profileData[0].isCoach,
                                                            showCoach: profileData[0].role === 'Professional' ? true : false
                                                        })
                                                        } className="material-icons edit-icon mobile-edit-icon">edit</i>
                                                        <div>
                                                            <div className="profile-section-name">{profileData[0].firstName + ' ' + profileData[0].lastName}</div>
                                                            <div className="profile-section-status">{profileData[0].role}</div>
                                                            <div className="profile-section-location">{profileData[0].email}</div>
                                                            <div className="profile-section-location">{profileData[0].phoneNumber}</div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                        <form>
                                                            <br />
                                                            <Container>
                                                                <Row>
                                                                    <Col xs={12} sm={12} md={12}>
                                                                        <NativeSelect
                                                                            fullWidth
                                                                            className="merritos-textbox merritos-textbox-sm"
                                                                            label="I am currently"
                                                                            value={this.state.role}
                                                                            onChange={this.roleChange('role')}
                                                                            input={<Input name="role" id="age-native-label-placeholder" />}
                                                                            inputProps={{
                                                                                name: 'role',
                                                                                id: 'age-native-label-placeholder',
                                                                            }}
                                                                        >
                                                                            <option value="">I am currently</option>
                                                                            <option value="Student">A student</option>
                                                                            <option value="Outofcollege">Out of college</option>
                                                                            <option value="Professional">A professional</option>
                                                                        </NativeSelect>
                                                                    </Col>
                                                                    <Col xs={12} sm={12} md={6}>
                                                                        <CustomInput
                                                                            labelText="First name *"
                                                                            error={this.state.firstNameState}
                                                                            formControlProps={{
                                                                                className: classes.customFormControlClasses,
                                                                            }}
                                                                            inputProps={{
                                                                                name: "firstName",
                                                                                onChange: event => this.profileChange(event),
                                                                                value: this.state.firstName,
                                                                                class: "merritos-textbox-sm"
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                    <Col xs={12} sm={12} md={6}>
                                                                        <CustomInput
                                                                            labelText="Last name *"
                                                                            error={this.state.lastNameState}
                                                                            formControlProps={{
                                                                                className: classes.customFormControlClasses,
                                                                            }}
                                                                            inputProps={{
                                                                                name: "lastName",
                                                                                onChange: event => this.profileChange(event),
                                                                                value: this.state.lastName,
                                                                                class: "merritos-textbox-sm"
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                    <Col xs={12} sm={12} md={6}>
                                                                        <CustomInput
                                                                            labelText="Email *"
                                                                            error={this.state.emailState}
                                                                            formControlProps={{
                                                                                className: classes.customFormControlClasses,
                                                                            }}
                                                                            inputProps={{
                                                                                name: "email",
                                                                                onChange: event => this.profileChange(event),
                                                                                value: this.state.email,
                                                                                type: 'email',
                                                                                class: "merritos-textbox-sm",
                                                                                readOnly: true
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                    <Col xs={12} sm={12} md={6}>
                                                                        <CustomInput
                                                                            labelText="Phone number *"
                                                                            error={this.state.phoneNumberState}
                                                                            formControlProps={{
                                                                                className: classes.customFormControlClasses,
                                                                            }}
                                                                            inputProps={{
                                                                                name: "phoneNumber",
                                                                                onChange: event => this.profileChange(event),
                                                                                value: this.state.phoneNumber,
                                                                                type: 'number',
                                                                                class: "merritos-textbox-sm"
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                    <Col xs={12} sm={12} md={12} className="sm-col" style={this.state.showCoach ? {} : { display: 'none' }}>
                                                                        <h5>Do you want to be a learning coach? <br />
                                                                            <FormControlLabel checked={this.state.isCoach === 'yes'} value="yes" control={<Radio />} label="Yes" onChange={this.coachChange} />
                                                                            <FormControlLabel checked={this.state.isCoach === 'no'} value="no" control={<Radio />} label="No" onChange={this.coachChange} />
                                                                        </h5>
                                                                    </Col>
                                                                    <Col xs={12} sm={12} md={12}>
                                                                        <Button style={{ float: 'right' }} onClick={() => this.profileUpdate()}
                                                                            className={"loginbtn btn-sm"}>
                                                                            Save
                                                                        </Button>
                                                                        <Button style={{ float: 'right' }} onClick={() => { this.setState({ profAdd: false }) }} className={"loginbtn btn-sm forgotbackbtn"}>
                                                                            Close
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </form>

                                                    )}
                                            </Col>
                                            <Col className="noPadding" xs={12} sm={12} md={3}>
                                                {!this.state.addressAdd ? (
                                                    <div className="profile-section">
                                                        <i onClick={() => this.setState({
                                                            addressAdd: true,
                                                            profAdd: false,
                                                            street: profileData[0].street,
                                                            city: profileData[0].city,
                                                            state: profileData[0].state,
                                                            country: profileData[0].country,
                                                            pinCode: profileData[0].pinCode,
                                                        })
                                                        } className="material-icons edit-icon mobile-edit-icon">edit</i>
                                                        {profileData[0].street !== "" ? (
                                                            <div className="profile-address-div">
                                                                <div className="profile-section-name">{profileData[0].street}</div>
                                                                <div className="profile-section-status">{profileData[0].city + ', ' + profileData[0].state}</div>
                                                                <div className="profile-section-location">{profileData[0].country + ', ' + profileData[0].pinCode}</div>
                                                            </div>
                                                        ) : (
                                                                <div>
                                                                    <div className="profile-section-name">Add your address</div>
                                                                </div>
                                                            )}
                                                    </div>
                                                ) : (
                                                        <form>
                                                            <br />
                                                            <Container>
                                                                <Row>
                                                                    <Col xs={12} sm={12} md={12}>
                                                                        <CustomInput
                                                                            labelText="Street *"
                                                                            error={this.state.streetState}
                                                                            formControlProps={{
                                                                                className: classes.customFormControlClasses,
                                                                            }}
                                                                            inputProps={{
                                                                                name: "street",
                                                                                onChange: event => this.profileChange(event),
                                                                                value: this.state.street,
                                                                                class: "merritos-textbox-sm"
                                                                            }}
                                                                        />
                                                                        <CustomInput
                                                                            labelText="Village/City *"
                                                                            error={this.state.cityState}
                                                                            formControlProps={{
                                                                                className: classes.customFormControlClasses,
                                                                            }}
                                                                            inputProps={{
                                                                                name: "city",
                                                                                onChange: event => this.profileChange(event),
                                                                                value: this.state.city,
                                                                                class: "merritos-textbox-sm"
                                                                            }}
                                                                        />
                                                                        <CustomInput
                                                                            labelText="State *"
                                                                            error={this.state.stateState}
                                                                            formControlProps={{
                                                                                className: classes.customFormControlClasses,
                                                                            }}
                                                                            inputProps={{
                                                                                name: "state",
                                                                                onChange: event => this.profileChange(event),
                                                                                value: this.state.state,
                                                                                class: "merritos-textbox-sm"
                                                                            }}
                                                                        />
                                                                        <CustomInput
                                                                            labelText="Country *"
                                                                            error={this.state.countryState}
                                                                            formControlProps={{
                                                                                className: classes.customFormControlClasses,
                                                                            }}
                                                                            inputProps={{
                                                                                name: "country",
                                                                                onChange: event => this.profileChange(event),
                                                                                value: this.state.country,
                                                                                class: "merritos-textbox-sm"
                                                                            }}
                                                                        />
                                                                        <CustomInput
                                                                            labelText="Pincode *"
                                                                            error={this.state.pinCodeState}
                                                                            formControlProps={{
                                                                                className: classes.customFormControlClasses,
                                                                            }}
                                                                            inputProps={{
                                                                                name: "pinCode",
                                                                                onChange: event => this.profileChange(event),
                                                                                value: this.state.pinCode,
                                                                                type: 'number',                                                                                
                                                                                class: "merritos-textbox-sm"
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                    <Col xs={12} sm={12} md={12}>
                                                                        <Button style={{ float: 'right' }} onClick={() => this.addressUpdate()}
                                                                            className={"loginbtn btn-sm"}>
                                                                            Save
                                                            </Button>
                                                                        <Button style={{ float: 'right' }} onClick={() => { this.setState({ addressAdd: false }) }} className={"loginbtn btn-sm forgotbackbtn"}>
                                                                            Close
                                                            </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </form>
                                                    )}
                                            </Col>
                                        </Row>
                                    </Container>
                                </article>
                                <br /><br />
                                <article className="profile-info-item">
                                    <header className="profile-info-item-header">
                                        <div className="profile-info-item-title">
                                            <i className="material-icons font-icon">info</i>
                                            Summary
                                        </div>
                                        <div class="slider-arrs">
                                            {!this.state.summaryEdit ? (
                                                <Tooltip title="Edit">
                                                    <i onClick={() => { this.setState({ summaryEdit: true, summary: profileData[0].summary }) }} className="material-icons edit-icon">edit</i>
                                                </Tooltip>
                                            ) : (
                                                    <div>
                                                        <Tooltip title="Save">
                                                            <i onClick={() => this.summaryUpdate()} className="material-icons edit-icon">save</i>
                                                        </Tooltip>
                                                        <Tooltip title="Cancel">
                                                            <i onClick={() => {
                                                                this.setState({
                                                                    summaryEdit: false
                                                                })
                                                            }} className="material-icons delete-icon">cancel</i>
                                                        </Tooltip>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </header>
                                    {!this.state.summaryEdit ? (
                                        profileData[0].summary !== '' ? (
                                            <div className="text-block text-block-typical">
                                                <p>{profileData[0].summary} </p>
                                            </div>
                                        ) : (
                                                <div className="text-block text-block-typical">
                                                    <p className="noSummary">Tell us about you</p>
                                                </div>
                                            )
                                    ) : (
                                            <div className="text-block text-block-typical">
                                                <form>
                                                    <CustomInput
                                                        multiline={true}
                                                        labelText="Tell us about you"
                                                        error={this.state.summaryState}
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            className: classes.customFormControlClasses,
                                                        }}
                                                        inputProps={{
                                                            name: "summary",
                                                            onChange: event => this.profileChange(event),
                                                            value: this.state.summary
                                                        }}
                                                    />
                                                </form>
                                            </div>
                                        )
                                    }
                                </article>

                                <article className="profile-info-item">
                                    <header className="profile-info-item-header">
                                        <div className="profile-info-item-title">
                                            <i className="material-icons font-icon">school</i>
                                            Education
                                        </div>
                                        <div class="slider-arrs">
                                            {!this.state.educationAdd ? (
                                                <Tooltip title="Add new">
                                                    <i onClick={() => {
                                                        this.setState({
                                                            eduEdit: false, educationAdd: true, eduNew: true,
                                                            universityName: '', fieldOfStudy: '', degree: '',
                                                            eduStartDate: new Date(), eduEndDate: new Date()
                                                        })
                                                    }} class="fa fa-plus edit-icon"></i>
                                                </Tooltip>
                                            ) : ''}
                                        </div>
                                    </header>
                                    <ul className="exp-timeline">
                                        {this.state.educationAdd ? (
                                            <li className="exp-timeline-item">
                                                <div className="dot"></div>
                                                <div className="tbl">
                                                    <div className="tbl-row">
                                                        {educationForm}
                                                        <div className="tbl-cell tbl-cell-logo">
                                                            <Tooltip title="Save">
                                                                <i onClick={() => this.educationSave()} className="material-icons edit-icon">save</i>
                                                            </Tooltip>
                                                            <Tooltip title="Cancel">
                                                                <i onClick={() => {
                                                                    this.setState({
                                                                        eduEdit: false, educationAdd: false
                                                                    })
                                                                }} className="material-icons delete-icon">cancel</i>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ) : ''}
                                        {profileData.length > 0 && profileData[0].education.length > 0 ? (
                                            profileData[0].education.map((edval, edkey) => (
                                                <li key={edkey} className="exp-timeline-item">
                                                    <div className="dot"></div>
                                                    <div className="tbl">
                                                        <div className="tbl-row">
                                                            {this.state.eduEdit && this.state.rowId === edkey ? (
                                                                educationForm
                                                            ) : (
                                                                    <div className="tbl-cell">
                                                                        <div className="exp-timeline-range">{Moment(edval.fromDate).format('DD/MM/YYYY') + "  -  " + Moment(edval.toDate).format('DD/MM/YYYY')}</div>
                                                                        <div className="exp-timeline-status">{edval.universityName}</div>
                                                                        <div className="exp-timeline-location"><a href="#">{edval.fieldOfStudy + ' , ' + edval.degree}</a></div>
                                                                    </div>
                                                                )}
                                                            {this.state.eduEdit && this.state.rowId === edkey ? (
                                                                <div className="tbl-cell tbl-cell-logo">
                                                                    <Tooltip title="Save">
                                                                        <i onClick={() => this.educationSave()} className="material-icons edit-icon">save</i>
                                                                    </Tooltip>
                                                                    <Tooltip title="Cancel">
                                                                        <i onClick={() => {
                                                                            this.setState({
                                                                                eduEdit: false, educationAdd: false, universityName: '', fieldOfStudy: '', degree: '',
                                                                                eduStartDate: new Date(), eduEndDate: new Date()
                                                                            })
                                                                        }} className="material-icons delete-icon">cancel</i>
                                                                    </Tooltip>
                                                                </div>
                                                            ) : (
                                                                    <div className="tbl-cell tbl-cell-logo">
                                                                        <Tooltip title="Edit">
                                                                            <i onClick={() => { this.educationEdit(edkey) }} className="material-icons edit-icon">edit</i>
                                                                        </Tooltip>
                                                                        <Tooltip title="Remove">
                                                                            <i onClick={() => this.deleteAlert(edkey, 'education')} className="material-icons delete-icon">delete</i>
                                                                        </Tooltip>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                                !this.state.educationAdd ? (
                                                    <li className="exp-timeline-item">
                                                        <div className="dot"></div>
                                                        <div className="tbl">
                                                            <div className="tbl-row">
                                                                <div className="tbl-cell">
                                                                    <div className="exp-timeline-range">Add your educational details</div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </li>
                                                ) : ''
                                            )}


                                    </ul>
                                </article>

                                <article className="profile-info-item">
                                    <header className="profile-info-item-header">
                                        <div className="profile-info-item-title">
                                            <i className="material-icons font-icon">work</i>
                                            Experience
                                        </div>
                                        <div class="slider-arrs">
                                            {!this.state.experienceAdd ? (
                                                <Tooltip title="Add new">
                                                    <i onClick={() => {
                                                        this.setState({
                                                            expEdit: false, experienceAdd: true, expNew: true,
                                                            companyName: '', designation: '',
                                                            expStartDate: new Date(), expEndDate: new Date()
                                                        })
                                                    }} class="fa fa-plus edit-icon"></i>
                                                </Tooltip>
                                            ) : ''}
                                        </div>
                                    </header>
                                    <ul className="exp-timeline">
                                        {this.state.experienceAdd ? (
                                            <li className="exp-timeline-item">
                                                <div className="dot"></div>
                                                <div className="tbl">
                                                    <div className="tbl-row">
                                                        {experienceForm}
                                                        <div className="tbl-cell tbl-cell-logo">
                                                            <Tooltip title="Save">
                                                                <i onClick={() => this.experienceSave()} className="material-icons edit-icon">save</i>
                                                            </Tooltip>
                                                            <Tooltip title="Cancel">
                                                                <i onClick={() => {
                                                                    this.setState({
                                                                        expEdit: false, experienceAdd: false
                                                                    })
                                                                }} className="material-icons delete-icon">cancel</i>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ) : ''}
                                        {profileData.length > 0 && profileData[0].experience.length > 0 ? (
                                            profileData[0].experience.map((exval, exkey) => (
                                                <li key={exkey} className="exp-timeline-item">
                                                    <div className="dot"></div>
                                                    <div className="tbl">
                                                        <div className="tbl-row">
                                                            {this.state.expEdit && this.state.rowId === exkey ? (
                                                                experienceForm
                                                            ) : (
                                                                    <div className="tbl-cell">
                                                                        <div className="exp-timeline-range">{Moment(exval.fromDate).format('DD/MM/YYYY') + "  -  " + Moment(exval.toDate).format('DD/MM/YYYY')}</div>
                                                                        <div className="exp-timeline-status">{exval.companyName}</div>
                                                                        <div className="exp-timeline-location"><a href="#">{exval.designation}</a></div>
                                                                    </div>
                                                                )}
                                                            {this.state.expEdit && this.state.rowId === exkey ? (
                                                                <div className="tbl-cell tbl-cell-logo">
                                                                    <Tooltip title="Save">
                                                                        <i onClick={() => this.experienceSave()} className="material-icons edit-icon">save</i>
                                                                    </Tooltip>
                                                                    <Tooltip title="Cancel">
                                                                        <i onClick={() => {
                                                                            this.setState({
                                                                                expEdit: false, companyName: '', designation: '',
                                                                                expStartDate: new Date(), expEndDate: new Date(), experienceAdd: false
                                                                            })
                                                                        }} className="material-icons delete-icon">cancel</i>
                                                                    </Tooltip>
                                                                </div>
                                                            ) : (
                                                                    <div className="tbl-cell tbl-cell-logo">
                                                                        <Tooltip title="Edit">
                                                                            <i onClick={() => { this.experienceEdit(exkey) }} className="material-icons edit-icon">edit</i>
                                                                        </Tooltip>
                                                                        <Tooltip title="Remove">
                                                                            <i onClick={() => this.deleteAlert(exkey, 'experience')} className="material-icons delete-icon">delete</i>
                                                                        </Tooltip>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                                !this.state.experienceAdd ? (
                                                    <li className="exp-timeline-item">
                                                        <div className="dot"></div>
                                                        <div className="tbl">
                                                            <div className="tbl-row">
                                                                <div className="tbl-cell">
                                                                    <div className="exp-timeline-range">Add your work experience</div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </li>
                                                ) : ""
                                            )}

                                    </ul>
                                </article>

                                <article className="profile-info-item">
                                    <header className="profile-info-item-header">
                                        <i className="fa fa-file font-icon"></i>
                                        Certificates
                                    {/* <div class="slider-arrs">
                                        <i class="fa fa-plus edit-icon"></i>
                                    </div> */}
                                    </header>

                                    <div>
                                        <div class="fm-file">
                                            {profileData[0].ssc === "" ? (
                                                <div class="fm-file-icon">
                                                    <input className={classes.input} id="contained-button-file0" name="ssc"
                                                        onChange={this.fileChangedHandler} type="file" />
                                                    <label onClick={(e) => this.uploadbtn(e, "0")} for="file-1">
                                                        <img src={this.state.ssc} alt="" />
                                                    </label>
                                                    <div class="fm-file-name">SSC certificate</div>
                                                </div>
                                            ) : (
                                                    <div class="fm-file-icon">
                                                        <input className={classes.input} id="contained-button-file0" name="ssc"
                                                            onChange={this.fileChangedHandler} type="file" />
                                                        <img src={BasePath + '/' + profileData[0].ssc} alt="" />
                                                        <p class="fm-file-name afterselect" onClick={(e) => this.uploadbtn(e, "0")} for="file-1">
                                                            <i className="material-icons edit-icon">camera_alt</i>
                                                            <span>SSC certificate</span>
                                                        </p>
                                                    </div>
                                                )
                                            }

                                            {/* <div class="fm-file-size">7 files, 358 MB</div> */}
                                        </div>
                                        <div class="fm-file">
                                            {profileData[0].intermediate === "" ? (
                                                <div class="fm-file-icon">
                                                    <input className={classes.input} id="contained-button-file1" name="intermediate"
                                                        onChange={this.fileChangedHandler} type="file" />
                                                    <label onClick={(e) => this.uploadbtn(e, "1")} for="file-1">
                                                        <img src={this.state.intermediate} alt="" />
                                                    </label>
                                                    <div class="fm-file-name">Inter certificate</div>
                                                </div>
                                            ) : (
                                                    <div class="fm-file-icon">
                                                        <input className={classes.input} id="contained-button-file1" name="intermediate"
                                                            onChange={this.fileChangedHandler} type="file" />
                                                        <img src={BasePath + '/' + profileData[0].intermediate} alt="" />
                                                        <p class="fm-file-name afterselect" onClick={(e) => this.uploadbtn(e, "1")} for="file-1">
                                                            <i className="material-icons edit-icon">camera_alt</i>
                                                            <span>Inter certificate</span>
                                                        </p>
                                                    </div>
                                                    // <div class="fm-file-icon">
                                                    //     <img src={BasePath + '/' + profileData[0].intermediate} alt="" />
                                                    // </div>
                                                )
                                            }
                                            {/* <div class="fm-file-size">7 files, 358 MB</div> */}
                                        </div>
                                        <div class="fm-file">
                                            {profileData[0].preGraduation === "" ? (
                                                <div class="fm-file-icon">
                                                    <input className={classes.input} id="contained-button-file2" name="preGraduation"
                                                        onChange={this.fileChangedHandler} type="file" />
                                                    <label onClick={(e) => this.uploadbtn(e, "2")} for="file-1">
                                                        <img src={this.state.preGraduation} alt="" />
                                                    </label>
                                                    <div class="fm-file-name">Graduation certificate</div>
                                                </div>
                                            ) : (
                                                    <div class="fm-file-icon">
                                                        <input className={classes.input} id="contained-button-file2" name="preGraduation"
                                                            onChange={this.fileChangedHandler} type="file" />
                                                        <img src={BasePath + '/' + profileData[0].preGraduation} alt="" />
                                                        <p class="fm-file-name afterselect" onClick={(e) => this.uploadbtn(e, "2")} for="file-1">
                                                            <i className="material-icons edit-icon">camera_alt</i>
                                                            <span>Graduation certificate</span>
                                                        </p>
                                                    </div>
                                                    // <div class="fm-file-icon">
                                                    //     <img src={BasePath + '/' + profileData[0].preGraduation} alt="" />
                                                    // </div>
                                                )
                                            }
                                           
                                            {/* <div class="fm-file-size">7 files, 358 MB</div> */}
                                        </div>
                                        <div class="fm-file">
                                            {profileData[0].postGraduation === "" ? (
                                                <div class="fm-file-icon">
                                                    <input className={classes.input} id="contained-button-file3" name="postGraduation"
                                                        onChange={this.fileChangedHandler} type="file" />
                                                    <label onClick={(e) => this.uploadbtn(e, "3")} for="file-1">
                                                        <img src={this.state.postGraduation} alt="" />
                                                    </label>
                                                    <div class="fm-file-name">Post graduation certificate</div>
                                                </div>
                                            ) : (
                                                <div class="fm-file-icon">
                                                <input className={classes.input} id="contained-button-file3" name="postGraduation"
                                                    onChange={this.fileChangedHandler} type="file" />
                                                <img src={BasePath + '/' + profileData[0].postGraduation} alt="" />
                                                <p class="fm-file-name afterselect" onClick={(e) => this.uploadbtn(e, "3")} for="file-1">
                                                    <i className="material-icons edit-icon">camera_alt</i>
                                                    <span>Post graduation certificate</span>
                                                </p>
                                            </div>
                                                    // <div class="fm-file-icon">
                                                    //     <img src={BasePath + '/' + profileData[0].postGraduation} alt="" />
                                                    // </div>
                                                )
                                            }
                                            {/* <div class="fm-file-size">7 files, 358 MB</div> */}
                                        </div>
                                    </div>
                                </article>

                                <article className="profile-info-item">
                                    <header className="profile-info-item-header">
                                        <div className="profile-info-item-title">
                                            <i className="fa fa-trophy font-icon"></i>
                                            Achievements
                                        </div>
                                        <div class="slider-arrs">
                                            {!this.state.achieveAdd ? (
                                                <Tooltip title="Add new">
                                                    <i onClick={() => { this.setState({ achieveNew: true, achieveEdit: false, achieveAdd: true, achievements: '' }) }} class="fa fa-plus edit-icon"></i>
                                                </Tooltip>
                                            ) : ''
                                            }
                                        </div>
                                    </header>
                                    <ul className="exp-timeline">
                                        {this.state.achieveAdd ? (
                                            <li className="exp-timeline-item">
                                                <div className="dot"></div>
                                                <div className="tbl">
                                                    <div className="tbl-row">
                                                        {achievementForm}
                                                        <div className="tbl-cell tbl-cell-logo">
                                                            <Tooltip title="Save">
                                                                <i onClick={() => this.achievementsSave()} className="material-icons edit-icon">save</i>
                                                            </Tooltip>
                                                            <Tooltip title="Cancel">
                                                                <i onClick={() => { this.setState({ achieveAdd: false, achieveEdit: false }) }} className="material-icons delete-icon">cancel</i>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ) : ''}
                                        {profileData.length > 0 && profileData[0].achievements.length > 0 ? (
                                            profileData[0].achievements.map((achval, achkey) => (
                                                <li key={achkey} className="exp-timeline-item">
                                                    <div className="dot"></div>
                                                    <div className="tbl">
                                                        <div className="tbl-row">
                                                            {this.state.achieveEdit && this.state.rowId === achkey ? (
                                                                achievementForm
                                                            ) : (
                                                                    <div className="tbl-cell">
                                                                        <div className="exp-timeline-range">{achval.achievements}</div>
                                                                    </div>
                                                                )}
                                                            {this.state.achieveEdit && this.state.rowId === achkey ? (
                                                                <div className="tbl-cell tbl-cell-logo">
                                                                    <Tooltip title="Save">
                                                                        <i onClick={() => this.achievementsSave()} className="material-icons edit-icon">save</i>
                                                                    </Tooltip>
                                                                    <Tooltip title="Cancel">
                                                                        <i onClick={() => { this.setState({ achievements: '', achieveAdd: false, achieveEdit: false }) }} className="material-icons delete-icon">cancel</i>
                                                                    </Tooltip>
                                                                </div>
                                                            ) : (
                                                                    <div className="tbl-cell tbl-cell-logo">
                                                                        <i onClick={() => {
                                                                            this.setState({ achievements: this.props.profileData[0].achievements[achkey].achievements });
                                                                            this.setState({ achivId: this.props.profileData[0].achievements[achkey].achivId });
                                                                            this.setState({ rowId: achkey, achieveAdd: false, achieveNew: false, achieveEdit: !this.state.achieveEdit });
                                                                        }} className="material-icons edit-icon">edit</i>
                                                                        <i onClick={() => this.deleteAlert(achkey, 'achievement')} className="material-icons delete-icon">delete</i>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                                !this.state.achieveAdd ? (
                                                    <li className="exp-timeline-item">
                                                        <div className="dot"></div>
                                                        <div className="tbl">
                                                            <div className="tbl-row">
                                                                <div className="tbl-cell">
                                                                    <div className="exp-timeline-range">Add your achievements</div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </li>
                                                ) : ''
                                            )
                                        }
                                    </ul>
                                </article>

                                <article className="profile-info-item">
                                    <header className="profile-info-item-header">
                                        <div className="profile-info-item-title">
                                            <i className="fa fa-check font-icon"></i>
                                            Expertise
                                        </div>
                                        <div class="slider-arrs">
                                            {!this.state.expertiseAdd ? (
                                                <Tooltip title="Add new">
                                                    <i onClick={() => { this.setState({ expertiseNew: true, expertiseEdit: false, expertiseAdd: true, expertise: '' }) }} class="fa fa-plus edit-icon"></i>
                                                </Tooltip>
                                            ) : ''
                                            }
                                        </div>
                                    </header>
                                    <ul className="exp-timeline">
                                        {this.state.expertiseAdd ? (
                                            <li className="exp-timeline-item">
                                                <div className="dot"></div>
                                                <div className="tbl">
                                                    <div className="tbl-row">
                                                        {expertiseForm}
                                                        <div className="tbl-cell tbl-cell-logo">
                                                            <Tooltip title="Save">
                                                                <i onClick={() => this.expertiseSave()} className="material-icons edit-icon">save</i>
                                                            </Tooltip>
                                                            <Tooltip title="Cancel">
                                                                <i onClick={() => { this.setState({ expertiseAdd: false, expertiseEdit: false }) }} className="material-icons delete-icon">cancel</i>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ) : ''}
                                        {profileData.length > 0 && profileData[0].expertise.length > 0 ? (
                                            profileData[0].expertise.map((experval, experkey) => (
                                                <li key={experkey} className="exp-timeline-item">
                                                    <div className="dot"></div>
                                                    <div className="tbl">
                                                        <div className="tbl-row">
                                                            {this.state.expertiseEdit && this.state.rowId === experkey ? (
                                                                expertiseForm
                                                            ) : (
                                                                    <div className="tbl-cell">
                                                                        <div className="exp-timeline-range">{experval.expertise}</div>
                                                                    </div>
                                                                )}
                                                            {this.state.expertiseEdit && this.state.rowId === experkey ? (
                                                                <div className="tbl-cell tbl-cell-logo">
                                                                    <Tooltip title="Save">
                                                                        <i onClick={() => this.expertiseSave()} className="material-icons edit-icon">save</i>
                                                                    </Tooltip>
                                                                    <Tooltip title="Cancel">
                                                                        <i onClick={() => { this.setState({ expertise: '', expertiseAdd: false, expertiseEdit: false }) }} className="material-icons delete-icon">cancel</i>
                                                                    </Tooltip>
                                                                </div>
                                                            ) : (
                                                                    <div className="tbl-cell tbl-cell-logo">
                                                                        <i onClick={() => {
                                                                            this.setState({ expertise: this.props.profileData[0].expertise[experkey].expertise });
                                                                            this.setState({ experId: this.props.profileData[0].expertise[experkey].experId });
                                                                            this.setState({ rowId: experkey, expertiseAdd: false, expertiseNew: false, expertiseEdit: !this.state.expertiseEdit });
                                                                        }} className="material-icons edit-icon">edit</i>
                                                                        <i onClick={() => this.deleteAlert(experkey, 'expertise')} className="material-icons delete-icon">delete</i>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                                !this.state.expertiseAdd ? (
                                                    <li className="exp-timeline-item">
                                                        <div className="dot"></div>
                                                        <div className="tbl">
                                                            <div className="tbl-row">
                                                                <div className="tbl-cell">
                                                                    <div className="exp-timeline-range">Add your expertise</div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </li>
                                                ) : ''
                                            )
                                        }
                                    </ul>
                                </article>

                                <article className="profile-info-item">
                                    <header className="profile-info-item-header">
                                        <div className="profile-info-item-title">
                                            <i className="fa fa-handshake font-icon"></i>
                                            Recommendation
                                        </div>
                                        <div class="slider-arrs">
                                            {!this.state.recommendationAdd ? (
                                                <Tooltip title="Add new">
                                                    <i onClick={() => { this.setState({ recommendationNew: true, recommendationEdit: false, recommendationAdd: true, recommendation: '' }) }} class="fa fa-plus edit-icon"></i>
                                                </Tooltip>
                                            ) : ''
                                            }
                                        </div>
                                    </header>
                                    <ul className="exp-timeline">
                                        {this.state.recommendationAdd ? (
                                            <li className="exp-timeline-item">
                                                <div className="dot"></div>
                                                <div className="tbl">
                                                    <div className="tbl-row">
                                                        {recommendationForm}
                                                        <div className="tbl-cell tbl-cell-logo">
                                                            <Tooltip title="Save">
                                                                <i onClick={() => this.recommendationSave()} className="material-icons edit-icon">save</i>
                                                            </Tooltip>
                                                            <Tooltip title="Cancel">
                                                                <i onClick={() => { this.setState({ recommendationAdd: false, recommendationEdit: false }) }} className="material-icons delete-icon">cancel</i>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ) : ''}
                                        {profileData.length > 0 && profileData[0].recommendation.length > 0 ? (
                                            profileData[0].recommendation.map((recomval, recomkey) => (
                                                <li key={recomkey} className="exp-timeline-item">
                                                    <div className="dot"></div>
                                                    <div className="tbl">
                                                        <div className="tbl-row">
                                                            {this.state.recommendationEdit && this.state.rowId === recomkey ? (
                                                                recommendationForm
                                                            ) : (
                                                                    <div className="tbl-cell">
                                                                        <div className="exp-timeline-range">{recomval.recommendation}</div>
                                                                    </div>
                                                                )}
                                                            {this.state.recommendationEdit && this.state.rowId === recomkey ? (
                                                                <div className="tbl-cell tbl-cell-logo">
                                                                    <Tooltip title="Save">
                                                                        <i onClick={() => this.recommendationSave()} className="material-icons edit-icon">save</i>
                                                                    </Tooltip>
                                                                    <Tooltip title="Cancel">
                                                                        <i onClick={() => { this.setState({ recommendationAdd: false, recommendationEdit: false }) }} className="material-icons delete-icon">cancel</i>
                                                                    </Tooltip>
                                                                </div>
                                                            ) : (
                                                                    <div className="tbl-cell tbl-cell-logo">
                                                                        <i onClick={() => {
                                                                            this.setState({ recommendation: this.props.profileData[0].recommendation[recomkey].recommendation });
                                                                            this.setState({ recomId: this.props.profileData[0].recommendation[recomkey].recomId });
                                                                            this.setState({ rowId: recomkey, recommendationAdd: false, recommendationNew: false, recommendationEdit: !this.state.recommendationEdit });
                                                                        }} className="material-icons edit-icon">edit</i>
                                                                        <i onClick={() => this.deleteAlert(recomkey, 'recommendation')} className="material-icons delete-icon">delete</i>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                                !this.state.recommendationAdd ? (
                                                    <li className="exp-timeline-item">
                                                        <div className="dot"></div>
                                                        <div className="tbl">
                                                            <div className="tbl-row">
                                                                <div className="tbl-cell">
                                                                    <div className="exp-timeline-range">Add your recommendations</div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </li>
                                                ) : ''
                                            )}
                                    </ul>
                                </article>
                            </section>
                        </Col >
                    </Row >
                </Container >
            </div >
        );
    }
}
ProfileSetup.propTypes = {
    classes: PropTypes.object,
};
const profileList = state => ({
    profileData: state.profile.profileData,
    educationData: state.profile.education,
    educationUpdate: state.profile.educationUpdate,
    workExperienceData: state.profile.workExperience,
    workExperienceUpdate: state.profile.workExperienceUpdate,
    achievementsData: state.profile.achievements,
    achievementsUpdate: state.profile.achievementsUpdate,
    expertiseData: state.profile.expertise,
    expertiseUpdate: state.profile.expertiseUpdate,
    recommendationData: state.profile.recommendation,
    recommendationUpdate: state.profile.recommendationUpdate,
    componentupdate: state.profile.componentupdate,
});
export default connect(profileList, {
    loaderfalse,
    fetchprofileData, addeducationDetails, updateEducation,
    addworkExperience, updateworkExperience,
    addAchievements, updateAchievements,
    addExpertise, updateExpertise,
    addRecommendation, updateRecommendation
})(withStyles(styles)(ProfileSetup));