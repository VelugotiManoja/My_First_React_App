import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import $ from "jquery";
const styles = theme => ({
    backButton: {
        marginRight: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    wrapper: {
        width: '75%',
        margin: theme.spacing.unit,
        position: 'relative',
        float: 'left'
    },
});
class CertificatesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: '',
            imageurl: '',
            sscimagepath: 'http://100dayscss.com/codepen/upload.svg',
            interimagepath: 'http://100dayscss.com/codepen/upload.svg',
            preguardpath: 'http://100dayscss.com/codepen/upload.svg',
            postguardpath: 'http://100dayscss.com/codepen/upload.svg',
            path: '',
            userId: reactLocalStorage.get('userId', "")
        }
        if (this.state.userId === '' || this.state.userId === 'undefined') {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        var th = this;
        setTimeout(
            function () {
                if (th.props.profileData && th.props.profileData.length > 0) {
                    if (th.props.profileData[0].ssc !== "") {
                        th.setState({ sscimagepath: BasePath + '/' + th.props.profileData[0].ssc })
                    }
                    if (th.props.profileData[0].intermediate !== "") {
                        th.setState({ interimagepath: BasePath + '/' + th.props.profileData[0].intermediate })
                    }
                    if (th.props.profileData[0].preGraduation !== "") {
                        th.setState({ preguardpath: BasePath + '/' + th.props.profileData[0].preGraduation })
                    }
                    if (th.props.profileData[0].postGraduation !== "") {
                        th.setState({ postguardpath: BasePath + '/' + th.props.profileData[0].postGraduation })
                    }
                }
            }, 700);
    }
    uploadbtn = (e, n) => {
        $('#contained-button-file' + n).trigger('click');
    }
    fileChangedHandler = (event) => {
        var th = this;
        let type = event.target.name;
        let userId = th.state.userId;
        let selectedFile = event.target.files[0]
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
                        $('.fileUpload-tiles').find('.content').css({ 'padding-left': '0px !important' })
                        if (type === "ssc") {
                            th.setState({ sscimagepath: path });
                        }
                        else if (type === "intermediate") {
                            th.setState({ interimagepath: path });
                        }
                        else if (type === "preGraduation") {
                            th.setState({ preguardpath: path });
                        }
                        else if (type === "postGraduation") {
                            th.setState({ postguardpath: path });
                        }
                    }
                });

            })
    }
    handleNext = () => {
        this.props.handleStepChange();
    }
    handleBack = () => {
        this.props.handleBack();
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <h3 className='wizardTitle'>Certificates</h3>
                <GridContainer>
                    <GridItem xs={6} sm={6} md={6}>
                        {/* <List>
                <ListItem> */}
                        <div className="fileUpload-tiles">
                            <div className="title">10th Certificate</div>
                            <div className="body">
                                <div class="dropzone">
                                    <div class="content">
                                        <img src={this.state.sscimagepath} className="uploadImg" />
                                        <span class="filename"></span>
                                        <input className={classes.input} id="contained-button-file0" name="ssc" onChange={this.fileChangedHandler}
                                            type="file" />
                                    </div>
                                </div>
                            </div>
                            <div className="upload-btn">
                                <label onClick={(e) => this.uploadbtn(e, "0")} for="file-1">
                                    <i class="fa fa-camera"></i>
                                    <span>Choose file</span>
                                </label>
                            </div>
                        </div>
                        {/* </ListItem>
                <ListItem>
                    <img src={this.state.sscimagepath} style={{ width: '290px' }} alt="..." />
                </ListItem>
            </List> */}
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                        {/* <List>
                <ListItem> */}
                        <div className="fileUpload-tiles">
                            <div className="title">Inter Certificate</div>
                            <div className="body">
                                <div class="dropzone">
                                    <div class="content">
                                        <img src={this.state.interimagepath} className="uploadImg" />
                                        <span class="filename"></span>
                                        <input className={classes.input} id="contained-button-file1" name="intermediate" onChange={this.fileChangedHandler}
                                            type="file" />
                                    </div>
                                </div>
                            </div>
                            <div className="upload-btn">
                            <label onClick={(e) => this.uploadbtn(e, "1")} for="file-1">
                                    <i class="fa fa-camera"></i>
                                    <span>Choose file</span>
                                </label>

                            </div>
                        </div>
                        {/* <div className={classes.wrapper}>
                        <h5>Inter Certificate *</h5>
                    </div>
                    <div className={classes.wrapper}>
                        <input accept="image/*" className={classes.input} id="contained-button-file1" name="intermediate"
                            onChange={this.fileChangedHandler} type="file" />
                        <label htmlFor="contained-button-file1">
                            <Button variant="contained" component="span" className={classes.button}>
                                Upload
                            </Button>
                        </label>
                    </div> */}
                        {/*
                </ListItem>
                <ListItem>
                    <img src={this.state.interimagepath} style={{ width: '290px' }} alt="..." />
                </ListItem>
            </List> */}
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                        {/* <List>
                <ListItem> */}
                        <div className="fileUpload-tiles">
                            <div className="title">Pre graduation Certificate</div>
                            <div className="body">
                                <div class="dropzone">
                                    <div class="content">
                                        <img src={this.state.preguardpath} className="uploadImg" />
                                        <span class="filename"></span>
                                        <input className={classes.input} id="contained-button-file2" name="preGraduation" onChange={this.fileChangedHandler}
                                            type="file" />
                                    </div>
                                </div>
                            </div>
                            <div className="upload-btn">
                            <label onClick={(e) => this.uploadbtn(e, "2")} for="file-1">
                                    <i class="fa fa-camera"></i>
                                    <span>Choose file</span>
                                </label>

                            </div>
                        </div>
                        {/* <div className={classes.wrapper}>
                        <h5>Pre graduation Certificate *</h5>
                    </div>
                    <div className={classes.wrapper}>
                        <input accept="image/*" className={classes.input} id="contained-button-file2" name="preGraduation"
                            onChange={this.fileChangedHandler} type="file" />
                        <label htmlFor="contained-button-file2">
                            <Button variant="contained" component="span" className={classes.button}>
                                Upload
                            </Button>
                        </label>
                    </div> */}
                        {/*
                </ListItem>
                <ListItem>
                    {this.state.preguardpath!=''?(
                    <img src={this.state.preguardpath} style={{ width: '290px' }} alt="..." />
                    ):(
                    <div></div>
                    )}

                </ListItem>
            </List> */}
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                        {/* <List>
                <ListItem> */}
                        <div className="fileUpload-tiles">
                            <div className="title">Post graduation Certificate</div>
                            <div className="body">
                                <div class="dropzone">
                                    <div class="content">
                                        <img src={this.state.postguardpath} className="uploadImg" />
                                        <span class="filename"></span>
                                        <input className={classes.input} id="contained-button-file3" name="postGraduation" onChange={this.fileChangedHandler}
                                            type="file" />
                                    </div>
                                </div>
                            </div>
                            <div className="upload-btn">
                            <label onClick={(e) => this.uploadbtn(e, "3")} for="file-1">
                                    <i class="fa fa-camera"></i>
                                    <span>Choose file</span>
                                </label>

                            </div>
                        </div>
                        {/* <div className={classes.wrapper}>
                        <h5>Post graduation Certificate *</h5>
                    </div>
                    <div className={classes.wrapper}>
                        <input accept="image/*" className={classes.input} id="contained-button-file3" name="postGraduation"
                            onChange={this.fileChangedHandler} type="file" />
                        <label htmlFor="contained-button-file3">
                            <Button variant="contained" component="span" className={classes.button}>
                                Upload
                            </Button>
                        </label>
                    </div> */}
                        {/*
                </ListItem>
                <ListItem>
                    <img src={this.state.postguardpath} style={{ width: '290px' }} alt="..." />
                </ListItem>
            </List> */}
                    </GridItem>
                </GridContainer>
                {/* <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Button style={{ float: 'right' }} variant="contained" color="primary" onClick={() => this.handleNext()}
                        >
                            Next
            </Button>
                        <Button style={{ float: 'right' }} onClick={this.handleBack} className={classes.backButton}>
                            Back
            </Button>
                    </GridItem>
                </GridContainer> */}
            </div>
        );
    }
}
CertificatesPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
const profileList = state => ({
    profileData: state.profile.profileData,
});
export default connect(profileList, {})(withStyles(styles)(CertificatesPage));