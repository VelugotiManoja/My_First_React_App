import React from "react";
import PropTypes from "prop-types";
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import timelineData from 'timeline.json'
import { Container, Row, Col } from 'reactstrap';

class SetgoalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      br: false,
      loginEmail: "",
      loginEmailState: "",
      rememberEmail: "",
      rememberPassword: "",
      loginPassword: "",
      loginPasswordState: "",
      notification: "",
      rememberme: false,
      loader: false,
      userId: reactLocalStorage.get('userId', ""),
      color: 'error',
      goals:timelineData
    };
   
  }
 

  componentDidMount() {
   
  }








  render() {
// this.state.goals.map((i,e)=>{
//     alert(i);
// })
    return (
      <div >
          <Container>
              <Row>
                  <Col md="12">
                  Header
                  </Col>
              </Row>
              <Row>

              </Row>
          </Container>
      </div>

    );
  }
}



export default (SetgoalPage);
