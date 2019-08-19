import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import { withStyles } from '@material-ui/core/styles';
import Cancel from '@material-ui/icons/Cancel';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { getConnectRequests } from "../../actions/Connection";
import { getConnectionsList } from "../../actions/Connection";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import avatarImg from "assets/img/usericon.png";
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
    padding: "5px !important",
    borderRadius: "5px",
    textTransform: "none",
    marginRight: "10px !important",
    [theme.breakpoints.down('xs')]: {
      marginRight: "16px !important",
      padding: '0px !important',
      marginLeft: '5px !important'

    },
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
  connectionsList: {
    width: '500px !important'
  },
  accept: {
    color: '#58fc64',
    padding: '-3px',
    [theme.breakpoints.down('xs')]: {
    }
  },
  reject: {
    color: '#e83d2e',
    padding: '-3px',
  },
  [theme.breakpoints.down('xs')]: {
  }
});

class connectRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: reactLocalStorage.get('userId', ""),
      imageUrl: avatarImg,
      loader: false
    }
    if (!this.state.userId) {
      this.props.history.push('/');
    }
  }
  componentDidMount() {
    this.props.getConnectRequests(this.state.userId);
    this.props.getConnectionsList(this.state.userId);
  }
  acceptClick(id) {
    let th = this;
    let data = { requestId: th.props.connectRequests[id].userId, userId: th.state.userId };
    th.setState({ loader: true });
    fetch(BasePath + '/acceptrequest', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(function (serdata) {
        if (serdata.length === 1) {
          // th.props.myConnects(th.props.connectRequests[id]);
          th.props.connectadd(th.props.connectRequests[id]);
          th.props.connectRequests.splice(id, 1);
          th.props.notificationShow('Request accepted', 'success')
          th.setState({ loader: false });
        }
      }).catch((err) => {
        th.props.notificationShow(err.message, "danger");
      })
  }
  rejectClick(id) {
    let th = this;
    let data = { requestId: th.props.connectRequests[id].userId, userId: th.state.userId };
    th.setState({ loader: true });
    fetch(BasePath + '/rejectrequest', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(function (serdata) {
        th.props.connectRequests.splice(id, 1);
        th.setState({ loader: false });
      }).catch((err) => {
        th.setState({ loader: false });
        th.props.notificationShow(err.message, "danger");
      })
  }
  ButtonClick(id) {
    let th = this;
    let data = { requestId: th.props.connectionsList[id].userId, userId: th.state.userId };
    th.setState({ loader: true })
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
          th.setState({ loader: false });
          th.props.notificationShow("Request sent successfully", "success");
        }
      }).catch((err) => {
        th.setState({ loader: false });
        th.props.notificationShow(err.message, "danger");

      })
  }
  render() {
    const { classes } = this.props;
    return (

      <ul className="leftmenu-navbar connections-label-padding">
        {this.props.connectRequests && this.props.connectRequests.length > 0 && this.props.connectRequests ? (
          <div>
            <label className="label-title">Requests</label>
            {/* <i class="material-icons searchbar-leftmenuarrow">
        arrow_drop_down
       </i>*/}
          </div>
        ) : null}

        {this.props.connectRequests && this.props.connectRequests.length > 0 && this.props.connectRequests !== undefined ? (
          this.props.connectRequests.map((value, key) => {
            return (
              <li className="merritos-left-menulist" >
                <div className="merritos-cell">
                  <div>
                    {value.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + value.profileImage} className="merritos-left-menu-img" alt="..." />) : (
                      <img alt="Remy Sharp" src={this.state.imageUrl} className="merritos-left-menu-noimg" />
                    )}
                  </div>
                  <div className="profile-names-roles">
                    <ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} onClick={() => this.props._this.showProfileDetails(value)}/>


                  </div>
                  <i class="material-icons" title="Add request" onClick={() => this.acceptClick(key)} >
                    add_circle_outline
</i>
                  {/* <i class="material-icons requests-view-icon" title="view">
                    launch
</i> */}
                </div>
              </li>
            )
          }
          )) : null}
        <li></li>
      </ul>
      // <div >
      //   <CircularProgress visible={this.state.loader}></CircularProgress>
      //   <Grid>
      //     <Grid item xs={12}>
      //       {this.props.connectRequests.length > 0 && this.props.connectRequests !== undefined ? (
      //         this.props.connectRequests.map((value, key) => {
      //           return (
      //               <List key={key} className="connectRequestsList">
      //                 <ListItem className="connectionsListItem">
      //                 {value.path!== undefined ?( <img  src={BasePath + '/' + value.path} className={classes.imageCard} alt="" />):(
      //                       <Avatar alt="Remy Sharp" src={this.state.imageUrl} />
      //                 )}
      //                   <ListItemText primary={value.firstName + " " + value.lastName}  secondary={value.role} />
      //                   <ListItemSecondaryAction>
      //                     <CheckCircle className={classes.accept} onClick={()=>this.acceptClick(key)}/>
      //                     <Cancel className={classes.reject} onClick={()=>this.rejectClick(key)}/>
      //                   </ListItemSecondaryAction>
      //                 </ListItem>
      //                 <Divider />
      //               </List>
      //           )

      //         })
      //       ) : (
      //             <List>
      //             <ListItem>
      //             <ListItemText primary="Requests" secondary="You dont have any requests" />
      //             </ListItem>
      //             <Divider />
      //             </List>


      //         )}
      //     </Grid>
      //    <Grid item xs={12}>
      //     {/* <legend>People you may know</legend> */}

      //       {this.props.connectionsList.length > 0 && this.props.connectionsList !== undefined ? (
      //         this.props.connectionsList.map((value, key) => {
      //           return (
      //             <List key={key} className="connectSuggestionsList">
      //                 <ListItem>
      //                 {value.path!== undefined ?( <img  src={BasePath + '/' + value.path} className={classes.imageCard} alt="..." />):(
      //                       <Avatar alt="Remy Sharp" src={this.state.imageUrl} />
      //                 )}
      //                 <ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} />
      //                <ListItemSecondaryAction>
      //                 <button className="waves-effect waves-light btn" onClick={() => this.ButtonClick(key)}>Connect</button> 
      //                   </ListItemSecondaryAction>
      //                </ListItem>
      //                </List>

      //               )
      //         })
      //       ) : (
      //         <List>
      //         <ListItem>
      //         <ListItemText  primary="People you may know" secondary="No Suggestions" />
      //         </ListItem>
      //         </List>
      //           )}

      //     </Grid>
      //   </Grid>
      // </div>
    );
  }
}

connectRequests.propTypes = {
  classes: PropTypes.object.isRequired,
};
const connectionsRes = state => ({
  connectRequests: state.connections.connectRequests,
  connectionsList: state.connections.connectionsList
});

export default connect(connectionsRes, { getConnectRequests, getConnectionsList })(withStyles(styles)(connectRequests));
