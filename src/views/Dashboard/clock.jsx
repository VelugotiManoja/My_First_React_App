import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  countdown: {
    background: '#ffffff !important',
    color: '#adb8c2 !important',
    width: '100%',
    textAlign: 'center',
    paddingTop: '50px',
    margin: 0,
    fontSize: '13px',
    fontWeight: '400',
  },
})

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentWillMount() {
    this.getTimeUntil(this.props.time);
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.getTimeUntil(this.props.time), 1000);
  };

  componentWillUnmount() {
    clearInterval(this.intervalID);
  };

  leading0(num) {
    return num < 10 ? '0' + num : num;
  };

  leadinga0(num, t) {
    return num <= 0 ? '' : ' ' + num + t;
  };

  getTimeUntil(deadline) {
    const time = Math.floor((new Date(deadline.toString()).getTime() - new Date().getTime()) / (1000))
    if (time < 0) {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    } else {
      const seconds = Math.floor((time) % 60);
      const minutes = Math.floor((time / 60) % 60);
      const hours = Math.floor((time / (60 * 60)) % 24);
      const days = Math.floor(time / (60 * 60 * 24));
      this.setState({ days: days, hours: hours, minutes: minutes, seconds: seconds });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <p className={classes.countdown}>
        {this.props.text}
        {this.leadinga0(this.state.days, 'd')}
        {' ' + this.leading0(this.state.hours) + 'h'}
        {' ' + this.leading0(this.state.minutes) + 'min'}
        {' ' + this.leading0(this.state.seconds) + 's'}
      </p>
    );
  }
}
export default withStyles(styles)(Clock);