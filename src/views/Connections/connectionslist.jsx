import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { getConnectionsList } from "../../actions/Connection";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import avatarImg from "assets/img/maleTeam.jpg";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit / 2,
    backgroundColor: "#1f91f3 !important",
    color: "#fff !important",
    borderRadius: "5px",
    textTransform: "none"
  },
  card: {
    marginBottom: '5px',
    '&:hover': {
      backgroundColor: '#fbfbfb'
    }
  },
  imageCard: {
    height: "48px",
    width: "48px",
    borderRadius: "50px"
  },
});

class ConnectionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: reactLocalStorage.get('userId', ""),
      imageUrl: avatarImg,
      loader:false
    }
    if (!this.state.userId) {
      this.props.history.push('/'); 
    }
  }
  componentDidMount() {
    this.props.getConnectionsList(this.state.userId);
  }
  ButtonClick(id) {
    let th = this;
    let data = {requestId: th.props.connectionsList[id].userId, userId: th.state.userId};
    th.setState({loader:true})
    fetch(BasePath + '/requestprofile', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(function (serdata) {
        if (serdata.length === 1) {
          th.props.connectionsList.splice(id, 1);
          th.setState({loader:false});
          th.props.notificationShow("Request sent successfully", "success");
        }
      }).catch((err) => {
        th.setState({loader:false});
        th.props.notificationShow(err.message, "danger");
       
      })
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <CircularProgress visible={this.state.loader}></CircularProgress>
        <Grid >
          <Grid item xs={12}>
            {this.props.connectionsList.length > 0 && this.props.connectionsList !== undefined ? (
              this.props.connectionsList.map((value, key) => {
                return (
                    <List key={key} className={classes.card}>
                      <ListItem >
                      {value.path!== undefined ?( <img  src={BasePath + '/' + value.path} className={classes.imageCard} alt="..." />):(
                            <Avatar alt="Remy Sharp" src={this.state.imageUrl} />
                      )}
                      <ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} />
                     <ListItemSecondaryAction>
                          <Button variant="contained" className={classes.button} onClick={() => this.ButtonClick(key)}>
                            Connect
                          </Button>
                        </ListItemSecondaryAction>
                     </ListItem>
                     <Divider />
                    </List>
                    )
              })
            ) : (
                  <CardHeader
                    title="Connections not found!"
                  />
                )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

ConnectionsList.propTypes = {
  classes: PropTypes.object.isRequired,
};
const connectionsRes = state => ({
  connectionsList: state.connections.connectionsList
});

export default connect(connectionsRes, { getConnectionsList })(withStyles(styles)(ConnectionsList));
