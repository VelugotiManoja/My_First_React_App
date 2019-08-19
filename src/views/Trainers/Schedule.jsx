import React from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import BasePath from '../../basepath';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Button from '@material-ui/core/Button';
import GridItem from "components/Grid/GridItem.jsx";


const styles = () => ({
tableHead: {
  backgroundColor: '#757575'
},
tableCell:{
  textAlign: 'center'
},
button:{
  left:'510px',
  top:'-11px'
},
course:{
  color:'#121bd1;',
  cursor:'pointer'
},
Card:{
  padding:'15px'
}
});
const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
class TrainerSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: reactLocalStorage.get('userId', ""),
            br: false,
            showCourse:true,
            color:"success",
            notification:"",
            syllabus:'',
            showBack:false
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
    handleClick =(key,trainerKey) =>{
      this.setState({syllabus: this.props.trainersList[trainerKey].scheduleCourse[key].syllabus});
      this.setState({showCourse:false});
      this.setState({showBack:true});
    }
    handleBack() {
      this.setState({showCourse:true});
      this.setState({showBack:false});
    }
    buyClass=(key,trainerKey)=>{
      let th = this;
      let data = {Mentorid:th.props.trainersList[trainerKey].mentorId,scheduleId:th.props.trainersList[trainerKey].scheduleCourse[key].scheduleId,userId: th.state.userId};
      fetch(BasePath + '/classbuy', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then(resp => resp.json())
        .then(function (serdata) {
          if (serdata.length === 1) {
            th.setState({ notification:"Bought successfully" });
            th.setState({ color: 'success' });
            th.showNotification('br');
          }
          else {
            th.setState({ notification:serdata.message });
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
  const { classes, trainersList,trainerKey } = this.props;
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
      <Card className={classes.card} style={this.state.showCourse ? {} : { display: 'none' }}>
          {trainersList !== undefined && trainersList.length > 0 ? (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell className={classes.tableHead}>Course</CustomTableCell>
                  <CustomTableCell className={classes.tableHead}>Start date</CustomTableCell>
                  <CustomTableCell className={classes.tableHead}>Duration</CustomTableCell>
                  <CustomTableCell className={classes.tableHead}>Maximum members</CustomTableCell>
                  <CustomTableCell className={classes.tableHead}>Buy</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {trainersList[trainerKey].scheduleCourse !== undefined && trainersList[trainerKey].scheduleCourse.length > 0 ? (
                trainersList[trainerKey].scheduleCourse.map((row, key) => {
                  return (
                    <TableRow className={classes.row} key={key}>
                      <CustomTableCell className={classes.course} onClick={() =>this.handleClick(key,trainerKey)}>{row.courseName}</CustomTableCell>
                      <CustomTableCell>{row.startDate}</CustomTableCell>
                      <CustomTableCell>{row.duration}</CustomTableCell>
                      <CustomTableCell>{row.maxPeople}</CustomTableCell>
                      <CustomTableCell>
                      <Tooltip title="Buy course">
                        <IconButton color="primary" onClick={() => this.buyClass(key,trainerKey)}>
                          <ShopIcon />
                        </IconButton>
                      </Tooltip>
                      </CustomTableCell>
                    </TableRow>
                  );
                })
                ): (
                  <TableRow >
                  <CustomTableCell colSpan={4} className={classes.tableCell}>No course listed!</CustomTableCell>                      
                  </TableRow>
              )}
              </TableBody>
            </Table>
          ): ''}
      </Card> 
      <Card  style={this.state.showBack ? {} : { display: 'none' }} className={classes.Card}>
         <h5 dangerouslySetInnerHTML={{ __html: this.state.syllabus }}/>
         <GridItem xs={8} sm={2} md={2} >
             <Button variant="outlined" color="primary" onClick={() => this.handleBack()} className={classes.button}>Back</Button>
         </GridItem>
      </Card>
    </div>
  );
}
}

TrainerSchedule.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TrainerSchedule);
