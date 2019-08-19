import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import bgImage from "assets/img/merritos-blue-small.png";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  loginButtonLink= () => {
    this.props.history.push('/App/Login');
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <div className={classes.container}>
        <GridContainer justify="center"   >
        <GridItem xs={12} sm={6} md={4} >
        <Card login className={classes[this.state.cardAnimaton]} >
        <img src={bgImage} className='emailimage'/>
      <h3 className='emailTitle'> Welcome to the Merritos</h3>
      <CardBody>
        <div className='emailbody'>
        Thank you for activating your account. Please continue to setup your Merritos profile.
        </div>
        <br/>
        <div class="wrapper">
    <Button onClick={this.loginButtonLink} className="emailbtn">Go to Sign in</Button>
</div>
      </CardBody>
      </Card>
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
