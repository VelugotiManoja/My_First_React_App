import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import BasePath from '../../basepath';
import { reactLocalStorage } from 'reactjs-localstorage';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from "components/Snackbar/Snackbar.jsx";

import { getTrainersList, buyCourse, trainersUnmount } from "../../actions/Trainers";
import defaultUser from "assets/img/usericon.png";
import Clock from "../Dashboard/clock";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: "30px",
    textColorPrimary: '#3677b5',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: '6px',
  },
  indicator: {
    backgroundColor: '#2196f3'
  },
  label: {
    textTransform: 'none',
    fontWeight: '800',
    textColorPrimary: '#3677b5',
    fontFamily: "'Titillium Web', Helvetica, Arial, sans-serif",
    '& span': {
      fontSize: '16px',
      color: '#2196f3'
    },
    '& button:active': {
      '& span': {
        color: 'red !important'
      }
    }
  },
  chip: {
    margin: theme.spacing.unit,
  },
  cardList: {
    marginBottom: '0px !important'
  },
  gridList: {
    '& span': {
      color: '#2196f3',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  listBorder: {
    padding: 0,

    '& img': {
      width: '100%'
    }
  },
  datesstrong: {
    display: 'block',
    color: '#adb8c2',
    fontSize: '11px',
    fontWeight: '700',
  },
  classmentorname: {
    fontSize: '10px',
    color: '#8e9194',
    float: 'right',
    paddingRight: '28px',
  },
  newClass: {
    height: '272px',
  },
  header: {
    margin: 0,
  },
  rating: {
    color: '#0094DA',
    fontSize: '18px'
  },
  displaytime: {
    fontSize: '14px'
  },
  datescust: {
    overflow: 'hidden',
  },
  statscust: {
    marginTop: '20px',
  },
});
class Trainers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: reactLocalStorage.get('userId', ""),
      color: 'info',
      notification: '',
      br: false,
      value: 0,
      tabValue: 0,
      singleMentor: {},
      myClasses: [],
      courseList: [],
      show: true,
      searchKey: '',
      trainersList: '',
      stateType: false
    }
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  async componentDidMount() {
    let th = this;
    this.props.getTrainersList(this.state.userId);
    await fetch(BasePath + '/myclassinfo/' + this.state.userId, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        th.setState({ myClasses: resp.result });
      }).catch((err) => {
        th.setState({ notification: err.message });
        th.setState({ color: 'danger' });
        th.showNotification('br');
      });
    await fetch(BasePath + '/courselist', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        th.setState({ courseList: resp.info });
      }).catch((err) => {
        th.setState({ notification: err.message });
        th.setState({ color: 'danger' });
        th.showNotification('br');
      });
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
        5000
      );
    }
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSearchGuru = (keyword) => {
    let th = this, searchkey;
    th.setState({ loader: true });
    if (keyword && typeof keyword === 'string'){
      searchkey = keyword;
      this.setState({ show: true });
    }
    else if (this.state.searchKey === '')
      searchkey = 'All';
    else
      searchkey = this.state.searchKey;
    fetch(BasePath + '/searchtrainers/' + searchkey, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(resp => resp.json())
      .then(function (searchdata) {
        th.setState({ loader: false });
        if (searchdata.length === 1) {
          th.setState({ stateType: true });
          th.setState({ trainersList: searchdata.info });
        } else {
          th.setState({ notification: searchdata.message });
          th.setState({ color: 'danger' });
          th.showNotification('br');
        }
      }).catch((err) => {
        th.setState({ loader: false });
        th.setState({ notification: err.message });
        th.setState({ color: 'danger' });
        th.showNotification('br');
      })
  }
  keydownHandler = (e) => {
    if (e.key === 'Enter') {
      this.handleSearchGuru();
    }
  }
  handelBuyCourse =(key) =>{
    let data = { userId: this.state.userId, scheduleId: this.state.singleMentor.scheduleCourse[key].scheduleId, mentorId: this.state.singleMentor.mentorId};
    this.props.buyCourse(data);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.classBuyInfo){
      this.props.trainersList.map(trainer => {
        if(trainer.mentorId === nextProps.classBuyInfo.mentorId){
          trainer.scheduleCourse.map(schedule => {
            if(schedule.scheduleId === nextProps.classBuyInfo.scheduleId){
              schedule.buyers.push(nextProps.classBuyInfo.userId)
            }
          })
        }
      })
      this.setState({ notification: "Thanks for buying course" });
      this.setState({ color: "success" });
      this.showNotification('br');
    } else if(nextProps.error){
      this.setState({ notification: nextProps.error.message });
      this.setState({ color: "danger" });
      this.showNotification('br');
    }
    this.props.trainersUnmount();
  }

  render() {
    const { classes } = this.props;
    if (!this.state.stateType)
      this.state.trainersList = this.props.trainersList;
    return (
      <div className="full-height">
        <div>
          <Snackbar
            place="br"
            color={this.state.color}
            message={
              this.state.notification
            }
            open={this.state.br}
            closeNotification={() => this.setState({ br: false })}
            close
          />
        </div>
        <GridContainer className={"full-height " + classes.grid}>
          <GridItem xs={12} sm={4} md={3} className="mobile-view mobile-nav-bar full-height">
            <div className={'full-height ' + classes.root}>
              <AppBar position="static" color="default" className="tabsHeader">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                  classes={{
                    indicator: classes.indicator,
                  }}
                >
                  <Tab className={classes.label} label="My GURU's" />
                </Tabs>
              </AppBar>
              <SwipeableViews
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
                className="containertab"
              >
                <TabContainer dir=''>
                  <List className="connectionsul">
                    {this.state.myClasses.length > 0 ? (
                      this.state.myClasses.map((val, key) => (
                        <ListItem className="hideList connectionsList" >
                          <Avatar alt="Remy Sharp" src={defaultUser} />
                          <ListItemText primary={val.mentorName} secondary={val.mentorRole +' - '+ val.courseName} />
                          <ListItemSecondaryAction>
                          </ListItemSecondaryAction>
                          <span className="statusBar"></span>
                        </ListItem>
                      ))) :
                      (
                        <div className="full-height full-width">
                          <div className="searchdata-empty">
                            <div className="pagemiddle">
                              <h4>You don't have any GURU right now. </h4>
                            </div>
                          </div>
                        </div>
                      )}
                  </List>
                  <hr />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      {this.state.courseList.map((cval, ckey) => (
                        <Chip key={ckey} clickable onClick={() => {
                          this.handleSearchGuru(cval);
                        }} label={cval} className={classes.chip} />
                      ))}
                    </GridItem>
                  </GridContainer>
                </TabContainer>
              </SwipeableViews>
            </div>
          </GridItem>
          <GridItem xs={12} sm={8} md={9} className="full-height">
            <Card className="full-height">
              <CardBody className="full-height">
                <GridContainer style={this.state.show ? {} : { display: 'none' }}>
                  <GridItem xs={12} sm={12} md={12}>
                    <input type="text" onKeyPress={(e) => this.keydownHandler(e)} onChange={this.handleInputChange} value={this.state.searchKey} className="main-input main-name" name="searchKey" placeholder="Search by name, class" />
                    <input id="main-submit" type="submit" onClick={this.handleSearchGuru} value="Search" />
                  </GridItem>
                  {this.state.trainersList.length > 0 ? (
                    this.state.trainersList.map((val, key) => (
                      <GridItem key={key} xs={12} sm={12} md={3}>
                        <Card className={classes.cardList}>
                          <List className={classes.listBorder}>
                            <ListItem>
                              <img src={defaultUser} alt="" />
                            </ListItem>
                            <ListItem>
                              <ListItemText onClick={() => {
                                this.setState({ singleMentor: val })
                                this.setState({ show: false })
                              }} className={classes.gridList} primary={val.name} secondary={val.role} />
                            </ListItem>
                          </List>
                        </Card>
                      </GridItem>
                    ))) :
                    (
                      <GridItem xs={12} sm={12} md={12} className="full-height">
                        <div className="full-height full-width">
                          <div className="searchdata-empty">
                            <div className="pagemiddle">
                              <h4>Thank you so much for your enthusiasm and your patience <br />
                                as we work to get everyone in as quickly as possible.<br />
                                Keep checking back, because it won't be long now. </h4>
                            </div>
                          </div>
                        </div>
                      </GridItem>
                    )}
                </GridContainer>
                <GridContainer className="full-height" style={!this.state.show ? {} : { display: 'none' }}>
                  <GridItem xs={12} sm={12} md={12}>
                    <IconButton
                      onClick={() => {
                        this.setState({ singleMentor: [] })
                        this.setState({ show: true })
                      }}
                    >
                      <KeyboardBackspace />
                    </IconButton>
                  </GridItem>
                  <GridItem className="full-height" xs={12} sm={4} md={3}>
                    <List className={'profile-list-connections ' + classes.gridList}>
                      <ListItem>
                        {this.state.singleMentor.path !== undefined ? (<img src={BasePath + '/' + this.state.singleMentor.path} className="profilePics" alt="..." />) : (
                          <img src={defaultUser} className="profilePics" alt="..." />
                        )}
                      </ListItem>
                      <ListItem className="label-value">
                        <span>{this.state.singleMentor.name}</span>
                        <br />
                        <label>{this.state.singleMentor.role}</label>
                        <br />
                        {[1, 2, 3, 4, 5].map(ratingId => (
                          this.state.singleMentor.avgrating < ratingId ? (
                            <StarBorder key={ratingId} className={classes.rating} />
                          ) : (
                              <Star key={ratingId} className={classes.rating} />
                            )
                        ))}
                      </ListItem>

                      {this.state.singleMentor.email !== undefined && this.state.singleMentor.email !== null ? (
                        <ListItem className="label-value">
                          <label>Email</label>
                          <br />
                          <div >{this.state.singleMentor.email}</div>
                        </ListItem>
                      ) : ("")}

                      {this.state.singleMentor.city !== undefined && this.state.singleMentor.city !== "" ? (
                        <ListItem className="label-value">
                          <label>City</label>
                          <br />
                          <div >{this.state.singleMentor.city}</div>
                        </ListItem>
                      ) : ("")}
                      <ListItem className="label-value">
                        <label>PhoneNumber</label>
                        <div>{this.state.singleMentor.phoneNumber}</div>
                      </ListItem>
                    </List>
                  </GridItem>
                  <GridItem className="full-height" xs={12} sm={8} md={9}>

                    <div className={classes.tabroot}>
                      <AppBar position="static" color="default" className="tabsHeader">
                        <Tabs
                          value={this.state.tabValue}
                          onChange={this.handleTabChange}
                          indicatorColor="primary"
                          textColor="primary"
                          fullWidth
                          classes={{
                            indicator: classes.indicator,
                          }}
                        >
                          <Tab className={classes.label} label="Basic Info" />
                          <Tab className={classes.label} label="Classes" />
                          <Tab className={classes.label} label="Reviews" />
                        </Tabs>
                      </AppBar>
                      <SwipeableViews
                        index={this.state.tabValue}
                        onChangeIndex={this.handleChangeIndex}
                        className={classes.tabContainer}
                      >
                        <TabContainer className="full-height" dir='' className={classes.tabContainer}>
                          {this.state.singleMentor.details !== undefined && this.state.singleMentor.details !== "" ? (
                            <List>
                              <ListItem>
                                <ListItemText secondary={<span dangerouslySetInnerHTML={{ __html: this.state.singleMentor.details }} />} />
                              </ListItem>
                            </List>
                          ) :
                            (
                              <div className="full-height">
                                <div className="searchdata-empty">
                                  <div className="pagemiddle">
                                    <h4>Thank you so much for your enthusiasm and your patience <br />
                                      as we work to get complete information in as quickly as possible.</h4>
                                  </div>
                                </div>
                              </div>
                            )}
                        </TabContainer>
                        <TabContainer dir=''>
                          <GridContainer>
                            {this.state.singleMentor.scheduleCourse !== undefined ? (
                              this.state.singleMentor.scheduleCourse.map((person, index) => (
                                <GridItem key={index} xs={12} sm={6} md={6}>
                                  <div className="tile">
                                    <div>
                                      <div className="header "><p className={classes.header}>{person.courseName}</p> <span className={classes.classmentorname}>by {this.state.singleMentor.name}</span></div>
                                      <div className={'dates '+ classes.datescust}>
                                        <div className={classes.displaytime}>
                                          <strong>STARTS</strong>
                                          {person.startTime.split(' ')[3] + ' ' + person.startTime.split(' ')[0].slice(0, 3) + ' ' + person.startTime.split(' ')[1] + ' ' + person.startTime.split(' ')[2]}
                                          <span></span>
                                        </div>
                                        <div className={classes.displaytime}>
                                          <strong>ENDS</strong>
                                          {person.endTime.split(' ')[3] + ' ' + person.endTime.split(' ')[0].slice(0, 3) + ' ' + person.endTime.split(' ')[1] + ' ' + person.endTime.split(' ')[2]}
                                        </div>
                                        <Clock text="Starts in: " time={person.startTime} />
                                      </div>
                                      <div className={'stats '+ classes.statscust}>
                                        <div className='statsdiv'>
                                          <strong className={classes.datesstrong}>MAX PEOPLE</strong>
                                          {person.maxPeople}
                                        </div>
                                        <div className='statsdiv'>
                                          <strong className={classes.datesstrong}>JOINED</strong>
                                          {person.buyers.length}
                                        </div>
                                        <div className='statsdiv'>
                                          <Button variant="contained" size="small" color="primary" className={classes.button} onClick={() => this.handelBuyCourse(index)} disabled={person.maxPeople <= person.buyers.length}>
                                            Buy
                                        </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </GridItem>
                              ))) :
                              ('')}
                          </GridContainer>
                        </TabContainer>
                        <TabContainer dir=''>
                          <List>
                            <ListItem>
                              <strong className={classes.rating}>{this.state.singleMentor.avgrating}</strong>
                              <Star className={classes.rating} />
                              <ListItemText primary="" secondary={this.state.singleMentor.reviewCnt + ' Reviews & ' + this.state.singleMentor.ratingCnt + ' Ratings'} />
                            </ListItem>
                            <Divider component="li" />
                            {this.state.singleMentor.feedback !== undefined && this.state.singleMentor.feedback.length > 0 ? (
                              this.state.singleMentor.feedback.map((row, index) => (
                                <div>
                                  <ListItem>
                                    <ListItemText primary={row.userName} secondary={row.review} />
                                  </ListItem>
                                  <Divider component="li" />
                                </div>
                              )
                              )) : (
                                <div className="full-height">
                                  <div className="searchdata-empty">
                                    <div className="pagemiddle">
                                      <h4>No reviews found!</h4>
                                    </div>
                                  </div>
                                </div>
                              )}

                          </List>
                        </TabContainer>
                      </SwipeableViews>
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Trainers.propTypes = {
  classes: PropTypes.object.isRequired,
};
const trainersRes = state => ({
  profileData: state.profile.profileData,
  trainersList: state.trainers.trainersList,
  classBuyInfo: state.trainers.classBuyInfo,
  error: state.trainers.error,
});


export default connect(trainersRes, { getTrainersList, buyCourse, trainersUnmount })(withStyles(styles)(Trainers));
