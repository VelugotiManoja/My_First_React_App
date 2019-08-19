import React from "react";
import PropTypes from "prop-types";
import { reactLocalStorage } from 'reactjs-localstorage';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel"
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import bgImage from "assets/img/loginimg.png";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstNameState: "",
      lastName: "",
      lastNameState: "",
      mobile: "",
      mobileState: "",
      role: "Student",
      isCoach: "yes",
      showCouch: true,
      nextPageData: "",
      userId: reactLocalStorage.get('userId', "")
    };
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  componentDidMount() {
    this.setState({ showCouch: false });
  }
  change(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onFocus() {
    this.setState({ firstNameState: "" });
    this.setState({ lastNameState: "" });
    this.setState({ mobileState: "" });
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
  handleChange = event => {
    this.setState({ isCoach: event.target.value });
  };
  handleNext = () => {
    if (this.state.firstName === "") {
      this.setState({ firstNameState: "error" });
    }
    else if (this.state.lastName === "") {
      this.setState({ lastNameState: "error" });
    }
    else if (this.state.mobile === "") {
      this.setState({ mobileState: "error" });
    }
    else {
      if (this.state.role === "Professional") {
        let Nextpagedata = {
          "role": this.state.role, "firstName": this.state.firstName,
          "lastName": this.state.lastName, "mobile": this.state.mobile, "isCoach": this.state.isCoach
        }
        reactLocalStorage.set('Nextpagedata',JSON.stringify(Nextpagedata));
        this.props.history.push({
          pathname: '/App/Goal',
        })
      }
      else {
        let Nextpagedata = {
          "role": this.state.role, "firstName": this.state.firstName,
          "lastName": this.state.lastName, "mobile": this.state.mobile
        }
        reactLocalStorage.set('Nextpagedata',JSON.stringify(Nextpagedata));
        this.props.history.push({
          pathname: '/App/Goal',
          state: Nextpagedata
        });
      }
    }
  }
  keydownHandler = (e) =>{
    if (e.key === 'Enter') {
      e.preventDefault();
       this.handleNext();
      }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={5} style={{ backgroundImage: "url(" + bgImage + ")" }} className={classes.bgImage}>
            </GridItem>
            <GridItem xs={12} sm={6} md={1}  >
            </GridItem>
            <GridItem xs={12} sm={6} md={5}>
              <form onKeyPress={(e) => this.keydownHandler(e)}>
                <Card login className={classes[this.state.cardAnimaton]}>
                  <h3 className={classes.cardTitle}>Let's start with the basic information</h3>
                  <CardBody>
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor="age-native-label-placeholder">
                        I am currently
                    </InputLabel>
                      <NativeSelect
                        value={this.state.role}
                        onChange={this.handleSelectChange('role')}
                        input={<Input name="role" id="age-native-label-placeholder" />}
                        inputProps={{
                          name: 'role',
                          id: 'age-native-label-placeholder',
                        }}
                      >
                        <option value="Student">A student</option>
                        <option value="Outofcollege">Out of college</option>
                        <option value="Professional">A proffessional</option>
                      </NativeSelect>
                    </FormControl>
                    <CustomInput
                      success={this.state.firstNameState === "success"}
                      error={this.state.firstNameState === "error"}
                      labelText="First name"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "firstName"),
                        value: this.state.firstName,
                        name: "firstName",
                        onFocus: () => this.onFocus()
                      }}
                    />
                    <CustomInput
                      success={this.state.lastNameState === "success"}
                      error={this.state.lastNameState === "error"}
                      labelText="Last name"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "lastName"),
                        value: this.state.lastName,
                        name: "lastName",
                        onFocus: () => this.onFocus()
                      }}
                    />
                    <CustomInput
                      success={this.state.mobileState === "success"}
                      error={this.state.mobileState === "error"}
                      labelText="Mobile"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "mobile"),
                        value: this.state.mobile,
                        name: "mobile",
                        onKeyPress:this.keydownHandler,
                        onFocus: () => this.onFocus()
                      }}
                    />
                    <FormControl style={this.state.showCouch ? {} : { display: 'none' }}>
                      <h5>Do you want to be a learning coach? <br />
                        <FormControlLabel checked={this.state.isCoach === 'yes'} value="yes" control={<Radio />} label="yes" onChange={this.handleChange} />
                        <FormControlLabel checked={this.state.isCoach === 'no'} value="no" control={<Radio />} label="no" onChange={this.handleChange} />
                      </h5>
                    </FormControl>
                  </CardBody>
                  <CardFooter className={classes.justifyContentCenter}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Button onClick={this.handleNext} color="rose" block className={classes.loginButton}>
                          Next
                    </Button>
                      </GridItem>
                    </GridContainer>
                  </CardFooter>
                  <GridContainer>
                  </GridContainer>
                </Card>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
