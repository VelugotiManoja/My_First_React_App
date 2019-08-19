import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import BasePath from '../../basepath';
import timelineData from 'timeline.json'
import $ from 'jquery';
import {reactLocalStorage} from 'reactjs-localstorage';
import { Container, Row, Col } from 'reactstrap';
export default class HorizontalTimelineContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            previous: 0,
            showConfigurator: false,
            minEventPadding: 20,
            maxEventPadding: 120,
            linePadding: 100,
            labelWidth: 100,
            fillingMotionStiffness: 150,
            fillingMotionDamping: 25,
            slidingMotionStiffness: 150,
            slidingMotionDamping: 25,
            stylesBackground: '#f8f8f8',
            stylesForeground: '#2196F3',
            stylesOutline: '#dfdfdf',
            isTouchEnabled: true,
            isKeyboardEnabled: true,
            isOpenEnding: true,
            isOpenBeginning: true
        };
    }

    static propTypes = {
        content: PropTypes
            .arrayOf(PropTypes.object)
            .isRequired
    }
    isOdd(num)
    {
        return num % 2;
    }
    componentWillMount() {
        this.dates = this
            .props
            .content
            .map((entry) => entry.date);
    }

    componentWillReceiveProps(nextProps) {
        this.dates = nextProps
            .content
            .map((entry) => entry.date);
    }
    setGoal(th, goalId) {

        th.setState({goal: goalId});
        let timelinelist = [];
        if (timelineData[goalId]) {
            timelinelist = timelineData[goalId];
        }
        console.log(timelinelist);
        th.setState({ loader: true });
        let reqObj = {
            goal: goalId,
            userId: th.state.userId,
            timeline: timelinelist
        };
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
                    window
                        .location
                        .reload();
                } else {
                    th.setState({ loader: false });
                    th.setState({ notification: data.message });
                    th.showNotification('br');
                }
            })
            .catch((err) => {
                th.setState({ loader: false });
                th.setState({ notification: err.message });
                th.showNotification('br');
            });

    }

    render() {
        var th = this;
        const state = this.state;
        let data = this.props.content;
        let newArray = new Array();
        // if(!th.props.goal) data = data.slice(2,4)
        data.map((prop, index) => {
            if (!this.isOdd(index)) {
                newArray[index] = [prop]
            } else {
                newArray[Number(index) - 1].push(prop);
            }
        });
        let filtered = newArray.filter(Boolean);
        const views = filtered.map((prop, index) => {

            return (
                <div className="rootclass">
                    {prop.map((prop, index) => {

                        return (!prop.state
                            ? (

                                <div className="timeline-mobile-content event1" id={"mobilecontent-" + index}>
                                    <div className="eventmobBubble">

                                        <div className="headerClass">
                                            {prop.icon
                                                ? (<img src={BasePath + '/src/assets/img/tech/' + prop.icon}/>)
                                                : (
                                                    <div className="techicon">
                                                        {prop
                                                            .title
                                                            .charAt(0)}
                                                    </div>
                                                )}
                                            {prop.title}
                                            <span>{prop.author}</span>
                                        </div>

                                        <div className="job-numbersmob">
                                            {prop.status == 2
                                                ? ('Successfully Completed')
                                                : prop.status == 1
                                                    ? ('Class Starts in 30mins')
                                                    : (
                                                        <div className="jobsavlmob">
                                                            <span>{Math.floor(Math.random() * 30) + 3}</span>
                                                            Jobs available for this skill
                                                        </div>
                                                    )}
                                        </div>
                                        <div className="eventTitle">
                                            {prop.action != ""
                                                ? (
                                                    <div
                                                        className={prop.close
                                                        ? ("closes setclasses")
                                                        : prop.status == 1
                                                            ? ("play-filled setclasses")
                                                            : prop.status == 2
                                                                ? ("check-circle setclasses")
                                                                : null}>
                                                        {prop.action}
                                                    </div>
                                                )
                                                : null}

                                        </div>
                                    </div>
                                </div>
                            )
                            : (prop.state == 'more'
                                ? (
                                    <div className="timeline-mobile-content-emptymob event1">
                                        <div className="eventmobBubble">

                                            <div className="find-more">
                                                <span>
                                                    Find More
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                )
                                : (
                                   
                            <div className="timeline-mobile-content-emptymob event1 event-nogoal" >
                            <div className="eventmobBubble mobBubbleNoGoal">

                                <div className="set-title settitle-nogoal">
                                    <span>
                                        {prop.goalName}
                                    </span>
                                </div>
                                
                                <div className="eventTitle eventTitlenoGoal">
                                <div className="job-numbers-non"><span>{Math.floor(Math.random() * 30) + 3 }</span> Jobs for this skill</div>
                                    <div className="set-label" onClick={() => this.setGoal(th.props._this, prop.goalName)}>Set goal</div>
                                </div>
                            </div>
                            </div>
                           
                                )));
                    })
}
                </div>
            )

        });

        return (
            <div className="mobile-content-height">
                {th.props.goal
                    ? (
                        <Typography color="textSecondary" className="roadmap_title">
                            Goal tracker
                        </Typography>
                    )
                    : null}

                {!th.props.goal
                    ? (
                        <div className="label-timelinehit-mob nextlabel">
                            What do you want to be next ?
                            <div className="mobileselectgoal">Select your goal</div>
                        </div>
                    )
                    : (
                        <div className="label-timelinehit-mob">
                            Merritos recommends below skills to reach your goal
                        </div>
                    )}

            {!th.props.goal?( 
                   <div className="text-center">
                    <Row>
                    {views}
                    </Row>
                    </div>
                    ):( <div className='text-center'>
                    <SwipeableViews
                        index={this.state.value}
                        onChangeIndex={(value, previous) => {}}
                        resistance>
                        {views}
                    </SwipeableViews>
                </div>)}            
            {th.props.goal?(  <div className="swipe-to-see">
                    Swipe to see more
                </div>):(
                <div className="swipe-to-see swipe-nogoal">
                
                </div>)} 
                {th.props.goal ? (
                    <div className="add-skills-to-goal" onClick={this.props._this.skillpopup}>
                        <label>
                            <i class="material-icons">
                                add_circle
                        </i>
                            Add Skills
                    </label>
                    </div>
                ) : (
                        <div className="add-skills-to-goal" onClick={this.props._this.handleGoal}>
                            <label>
                                Find more goals
                    </label>
                        </div>
                    )}
            </div>
        );
    }
}
