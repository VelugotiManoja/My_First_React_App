// ##############################
// // // LoginPage view styles
// #############################

import {
  container,
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";
import { emphasize } from '@material-ui/core/styles/colorManipulator';
const loginPageStyle = theme => ({
  container,
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
    fontWeight: "400",
    marginTop: "10px",
    '& p':{
      fontSize:"14px",
      margin:"0px 2px"
    }
  },

  textCenter: {
    textAlign: "center"
  },
  content: {
    paddingTop: "5vh",
    minHeight: "calc(100vh - 80px)",
    position: "relative",
    zIndex: "4",
    height:'100%',
    backgroundColor:'#f9f9f9'
  },
  justifyContentCenter: {
    justifyContent: "center !important",
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: "#FFFFFF"
    },
    marginLeft: "5px",
    marginRight: "5px"
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardHeader: {
    marginBottom: "20px"
  },
  cardBodyCustom:{
    justifyContent:"center",
    width:'100%',
    paddingTop:'0px',
    [theme.breakpoints.down('xs')]: {
      marginLeft:'0px'
  },
  '& p':{
    marginTop:"-10px"
  }
  },
  forgotcardBodyCustom:{
    justifyContent:"center",
    marginTop:'25px',
    width:'100%',
    paddingTop:'0px',
    [theme.breakpoints.down('xs')]: {
      marginLeft:'0px'
  }
  },
  socialLine: {
    padding: "0.9375rem 0"
  },
  bgImage:{
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "85%"
  },
  cardDiv: {
    height: '510px'
  },
  cardBodyDiv: {
    height: '250px',
    overflow: 'auto'
  },
  buttonBtn:{
    textTransform: 'none !important'
  },
  formCategory: {
    fontSize: '13px',
    color: '#afafaf',
    fontWeight: '500',
    margin: '0px 0px 7px 10px'
  },
  container: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      margin:'0px 10px'
  }
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
  },
  loginCard:{
   [theme.breakpoints.down('xs')]: {
    marginTop:'0px !important',
  }
  }
});

export default loginPageStyle;
