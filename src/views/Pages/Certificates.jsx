import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from '@material-ui/core/Button';


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


const styles = {
  button: {
    textTransform: 'none',
  },
  input: {
    display: 'none',
  }
};
class CertificatesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showExpertise: true,
      selectedFile: '',
      imageurl: '',
      sscimagepath: '',
      interimagepath: '',
      preguardpath: '',
      postguardpath: '',
      path: '',
      userId: reactLocalStorage.get('userId', "")
    }
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    var th = this;
    setTimeout(
      function () {
        if(th.props.profileData.length>0){
          if (th.props.profileData[0].ssc !== "") {
            th.setState({ sscimagepath: BasePath + '/' + th.props.profileData[0].ssc })
          }
          if (th.props.profileData[0].intermediate !== "") {
            th.setState({ interimagepath: BasePath + '/' + th.props.profileData[0].intermediate })
          }
          if (th.props.profileData[0].preGraduation !== "") {
            th.setState({ preguardpath: BasePath + '/' + th.props.profileData[0].preGraduation })
          }
          if (th.props.profileData[0].postGraduation !== "") {
            th.setState({ postguardpath: BasePath + '/' + th.props.profileData[0].postGraduation })
          }
       }
      }, 700);
  }

  AddMore() {
    this.setState({ showExpertise: false });
  }
  fileChangedHandler = (event) => {
    var th = this;
    let type = event.target.name;
    let selectedFile = event.target.files[0]
    let formData = new FormData();
    formData.append('file', selectedFile);
    fetch(BasePath + '/savedata', {
      method: 'post',
      body: formData
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        let path = BasePath + '/' + data.path;
        let serdata = { "type": type, "path": data.path, "_id": th.state.userId };
        fetch(BasePath + '/documentsupload', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(serdata)
        }).then(function (res) {
          th.setState({ loader: false });
          if (res.status === 200) {
            if (type === "ssc") {
              th.setState({sscimagepath:path});
            }
            else if (type === "intermediate") {
              th.setState({ interimagepath: path });
            }
            else if (type === "preGraduation") {
              th.setState({ preguardpath: path });
            }
            else if (type === "postGraduation") {
              th.setState({ postguardpath: path });
            }
          }
        });

      })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <legend>Certificates and Documents</legend>
            <GridItem>
              {/*<Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={() => this.AddMore()}>
          <AddIcon />
          </Button>*/}
            </GridItem>
            <form className={classes.form} style={!this.state.showExpertise ? {} : { display: 'none' }}>
              <FormControl fullWidth>
                <CustomInput
                  labelText="Title"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses,
                  }}
                />
              </FormControl>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                name="ssc"
                onChange={this.fileChangedHandler}
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" className={classes.button} style={{ marginBottom: '15px' }}>
                  Upload
                        </Button>
              </label>
              <GridItem xs={8} sm={8} md={8} > </GridItem>
              <GridItem xs={4} sm={4} md={4}>
                <Button variant="outlined" color="primary" className={classes.button}>Upload</Button>
              </GridItem>
            </form>
          </GridItem>
        </GridContainer>
        <GridContainer style={{ marginTop: '20px' }}>
          <GridItem xs={6} sm={6} md={6}><h5>10th Certificate *</h5></GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <input
              className={classes.input}
              id="contained-button-file"
              name="ssc"
              onChange={this.fileChangedHandler}
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" className={classes.button}>
                Upload
        </Button>
            </label>
          </GridItem>
          <GridItem xs={6} sm={6} md={6}></GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <img src={this.state.sscimagepath} style={{ width: '290px' }} alt="..."/>
          </GridItem>
        </GridContainer>
        <GridContainer style={{ marginTop: '20px' }}>
          <GridItem xs={6} sm={6} md={6}><h5>Inter Certificate *</h5></GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file1"
              name="intermediate"
              onChange={this.fileChangedHandler}
              type="file"
            />
            <label htmlFor="contained-button-file1">
              <Button variant="contained" component="span" className={classes.button}>
                Upload
        </Button>
            </label>
          </GridItem>
          <GridItem xs={6} sm={6} md={6}></GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <img src={this.state.interimagepath} style={{ width: '290px' }} alt="..."/>
          </GridItem>
        </GridContainer>
        <GridContainer style={{ marginTop: '20px' }}>
          <GridItem xs={6} sm={6} md={6}><h5>Pre graduation Certificate *</h5></GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file2"
              name="preGraduation"
              onChange={this.fileChangedHandler}
              type="file"
            />
            <label htmlFor="contained-button-file2">
              <Button variant="contained" component="span" className={classes.button}>
                Upload
        </Button>
            </label>
          </GridItem>
          <GridItem xs={6} sm={6} md={6}></GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <img src={this.state.preguardpath} style={{ width: '290px' }} alt="..."/>
          </GridItem>
        </GridContainer>
        <GridContainer style={{ marginTop: '20px' }}>
          <GridItem xs={6} sm={6} md={6}><h5>Post graduation Certificate *</h5></GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file3"
              name="postGraduation"
              onChange={this.fileChangedHandler}
              type="file"
            />
            <label htmlFor="contained-button-file3">
              <Button variant="contained" component="span" className={classes.button}>
                Upload
        </Button>
            </label>
          </GridItem>
          <GridItem xs={6} sm={6} md={6}></GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <img src={this.state.postguardpath} style={{ width: '290px' }}  alt="..."/>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
CertificatesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
const profileList = state => ({
  profileData: state.profile.profileData,
});
export default connect(profileList, {})(withStyles(styles)(CertificatesPage));
