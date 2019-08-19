import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import Autosuggest from 'react-autosuggest';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import deburr from 'lodash/deburr';
import timelineData from 'timeline.json'
// core components
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import bgImage from "assets/img/loginimg.png";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";
import $ from 'jquery';
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
var suggestions;

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}
function getSuggestions(value) {  
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }
        return keep;
      });
}
function getSuggestionValue(suggestion) {
  return suggestion.label;
}

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: "",
      goalState: "",
      userId: reactLocalStorage.get('userId', ""),
      notification: '',
      br: false,
      suggestions: [],
      loader: false
    };
    if (this.state.userId === '' || this.state.userId === 'undefined') {
      this.props.history.push('/');
    }
  }
  componentDidMount(){
    fetch(BasePath + '/goalslist', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    }).then((resp) => resp.json()) // Transform the data into json
      .then(function (resp) {
        if(resp.result.length>0)
        {
          let arraydata=resp.result.map(suggestion => ({
            label: suggestion.goal
          }));
          suggestions = arraydata;
          //th.setState({suggestions:arraydata});
        }
      });
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
        3000
      );
    }
  }
  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleGoalChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  change(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onFocus() {
    this.setState({ goalState: "" });
  }
  nextClick = () => {
    let th = this;
    if (th.state.goal === "") {
    $('.suggesterr').html('Field should not be empty').css({color:'red'});
        th.setState({errorlog: true});
    }
    else {
      $('.suggesterr').html('')
      let timelinelist=[];
      if(timelineData[th.state.goal]){
         timelinelist = timelineData[th.state.goal];
      }
        th.setState({ loader: true });
        let reqObj = { goal: th.state.goal, userId: th.state.userId,timeline:timelinelist };
        fetch(BasePath + '/goalupdate', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(reqObj)
        }).then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                if (data.length === 1) {
                    th.setState({ loader: false });
                    reactLocalStorage.set('userProfile', 1);
                    window.location.reload();
                } else {
                    th.setState({ loader: false });
                    th.setState({ notification: data.message });
                    th.showNotification('br');
                }
            }).catch((err) => {
                th.setState({ loader: false });
                th.setState({ notification: err.message });
                th.showNotification('br');
            });
    }
}
  keydownHandler = (e) =>{
    if (e.key === 'Enter') {
      e.preventDefault();
        this.nextClick();
      }
  }
  render() {
    const { classes} = this.props;  
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    }; 
    return (
      <div className="custom-modelbox">
      <div className="custom-modelbox-header">
        Set your goal
      </div>
       <CircularProgress visible={this.state.loader}></CircularProgress>
        <div className="custom-modelbox-content">
          <div>
            <Snackbar
              place="br"
              color="danger"
              message={
                this.state.notification
              }
              open={this.state.br}
              closeNotification={() => this.setState({ br: false })}
              close
            />
          </div>
          <div className='gridCenter'>
          <GridContainer >
                                   <GridItem xs={12} sm={12} md={12}>
                                   <div className={this.state.errorlog ? 'merritos-autoSuggest errorlog' : "merritos-autoSuggest"}>
                                       <label>Enter your goal : </label>
                                       <Autosuggest
                                           {...autosuggestProps}
                                           inputProps={{
                                               classes,
                                               placeholder: 'Ex: Web developer',
                                               value: this.state.goal,
                                               name: 'goal',
                                               onChange: this.handleGoalChange('goal')
                                           }}
                                           theme={{
                                               container: classes.container,
                                               suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                               suggestionsList: classes.suggestionsList,
                                               suggestion: classes.suggestion,
                                           }}
                                           renderSuggestionsContainer={options => (
                                               <Paper {...options.containerProps} square>
                                                   {options.children}
                                               </Paper>
                                           )}
                                       />
                                       <div className="suggesterr"></div>
                                       </div>
                                   </GridItem>
                               </GridContainer>
                               <GridContainer >
                                   <GridItem xs={12} sm={12} md={12} className="goal-footer">
                                       <button  onClick={this.nextClick} className="save-modelbox" > Save </button>
                                       <button onClick={this.props.closebox} className="close-modelbox"> Close </button>
                                   </GridItem>
                               </GridContainer>
                               </div>
        </div>
      </div>
    );
  }
}

Goal.propTypes = {
  classes: PropTypes.object.isRequired
};
const profileList = state => ({
  profileData: state.profile.profileData,
  userId: state.profile.userId
});
export default connect(profileList, {})(withStyles(loginPageStyle,{ withTheme: true })(Goal));
