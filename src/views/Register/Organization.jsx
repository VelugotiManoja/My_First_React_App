import React from "react";
import PropTypes from "prop-types";
import BasePath from '../../basepath';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import bgImage from "assets/img/loginimg.png";

// core components
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import { reactLocalStorage } from "reactjs-localstorage";


class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      companyName: "",
      companyNameState: "",
      website: "",
      websiteState: "",
      primary: "",
      primartState: "",
      secondary: "",
      secondaryState: "",
      address: "",
      errorMsg: "",
      loader:false,
      userId: reactLocalStorage.get('userId', "")
    };
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  verifyCompany = (value) => {
    if (value.length >= 0) {
      return true;
    }
    return false;
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
  next = () => {
    let th = this;
    if (this.state.companyNameState === "" || this.state.companyNameState === "error") {
      this.setState({ companyNameState: "error" });
    }
    else if (this.state.websiteState === "" || this.state.websiteState === "error") {
      this.setState({ websiteState: "error" });
    }
    else if (this.state.primaryState === "" || this.state.primaryState  === "error") {
      this.setState({ primaryState: "error" });
    }
    else if (this.state.secondaryState  === "" || this.state.secondaryState  === "error") {
      this.setState({ secondaryState: "error" });
    }
    else if (this.state.addressState  === "" || this.state.addressState  === "error") {
      this.setState({ addressState: "error" });
    }

    else {
      var companydata = {
        "companyId": this.state.userId, "companyname": this.state.companyName, "website": this.state.website, "primary": this.state.primary, "secondary": this.state.secondary, "address": this.state.address
      };
      th.setState({loader:true});
      fetch(BasePath + '/companydata', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(companydata)
      }).then((resp) => resp.json())
        .then(function (data) {
          th.setState({loader:false});
          if (data.length === 1) {
            th.setState({ companyName: "" });
            th.setState({ website: "" });
            th.setState({ primary: "" });
            th.setState({ secondary: "" });
            th.setState({ address: "" });
            th.props.history.push('/Organization');
          }
          else {
            th.setState({ errorMsg: "User already exist." });
            th.showNotification('tl');
          }
        });
    }
  }
  keydownHandler = (e) =>{
    if (e.key === 'Enter') {
      e.preventDefault();
       this.next();
      }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
      <CircularProgress visible={this.state.loader}></CircularProgress>
        <div className={classes.container}>
          <div>
            <Snackbar
              place="tl"
              color="danger"
              message={
                this.state.errorMsg
              }
              open={this.state.tl}
              closeNotification={() => this.setState({ tl: false })}
              close
            />
          </div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={5} style={{ backgroundImage: "url(" + bgImage + ")" }} className={classes.bgImage}>
            </GridItem>
            <GridItem xs={12} sm={6} md={1}  >
            </GridItem>
            <GridItem xs={12} sm={6} md={5}>
              <form onKeyPress={(e) => this.keydownHandler(e)}>
                <Card login className={classes[this.state.cardAnimaton]} >
                  <h3 className={classes.cardTitle}>Member Company</h3>
                  <CardBody>
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
                        type: "companyname"
                      }}
                    />
                    <br />
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
                        type: "website"
                      }}
                    />
                    <br />
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
                        type: "primary"
                      }}
                    />
                    <br />
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
                        type: "secondary"
                      }}
                    />
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
                        type: "address"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.justifyContentCenter}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Button onClick={this.next} color="rose" block className={classes.next} >
                          Next
                    </Button>
                      </GridItem>
                    </GridContainer>
                  </CardFooter>
                </Card>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}
RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(RegisterPage);
