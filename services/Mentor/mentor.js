const getConnection = require('./../../lib/connection.js');
const functions = require('./../functions.js');
const crypto = require('crypto');
const fs = require('fs');
const moment = require('moment');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');
const ObjectID = require('mongodb').ObjectID;
const _ = require('underscore');

exports.mentorDetailsCreate = (req, res) => {
    getConnection
        .then((db) => {
            let Userid = req.body.userId;
            let Mentordetails = req.body.mentorDetails;
            let require = ['mentorDetails'];
            let integer = [];
            functions.validation([req.body, require, integer])
                .then((result) => {
                    let mentorData = { userId: ObjectID(Userid), mentorDetails: Mentordetails, scheduleCourse: [], feedback: [], paymentDetails: {}, todayDate: new Date() };
                    functions.AcetrixDB([{
                        action: "insert",
                        collection: "mentors",
                        fields: mentorData,
                        where: { userId: ObjectID(Userid) }
                    }, db])
                        .then((info) => {
                            res.json({ message: 'mentor details has been inserted successfully!', length: 1 })
                        })
                        .catch((err) => {
                            if (err.message === 'Alreay exists') {
                                functions.AcetrixDB([{
                                    action: "update",
                                    collection: "mentors",
                                    fields: { mentorDetails: Mentordetails },
                                    where: { userId: ObjectID(Userid) },
                                    check: "false"
                                }, db])
                                    .then((info) => {
                                        res.json({ message: 'mentor details has been inserted successfully!', length: 1 })
                                    })
                                    .catch((err) => {
                                        res.json({ message: err.message, length: 0 })
                                    })
                            } else {
                                res.json({ message: err.message, length: 0 })
                            }
                        })
                })
                .catch((err) => {
                    res.json({ message: err, length: 0 });
                })
        })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
}

exports.mentorInfo = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.params.id;
        functions.AcetrixDB([{
            action: "find",
            collection: "mentors",
            where: { userId: ObjectID(Userid) },
            selectfields: {}
        }, db])
            .then((info) => {
                res.json({ info: info.info[0].mentorDetails, length: 1 });
            })
            .catch((err) => {
                res.json({ message: err.toString(), length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
}

exports.mentorDetailsUpdate = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.body.userId;
        let Mentordetails = req.body.mentorDetails;
        let require = ['userId', 'mentorDetails'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then((result) => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "mentors",
                    fields: { mentorDetails: Mentordetails, updateDate: new Date() },
                    where: { userId: ObjectID(Userid) },
                    check: "false"
                }, db])
                    .then((info) => {
                        res.json({ message: 'mentor details has been updated successfully!', length: 1 });
                    })
                    .catch((err) => {
                        res.json({ message: err.toString(), length: 0 });
                    })
            })
            .catch((err) => {
                res.json({ message: err, length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
}

exports.scheduleCourseCreate = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.body.userId;
        let Coursename = req.body.courseName;
        let Startdate = req.body.startDate;
        let Starttime = req.body.startTime;
        let Endtime = req.body.endTime;
        let Duration = req.body.duration;
        let Maxpeople = req.body.maxPeople;
        let Prerequisties = req.body.preRequisties;
        let Syllabus = req.body.syllabus;
        let Demovideos = req.body.demoVideo;
        let Scheduleid = randomNumber(20);
        let require = ['userId', 'courseName', 'startDate', 'preRequisties', 'syllabus'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then((result) => {
                              let Schedulecourse = {
                    scheduleId: Scheduleid, courseName: Coursename, startDate: new Date(Startdate), startTime: Starttime, endTime: Endtime,
                    duration: Duration, maxPeople: Maxpeople, preRequisties: Prerequisties,
                    syllabus: Syllabus, demoVideo: Demovideos, buyers: [], todayDate: new Date()
                };
                let mentorData = { userId: ObjectID(Userid), mentorDetails: "", scheduleCourse: [Schedulecourse], feedback: [], paymentDetails: {}, todayDate: new Date() };
                functions.AcetrixDB([{
                    action: "insert",
                    collection: "mentors",
                    fields: mentorData,
                    where: { userId: ObjectID(Userid) }
                }, db])
                    .then((info) => {
                        db.collection('activity').insert({ activityId:Scheduleid,userId:ObjectID(Userid),typeofactivity :'created',todayDate:new Date(),type:'createclass' }).then((resp)=>{
                        res.json({ message: 'course schedule has been inserted successfully!', info: Schedulecourse, length: 1 });
                        })
                    })
                    .catch((err) => {
                        if (err.message === 'Alreay exists') {
                            db.collection('mentors').update({ userId: ObjectID(Userid) },
                                { $push: { scheduleCourse: Schedulecourse } })
                                .then((info) => {
                                    db.collection('activity').insert({ activityId:Scheduleid,userId:ObjectID(Userid),typeofactivity :'created',todayDate:new Date(),type:'createclass' }).then((resp)=>{
                                    let currenttime = moment().format("HH:mm");
                                    let sDate
                                    if (moment() > new Date(Schedulecourse.startDate)) {
                                        if (String(Schedulecourse.endTime) > currenttime) {
                                            sDate = moment.utc().format('LL');
                                        } else {
                                            sDate = moment.utc(moment(new Date()).add(1, 'days')).format('LL');
                                        }
                                    } else {
                                        sDate = moment.utc(moment(new Date(Schedulecourse.startDate))).format('LL');
                                    }
                                    Schedulecourse.startTime = sDate + ' ' + Schedulecourse.startTime;
                                    Schedulecourse.endTime = sDate + ' ' + Schedulecourse.endTime;
                                    Schedulecourse.startDate = moment(Schedulecourse.startDate).format('DD-MM-YYYY');
                                    functions.AcetrixDB([{
                                        action: "find",
                                        collection: "profile",
                                        where: { userId: ObjectID(Userid) },
                                        selectfields: {}
                                    }, db])
                                        .then(mentorinfo => {
                                            let experience = '';
                                            let education = '';
                                            if (mentorinfo.info[0].education.length > 0) {
                                                let maxedudate = moment.max(mentorinfo.info[0].education.map(d => moment(d.toDate)));
                                                mentorinfo.info[0].education.map(item => {
                                                    if (moment(item.toDate) >= maxedudate) {
                                                        education = item;
                                                    }
                                                });
                                            }
                                            if (mentorinfo.info[0].experience.length > 0) {
                                                let maxexpdate = moment.max(mentorinfo.info[0].experience.map(d => moment(d.toDate)));
                                                mentorinfo.info[0].experience.map(item => {
                                                    if (moment(item.toDate) >= maxexpdate) {
                                                        experience = item;
                                                    }
                                                })
                                            }
                                            Schedulecourse.mentorName = mentorinfo.info[0].firstName + ' ' + mentorinfo.info[0].lastName;
                                            Schedulecourse.mentorEmail = mentorinfo.info[0].email;
                                            Schedulecourse.mentorPhoneNumber = mentorinfo.info[0].phoneNumber;
                                            Schedulecourse.mentorCity = mentorinfo.info[0].city;
                                            Schedulecourse.mentorImage = mentorinfo.info[0].profileImage;
                                            Schedulecourse.mentorRole = mentorinfo.info[0].role;
                                            Schedulecourse.mentorExpertise = mentorinfo.info[0].expertise;
                                            Schedulecourse.mentorEducation = education;
                                            Schedulecourse.mentorWorkExp = experience;
                                            return Schedulecourse
                                        })
                                        .then(Schedulecourse => {
                                            res.json({ message: 'course schedule has been inserted successfully!', info: Schedulecourse, length: 1 });
                                        })
                                        .catch((err) => {
                                            res.json({ message: err.message, length: 0 })
                                        })
                                    })
                                })
                                .catch((err) => {
                                    res.json({ message: err.message, length: 0 })
                                })
                        } else {
                            res.json({ message: err.message, length: 0 })
                        }
                    })
                })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.message, length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
};

exports.scheduleCourseInfo = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.params.id;
        functions.AcetrixDB([{
            action: 'join',
            primaryCollection: 'mentors',
            joincollections: ['profile'],
            newKey: ['mentorData'],
            keys: [{ leftKeys: 'userId', rightKeys: 'userId' }],
            where: { userId: ObjectID(Userid) },
        }, db])
              .then((info) => {
                  if(info.info.length>0){
                info.info[0].scheduleCourse.map(item => {
                    let currenttime = moment().format("HH:mm");
                    let sDate
                    if (moment() > item.startDate) {
                        if (String(item.endTime) > currenttime) {
                            sDate = moment.utc().format('LL');
                        } else {
                            sDate = moment.utc(moment(new Date()).add(1, 'days')).format('LL');
                        }
                    } else {
                        sDate = moment.utc(moment(new Date(item.startDate))).format('LL');
                    }
                    item.startTime = sDate + ' ' + item.startTime;
                    item.endTime = sDate + ' ' + item.endTime;
                })
                if (info.info.length > 0) {
                    res.json({ info: info.info[0], length: 1 });
                }
                else {
                    res.json({ info: info.info, length: 1 });
                }
            }
            else {
                res.json({ info: {info:[]},length: 1 });
            }
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
};

exports.scheduleCourseUpdate = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.body.userId;
        let Scheduleid = req.body.scheduleId;
        let Coursename = req.body.courseName;
        let Startdate = req.body.startDate;
        let Starttime = req.body.startTime;
        let Endtime = req.body.endTime;
        let Duration = req.body.duration;
        let Maxpeople = req.body.maxPeople;
        let Prerequisties = req.body.preRequisties;
        let Syllabus = req.body.syllabus;
        let Demovideo = req.body.demoVideo;
        let require = ['userId', 'scheduleId', 'courseName', 'startDate', 'preRequisties', 'syllabus'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then((result) => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "mentors",
                    fields: { 'scheduleCourse.$.courseName': Coursename, 'scheduleCourse.$.startDate': new Date(Startdate), 'scheduleCourse.$.startTime': Starttime, 'scheduleCourse.$.endTime': Endtime, 'scheduleCourse.$.duration': Duration, 'scheduleCourse.$.maxPeople': Maxpeople, 'scheduleCourse.$.preRequisties': Prerequisties, 'scheduleCourse.$.syllabus': Syllabus, 'scheduleCourse.$.demoVideo': Demovideo, 'scheduleCourse.$.updateDate': new Date() },
                    where: { userId: ObjectID(Userid), 'scheduleCourse.scheduleId': Scheduleid },
                    check: "false"
                }, db])
                    .then((info) => {
                        res.json({ message: 'course has been updated successfully!', length: 1 });
                    })
                    .catch((err) => {
                        res.json({ message: err.toString(), length: 0 });
                    })
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
};

exports.scheduleCourseDelete = (req, res) => {
    let Userid = req.body.userId;
    let Scheduleid = req.body.scheduleId;
    getConnection.then((db) => {
        return db.collection('mentors')
    })
        .then((mentors) => {
            return mentors.update({ userId: ObjectID(Userid) },
                { $pull: { scheduleCourse: { scheduleId: Scheduleid } } })
                .then((info) => {
                    res.json({ message: "course is deleted succesfully", length: 1 });
                })
                .catch((err) => {
                    res.json({ message: err.toString(), length: 0 });
                })
        })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
};

exports.paymentDetailsCreate = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.body.userId;
        let Bankname = req.body.bankName;
        let Accountnumber = req.body.accountNumber;
        let Ifsccode = req.body.ifscCode;
        let require = ['userId', 'bankName', 'accountNumber', 'ifscCode'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then((result) => {
                let Paymentdetails = { bankName: Bankname, accountNumber: Accountnumber, ifscCode: Ifsccode, todayDate: new Date() };
                let mentorData = { userId: ObjectID(Userid), mentorDetails: "", scheduleCourse: [], feedback: [], paymentDetails: Paymentdetails, todayDate: new Date() };
                functions.AcetrixDB([{
                    action: "insert",
                    collection: "mentors",
                    fields: mentorData,
                    where: { userId: ObjectID(Userid) }
                }, db])
                    .then((info) => {
                        res.json({ message: 'Payment details has been inserted successfully!', length: 1 });
                    })
                    .catch((err) => {
                        if (err.message === 'Alreay exists') {
                            functions.AcetrixDB([{
                                action: "update",
                                collection: "mentors",
                                fields: { paymentDetails: Paymentdetails },
                                where: { userId: ObjectID(Userid) },
                                check: "false"
                            }, db])
                                .then((info) => {
                                    res.json({ message: 'Payment details has been inserted successfully!', length: 1 });
                                })
                                .catch((err) => {
                                    res.json({ message: err.message, length: 0 })
                                })
                        } else {
                            res.json({ message: err.message, length: 0 })
                        }
                    })
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.message, length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
};

exports.paymentDetailsInfo = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.params.id;
        functions.AcetrixDB([{
            action: "find",
            collection: "mentors",
            where: { userId: ObjectID(Userid) },
            selectfields: {}
        }, db])
            .then((info) => {
                if (info.length === 0) {
                    res.json({ message: "there are no details to show", length: 0 });
                } else {
                    if (info.info[0].paymentDetails.bankName) {
                        res.json({ info: info.info[0].paymentDetails, length: 1 });
                    } else {
                        res.json({ message: "there are no details to show", length: 0 });
                    }
                }
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
}

exports.paymentDetailsUpdate = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.body.userId;
        let Bankname = req.body.bankName;
        let Accountnumber = req.body.accountNumber;
        let Ifsccode = req.body.ifscCode;
        let require = ['userId', 'bankName', 'accountNumber', 'ifscCode'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then((result) => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "mentors",
                    fields: { 'paymentDetails.bankName': Bankname, 'paymentDetails.accountNumber': Accountnumber, 'paymentDetails.ifscCode': Ifsccode, 'paymentDetails.updateDate': new Date() },
                    where: { userId: ObjectID(Userid) },
                    check: "false"
                }, db])
                    .then((info) => {
                        res.json({ message: 'payment details updated successfully!', length: 1 });
                    })
                    .catch((err) => {
                        res.json({ message: err.toString(), length: 0 });
                    })
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
};
exports.searchTrainers = (req, res) => {
    getConnection.then((db) => {
        let searchkey = req.params.searchkey, cond;
        if (searchkey === 'All')
            cond = {};
        else
            cond = { 'scheduleCourse.courseName': { $regex: new RegExp('^' + searchkey, 'i') } };
        functions.AcetrixDB([{
            action: 'join',
            primaryCollection: 'mentors',
            joincollections: ['profile'],
            newKey: ['mentorData'],
            keys: [{ leftKeys: 'userId', rightKeys: 'userId' }],
            where: cond
        }, db])
            .then((info) => {
                if (info.info.length > 0) {
                    let cnt = 0;
                    let length = info.info.length;
                    let data = []
                    trainerData(data, info.info, cnt, length, res, db);
                } else {
                    if (searchkey === 'All')
                        cond = {};
                    else
                        cond = { isCoach: 'yes', $or: [{ firstName: { $regex: new RegExp('^' + searchkey, 'i') } }, { lastName: { $regex: new RegExp('^' + searchkey, 'i') } }] };
                    functions.AcetrixDB([{
                        action: 'join',
                        primaryCollection: 'profile',
                        joincollections: ['mentors'],
                        newKey: ['mentorData'],
                        keys: [{ leftKeys: 'userId', rightKeys: 'userId' }],
                        where: cond
                    }, db])
                        .then((Profinfo) => {
                            if (Profinfo.info.length > 0) {
                                let profArr = [];
                                _.map(Profinfo.info, (val, key) => {
                                    if (val.mentorData) {
                                        let profObj = val.mentorData;
                                        delete val.mentorData;
                                        profObj.mentorData = val;
                                        profArr.push(profObj);
                                    }
                                });
                                let cnt = 0;
                                let length = profArr.length;
                                let data = [];
                                trainerData(data, profArr, cnt, length, res, db);
                            } else {

                            }
                        })
                }
            })
    })
};
exports.trainersList = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.params.id;
        functions.AcetrixDB([{
            action: 'join',
            primaryCollection: 'mentors',
            joincollections: ['profile'],
            newKey: ['mentorData'],
            keys: [{ leftKeys: 'userId', rightKeys: 'userId' }],
            where: {}
        }, db])
            .then((info) => {
                info.info.map((val, key) => {
                    if (val.userId == Userid) {
                        info.info.splice(key, 1);
                    }
                })
                let cnt = 0;
                let length = info.info.length;
                let data = []
                trainerData(data, info.info, cnt, length, res, db);
            })
    })
};

trainerData = (data, info, cnt, length, res, db) => {
    if (cnt === length) {
        res.json({ info: data, length: 1 });
    } else {
        schlist = info[cnt].scheduleCourse;
        schcnt = 0;
        schlength = schlist.length;
        feedlist = info[cnt].feedback;
        feedcnt = 0;
        feedlength = feedlist.length;
        info[cnt].scheduleCourse.map((val, key) => {
            val.startDate = moment(val.startDate).format('DD-MM-YYYY');
        })
        trainerScheduleCourseData(data, info, feedlist, feedcnt, feedlength, 0, 0, 0, cnt, length, res, db);
    }
};

trainerScheduleCourseData = (data, info, feedlist, feedcnt, feedlength, ratingTotCnt, ratingCnt, reviewCnt, cnt, length, res, db) => {
    if (feedcnt === feedlength) {
        let allrating = ratingTotCnt / ratingCnt;
        if(String(allrating) === String(NaN))
        allrating = 0;
        let avgrating = allrating.toFixed(1);
        data.push({ mentorId: info[cnt].userId, name: info[cnt].mentorData.firstName + " " + info[cnt].mentorData.lastName, role: info[cnt].mentorData.role, location: info[cnt].mentorData.city, details: info[cnt].mentorDetails, avgrating: avgrating, reviewCnt: reviewCnt, ratingCnt: ratingCnt, scheduleCourse: info[cnt].scheduleCourse, feedback: info[cnt].feedback })
        cnt++;
        trainerData(data, info, cnt, length, res, db);
    } else {
        db.collection('profile').find({ userId: ObjectID(feedlist[feedcnt].id) }).toArray()
            .then((profileinfo) => {
                info[cnt].feedback[feedcnt].userName = profileinfo[0].firstName + " " + profileinfo[0].lastName;
                if (info[cnt].feedback[feedcnt].rating > 0) {
                    ratingTotCnt += info[cnt].feedback[feedcnt].rating;
                    ratingCnt++;
                }
                if (info[cnt].feedback[feedcnt].review !== '')
                    reviewCnt++;
                feedcnt++;
                trainerScheduleCourseData(data, info, feedlist, feedcnt, feedlength, ratingTotCnt, ratingCnt, reviewCnt, cnt, length, res, db);
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    }
};

exports.scheduleCourseList = (req, res) => {
    getConnection.then((db) => {
        return db.collection('mentors')
    })
        .then((mentors) => {
            mentors.aggregate([{ $project: { scheduleCourse: 1 } }]).toArray()
                .then((info) => {
                    res.json({ info: info, length: 1 });
                })
                .catch((err) => {
                    res.json({ message: "There is no schedule course", length: 0 });
                })
        })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
};

exports.feedbackCreation = (req, res) => {
    let Userid = req.body.userId;
    let Mentorid = req.body.mentorId;
    let Review = req.body.review;
    let Rating = req.body.rating;
    let Reviews = { id: ObjectID(Userid), review: Review, rating: Rating };
    getConnection.then((db) => {
        return db.collection('mentors')
    })
        .then((mentors) => {
            mentors.find({ userId: ObjectID(Mentorid), 'feedback.id': ObjectID(Userid) }).toArray()
                .then((userinfo) => {
                    let Cond, Field;
                    if (userinfo.length === 0) {
                        Cond = { 'userId': ObjectID(Mentorid) };
                        Field = { $push: { feedback: Reviews } };
                    } else {
                        Cond = { 'userId': ObjectID(Mentorid), 'feedback.id': ObjectID(Userid) };
                        Field = { $set: { 'feedback.$.review': Review, 'feedback.$.rating': Rating } };
                    }
                    mentors.update(Cond, Field)
                        .then((info) => {
                            res.json({ message: "Your feedback has been submitted successfully!", length: 1 });
                        })
                        .catch((err) => {
                            log.write(err.stack + "\n");
                            res.json({ message: err.toString(), length: 0 });
                        })
                }).catch((err) => {
                    log.write(err.stack + "\n");
                    res.json({ message: err.toString(), length: 0 });
                })
        })
};
exports.courseList = (req, res) => {
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "find",
            collection: "mentors",
            where: {},
            selectfields: {}
        }, db])
            .then((info) => {
                let courseArr = [];
                _.filter(info.info, (val) => {
                    if (val.scheduleCourse.length > 0) {
                        _.map(val.scheduleCourse, (sval, skey) => {
                            courseArr.push(sval.courseName);
                        });
                    }
                });
                res.json({ info: courseArr, length: 1 });
            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    })
};
randomNumber = (len) => {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64')   // convert to base64 format
        .slice(0, len)        // return required number of characters
        .replace(/\+/g, '0')  // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
}
