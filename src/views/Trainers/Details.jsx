import React from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
const styles = () => {

};
class TrainerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: reactLocalStorage.get('userId', "")
        }
        if (!this.state.userId) {
            this.props.history.push('/');
        }
    }

render() {
  const { classes, trainersList, trainerKey } = this.props;
  return (
    <div className={classes.root}>
        {trainersList !== undefined && trainersList.length > 0 ? (
          <Card className={classes.card}>
            <CardHeader
                title={trainersList[trainerKey].name}
                subheader={trainersList[trainerKey].location}
            />
            <CardContent>
                <div dangerouslySetInnerHTML={{__html: trainersList[trainerKey].details}} />
            </CardContent>
          </Card>
        ): (
            <Card className={classes.card}>
                <CardContent>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
}

TrainerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TrainerDetails);
