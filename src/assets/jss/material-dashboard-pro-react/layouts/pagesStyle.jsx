// ##############################
// // // Pages Layout styles
// #############################

// import {
//
// } from "assets/jss/material-dashboard-pro-react.jsx";
import {
  containerFluid
} from "assets/jss/material-dashboard-pro-react.jsx";
const pagesStyle = {
  wrapper: {
    height: "auto",
    minHeight: "100%",
    position: "relative",
    top: "0",
    overflow: "hidden"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },
  container: { ...containerFluid },
  fullPage: {
    "&:before": {
      backgroundColor: '#f9f9f9'
    },
    "&:before,&:after": {
      display: "block",
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      zIndex: "2"
    }
  },
  fullPageBackground: {
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center"
  },
  preloader: {
    opacity: '0.5',
    position: 'absolute',
    left:'271px',
    top: '183px',
    fontSize: '88px',
    zIndex: '1',
},
opecity: {
  opacity: '0.5',
}
};

export default pagesStyle;
