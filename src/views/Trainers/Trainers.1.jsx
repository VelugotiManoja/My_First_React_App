import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AlarmIcon from '@material-ui/icons/Alarm';
import VideoCallIcon from '@material-ui/icons/Videocam';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Heading from "components/Heading/Heading.jsx";
import { getTrainersList } from "../../actions/Trainers";
import TrainerDetails from "./Details";
import TrainerSchedule from "./Schedule";
import TrainerReviews from "./Reviews";
import TrainerDemovideos from "./Demovideos";
import NoList from "assets/img/no-list.png";
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit / 2,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 16,
  },
  purple: {
    color: purple[500],
    '&:hover': {
      backgroundColor: '#f6e3f9',
    },
  },
  green: {
    color: green[500],
    '&:hover': {
      backgroundColor: '#e0f5e1',
    },
  },
  card: {
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: '#fbfbfb'
    },
    padding: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  }
});

class Trainers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: reactLocalStorage.get('userId', ""),
      showTab: 'details',
      trainerKey: 0
    }
    if (!this.state.userId) {
      this.props.history.push('/');
    }
  }
  componentDidMount() {
    this.props.getTrainersList(this.state.userId);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.props.trainersList !== undefined && this.props.trainersList.length > 0 ? (
          <Grid container spacing={24}>
            <Grid item xs>
              <List subheader={<li />}>
                {[0, 1, 2 ].map(sectionId => (
                  <li key={`section-${sectionId}`} className={classes.listSection}>
                    <ul className={classes.ul}>
                      <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                      {[0, 1, 2 ].map(item => (
                        <ListItem key={`item-${sectionId}-${item}`}>
                          <ListItemText primary={`Item ${item}`} />
                        </ListItem>
                      ))}
                    </ul>
                  </li>
                ))}
              </List>
            </Grid>
            <Grid item xs={4}>
              {this.props.trainersList.map((val, key) => {
                return (
                  <Card key={key} className={classes.card}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                          R
                        </Avatar>
                      }
                      title={val.name}
                      subheader={val.location}
                    />
                    <CardActions className={classes.actions} disableActionSpacing>
                      <IconButton>
                      </IconButton>
                      <Tooltip title="Details">
                        <IconButton onClick={this.handleDetailsChange = () => { this.setState({ showTab: 'details' }); this.setState({ trainerKey: key }); }} className={classes.green} >
                          <FindInPageIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reviews">
                        <IconButton onClick={this.handleReviewsChange = () => { this.setState({ showTab: 'reviews' }); this.setState({ trainerKey: key }); }} >
                          <FeedbackIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Schedule">
                        <IconButton onClick={this.handleScheduleChange = () => { this.setState({ showTab: 'schedule' }); this.setState({ trainerKey: key }); }} className={classes.purple}>
                          <AlarmIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Demo videos">
                        <IconButton color="secondary" onClick={this.handleDemovideosChange = () => { this.setState({ showTab: 'demovideos' }); this.setState({ trainerKey: key }); }} className={classes.purple}>
                          <VideoCallIcon />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                )
              })}
            </Grid>
            <Grid item xs={6} style={this.state.showTab === 'details' ? {} : { display: 'none' }}>
              <TrainerDetails trainersList={this.props.trainersList} trainerKey={this.state.trainerKey} />
            </Grid>
            <Grid item xs={6} style={this.state.showTab === 'reviews' ? {} : { display: 'none' }}>
              <TrainerReviews trainersList={this.props.trainersList} trainerKey={this.state.trainerKey} />
            </Grid>
            <Grid item xs={6} style={this.state.showTab === 'schedule' ? {} : { display: 'none' }}>
              <TrainerSchedule trainersList={this.props.trainersList} trainerKey={this.state.trainerKey} />
            </Grid>
            <Grid item xs={6} style={this.state.showTab === 'demovideos' ? {} : { display: 'none' }}>
              <TrainerDemovideos trainersList={this.props.trainersList} trainerKey={this.state.trainerKey} />
            </Grid>
          </Grid>
        ) : (
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer justify="center">
                  <GridItem>
                    <img src={NoList} width='250' alt="..." />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Heading
                      title="Sorry, no list found!"
                      textAlign="center"
                      category={
                        <span>
                          Looks like the information you're trying to visit doesn't exist.{" "}
                          <a>
                            Please try back later.
                          </a>
                        </span>
                      }
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          )}
      </div>
    );
  }
}

Trainers.propTypes = {
  classes: PropTypes.object.isRequired,
};
const trainersRes = state => ({
  trainersList: state.trainers.trainersList
});

export default connect(trainersRes, { getTrainersList })(withStyles(styles)(Trainers));
