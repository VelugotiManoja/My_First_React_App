import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import Button from "components/CustomButtons/Button.jsx";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PopPop from 'react-poppop';
import FormControl from "@material-ui/core/FormControl";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";
import $ from "jquery";
import { fetchOrganizationData } from "../../actions/Profileactions";
import { Container, Row, Col } from 'reactstrap';
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
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
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
    },
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
    root: {
        marginTop: '20px'
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    label: {
        margin: 0
    },
    input: {
        display: 'none',
    },
    cardGrid: {
        padding: '20px',
        marginTop: '15px'
    }
});
class BasicinfoStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            companyName: "",
            companyNameState: "",
            website: "",
            websiteState: "",
            primary: "",
            primartState: "",
            secondary: "",
            secondaryState: "",
            address: "",
            notification: "",
            br: false,
            loader: false,
            userId: reactLocalStorage.get('userId', ""),
            dummyImage: 'http://100dayscss.com/codepen/upload.svg',
            profileImage: '',
            color: 'info',
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
    componentDidMount = () => {
        let th = this;
        this.props.fetchOrganizationData(this.state.userId);
        setTimeout(function () {
            if (th.props.companydata !== undefined) {
                th.setState({ dummyImage: BasePath + '/uploads/150/' + th.props.companydata.profileImage });
                th.setState({ companyName: th.props.companydata.companyName });
                th.setState({ website: th.props.companydata.website });
                th.setState({ primary: th.props.companydata.primary });
                th.setState({ secondary: th.props.companydata.secondary });
                th.setState({ address: th.props.companydata.address });
                th.setState({ profileImage: th.props.companydata.profileImage });
            }
        }, 500);
    }
    componentDidUpdate(){
        setTimeout(() => this.props.loaderfalse(window.location.hash.split('#')[1]), 100);
    }
    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };
    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };
    verifyCompany = (value) => {
        if (value.length >= 0) {
            return true;
        }
        return false;
    }
    handleNotification = (notification, color) => {
        this.setState({ notification: notification });
        this.setState({ color: color });
        this.showNotification('br');
    }
    showNotification(place) {
        if (!this.state[place]) {
            let x = [];
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
    verifyWebsite = (str) => {
        var re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (re.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    verifyPrimary = (number) => {
        var numbers = /^[0-9]+$/;
        if (number.match(numbers)) {
            return true;
        } else {
            return false;
        }
    }

    verifyAddress = (value) => {
        if (value.length >= 0) {
            return true;
        }
        return false;
    }
    change(event, stateName, type) {
        switch (type) {
            case "companyname":
                if (this.verifyCompany(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                    this.setState({ companyName: event.target.value });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                    this.setState({ companyName: event.target.value });
                }
                break;
            case "website":
                if (this.verifyWebsite(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                    this.setState({ website: event.target.value });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                    this.setState({ website: event.target.value });
                }
                break;
            case "primary":
                if (this.verifyPrimary(event.target.value, 1)) {
                    this.setState({ [stateName + "State"]: "success" });
                    this.setState({ primary: event.target.value });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                    this.setState({ primary: event.target.value });
                }
                break;
            case "secondary":
                if (this.verifyPrimary(event.target.value, 1)) {
                    this.setState({ [stateName + "State"]: "success" });
                    this.setState({ secondary: event.target.value });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                    this.setState({ secondary: event.target.value });
                }
                break;
            case "address":
                if (this.verifyAddress(event.target.value, 1)) {
                    this.setState({ [stateName + "State"]: "success" });
                    this.setState({ address: event.target.value });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                    this.setState({ address: event.target.value });
                }
                break;
            default:
                break;
        }
    }
    upploadbtn = (e, n) => {
        $('#contained-button-file' + n).trigger('click');
    }
    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            if (e.target.files[0].size > 10000 && e.target.files[0].size < 55000) {
                let FileUploadPath = e.target.files[0].name;
                let Extension = FileUploadPath.substring(
                    FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
                // The file uploaded is an image
                if (Extension == "jpeg" || Extension == "jpg") {
                    this.setState({ cropShow: true });
                    const reader = new FileReader();
                    reader.addEventListener('load', () =>
                        this.setState({ src: reader.result }),
                    );
                    reader.readAsDataURL(e.target.files[0]);
                }
                //The file upload is NOT an image
                else {
                    this.handleNotification('Photo only allows file types of JPG, JPEG', 'error');
                }
            } else {
                this.handleNotification('Photo size must be greater than 10kb and less than 55Kb', 'error');
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
                let updateImg = BasePath + '/uploads/150/' + data.filename;
                th.setState({ profileImage: data.filename, dummyImage: updateImg, cropShow: false });
            });
    }
    handleFinish = () => {
        let th = this;
        if (this.state.profileImage === "") {
            th.handleNotification("Please select image", "error");
        } else if (this.state.companyName === "") {
            this.setState({ companyNameState: "error" });
        }
        else if (this.state.website === "") {
            this.setState({ websiteState: "error" });
        }
        else if (this.state.primary === "") {
            this.setState({ primaryState: "error" });
        }
        else if (this.state.secondary === "") {
            this.setState({ secondaryState: "error" });
        }
        else if (this.state.address === "") {
            this.setState({ addressState: "error" });
        }
        else {
            var companydata = {
                "companyId": this.state.userId,
                "companyName": this.state.companyName,
                "website": this.state.website,
                "primary": this.state.primary,
                "secondary": this.state.secondary,
                "address": this.state.address,
                profileImage: th.state.profileImage
            };
            th.setState({ loader: true });
            fetch(BasePath + '/companydata', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(companydata)
            }).then((resp) => resp.json())
                .then(function (data) {
                    th.setState({ loader: false });
                    if (data.length === 1) {
                        th.handleNotification(data.message, 'success');
                    } else {
                        th.handleNotification(data.message, 'error');
                    }
                }).catch((err) => {
                    th.handleNotification(err.message, "error");
                });
        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ br: false });
    };
    render() {
        const { crop, croppedImageUrl, src, cropShow } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
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
                <form>
                    <Container justify="center">
                        <Row className="profileinfo">
                            <Col xs={12} sm={8} md={8}>
                                <h3 className='wizardTitle'>Profile</h3>
                                <Card className={classes.cardGrid}>
                                    <Container>
                                        <Row>
                                            <Col xs={12} sm={12} md={4}>
                                                    <img src={this.state.dummyImage} className="uploadImg" />
                                                    <input className={classes.input} id="contained-button-file" type="file" onChange={this.onSelectFile} />
                                                    <p class="profile-pic-edit" onClick={(e) => { this.upploadbtn(e, "") }}>
                                                        <i className="material-icons edit-icon">camera_alt</i>
                                                        <span>Choose Picture</span>
                                                    </p>
                                                    <PopPop position="centerCenter"
                                                        open={cropShow}
                                                        closeBtn={true}
                                                        closeOnEsc={true}
                                                        onClose={() => { this.setState({ cropShow: false }) }}
                                                        closeOnOverlay={true}>
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
                                            </Col>
                                            <Col xs={12} sm={12} md={8}>
                                                <FormControl fullWidth>
                                                    <CustomInput
                                                        success={this.state.companyNameState === "success"}
                                                        error={this.state.companyNameState === "error"}
                                                        labelText="Company name"
                                                        id="companyname"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            onChange: event =>
                                                                this.change(event, "companyName", "companyname"),
                                                            type: "companyname",
                                                            value: this.state.companyName
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormControl fullWidth>
                                                    <CustomInput
                                                        success={this.state.websiteState === "success"}
                                                        error={this.state.websiteState === "error"}
                                                        labelText="Website"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            onChange: event =>
                                                                this.change(event, "website", "website"),
                                                            type: "website",
                                                            value: this.state.website
                                                        }}
                                                    />
                                                </FormControl>
                                                <CustomInput
                                                    success={this.state.primaryState === "success"}
                                                    error={this.state.primaryState === "error"}
                                                    labelText="Primary contact number"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: event =>
                                                            this.change(event, "primary", "primary"),
                                                        type: "primary",
                                                        value: this.state.primary
                                                    }}
                                                />
                                                <FormControl fullWidth>
                                                    <CustomInput
                                                        success={this.state.secondaryState === "success"}
                                                        error={this.state.secondaryState === "error"}
                                                        labelText="Secondary contact number"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            onChange: event =>
                                                                this.change(event, "secondary", "secondary"),
                                                            type: "secondary",
                                                            value: this.state.secondary
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormControl fullWidth>
                                                    <CustomInput
                                                        success={this.state.addressState === "success"}
                                                        error={this.state.addressState === "error"}
                                                        labelText="Address"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            onChange: event =>
                                                                this.change(event, "address", "address"),
                                                            type: "address",
                                                            value: this.state.address
                                                        }}
                                                    />
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Container>
                                        <Row>
                                        <Col xs={6} sm={6} md={8}>
                                        </Col>
                                            <Col xs={6} sm={6} md={4}>
                                                <Button block className={"loginbtn headersubmit profile-update-btn"} onClick={this.handleFinish}>Update</Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </form>

            </div>
        );
    }
}

BasicinfoStepper.propTypes = {
    classes: PropTypes.object,
};
const profileList = state => ({
    companydata: state.profile.companydata
});
export default connect(profileList, {loaderfalse, fetchOrganizationData })(withStyles(styles)(BasicinfoStepper));