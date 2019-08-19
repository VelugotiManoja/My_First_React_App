import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import BasePath from '../../basepath';
import Typography from '@material-ui/core/Typography';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {reactLocalStorage} from 'reactjs-localstorage';
// core components
import Badge from "components/Badge/Badge.jsx";
import $ from "jquery";
import timelineData from 'timeline.json'

import timelineStyle from "assets/jss/material-dashboard-pro-react/components/timelineStyle.jsx";

var i = 0;
function gotoclass(th) {
    th.gotoclass();
}
function setGoal(th, goalId) {

    // alert(goalId)
    th.setState({goal: goalId});

    th.setState({loader: true});
    let timelinelist=[];
        if(timelineData[goalId]){
           timelinelist = timelineData[goalId];
        }
    let reqObj = {
        goal: goalId,
        userId: th.state.userId,
        timeline:timelinelist
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
                th.setState({loader: false});
                reactLocalStorage.set('userProfile', 1);
                window
                    .location
                    .reload();
            } else {
                th.setState({loader: false});
                th.setState({notification: data.message});
                th.showNotification('br');
            }
        })
        .catch((err) => {
            th.setState({loader: false});
            th.setState({notification: err.message});
            th.showNotification('br');
        });

}
function moretip(e,key,th){
    
    if($(e.target).next('div').hasClass('moretip'))
    $(e.target).next('div').remove();
    else
    $(e.target).after('<div class="moretip"><ul><li class="delete-timeline">Delete</li><li>Completed</li></ul></div>');
    $('.delete-timeline').click(()=>{
       $('.moretip').remove();
        let reqObj = {
            pos: key,
            id: th.state.userId
        };
        fetch(BasePath + '/removetimeline', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(reqObj)
        }).then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
               
             let ary =   th.state.array;
             ary.splice(key,1);
             th.setState({array:ary})
            })
    })
}
function nextline(e) {

    let w = $('.Timeline').scrollLeft();
    $('.Timeline').animate({
        scrollLeft: Number(w) + 300
    });
    //$('.prevline').css({display: 'table'});

}

function prevline(e) {
    let w = $('.Timeline').scrollLeft();

    $('.Timeline').animate({
        scrollLeft: Number(w) - 300
    });

 

}

function Timeline({
    ...props
}) {
    $(document).mouseup(function(e) 
    {
        var container = $(".moretip");
    
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) 
        {
            container.hide();
        }
    });

    return (
        <div className={props.profile.goal?"Timeline":"Timeline-non"} >
<div className="overwidth">
            {/* <div className="prevline" onClick={(e) => prevline(e)}>
                <i class="material-icons">
                    chevron_left
                </i>
            </div> */}

            {props
                .stories
                .map((prop, key) => {
                    return(
                    !prop.state
                        ? (
                            <div className="timeline-mobile-content event1" id={"mobilecontent-" + key}>
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
                                        <i class="material-icons" onClick={(e)=>moretip(e,key,props._this)}>
more_vert
</i>
                                    </div>
                                   
                                    <div className="job-numbers">
                                    {prop.status==2?(
                                        'Successfully Completed'
                                    ):prop.status==1?(
                                       'Class Starts in 30mins' 
                                    ):(
<div className="jobsavl">
<span>{Math.floor(Math.random() * 30) + 3 }</span> Jobs available for this skill
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
                                                            : null}
                                                    onClick={() => gotoclass(props._this)}>
                                                    {prop.action}
                                                </div>
                                            )
                                            : null}

                                    </div>
                                </div>
                            </div>
                        )
                        : (<div className="timeline-mobile-content-empty event1" id={"mobilecontent-" + key}>
                        <div className="eventmobBubble">

                            <div className="set-title">
                                <span>
                                    {prop.goalName}
                                </span>
                            </div>

                            <div className="eventTitle">
                            <div className="job-numbers-non"><span>{Math.floor(Math.random() * 30) + 3 }</span> Jobs available for this skill</div>
                                <div className="set-label" onClick={() => setGoal(props._this, prop.goalName)}>Set this goal</div>
                            </div>
                        </div>
                        </div> )
                    )
                })}
            {/* {props.profile.goal
                ? (
                    <div className="nextline" onClick={(e) => nextline(e)}>
                        <i class="material-icons">
                            chevron_right
                        </i>
                    </div>
                )
                : null} */}
                </div>
                {props.profile.goal?(
                    <div className="classprogress-bar">30 % Reached</div>
                ):null}
{props.profile.goal?(<div className="pagenation">

<i class="material-icons clickpagenation" onClick={(e)=>prevline(e)}>
keyboard_arrow_left
</i>
<i class="material-icons clickpagenation" onClick={(e)=>nextline(e)}>
keyboard_arrow_right
</i>
</div>):null}
  
        
        </div>
     

    )
}

Timeline.propTypes = {

    stories: PropTypes
        .arrayOf(PropTypes.object)
        .isRequired
};

export default withStyles(timelineStyle)(Timeline);
