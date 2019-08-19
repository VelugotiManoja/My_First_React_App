import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { reactLocalStorage } from 'reactjs-localstorage';
import Autosuggest from 'react-autosuggest';
import BasePath from '../../basepath';
import InputRange from 'react-input-range';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import deburr from 'lodash/deburr';
import PersonIcon from '@material-ui/icons/Person';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import CircularProgress from "components/CircularProgress/CircularProgress.jsx";

import Profile from "./Personaldetails";
import Education from "./Educationdetails";
import Workexperience from "./Workexperience";
import Certificates from "./Certificates";
import Achivements from "./Achivements";
import Expertise from "./Expertise";
import Recommendation from "./Recommendation";
import { fetchprofileData } from "../../actions/Profileactions";
import 'react-input-range/lib/css/index.css';
let suggestions;
const styles = theme => ({
    root: {
        marginTop: '30px'
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    }
});

function getSteps() {
    return ['Basic information', 'Education', 'Work experience', 'What you want to be next'];
}

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;
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
class BasicinfoStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            showCouch: false,
            basicInfo: "",
            goal: "",
            goalState: "",
            notification: '',
            br: false,
            suggestions: [],
            loader: false,
            back: false,
            userId: reactLocalStorage.get('userId', ""),
            value: 0,
            errorlog: false
        };
        if (this.state.userId === '' || this.state.userId === 'undefined') {
            this.props.history.push('/');
        } else if (reactLocalStorage.get('userProfile', "") === '1') {
            this.props.history.push("/Home");
        }
    }
    async componentDidMount() {
        this.props.fetchprofileData(this.state.userId);
        await fetch(BasePath + '/goalslist', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        }).then((resp) => resp.json()) // Transform the data into json
            .then(function (resp) {
                if (resp.result.length > 0) {
                    let arraydata = resp.result.map(suggestion => ({
                        label: suggestion.goal
                    }));
                    suggestions = arraydata;
                }
            });
    }
    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };
    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };
    handleStepChange = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    }
    handleNotification = (notification, color) => {
        this.setState({ notification: notification });
        this.setState({ color: color });
        this.showNotification('br');
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
    handleGoalChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue,
        });
    };
    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    }
    nextClick = () => {
        let th = this;
        if (th.state.goal === "") {
            th.setState({errorlog: true});
        }
        else {
            th.setState({ loader: true });
            let reqObj = { goal: th.state.goal, userId: th.state.userId, activetab: 8 };
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
    render() {
        if (!this.state.back && this.props.profileData && this.props.profileData.length > 0 && this.props.profileData[0].activetab) {
            this.state.activeStep = this.props.profileData[0].activetab;
        }
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
        };
        return (
            <div className={classes.root}>
                <CircularProgress visible={this.state.loader}></CircularProgress>
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
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={7} className="steps-form">
                        <div style={this.state.activeStep < 3 ? {} : { display: 'none' }}>
                            <InputRange
                                className={classes.inputrange}
                                maxValue={3}
                                minValue={0}
                                value={this.state.activeStep} />
                        </div>
                        {/* <Stepper className='stepperContent' activeStep={activeStep} alternativeLabel>
                                {steps.map((label, key) => {
                                    return (
                                        <Step className={key < this.state.activeStep ? 'completetab stepActive' : key === this.state.activeStep ? 'active stepActive' : 'stepActive'} key={label}>
                                            <StepLabel icon={<PersonIcon />}>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper> */}
                        {this.state.activeStep === 3 ? (
                            <div className='gridCenter'>
                                <GridContainer >
                                    <GridItem xs={12} sm={12} md={12}>
                                    <div className={this.state.errorlog ? 'merritos-autoSuggest errorlog' : "merritos-autoSuggest"}>
                                        <Autosuggest                                            
                                            {...autosuggestProps}
                                            inputProps={{
                                                classes,
                                                placeholder: 'What you want to be next?',
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
                                        </div>
                                    </GridItem>
                                </GridContainer><br />
                                <GridContainer >
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Button style={{ float: 'right' }} variant="contained" onClick={this.nextClick} color="primary" >
                                            Finish
                                                </Button>
                                        {/* <Button
                                            style={{ float: 'right' }}
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.backButton}
                                        >
                                            Back
                                                </Button> */}
                                    </GridItem>
                                </GridContainer>
                            </div>
                        ) : (
                                <Card className={classes.cardDiv}>
                                    <CardBody style={this.state.activeStep === 0 ? {} : { display: 'none' }}>
                                        <Profile handleNotification={this.handleNotification} handleBack={this.handleBack} handleStepChange={this.handleStepChange} />
                                    </CardBody>
                                    <CardBody style={this.state.activeStep === 1 ? {} : { display: 'none' }}>
                                        <Education handleNotification={this.handleNotification} handleBack={this.handleBack} handleStepChange={this.handleStepChange} />
                                    </CardBody>
                                    <CardBody style={this.state.activeStep === 2 ? {} : { display: 'none' }}>
                                        <Workexperience handleNotification={this.handleNotification} handleBack={this.handleBack} handleStepChange={this.handleStepChange} />
                                    </CardBody>
                                    <CardBody style={this.state.activeStep === 3 ? {} : { display: 'none' }}>
                                        <Certificates handleNotification={this.handleNotification} handleBack={this.handleBack} handleStepChange={this.handleStepChange} />
                                    </CardBody>
                                    <CardBody style={this.state.activeStep === 4 ? {} : { display: 'none' }}>
                                        <Achivements handleNotification={this.handleNotification} handleBack={this.handleBack} handleStepChange={this.handleStepChange} />
                                    </CardBody>
                                    <CardBody style={this.state.activeStep === 5 ? {} : { display: 'none' }}>
                                        <Expertise handleNotification={this.handleNotification} handleBack={this.handleBack} handleStepChange={this.handleStepChange} />
                                    </CardBody>
                                    <CardBody style={this.state.activeStep === 6 ? {} : { display: 'none' }}>
                                        <Recommendation handleNotification={this.handleNotification} handleBack={this.handleBack} handleStepChange={this.handleStepChange} />
                                    </CardBody>
                                </Card>
                            )}
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

BasicinfoStepper.propTypes = {
    classes: PropTypes.object,
};
const profileList = state => ({
    profileData: state.profile.profileData
});
export default connect(profileList, { fetchprofileData })(withStyles(styles)(BasicinfoStepper));