import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import robo from 'assets/img/broken-robot.png';
import Moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Star from '@material-ui/icons/Star';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import IconButton from '@material-ui/core/IconButton';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PersonAdd from '@material-ui/icons/PersonAdd';
//icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from "components/Snackbar/Snackbar.jsx";
import FloatingMenu from "./FloatingMenu.jsx";

import ConnectionsRequests from "./connectrequests";
import { getMyConnects } from "../../actions/Connection";
import avatarImg from "assets/img/usericon.png";

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
    tabroot: {
        backgroundColor: theme.palette.background.paper,
		 flexGrow: 0,
		
    },
	
	tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
	 flexGrow: 0,
  },
  tabsIndicator: {
    backgroundColor: '#fff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
	
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
    grid: {
        [theme.breakpoints.down('xs')]: {
            marginTop: "20px"
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

    textHeader: {
        color: 'rgb(228, 17, 17)'
    },
    cardHeight: {
        height: "350px"
    },
    tabButton: {
        textTransform: 'none',
        color: 'red'
    },
    imageCard: {
        height: "48px",
        width: "48px",
    },
    imageClass: {
        height: "75px",
        width: "75px",
        marginRight:"20px"
    },
    activelabel: {
        textTransform: 'none',
        fontWeight: '800',
        fontFamily: "'Titillium Web', Helvetica, Arial, sans-serif",
        '& span': {
            fontSize: '16px',
            color: '#0094DA'
        }
    },
    button: {
        backgroundColor: "#1f91f3 !important",
        color: "#fff !important",
        borderRadius: "5px",
        textTransform: "none",
        padding: '5px',
        margin: '10px'
    },
    tabContainer: {
        boxShadow: '3px 3px 10px #777',
        marginTop: '10px',
        backgroundColor: '#F9F9F9',
        minHeight: '380px',
        [theme.breakpoints.down('xs')]: {
            minHeight: '200px',
        }
    },
    indicator: {
        backgroundColor: '#0094DA',
        color: '#0094DA'
    },
    label: {
        textTransform: 'none',
        fontWeight: '800',
        fontFamily: "'Titillium Web', Helvetica, Arial, sans-serif",
        '& span': {
            fontSize: '16px',
            color: '#0094DA'
        },
        '& button:active': {
            '& span': {
                color: 'red !important'
            }
        }
    },
    gridList: {
        '& span': {
            fontSize: '18px',
            fontFamily: "'Titillium Web', Helvetica, Arial, sans-serif",
            fontWeight: 'bold',
            color: '#0094DA'
        },
        '& label': {
            fontSize: '16px',
        }
    },
    rating: {
        color: '#0094DA'
    },
    listBorder: {
        padding: 0,
        '& li:nth-child(1)': {
            padding: 0
        },
        '& img': {
            width: '100%'
        }
    },
    cardList: {
        marginBottom: '0px !important',
        '& img': {
            height: '140px',
            width: '197px'
        },
        '& span': {
            color: '#2196f3',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline'
            }
        },
        [theme.breakpoints.down('xs')]: {
            '& img': {
                height: '120px',
                width: '135px'
            }
        }
    },
    courseName: {
        fontWeight: '900 !important',
        fontSize: '21px !important'
    },
    courseGrid: {
        marginLeft: '0px !important',
        color:'#9c9898',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '2px !important'  
        }
    },
    courseList:{
            marginLeft: '18px !important'
    },
    courseDetails: {
        borderBottom: '1px solid #f1f1f1 !important'
    }
});
class Connections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            robo:robo,
            userId: reactLocalStorage.get('userId', ""),
            imageUrl: avatarImg,
            color: 'info',
            text: '',
            notification: '',
            br: false,
            value: 0,
            tabValue: 0,
            list: { path: 'uploads/hello.jpg' },
            singleProfile: [],
            searchList: [],
            showBack: false,
            showActivity:true,
            showSearch:false,
            showSingle:false,
            searchText: ""
        }

        if (!this.state.userId) {
            this.props.history.push('/');
        }
        this.notificationshowFunc = this.notificationshowFunc.bind(this);
        this.connectsAddFunc = this.connectsAddFunc.bind(this);
    }
    componentDidMount() {
        this.props.getMyConnects(this.state.userId);
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
    showProfileDetails(value) {
        let th = this;
        th.setState({ showBack: false });
        th.setState({ loader: true })
        let data = { loginId: th.state.userId, connectId: value.userId };
        fetch(BasePath + '/connectprofileactivity', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {
                if (serdata.length === 1) {
                    th.setState({ loader: false });
                    th.setState({ singleProfile: serdata.global });
                    th.setState({ showActivity: false, showSingle: true, showSearch: false });
                }
            }).catch((err) => {
                th.setState({ loader: false });

            })

    }
    notificationshowFunc(notification, color) {
        this.setState({ notification: notification });
        this.setState({ color: color });
        this.showNotification('br');
    }
    handleshowSearch = () => {
        this.setState({ searchList: [], singleProfile: [], showActivity: false, showSingle: false, showSearch: true })
    };

    searchProfileDetails(value) {
        let th = this;
        th.setState({ showBack: true });
        th.setState({ loader: true });
        let data = { loginId: th.state.userId, connectId: value.userId };
        fetch(BasePath + '/connectprofileactivity', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {
                if (serdata.length === 1) {
                    th.setState({ loader: false });
                    th.setState({ singleProfile: serdata.global });
                    th.setState({ showActivity: false, showSingle: true, showSearch: false });
                }
            }).catch((err) => {
                th.setState({ loader: false });

            })

    }
    ButtonClick(id) {
        let th = this;
        let data = { requestId: th.state.singleProfile[0].connections[id]._id, userId: th.state.userId };
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
                    th.state.singleProfile[0].connections.splice(id, 1);
                    th.setState({ loader: false });
                    th.notificationshowFunc("Request sent successfully", "success");
                }
            }).catch((err) => {
                th.setState({ loader: false });
                th.notificationshowFunc(err.message, "danger");

            })
    }
    connectsAddFunc(data) {
        this.props.myConnects.push(data);
        this.setState({ text: data.userId });
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
    keydownHandler = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    }
    handleSearch = () => {
        let th = this;
        th.setState({ loader: true });
        let data = { userId: th.state.userId, text: th.state.connectSearch };
        fetch(BasePath + '/connectionsearchdata', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()) // Transform the data into json
            .then(function (resp) {
                th.setState({ loader: false });
                if (resp.length === 1) {
                    th.setState({ searchList: resp.info })
                }
                else if (resp.length === 0) {
                    th.setState({ searchText: "No results found..." })
                }
            }).catch((err) => {
                this.setState({ loader: false });
                this.setState({ notification: err.message });
                this.setState({ color: 'danger' });
                this.showNotification('br');
            });
    }
    render() { 
        const { classes, theme } = this.props;
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
                <GridContainer className={'full-height ' + classes.grid}>
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
                                    <Tab className={classes.label} label="Connections" />
                                    <Tab className={classes.label} label="Requests" />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={this.state.value}
                                onChangeIndex={this.handleChangeIndex}
                                className="containertab"
                            >

                                <List className="connectionsul ">
                                    {this.props.myConnects.length > 0 && this.props.myConnects !== undefined ? (
                                        this.props.myConnects.map((value, key) => {
                                            return (
                                                <ListItem key={key} className="hideList connectionsList" onClick={() => this.showProfileDetails(value)}>
                                                    {value.path !== undefined ? (<img src={BasePath + '/' + value.path} className={classes.imageCard} alt="..." />) : (
                                                        <Avatar alt="Remy Sharp" src={this.state.imageUrl} />
                                                    )}
                                                    <ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} />
                                                    <ListItemSecondaryAction>
                                                    </ListItemSecondaryAction>
                                                    <span className="statusBar"></span>
                                                </ListItem>
                                            )
                                        })
                                    ) : (
                                            <CardHeader
                                                title="Connections not found!"
                                            />

                                        )}
										   <ListItem>
                        <span className="material-icons jss311 material-add" aria-hidden="true" onClick={() => this.handleshowSearch()}>add_circle</span>
                        <ListItemText primary="Connect" />
                        </ListItem>
                                </List>

                                <ConnectionsRequests connectadd={this.connectsAddFunc} notificationShow={this.notificationshowFunc} />
                            </SwipeableViews>
                        </div>
                        <div>
                        <Card>
                     
                        </Card>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={8} md={9} className={classes.grid}>
                        <Card className="full-height">
                            <CardBody className="full-height">
                                <GridContainer style={this.state.showActivity ? {} : { display: 'none' }}>
                                    {this.props.myClasses.length > 0 ? (
                                        this.props.myClasses.map((value, key) => (
                                            <GridContainer>
                                            <GridItem key={key} xs={12} sm={12} md={12}>
                                                <List >
                                                    <ListItem key={key} >
                                                        {value.path !== undefined ? (<img src={BasePath + '/' + value.path} className={classes.imageClass} alt="..." />) : (
                                                            <Avatar alt="Remy Sharp" src={this.state.imageUrl} />
                                                        )}
                                                        <GridContainer>
                                                            <GridItem md={9}><ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} /></GridItem>
                                                            <GridItem className={classes.courseGrid} md={3}>{Moment(value.joinDate).format('DD MMM YYYY')}</GridItem>
                                                            <br/>
                                                            <p className={classes.courseList}>has joined<span className={classes.courseName}> {value.courseName}</span></p>
                                                        </GridContainer>
                                                    </ListItem>
                                                </List>
                                                <Divider/>
                                            </GridItem>
                                             
                                          </GridContainer>

                                        ))) :
                                        (
                                            <GridItem xs={12} sm={12} md={12} className="full-height">
                                            <div className="full-height full-width">
                                              <div className="nolist-found">
                                     <img src={this.state.robo} width="100px"/>
                                     <br/>
                                     <div>Oops no activity found.</div>
                                     </div>
                                     </div>
                                           </GridItem>
                                        )}
                                </GridContainer>

                                {/* Search*/}
                                <GridContainer style={this.state.showSearch ? {} : { display: 'none' }}>
                                <GridItem xs={12} sm={12} md={12}>
                                            <IconButton
                                                onClick={() => {
                                                    this.setState({ searchList: [], singleProfile: [], showActivity: true, showSingle: false, showSearch: false })
                                                }}
                                            >
                                                <KeyboardBackspace />
                                            </IconButton>
                                        </GridItem>
                                    <GridItem xs={12} sm={12} md={12} onKeyPress={(e) => this.keydownHandler(e)}>
                                        <input type="text" className="main-input main-name" name="search" placeholder="Search by name" onChange={(event) => { this.setState({ connectSearch: event.target.value }) }} />
                                        <input id="main-submit" type="submit" value="Search" onClick={this.handleSearch} />
                                    </GridItem>
                                    {this.state.searchList.length > 0 ? (
                                        this.state.searchList.map((value, key) => (
                                            <GridItem key={key} xs={12} sm={12} md={3}>
                                                <Card className={classes.cardList}>
                                                    <List className={classes.listBorder}>
                                                        <ListItem>
                                                            {value.path !== undefined && value.path !== undefined ? (<img src={BasePath + '/' + value.path} alt="..." />) : (
                                                                <Avatar alt="Remy Sharp" src={avatarImg} />
                                                            )}
                                                        </ListItem>
                                                        <ListItem>
                                                            <ListItemText
                                                                onClick={() => this.searchProfileDetails(value)}
                                                                className={classes.gridList} primary={value.firstName + " " + value.lastName} secondary={value.role} />
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
                                                            {this.state.searchText !== "" && this.state.searchText !== undefined ? (
                                                                <div>
                                                                <img src={this.state.robo} width="100px"/>
                                                                <br/>
                                                                <p>Oops no list found</p>
                                                                </div>
                                                            ) :
                                                                (<h4>Search for connections...</h4>)
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </GridItem>
                                        )}
                                </GridContainer>
                                {/*Single*/}

                                {this.state.singleProfile.length > 0 ? (
                                    <GridContainer style={this.state.showSingle ? {} : { display: 'none' }}>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <IconButton
                                                onClick={() => {
                                                    this.setState({ searchList: [], singleProfile: [], showActivity: true, showSingle: false, showSearch: false })
                                                }}
                                            >
                                                <KeyboardBackspace />
                                            </IconButton>
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={3}>
                                            <List className={'profile-list-connections ' + classes.gridList}>
                                                <ListItem>
                                                    {this.state.singleProfile[0].profile.path !== undefined ? (<img src={BasePath + '/' + this.state.singleProfile[0].profile.path} className="profilePics" alt="..." />) : (
                                                        <img src={this.state.imageUrl} className="profilePics" alt="..." />
                                                    )}
                                                </ListItem>
                                                <ListItem className="label-value">
                                                    <span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName}</span>
                                                    <br />
                                                    <label>{this.state.singleProfile[0].profile.role}</label>
                                                    <br />

                                                    <Star className={classes.rating} />
                                                    <Star className={classes.rating} />
                                                    <Star className={classes.rating} />
                                                    <Star className={classes.rating} />
                                                </ListItem>
                                                {this.state.singleProfile[0].profile.email !== undefined && this.state.singleProfile[0].profile.email !== null ? (
                                                    <ListItem className="label-value">
                                                        <label>Email</label>
                                                        <br />
                                                        <div >{this.state.singleProfile[0].profile.email}</div>
                                                    </ListItem>
                                                ) : ("")}

                                                {this.state.singleProfile[0].profile.city !== undefined && this.state.singleProfile[0].profile.city !== "" ? (
                                                    <ListItem className="label-value">
                                                        <label>City</label>
                                                        <br />
                                                        <div >{this.state.singleProfile[0].profile.city}</div>
                                                    </ListItem>
                                                ) : ("")}

                                            </List>
                                        </GridItem>
                                        <GridItem xs={12} sm={8} md={9}>

                                            <div className={classes.tabroot}>
                                                <AppBar position="static" color="default" className="tabsHeader">
                                                    <Tabs
                                                        value={this.state.tabValue}
                                                        onChange={this.handleTabChange}
                                                        indicatorColor="primary"
                                                        textColor="primary"
                                                        fullWidth
                                                        classes={{
                                                         indicator: classes.tabsIndicator ,
															root: classes.tabRoot, 
															selected: classes.tabSelected,
															
                                                        }}  className="merritos-right-tab-container"
                                                    >
                                                        <Tab className={classes.label} className="merritos-tab-item" icon={<PersonPinIcon />} label="About"   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}/>
                                                        <Tab className={classes.label} className="merritos-tab-item" label="Connections"  classes={{ root: classes.tabRoot, selected: classes.tabSelected }} />
                                                    </Tabs>
                                                </AppBar>
                                                <SwipeableViews
                                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                                    index={this.state.tabValue}
                                                    onChangeIndex={this.handleChangeIndex}
                                                    className={classes.tabContainer}
                                                  className="right-tab-container">
                                                    <TabContainer dir={theme.direction} className={classes.tabContainer}>
                                                        {this.state.singleProfile !== undefined && this.state.singleProfile.length > 0 ? (
                                                            <List>
                                                                {this.state.singleProfile[0].profile.education !== undefined && this.state.singleProfile[0].profile.education.length > 0 ? (
                                                                    <ListItem className="label-value">
                                                                        <label>Education</label>
                                                                        <br />
                                                                        <div >{this.state.singleProfile[0].profile.education[0].degree}</div>
                                                                    </ListItem>
                                                                ) : ("")}

                                                                {this.state.singleProfile[0].profile.experience !== undefined && this.state.singleProfile[0].profile.experience.length > 0 ? (
                                                                    <ListItem className="label-value">
                                                                        <label>Work Experience</label>
                                                                        <br />
                                                                        <div >{this.state.singleProfile[0].profile.experience[0].designation + " at " + this.state.singleProfile[0].profile.experience[0].companyName}</div>
                                                                    </ListItem>
                                                                ) : ("")}
                                                                {this.state.singleProfile[0].profile.expertise !== undefined && this.state.singleProfile[0].profile.expertise.length > 0 ? (
                                                                    <ListItem className="label-value">
                                                                        <label>Skills</label>
                                                                        <br />
                                                                        <div ><p className={classes.textNote} dangerouslySetInnerHTML={{ __html: this.state.singleProfile[0].profile.expertise[0].expertise }} />
                                                                        </div>
                                                                    </ListItem>
                                                                ) : ("")}
                                                                <ListItem className="label-value">
                                                                    <label>PhoneNumber</label>
                                                                    <div>{this.state.singleProfile[0].profile.phoneNumber}</div>
                                                                </ListItem>
                                                            </List>
                                                        ) :
                                                            ("")}
                                                    </TabContainer>
                                                    <TabContainer dir={theme.direction}>
                                                        <List className="connectionsul" >
                                                            {this.state.singleProfile[0].connections !== undefined && this.state.singleProfile[0].connections.length > 0 ? (
                                                                this.state.singleProfile[0].connections.map((value, key) => {
                                                                    return (
                                                                        <ListItem key={key} className="connectionstabList">
                                                                            {value.path !== undefined && value.path !== undefined ? (<img src={BasePath + '/' + value.path} className={classes.imageCard} alt="..." />) : (
                                                                                <Avatar alt="Remy Sharp" src={this.state.imageUrl} />
                                                                            )}
                                                                            <ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} />
                                                                            <ListItemSecondaryAction>
                                                                                <button className="btn" icon={<PersonAdd />} onClick={() => this.ButtonClick(key)}>Connect</button>
                                                                            </ListItemSecondaryAction>
                                                                        </ListItem>
                                                                    )
                                                                })
                                                            ) : (
                                                                    <CardHeader
                                                                        title="Connections not found!"
                                                                    />
                                                                )}
                                                        </List>
                                                    </TabContainer>
                                                </SwipeableViews>
                                            </div>
                                        </GridItem>
                                    </GridContainer>
                                ) :
                                    (
                                        <GridItem xs={12} sm={12} md={12} className="full-height" style={this.state.showSingle ? {} : { display: 'none' }}>
                                        <div className="full-height full-width">
                                          <div className="nolist-found">
                                 <img src={this.state.robo} width="100px"/>
                                 <br/>
                                 <div>Oops no list found.</div>
                                 </div>
                                 </div>
                                       </GridItem>
                                    )}
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

Connections.propTypes = {
    classes: PropTypes.object.isRequired,
};
const connectionsRes = state => ({
    myConnects: state.connections.myConnects,
    myClasses: state.connections.connectClasses
});


export default connect(connectionsRes, { getMyConnects })(withStyles(styles, { withTheme: true })(Connections));