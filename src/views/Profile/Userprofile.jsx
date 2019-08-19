import React from "react";
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import { fetchprofileData } from "../../actions/Profileactions";
import avatarImg from "assets/img/maleTeam.jpg";
import Moment from 'moment';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  card: {
    borderRadius: "2px",
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: 'azure'
  },
  imageCard: {
    height: "100px",
    width: "100px",
    borderRadius: "50px"
  },
  labelNote: {
    display: "block",
    color: '#989898',
    fontWeight: "400",
    fontSize: "16px",
    marginLeft: "20px",
    width: '230px',
    float: 'left',
  },
  textNote: {
    color: '#555555',
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: '1.55em'
  },
  gridList: {
    marginTop: '10px'
  },
  chip: {
    backgroundColor: '#4DC2FF !important',
    color: '#ffffff',
    fontSize: '25px'
  },
});
class Userprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageurl: avatarImg,
      userId: reactLocalStorage.get('userId', "")
    }
  }
  componentDidMount() {
    let th =this;
      th.props.fetchprofileData(th.state.userId);
  }
  render() {
    const { classes } = this.props; 
    return (
      <div>
       <Card className={classes.root} elevation={1}>
            {this.props.profileData.length > 0 && this.props.profileData !== undefined ? (
              this.props.profileData.map((value, key) => {
                return (
                  <Card>
                  <GridContainer className={classes.gridList}>
                     <img src={this.state.imageurl} className={classes.imageCard} alt="..." />
                     <GridItem xs={4} sm={2} md={6}>
                     <div>
                      <div className={classes.labelNote}>Name:</div>
                      <h1 className={classes.textNote}>{value.firstName}</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>Email:</div>
                      <h1 className={classes.textNote}>{value.email }</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>Phonenumber:</div>
                      <h1 className={classes.textNote}>{value.phoneNumber }</h1>
                    </div>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                    <div>
                      <div className={classes.labelNote}>Street:</div>
                      <h1 className={classes.textNote}>{value.street}</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>City:</div>
                      <h1 className={classes.textNote}>{value.city}</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>State:</div>
                      <h1 className={classes.textNote}>{value.state}</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>Country:</div>
                      <h1 className={classes.textNote}>{value.country}</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>Pincode:</div>
                      <h1 className={classes.textNote}>{value.pinCode}</h1>
                    </div>
                    </GridItem>
                   </GridContainer>
                   </Card>
                )
              })
            ) : (
                <Card className={classes.card}>
                </Card>
              )}
          <Card className={classes.card}>
          <GridItem xs={12} sm={12} md={12}>
          <Chip
                  label="Education details"
                  className={classes.chip}
                />
          </GridItem>
          {this.props.profileData[0].education.length > 0 && this.props.profileData[0].education !== undefined ? (
              this.props.profileData[0].education.map((value, key) => {
                return (
                  <GridContainer className={classes.gridList}>
                  <GridItem xs={4} sm={2} md={6}>
                   <div>
                      <div className={classes.labelNote}>University name :</div>
                      <h1 className={classes.textNote}>{value.universityName }</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>Field of study :</div>
                      <h1 className={classes.textNote}>{value.fieldOfStudy }</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>Degree :</div>
                      <h1 className={classes.textNote}>{value.degree }</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>Fromdate :</div>
                      <h1 className={classes.textNote}>{Moment(value.fromDate).format('DD-MM-YYYY')}</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>Todate :</div>
                      <h1 className={classes.textNote}>{Moment(value.toDate).format('DD-MM-YYYY')}</h1>
                    </div>
                      </GridItem> 
                      <GridItem xs={4} sm={4} md={4}>
                    </GridItem>            
               </GridContainer>
                )
              })
            ) : (
                <Card className={classes.card}>
                </Card>
              )}
          </Card>
          <Card className={classes.card}>
          <GridItem xs={12} sm={12} md={12}>
             <Chip
                  label="Work experience"
                  className={classes.chip}
                />
            </GridItem>
          {this.props.profileData[0].experience.length > 0 && this.props.profileData[0].experience !== undefined ? (
              this.props.profileData[0].experience.map((value, key) => {
                return (
                  <GridContainer className={classes.gridList}>
                  <GridItem xs={4} sm={2} md={6}>
                  <div>
                      <div className={classes.labelNote}>Companyaname :</div>
                      <h1 className={classes.textNote}>{value.companyName }</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>Designation :</div>
                      <h1 className={classes.textNote}>{value.designation }</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>Fromdate :</div>
                      <h1 className={classes.textNote}>{Moment(value.fromDate).format('DD-MM-YYYY')}</h1>
                    </div>
                    <div>
                      <div className={classes.labelNote}>Todate :</div>
                      <h1 className={classes.textNote}>{Moment(value.toDate).format('DD-MM-YYYY')}</h1>
                    </div>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                    </GridItem>
                  </GridContainer>
                )
              })
            ) : (
                <Card className={classes.card}>
                </Card>
              )}
          </Card>
          <Card className={classes.card}>
          <GridItem xs={12} sm={12} md={12}>
             <Chip
                  label="Achivements"
                  className={classes.chip}
                />
            </GridItem>
          {this.props.profileData[0].achievements.length > 0 && this.props.profileData[0].achievements !== undefined ? (
              this.props.profileData[0].achievements.map((value, key) => {
                return (
                  <GridContainer className={classes.gridList}>
                    <GridItem xs={4} sm={2} md={6}>
                    <div>
                      <div className={classes.labelNote}>Achivements :</div>
                      <h1 className={classes.textNote} dangerouslySetInnerHTML={{ __html: value.achievements }} />
                    </div>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                    </GridItem>
                  </GridContainer>
                )
              })
            ) : (
                <Card className={classes.card}>
                </Card>
              )}
          </Card>
          <Card className={classes.card}>
          <GridItem xs={12} sm={12} md={12}>
          <Chip
                  label="Expertise"
                  className={classes.chip}
                />
            </GridItem>
          {this.props.profileData[0].expertise.length > 0 && this.props.profileData[0].expertise !== undefined ? (
              this.props.profileData[0].expertise.map((value, key) => {
                return (
                  <GridContainer className={classes.gridList}>
                   <GridItem xs={4} sm={2} md={6}>
                   <div>
                      <div className={classes.labelNote}>Expertise :</div>
                      <h1 className={classes.textNote} dangerouslySetInnerHTML={{ __html: value.expertise }} />
                   </div>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                    </GridItem>
                  </GridContainer>
                )
              })
            ) : (
                <Card className={classes.card}>
                </Card>
              )}
          </Card>
          <Card className={classes.card}>
          <GridItem xs={12} sm={12} md={12}>
          <Chip
                  label="Recommendation"
                  className={classes.chip}
                />
            </GridItem>
          {this.props.profileData[0].recommendation.length > 0 && this.props.profileData[0].recommendation !== undefined ? (
              this.props.profileData[0].recommendation.map((value, key) => {
                return (
                  <GridContainer className={classes.gridList}>
                    <GridItem xs={4} sm={2} md={6}>
                    <div>
                      <div className={classes.labelNote}>Recommendation :</div>
                      <h1 className={classes.textNote} dangerouslySetInnerHTML={{ __html: value.recommendation }} />
                    </div>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                    </GridItem>
                  </GridContainer>
                )
              })
            ) : (
                <Card className={classes.card}>
                </Card>
              )}
          </Card>
      </Card>
      </div>
    );
  }
}
const profileList = state => ({
  profileData: state.profile.profileData,
  userId: state.profile.userId
});


export default connect(profileList, { fetchprofileData })(withStyles(styles)(Userprofile));
