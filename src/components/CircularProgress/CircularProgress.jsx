import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  progressBg: {
    'background-color': 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: '100%',
    top: '0',
    position: 'fixed',
    'z-index': '9999'
  },
  progressImg: {
    top: '45%',
    left: '50%',
    position: 'fixed',
    'z-index': '9999',
    [theme.breakpoints.down('xs')]: {
      top: '30%',
      left: '30%'
    }
  }
});

class CircularDeterminate extends React.Component {

  render() {
$('.layout-hide').hide();
    const { classes, visible } = this.props;
    return (
            ( visible ? (
            <div className={classes.progressBg}>
        <CircularProgress className={classNames(classes.progress, classes.progressImg)} size={100} />
      </div> ) : null )
    );
  }
};

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularDeterminate);