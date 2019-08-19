import React, { Component } from 'react';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Container, Row, Col } from 'reactstrap';
import PropTypes from "prop-types";
import { reactLocalStorage } from 'reactjs-localstorage';
import BasePath from '../../basepath';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import avatarImg from "assets/img/usericon.png";

class connections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: reactLocalStorage.get('userId', ""),
            singleProfile: [],
            imageUrl: avatarImg,
            hisActivity:[]
        };
    }
    dateLongStr(date) {
        const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        const month = mS[date.getMonth()];
        const dt = date.getDate();
        const year = date.getFullYear();
        return dt + " " + month + " " + year;
    }
    componentDidMount() {
        let th = this;
        let urlParams = window.location.hash.split('/')[2]
        let data = { loginId: this.state.userId, connectId: urlParams };
        fetch(BasePath + '/connectprofileactivity', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(function (serdata) {
                fetch(BasePath + '/activityDashboard/' + serdata.global[0].profile.userId, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(resp => resp.json())
                    .then(function (activitydata) {
                        th.setState({ hisActivity: activitydata.info });
                        if (serdata.length === 1) {
                            th.setState({ loader: false });
                            th.setState({ singleProfile: serdata.global });
                            th.setState({ showActivity: false, showSingle: true, showSearch: false });
                        }
                    }).catch((err) => {
                        th.setState({ loader: false });

                    })
            }).catch((err) => {
                th.setState({ loader: false });

            })
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className="mobile-card-view mobile-disable" id="activity-info">
                    <Container>
                        {this.state.singleProfile.length > 0 ? (
                            <Row>
                                <Col md="4">
                                    <Card className="mobile-card-view mobile-disable" id="basic-info">
                                        <CardBody className="noPadding">
                                            {this.state.singleProfile.length > 0 ? (
                                                <section class="box-typical">
                                                    <div class="profile-card">
                                                        <div class="profile-card-image">
                                                            {this.state.singleProfile[0].profile.profileImage !== undefined ? (<img src={BasePath + '/uploads/150/' + this.state.singleProfile[0].profile.profileImage} width="110px" />) : (
                                                                <img src={this.state.imageUrl} width="110px" alt="..." />
                                                            )}
                                                        </div>
                                                        <div class="profile-card-name">{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName}</div>
                                                        <div class="profile-card-status">{this.state.singleProfile[0].profile.role}</div>
                                                        <div class="profile-card-location">{this.state.singleProfile[0].profile.city}</div>
                                                        <button type="button" className="btn btn-rounded btn-backround-fill btn-activtiy-profile">Chat</button>
                                                        <button type="button" className="btn btn-rounded" onClick={(e) => this.ButtonClick(e, this.state.singleProfile[0].profile, 1)}>Connect</button>
                                                    </div>
                                                    <div class="profile-statistic tbl">
                                                        <div class="tbl-row connect-row">
                                                            <div class="tbl-cell connects-tbl">
                                                                <b>200</b><br />
                                                                Connections
								</div>
                                                            <div class="tbl-cell">
                                                                <b>3</b><br />
                                                                Classes
								</div>
                                                        </div>
                                                    </div>
                                                    <article class="merritos-education-info">
                                                        <label class="merritos-sub-label">
                                                            <i class="material-icons">school</i>
                                                            Education
						            </label>
                                                        <ul class="exp-timeline">
                                                            {this.state.singleProfile[0].profile.education.length > 0 ? (
                                                                this.state.singleProfile[0].profile.education.map((value, index) => {
                                                                    return (<li class="exp-timeline-item">
                                                                        <div class="dot"></div>
                                                                        <div class="tbl">
                                                                            <div class="tbl-row">
                                                                                <div class="tbl-cell">
                                                                                    <div class="exp-timeline-range">{new Date(value.fromDate).getFullYear()} - {new Date(value.toDate).getFullYear()}</div>
                                                                                    <div class="exp-timeline-status">{value.universityName}</div>
                                                                                    <div class="exp-timeline-location">{value.fieldOfStudy}</div>
                                                                                </div>
                                                                                <div class="tbl-cell tbl-cell-logo">
                                                                                    <img src="img/logo-2.png" alt="" />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>
                                                                    )
                                                                })
                                                            ) : (<span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName + "  didn't update any education details"}</span>)}
                                                        </ul>
                                                    </article>
                                                    <article class="merritos-education-info">
                                                        <label class="merritos-sub-label">
                                                            <i class="material-icons">
                                                                work
</i>
                                                            Experience
							</label>
                                                        <ul class="exp-timeline">
                                                            {this.state.singleProfile[0].profile.experience.length > 0 ? (
                                                                this.state.singleProfile[0].profile.experience.map((value, index) => {
                                                                    return (<li class="exp-timeline-item">
                                                                        <div class="dot"></div>
                                                                        <div class="tbl">
                                                                            <div class="tbl-row">
                                                                                <div class="tbl-cell">
                                                                                    <div class="exp-timeline-range">{new Date(value.fromDate).getFullYear()} - {new Date(value.toDate).getFullYear()}</div>
                                                                                    <div class="exp-timeline-status">{value.companyName}</div>
                                                                                    <div class="exp-timeline-location">{value.designation}</div>
                                                                                </div>
                                                                                <div class="tbl-cell tbl-cell-logo">
                                                                                    <img src="img/logo-2.png" alt="" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    )
                                                                })
                                                            ) : (<span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName + " didn't update any work experience"} </span>)}

                                                        </ul>
                                                    </article>
                                                </section>
                                            ) : ('')}
                                        </CardBody>
                                    </Card>
                                    <Card className="mobile-card-view mobile-disable" id="connections-info">
                                        {this.state.singleProfile.length > 0 ? (
                                            <CardBody>
                                                <label class="merritos-sub-label-dark">
                                                    Connections
                                                <i class="material-icons">arrow_drop_down</i>
                                                </label>
                                                <ul className="connection-list-details">
                                                    {this.state.singleProfile[0].connections.length > 0 ? this.state.singleProfile[0].connections.map((value, index) => {
                                                        return (
                                                            <li className="merritos-left-menulist" >
                                                                <div className="merritos-cell">
                                                                    <div>
                                                                        {value.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + value.profileImage} className={classes.imageCard} alt="..." />) : (
                                                                            <Avatar alt="Remy Sharp" src={this.state.imageUrl} />
                                                                        )}
                                                                    </div>
                                                                    <div className="profile-names-roles">
                                                                        <ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    }) : (
                                                            <li className="summary-body"> <span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName + " have 0 Connections"}</span></li>
                                                        )}
                                                </ul>
                                            </CardBody>
                                        ) : null}
                                    </Card>
                                    <Card className="mobile-card-view mobile-disable" id="classes-info">
                                        {this.state.singleProfile.length > 0 ? (
                                            <CardBody >

                                                <label class="merritos-sub-label-nm">

                                                    <i class="material-icons">
                                                        assignment
</i>
                                                    Classes
							</label>
                                                <ul className="connection-list-details">
                                                    {this.state.singleProfile[0].connections.length > 0 ? this.state.singleProfile[0].connections.map((value, index) => {
                                                        return (
                                                            <li className="merritos-left-menulist" >
                                                                <div className="merritos-cell">
                                                                    <div>
                                                                        {value.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + value.profileImage} className={classes.imageCard} alt="..." />) : (
                                                                            <Avatar alt="Remy Sharp" src={this.state.imageUrl} />
                                                                        )}
                                                                    </div>
                                                                    <div className="profile-names-roles">
                                                                        <ListItemText primary={value.firstName + " " + value.lastName} secondary={value.role} />


                                                                    </div>

                                                                </div>
                                                            </li>
                                                        )
                                                    }) : (
                                                            <li className="summary-body">
                                                                <span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName + "  didnt join any classes yet"}</span>
                                                            </li>
                                                        )}
                                                </ul>
                                            </CardBody>
                                        ) : null}
                                    </Card>
                                </Col>
                                <Col md="8">
                                    <Card className="nm">
                                        <CardBody className="noPadding summary-label">
                                            <label class="merritos-sub-label-nm">
                                                <i class="material-icons">grou</i>
                                                Summary
							</label>
                                            <div class="summary-body">
                                                <span>{this.state.singleProfile[0].profile.firstName + " " + this.state.singleProfile[0].profile.lastName + "  didn't add any summary"}</span>
                                            </div>
                                            {this.state.hisActivity.length > 0 ? this.state.hisActivity.map((value, index) => {
                                                return (
                                                    value.type == 'profile' ? (
                                                        <CardBody className="noPadding">
                                                            <div class="activity-date">
                                                                {this.dateLongStr(new Date(value.todatDate))}
                                                                <div className="activity-timeline-border"></div>
                                                            </div>
                                                            <div className="activity-container">
                                                                <div className="activity-header">
                                                                    <div className="ativity-header-img">
                                                                    {this.state.singleProfile[0].profile.profileImage !== undefined ? (<img src={BasePath + '/uploads/20/' + this.state.singleProfile[0].profile.profileImage} className="jobs-activity-img"/>) : (
                                                                <img src={this.state.imageUrl} className="jobs-activity-img" alt="..." />
                                                            )}
                                                                    </div>
                                                                    <div className="activity-header-details">
                                                                    <label>{value.Name}</label>
                                                                     <p>{value.role}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="activity-body">
                                                                    <div class="activity-time">{new Date(value.todatDate).toLocaleTimeString()}</div>
                                                                    <div class="activity-content">
                                                                        <div class="cont-in">
                                                                            <p>{value.typeOfActivity} to </p>
                                                                            <div className="activity-header-details">
                                                                                <label>{value.Data[0].profileName}</label>
                                                                                <p>{value.Data[0].role}</p>
                                                                            </div>
                                                                            <ul class="activity-likes">
                                                                                <li><a href="#">0 Comments</a></li>
                                                                                <li><a href="#" onClick={(e) => this.likeActivity(e, value.id)}>0 Likes send req</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardBody>
                                                    ) : value.type == 'createclass' ? (<CardBody className="noPadding">
                                                        <div class="activity-date">
                                                            {this.dateLongStr(new Date(value.todatDate))}
                                                            <div className="activity-timeline-border"></div>
                                                        </div>
                                                        <div className="activity-container">
                                                            <div className="activity-header">
                                                                <div className="ativity-header-img">
                                                                    <img src={this.state.imageUrl} width="32px" />
                                                                </div>
                                                                <div className="activity-header-details">
                                                                    <label>{value.Name}</label>
                                                                    <p>{value.role}</p>
                                                                </div>
                                                            </div>
                                                            <div className="activity-body">
                                                                <div class="activity-time">{new Date(value.todatDate).toLocaleTimeString()}</div>
                                                                <div class="activity-content">
                                                                    <div class="cont-in">
                                                                        <p>{value.typeOfActivity}</p>
                                                                        <p>Class Name: {value.CourseName}</p>

                                                                        <ul class="activity-likes">
                                                                            <li><a href="#">0 Comments</a></li>
                                                                            <li><a href="#">0 Likes</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardBody>
                                                    ) : value.type == 'buyclass' ? (
                                                        <b></b>
                                                    ) : value.type == 'job' ? (
                                                        <b></b>
                                                    ) : null
                                                )
                                            }) : ('')}
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        ) : ('')}
                    </Container>
                </div>
            </div>
        );
    }
}
connections.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connections;