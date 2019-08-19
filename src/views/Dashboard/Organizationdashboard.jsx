import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import { Container, Row, Col } from 'reactstrap';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

//icons

// core components

import avatar from "assets/img/usericon.png";

import { fetchOrganizationData } from "../../actions/Profileactions";
import { getProfileImage } from "../../actions/Organization";
import Edit from "@material-ui/icons/Edit";
import Jobs from '../Jobs/organizationJobs';
import CardHeader from "components/Card/CardHeader.jsx";
import Card from "components/Card/Card.jsx";
import CameraAlt from "@material-ui/icons/CameraAlt";
import CardBody from "components/Card/CardBody.jsx";
import { loaderfalse } from '../../actions/Loader';



const styles = {
  card: {
    borderRadius: "2px",
    cursor: 'pointer',
    "&:hover": {
      '& $icon': {
        color: 'rgb(37, 55, 102)'
      },
      boxShadow: '3px 3px 10px #777'
    }
  },
  cardbody: {
    textAlign: "center"
  },
  icon: {
    fontSize: "90px",
    color: "#c2cbe4"
  },
  imageCard: {
    height: "125px",
    width: "125px",
    borderRadius: "50%"
  },
  edit: {
    left: "750px",
    top: "-77px"
  },
  profileInfo: {
    color: '#000000 !important',
    fontWeight: '400 !important',
    fontSize: '22px',
    marginTop: '27px'
  },
  prflInfo: {
    color: '#5c5a5a !important',
    marginTop: '-11px',
    fontWeight: '400'
  },
  inputFile: {
    display: 'none'
  },
  profileEditIcon: {
    bottom: '54px !important',
    left: '131px !important',
    top: '78px !important',
    cursor: 'pointer',
    color: '#b4b4b4',
    position: 'absolute !important'
  },
  companyDetails: {
    margin: '-21px 0px 0px -135px !important'
  }
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      imageurl: avatar,
      imageedit: Edit,
      anchorEl: null,
      open: false,
      companyName: "",
      companyNameState: "",
      address: "",
      addressState: "",
      primary: "",
      primaryState: "",
      editData: false,
      showCompany: false,
      showCreateCompany: false,
      show: false,
      userId: ''
    }
    this.state.userId = reactLocalStorage.get('userId', "");
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  componentDidMount = () => {
    let th = this;
    this.props.fetchOrganizationData(this.state.userId);
    setTimeout(function () {
      if (th.props.companydata.imageName !== undefined && th.props.companydata.imageName !== "") {
        th.setState({ imageurl: BasePath + '/uploads/' + th.props.companydata.imageName });
      }
    }, 500);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profileImage) {
      this.props.companydata = nextProps.profileImage;
      this.setState({ imageurl: BasePath + '/uploads/' + nextProps.profileImage });
    }
    setTimeout(() => this.props.loaderfalse(window.location.hash.split('#')[1]), 100);
  }
  handleCreateCompany = () => {
    var th = this;
    if (this.state.companyNameState === "error") {
      this.setState({ companyNameState: "error" });
    }
    else if (this.state.addressState === "error") {
      this.setState({ addressState: "error" });
    }
    else if (this.state.primaryState === "error") {
      this.setState({ primaryState: "error" });
    }
    else {
      let updatecompany = { "_id": this.state.userId, "companyName": this.state.companyName, "address": this.state.address, "primary": this.state.primary }
      fetch(BasePath + '/updateData', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(updatecompany)
      }).then((resp) => resp.json()) // Transform the data into json
        .then(function (resp) {
          th.setState({ companyName: this.state.companyName });
          th.setState({ address: this.state.address });
          th.setState({ primary: this.state.primary });
        });
    }
  }
  verifyLength(value, length) {
    if (value.length >= 0) {
      return true;
    }
    return false;
  }

  change(event, stateName) {
    this.setState({ editable: true });

    if (this.verifyLength(event.target.value)) {
      this.setState({ [stateName + "State"]: "success" });
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({ [stateName + "State"]: "error" });
      this.setState({ [event.target.name]: event.target.value })
    }
  }

  fileChangedHandler = (event) => {
    let th = this;
    let selectedFile = event.target.files[0]
    let formData = new FormData();
    formData.append('file', selectedFile);
    fetch(BasePath + '/savedata', {
      method: 'post',
      body: formData
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        let imageName = BasePath + '/uploads/' + data.filename;
        let serdata = { "imageName": data.filename, "_id": th.state.userId };
        fetch(BasePath + '/organizationImageUploads', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(serdata)
        }).then(function (resp) {
          th.setState({ imageurl: imageName });
        }).catch((err) => {
          th.setState({ notification: err.message });
          th.setState({ color: 'danger' });
          th.showNotification('br');
        }
        )
      })
  }
  
  render() {
    const { classes, companydata } = this.props;
    if (this.state.editData !== '' && !this.state.editable) {
      this.state.companyName = this.state.companyName;
      this.state.address = this.state.address;
      this.state.number = this.state.number;
    }
    return (
      <div>
        {/* <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader icon>
              <CardBody>
                <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <img src={this.state.imageurl} width="150px" height="100px" />
                  <input
                    accept="image/*"
                    className={classes.inputFile}
                    id="flat-button-file"
                    multiple
                    type="file"
                    onChange={this.fileChangedHandler}
                  />
                  <label htmlFor="flat-button-file">
                    <CameraAlt className={classes.profileEditIcon}/>
                  </label>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} className={classes.companyDetails}>
                  <h4 className={classes.profileInfo}>
                {companydata.companyname}
                </h4>
                <p className={classes.prflInfo}> {companydata.address}<br/>
                {companydata.primary} </p>
                  </GridItem>
                  </GridContainer>
                  </CardBody>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>       */}
       
       
            <Jobs />
        
        
      </div>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};
const profileList = state => ({
  companydata: state.profile.companydata,
  userId: state.profile.userId,
  profileImage: state.profile.profileImage
});


export default connect(profileList, { loaderfalse, fetchOrganizationData, getProfileImage })(withStyles(styles)(Dashboard));
