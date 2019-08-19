import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import { addRecommendation } from "../../actions/Profileactions";

const styles = theme => ({
  button: {
    textTransform: 'none',
  },
  gridHead: {
    paddingBottom: '10px',
    borderBottom: '1px solid #b1b0b0',
    fontSize: '1.5rem',
    fontWeight: '400',
    alignItems: 'flex-end'
  },
  backButton: {
    marginRight: theme.spacing.unit,
  }
});
class RecommendationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecommendation: true,
      recommendation: '',
      recommendationState: '',
      userId: reactLocalStorage.get('userId', ""),
      color: 'success',
      notification: '',
      showAddIcon: true
    }
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  change(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value.length === 1) {
      this.onFocus();
    }
  }
  onFocus() {
    this.setState({ recommendationState: "" });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.recommendationData) {
      this.props.profileData[0].recommendation.push(nextProps.recommendationData);
      this.setState({ recommendation: '' });
      this.setState({ showRecommendation: true });
      this.setState({ recommendationState: '' });
    }
  }
  handleSave() {
    let th = this;
    if (this.state.recommendation === "") {
      th.setState({ recommendationState: "error" });
    }
    else {
      let data = { recommendationData: { "recommendation": th.state.recommendation, "_id": th.state.userId } };
      this.setState({ showAddIcon: true });
      th.props.addRecommendation(data);
      th.props.stepChange("Recommendation details added successfully", "success");
    }
  }

  AddMore() {
    this.setState({ showRecommendation: false });
    this.setState({ recommendation: '' });
    this.setState({ recommendationState: '' });
    this.setState({ showAddIcon: false });
  }
  handleClose() {
    this.setState({ showRecommendation: !this.state.showRecommendation });
    this.setState({ showAddIcon: true });
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
        <GridContainer className='titlegrid'>
          <GridItem xs={12} sm={12} md={6}>
            <h3>Recommendation details</h3>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Button variant="fab" color="primary" aria-label="Add" className="addMore" onClick={() => this.AddMore()}>
              <AddIcon />
            </Button>
          </GridItem>
        </GridContainer><br />
        <form className={classes.form} style={!this.state.showRecommendation ? {} : { display: 'none' }} onKeyPress={(e) => this.keydownHandler(e)}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <FormControl fullWidth>
                <CustomInput
                  labelText="Add any recommendations from your professors or colleagues"
                  success={this.state.recommendationState === "success"}
                  error={this.state.recommendationState === "error"}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses,
                  }}
                  inputProps={{
                    name: "recommendation",
                    onChange: event => this.change(event),
                    value: this.state.recommendation,
                    onFocus: () => this.onFocus()
                  }}
                />
              </FormControl>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} >              
              <Button variant="contained" color="primary" onClick={() => this.handleSave()} style={!this.state.showedit ? {float: 'right'} : { display: 'none' }} className={classes.button}>Save</Button>
              <Button style={{ float: 'right' }} onClick={() => this.handleClose()} className='backButton'>Close</Button>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    );
  }
}
RecommendationPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
const profileList = state => ({
  profileData: state.profile.profileData,
  recommendationData: state.profile.recommendation
});
export default connect(profileList, { addRecommendation })(withStyles(styles)(RecommendationPage));
