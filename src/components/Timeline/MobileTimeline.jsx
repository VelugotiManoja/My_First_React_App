import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Badge from "components/Badge/Badge.jsx";
import $ from "jquery";
import SwipeableViews from 'react-swipeable-views';

import timelineStyle from "assets/jss/material-dashboard-pro-react/components/timelineStyle.jsx";
var i=0;

function nextline(props){
	let count = 6;

	
	i++;
	i++;
	const len = props.index.length;
	var end = i+Number(count);
	if(len<=i+Number(count)){
	end = len;
	}
	// $('.event1').animate({right:"250px"})
	// $('.event1').animate({left:"0px"})
	props._this.setState({custarry:props.index.slice(i,end)})
	
}
function removetimeline(e,props){
	alert('Are you sure, you want to delete this from timeline');
	const key = Number($(e.target).attr('alt'))-1;
	props.index.splice(key,1);
	props.index.splice(key,1);
	props.index.map((val,inx)=>{
		if(val.sq)
		props.index[inx].sq = inx;
	})
	i=0;
	let count = 6;
if($(window).width()<'600')
count =2;
if($(window).width()<'1020' && $(window).width()>'600')
count =4;
	props._this.setState({curIdx:Number(props.index.length)-1})
	props._this.setState({array:props.index})
	props._this.setState({custarry:props.index.slice(0,Number(count))})
}
function prveline(props){
	let count = 6;
if($(window).width()<'600')
count =2;
if($(window).width()<'1020' && $(window).width()>'600')
count =4;
	i--;
	i--;
const len = props.index.length;
var end = i+Number(count);
if(len<=i+Number(count))
	end = len;
	props._this.setState({custarry:props.index.slice(i,end)})
	
}

function Timeline({ ...props }) {
  

  return (
    <div class="Timeline">
			{props.stories[0].sq!=0?(
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={(e)=>prveline(props)}><path d="M14 7l-5 5 5 5V7z"/><path fill="none" d="M24 0v24H0V0h24z"/></svg>
	):
	(
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 7l-5 5 5 5V7z"/><path fill="none" d="M24 0v24H0V0h24z"/></svg>
				
			)}

{props.stories.map((prop,key)=>{
	
	prop.width = 200
	
return prop.state?(
<svg height="5" width={prop.width}>
	<line x1="0" y1="0" x2="300" y2="0" style={{stroke:'#2196f3',strokeWidth:5}} />
	Sorry, your browser does not support inline SVG.
</svg>
):( 

	

<div class={"titleList event2"}> 

<div class="event2Bubble">

{prop.close?(
	<i class="material-icons close" alt={prop.sq} onClick={(e)=>removetimeline(e,props)}>cancel</i>
):null}
{prop.status==1?(
<i class="material-icons play-filled" alt={prop.sq} >play_circle_filled</i>
):prop.status==2?(
	<i class="material-icons check-circle" alt={prop.sq} >check_circle</i>
):null}
	<div class="eventTime">
		<div class="DayDigit"></div>
		<div class="Day">
		{prop.title}
			<div class="MonthYear">by {prop.author}</div>
		</div>
	</div>
	<div class="eventTitle">{prop.action}</div>
</div>
<div class="eventAuthor"></div>

<svg height="20" width="20">
	 <circle cx="10" cy="11" r="5" fill="#2196f3" />
 </svg>
<div class="time"></div>

</div>


)
} 

)}

<svg height="5" width="50">
<line x1="0" y1="0" x2="50" y2="0" style={{stroke:'#2196f3',strokeWidth:5}} /> 
</svg>
{props._this.state.curIdx!=props.stories[Number(props.stories.length)-1].sq?
	(
	
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={(e)=>nextline(props)}>
<path d="M10 17l5-5-5-5v10z"/>
<path fill="none" d="M0 24V0h24v24H0z"/>
</svg>
				
			):(
			
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<path d="M10 17l5-5-5-5v10z"/>
<path fill="none" d="M0 24V0h24v24H0z"/>
</svg>
		
	)
	}
  
  </div>
)
}

Timeline.propTypes = {
  
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
 
};

export default withStyles(timelineStyle)(Timeline);
