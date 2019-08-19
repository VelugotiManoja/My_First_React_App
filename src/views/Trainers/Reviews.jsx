import React from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from "@material-ui/core/FormControl";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import TextField from '@material-ui/core/TextField';
import Snackbar from "components/Snackbar/Snackbar.jsx";
const styles = () => ({
rating: {
    fontSize: '22px',
    color: '#3f51b5'
},
star: {
    cursor: 'pointer',
    float: 'left',
    color: '#3f51b5'
},
button: {
    textTransform: 'none',
    fontSize: '0.8rem'
}
});
class TrainerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: reactLocalStorage.get('userId', ""),
            rating: 0,
            review: '',
            notification:"",
            color:"info",
            br: false
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
            function() {
              x[place] = false;
              this.setState(x);
            }.bind(this),
            5000
          );
        }
    }
    handleSubmit = () => {
        let th = this;
        let Obj = {mentorId: this.props.trainersList[0].mentorId, userId: this.state.userId, rating: this.state.rating, review: this.state.review}
        fetch(BasePath + '/feedbackcreation', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body:JSON.stringify(Obj)
        })
        .then((resp) => resp.json())
        .then((feedbackRes) => {
            if(feedbackRes.length=== 1){
                th.setState({notification:feedbackRes.message});
                th.showNotification('br');
                th.setState({color:"info"});
                th.setState({rating:0});
                th.setState({review:""});
            } else{
                th.setState({notification:feedbackRes.message});
                th.showNotification('br');
            }
        })
        .catch((err) => {
            th.setState({notification:err.message});
            th.showNotification('br');
            th.setState({color:"danger"});
        })
    }
render() {
  const { classes, trainersList, trainerKey } = this.props;
  return (
    <div className={classes.root}>
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
        {trainersList !== undefined && trainersList.length > 0  ? (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <h4><b>Give rating and review</b></h4>
                    <form className={classes.form}>
                        {[1, 2, 3, 4, 5].map(ratingId => (
                            this.state.rating < ratingId ? (
                            <StarBorder key={ratingId} onClick={this.handleRating = () => { this.setState({rating: ratingId})}} className={classes.star}/>
                        ): (
                            <Star key={ratingId} onClick={this.handleRating = () => { this.setState({rating: ratingId})}} className={classes.star}/>
                            ) 
                        ))}
                        <FormControl fullWidth>
                            <TextField
                                id="standard-textarea"
                                label="Write a review"
                                value={this.state.review}
                                multiline
                                onChange={this.handleReview = (e) => {this.setState({review: e.target.value})}}
                                className={classes.textField}
                                margin="normal"
                            />
                            <Button variant="outlined" color="primary" onClick={this.handleSubmit} className={classes.button}>Submit</Button>
                        </FormControl>
                    </form>
                </CardContent>
            </Card>
            <br/>        
            <Card className={classes.card}>
                <CardContent>
                    <h4><b>Ratings and Reviews</b></h4>
                    <List>
                        <ListItem>
                            <strong className={classes.rating}>{trainersList[trainerKey].avgrating}</strong>
                            <Star className={classes.rating}/>
                            <ListItemText primary="" secondary={trainersList[trainerKey].reviewCnt +' Reviews &' + trainersList[trainerKey].ratingCnt +' Ratings'}  />
                        </ListItem>
                        <Divider component="li" />
                        {trainersList[trainerKey].feedback !== undefined && trainersList[trainerKey].feedback.length > 0 ? (
                        trainersList[trainerKey].feedback.map((row, key) => {
                            return (
                                <div>
                                    <ListItem>
                                        <ListItemText primary={row.userName} secondary={row.review} />                                        
                                    </ListItem>
                                    <Divider component="li" />
                                </div>
                            );
                        })
                        ): (
                        <ListItem>
                            <ListItemText primary="No reviews found!" />
                        </ListItem>
                        )}
                        
                    </List>
                </CardContent>
            </Card>
        </div>
        ): ''}
    </div>
  );
}
}

TrainerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TrainerDetails);
