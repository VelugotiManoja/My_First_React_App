import React from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import BasePath from '../../basepath';
import { Media, Player, controls } from 'react-media-player';
import Snackbar from "components/Snackbar/Snackbar.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

const { PlayPause, MuteUnmute } = controls

const styles = ({
    mediaPlayer: {
        height: '200px !important',
        margin: '20px 0px 10px 30px !important'
    },
    mediaControls: {
        margin: '0px 0px 10px 30px !important'
    },
    buttons: {
        marginRight: '5px'
    },
    noList:{
        margin:'10px 0px 10px 20px !important'
    }
})
class TrainerDemovideos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: reactLocalStorage.get('userId', ""),
            br: false,
            color: "success",
            notification: ""
        }
        if (!this.state.userId) {
            this.props.history.push('/');
        }
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
    buyClass = (key, trainerKey) => {
        let th = this;
        let data = { Mentorid: th.props.trainersList[trainerKey].mentorId, scheduleId: th.props.trainersList[trainerKey].scheduleCourse[key].scheduleId, userId: th.state.userId };
        fetch(BasePath + '/classbuy', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {
                if (serdata.length === 1) {
                    th.setState({ notification: "Bought successfully" });
                    th.setState({ color: 'success' });
                    th.showNotification('br');
                }
                else {
                    th.setState({ notification: serdata.message });
                    th.setState({ color: 'danger' });
                    th.showNotification('br');
                }
            }).catch((err) => {
                th.setState({ notification: err.message });
                th.setState({ color: 'danger' });
                th.showNotification('br');
            })
    }

    render() {
        const { classes, trainersList, trainerKey } = this.props;
        return (
            <div className={classes.root}>
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
                <Card className={classes.card}>
                    {trainersList !== undefined && trainersList.length > 0 ? (
                        trainersList[trainerKey].scheduleCourse !== undefined && trainersList[trainerKey].scheduleCourse.length > 0 ? (
                            trainersList[trainerKey].scheduleCourse.map((row, key) => {
                                return (
                                    <GridContainer key={key}>
                                        <GridItem>
                                            {row.demoVideo !== '' && row.demoVideo !== undefined ? (
                                                <div className={classes.textNote}>
                                                    <Media>
                                                        <span className="media">
                                                            <span >
                                                                <Player src={row.demoVideo} className={classes.mediaPlayer} />
                                                            </span>
                                                            <div className={classes.mediaControls}>
                                                                <PlayPause className={classes.buttons} />
                                                                <MuteUnmute />
                                                            </div>
                                                        </span>
                                                    </Media>
                                                </div>
                                            ) : ''}
                                        </GridItem>
                                    </GridContainer>
                                );
                            })
                        ) : (
                                (<GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h4 className={classes.noList}>No videos found for this mentor</h4>
                                    </GridItem>
                                </GridContainer>)
                            )
                    ) : ""}
                </Card>
            </div>
        );
    }
}

TrainerDemovideos.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TrainerDemovideos);
