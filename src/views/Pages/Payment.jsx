import React from "react";
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Edit from "@material-ui/icons/Edit"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

const styles = {
  button: {
    textTransform: 'none'
  },
  gridList: {
    borderBottom: '2px solid #ececec',
    marginTop: '10px'
  },
  labelNote: {
    color: '#727171',
    fontWeight: "600",
    fontSize: "16px",
    marginLeft: "20px",
  },
  textNote: {
    color: '#555555',
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: '1.55em',
    marginTop: '-1px !important'
  },
  editIcon: {
    marginTop: '20px',
    cursor: 'pointer',
    color: '#43a047',
    fontSize: '18px',
    '&:hover': {
      color: '#66bb6a',
    }
  },
  gridHead: {
    paddingBottom: '10px',
    borderBottom: '1px solid #b1b0b0',
    fontSize: '1.5rem',
    fontWeight: '400',
    alignItems: 'flex-end'
  },
  button1:{
    left:'60px'
  },
  button2:{
    left:'35px',
    textTransform: 'none'
  }
};
class PaymentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPayment: true,
      bankName: '',
      bankNameState: '',
      accountNumber: '',
      accountNumberState: '',
      ifscCode: '',
      ifscCodeState: '',
      showedit: false,
      showAdd: true,
      userId: reactLocalStorage.get('userId', ""),
      editkey: 0,
      paymentList: [],
      enterFlag: 0
    }
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  componentDidMount() {
    let th = this;
    setTimeout(
      function () {
        fetch(BasePath + '/paymentdetailsinfo/' + th.state.userId, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).then(resp => resp.json())
          .then(function (data) {
            if (data.length === 1) {
              let arraydata = [];
              arraydata.push(data.info);
              th.setState({ paymentList: arraydata })
              th.setState({ showPayment: true });
              th.setState({ showAdd: false });
            }
          }).catch((err) => {
            th.props.stepChange(err.message, "danger");
          })
      }, 700);
  }
  change(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value.length === 1) {
      this.onFocus();
    }
  }
  onFocus() {
    this.setState({ accountNumberState: "" });
    this.setState({ ifscCodeState: "" });
    this.setState({ bankNameState: "" });
  }
  verifyNumber = (number) => {
    var numbers = /^[0-9]+$/;
    if (number.match(numbers)) {
      return true;
    } else {
      return false;
    }
  }
  AddMore() {
    let th = this;
    th.setState({ enterFlag: 0 });
    th.setState({ showPayment: false });
    th.setState({ bankName: "" });
    th.setState({ accountNumber: "" });
    th.setState({ ifscCode: "" });
    th.setState({ bankNameState: "" });
    th.setState({ accountNumberState: "" });
    th.setState({ ifscCodeState: "" });
    th.setState({ showedit: false });
    th.setState({ showAdd: false });
  }
  handleClose() {
    this.setState({ enterFlag: 0 });
    this.setState({ showPayment: !this.state.showPayment });
    this.setState({ showAdd: true });
  }
  handleSave() {
    let th = this;
    th.setState({ enterFlag: 0 });
    if (this.state.bankName === "") {
      th.setState({ bankNameState: "error" });
    }
    else if (!this.verifyNumber(this.state.accountNumber)) {
      this.setState({ accountNumberState: "error" })
    }
    else if (this.state.ifscCode === "") {
      this.setState({ ifscCodeState: "error" })
    }
    else {
      let data = { bankName: th.state.bankName, accountNumber: th.state.accountNumber, ifscCode: th.state.ifscCode, userId: th.state.userId };
      fetch(BasePath + '/paymentdetailscreate', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then(resp => resp.json())
        .then(function (serdata) {
          if (serdata.length === 1) {
            let arraydata = th.state.paymentList;
            arraydata.push(data);
            th.setState({ paymentList: arraydata });
            th.setState({ showPayment: !th.state.showPayment });
            th.setState({ showAdd: false });
            th.props.stepChange("Payment details added successfully", "success");
          }
        }).catch((err) => {
          th.props.stepChange(err.message, "danger");
        })
    }
  }

  handleEdit(id) {
    let th = this;
    th.setState({ enterFlag: 1 });
    th.setState({ showPayment: false });
    th.setState({ editkey: id })
    th.setState({ bankName: th.state.paymentList[id].bankName });
    th.setState({ accountNumber: th.state.paymentList[id].accountNumber });
    th.setState({ ifscCode: th.state.paymentList[id].ifscCode });
    th.setState({ showedit: true });
  }
  handleUpdate() {
    let th = this;
    th.setState({ enterFlag: 1 });
    if (this.state.bankName === "") {
      th.setState({ bankNameState: "error" });
    }
    else if (!this.verifyNumber(this.state.accountNumber)) {
      this.setState({ accountNumberState: "error" })
    }
    else if (this.state.ifscCode === "") {
      this.setState({ ifscCodeState: "error" })
    }
    else {
      let data = { bankName: th.state.bankName, accountNumber: th.state.accountNumber, ifscCode: th.state.ifscCode, userId: th.state.userId };
      fetch(BasePath + '/paymentdetailsupdate', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then(resp => resp.json())
        .then(function (serdata) {
          if (serdata.length === 1) {
            let arraydata = [];
            arraydata = th.state.paymentList;
            arraydata[th.state.editkey] = data;
            th.setState({ paymentList: arraydata });
            th.setState({ showPayment: true });
            th.setState({ showedit: !th.state.showedit });
            th.props.stepChange("Payment details updated successfully", "success");
          }
        }).catch((err) => {
          th.props.stepChange(err.message, "danger");
        })
    }
  }
  keydownHandler = (e) => {
    var th = this;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (th.state.enterFlag === 0) {
        this.handleSave();
      }
      else {
        this.handleUpdate();
      }
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer className={classes.gridHead}>
              <GridItem xs={10} sm={10} md={10}>
                <legend>Payment details</legend>
              </GridItem>
              <GridItem xs={2} sm={2} md={2} style={this.state.showAdd ? {} : { display: 'none' }}>
                <Button variant="fab" color="primary" aria-label="Add" className={classes.button1} onClick={() => this.AddMore()}>
                  <AddIcon />
                </Button>
              </GridItem>
            </GridContainer>
            <form className={classes.form} style={!this.state.showPayment ? {} : { display: 'none' }} onKeyPress={(e) => this.keydownHandler(e)}>
              <FormControl fullWidth>
                <CustomInput
                  labelText="Bank name *"
                  success={this.state.bankNameState === "success"}
                  error={this.state.bankNameState === "error"}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses,
                  }}
                  inputProps={{
                    name: "bankName",
                    onChange: event => this.change(event),
                    value: this.state.bankName,
                    onFocus: () => this.onFocus()
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <CustomInput
                  success={this.state.accountNumberState === "success"}
                  error={this.state.accountNumberState === "error"}
                  labelText="Account number *"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses
                  }}
                  inputProps={{
                    name: "accountNumber",
                    onChange: event => this.change(event),
                    value: this.state.accountNumber,
                    onFocus: () => this.onFocus()
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <CustomInput
                  success={this.state.ifscCodeState === "success"}
                  error={this.state.ifscCodeState === "error"}
                  labelText="Ifsc Code *"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses
                  }}
                  inputProps={{
                    name: "ifscCode",
                    onChange: event => this.change(event),
                    value: this.state.ifscCode,
                    onFocus: () => this.onFocus()
                  }}
                />
              </FormControl>
              <GridContainer className={classes.topMargin}>
                <GridItem xs={8} sm={8} md={8} > </GridItem>
                <GridItem xs={8} sm={2} md={2} >
                  <Button variant="outlined" className={classes.button2} color="primary" onClick={() => this.handleClose()}  >Close</Button>
                </GridItem>
                <GridItem xs={4} sm={2} md={2}>
                  <Button variant="outlined" className={classes.button} color="primary" onClick={() => this.handleSave()} style={!this.state.showedit ? {} : { display: 'none' }}>Save</Button>
                  <Button variant="outlined" className={classes.button} color="primary" onClick={() => this.handleUpdate()} style={this.state.showedit ? {} : { display: 'none' }}>Update</Button>
                </GridItem>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
        {this.state.paymentList.length > 0 && this.state.paymentList !== undefined ? (
          this.state.paymentList.map((sval, skey) => {
            return (
              <GridContainer className={classes.gridList} key={skey} style={this.state.showPayment ? {} : { display: 'none' }}>
                <GridItem xs={12} sm={10}>
                  <GridContainer>
                    <GridItem xs={4} sm={4} md={4}><div className={classes.labelNote}>Bank name</div></GridItem>
                    <GridItem xs={1} sm={1} md={1}>:</GridItem>
                    <GridItem xs={7} sm={7} md={7}><h1 className={classes.textNote}>{sval.bankName}</h1></GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={4} sm={4} md={4}><div className={classes.labelNote}>Account number</div></GridItem>
                    <GridItem xs={1} sm={1} md={1}>:</GridItem>
                    <GridItem xs={7} sm={7} md={7}><h1 className={classes.textNote}>{sval.accountNumber}</h1></GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={4} sm={4} md={4}><div className={classes.labelNote}>IFSC code</div></GridItem>
                    <GridItem xs={1} sm={1} md={1}>:</GridItem>
                    <GridItem xs={7} sm={7} md={7}><h1 className={classes.textNote}>{sval.ifscCode}</h1></GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <Edit className={classes.editIcon} onClick={() => this.handleEdit(skey)} />
                </GridItem>
              </GridContainer>
            );
          })
        ) : (
            <ListItem style={this.state.showAdd ? {} : { display: 'none' }}>
              <ListItemText primary="No data found" />
            </ListItem>
          )}
      </div>
    );
  }
}
PaymentsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(PaymentsPage);
