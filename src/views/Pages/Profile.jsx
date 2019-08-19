import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Button from '@material-ui/core/Button';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

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
  title: {
    color: 'rgb(37, 55, 152)'
  },
  icon: {
    fontSize: "90px",
    color: "#c2cbe4"
  },
  imageCard: {
    height: "100px",
    width: "100px",
    borderRadius: "50px"
  },
  imageArrow: {
    height: "20px",
    width: "40px",
  },
  textHeader: {
    color: 'rgb(228, 17, 17)'
  },
  cardHeight: {
    height: "350px"
  },
  button: {
    textTransform: 'none',
    fontSize: '0.8rem'
  },
  input: {
    display: 'none',
  },
};
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
    var th = this;
    setTimeout(
      function () {
        if (th.props.profileData.length > 0) {
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
        }
      }.bind(this),
      700
    );
  }
  ButtonClick() {
    var th = this;
    if (this.state.firstName === "") {
      th.setState({ firstNameState: "error" });
    }
    else if (this.state.lastName === "") {
      this.setState({ lastNameState: "error" })
    }
    else if (!this.verifyEmail(this.state.email)) {
      this.setState({ emailState: "error" })
    }
    else if (!this.verifyNumber(this.state.phoneNumber)) {
      this.setState({ phoneNumberState: "error" })
    }
    else {
      var data = {
        personalData: {
          "firstName": th.state.firstName,
          "lastName": th.state.lastName,
          "email": th.state.email,
          "phoneNumber": th.state.phoneNumber,
          "street": th.state.street,
          "state": th.state.state,
          "city": th.state.city,
          "country": th.state.country,
          "pinCode": th.state.pinCode,
          "_id": th.state.userId
        }
      }
    };
    fetch(BasePath + '/profileupdate', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then(function (res) {
      th.setState({ loader: false });
      if (res.status === 200) {
        th.props.stepChange("Profile Updated successfully ", "success");
      }
    }).catch((err) => {
      th.props.stepChange(err.message, "danger");
    })
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
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <legend>Personal details</legend>
            <form className={classes.form} onKeyPress={(e) => this.keydownHandler(e)}>
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
            </form>
          </GridItem>
          <GridItem xs={10} sm={10} md={10} > </GridItem>
          <GridItem xs={2} sm={2} md={2}>
            <Button variant="outlined" color="primary" onClick={() => this.ButtonClick()} className={classes.button}>Update</Button>
          </GridItem>
        </GridContainer>
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
