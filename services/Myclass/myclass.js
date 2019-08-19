const getConnection = require('./../../lib/connection.js');
const functions = require('./../functions.js');
const fs = require('fs');
const moment = require('moment');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');
const ObjectID = require('mongodb').ObjectID;
const _ = require('underscore');
const sha1 = require('sha1');
const parser = require('xml2json');
const requestPromise = require('request-promise');
const basepath = require('./../basepath.json');
const timeLine = require('../../src/timeline');

exports.teachingClassesInfo = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.params.id;
        functions.AcetrixDB([{
            action: 'join',
            primaryCollection: 'mentors',
            joincollections: ['profile'],
            newKey: ['mentorData'],
            keys: [{ leftKeys: 'userId', rightKeys: 'userId' }],
            where: { userId: ObjectID(Userid) }
        }, db])
            .then(info => {
                let mentorcourses = []
                info.info[0].scheduleCourse.map(item => {
                    item.soDate = item.startDate
                    item.startDate = moment(item.startDate).format('DD-MM-YYYY');
                    mentorcourses.push(item.courseName);
                })
                info.mentorcourses = mentorcourses;
                return info
            })
            .then(data => {
                return Promise.all(data.info[0].scheduleCourse.map(item =>
                    Promise.all(
                        item.buyers.map(buyers =>
                            functions.AcetrixDB([{
                                action: "find",
                                collection: "profile",
                                where: { userId: ObjectID(buyers) },
                                selectfields: { firstName: 1, lastName: 1, userId: 1, role: 1, profileImage: 1 }
                            }, db]))
                    )
                        .then(buyersdata => {
                            let currenttime = moment().format("HH:mm");
                            let sDate
                            if (moment() > item.soDate) {
                                if (String(item.endTime) > currenttime) {
                                    sDate = moment.utc().format('LL');
                                } else {
                                    sDate = moment.utc(moment(new Date()).add(1, 'days')).format('LL');
                                }
                            } else {
                                sDate = moment.utc(moment(new Date(item.soDate))).format('LL');
                            }
                            let experience = '';
                            let education = '';
                            if (data.info[0].mentorData.education.length > 0) {
                                let maxedudate = moment.max(data.info[0].mentorData.education.map(d => moment(d.toDate)));
                                data.info[0].mentorData.education.map(item => {
                                    if (moment(item.toDate) >= maxedudate) {
                                        education = item;
                                    }
                                });
                            }
                            if (data.info[0].mentorData.experience.length > 0) {
                                let maxexpdate = moment.max(data.info[0].mentorData.experience.map(d => moment(d.toDate)));
                                data.info[0].mentorData.experience.map(item => {
                                    if (moment(item.toDate) >= maxexpdate) {
                                        experience = item;
                                    }
                                })
                            }
                            if (buyersdata.length === 0) {
                                return { scheduleId: item.scheduleId, preRequisites: item.preRequisties, syllabus: item.syllabus, mentorCourses: data.mentorcourses, mentorName: data.info[0].mentorData.firstName + ' ' + data.info[0].mentorData.lastName, mentorEmail: data.info[0].mentorData.email, mentorPhoneNumber: data.info[0].mentorData.phoneNumber, mentorCity: data.info[0].mentorData.city, mentorImage: data.info[0].mentorData.profileImage, mentorRole: data.info[0].mentorData.role, mentorEducation: education, mentorWorkExp: experience, mentorExpertise: data.info[0].mentorData.expertise, courseName: item.courseName, startDate: item.startDate, startTime: sDate + ' ' + item.startTime, endTime: sDate + ' ' + item.endTime, duration: item.duration, maxPeople: item.maxPeople, courseType: "Start", buyers: [] };
                            } else {
                                let buy = []
                                buyersdata.map(buyersin => {
                                    if (buyersin.info.length > 0)
                                        buy.push(buyersin.info[0]);
                                })
                                return { scheduleId: item.scheduleId, preRequisites: item.preRequisties, syllabus: item.syllabus, mentorCourses: data.mentorcourses, mentorName: data.info[0].mentorData.firstName + ' ' + data.info[0].mentorData.lastName, mentorEmail: data.info[0].mentorData.email, mentorPhoneNumber: data.info[0].mentorData.phoneNumber, mentorCity: data.info[0].mentorData.city, mentorImage: data.info[0].mentorData.profileImage, mentorRole: data.info[0].mentorData.role, mentorEducation: education, mentorWorkExp: experience, mentorExpertise: data.info[0].mentorData.expertise, courseName: item.courseName, startDate: item.startDate, startTime: sDate + ' ' + item.startTime, endTime: sDate + ' ' + item.endTime, duration: item.duration, maxPeople: item.maxPeople, courseType: "Start", buyers: buy };
                            }
                        })
                ))
            })
            .then(result => {
                res.json({ result: result, length: 1 })
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ result: [], length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
};

exports.classBuy = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.body.userId;
        let Scheduleid = req.body.scheduleId;
        let Mentorid = req.body.mentorId;
        let require = ['userId', 'scheduleId', 'mentorId'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "find",
                    collection: "profile",
                    where: { userId: ObjectID(Userid), myClass: { $elemMatch: { scheduleId: Scheduleid } } },
                    selectfields: {}
                }, db])
                    .then((info) => {
                        if (info.info.length > 0) {
                            res.json({ message: 'already bought course', length: 0 });
                        } else {
                            db.collection('profile').update({ userId: ObjectID(Userid) },
                                { $push: { myClass: { mentorId: ObjectID(Mentorid), scheduleId: Scheduleid, todayDate: functions.DateConversion(new Date()) } } })
                                .then(() => {
                                    db.collection('mentors').update({ userId: ObjectID(Mentorid), 'scheduleCourse.scheduleId': Scheduleid },
                                        { $push: { 'scheduleCourse.$.buyers': ObjectID(Userid) } })
                                        .then(() => {
                                            db.collection('activity').insert({ activityId: Scheduleid, userId: ObjectID(Userid), typeofactivity: 'bought', todayDate: new Date(), type: 'buyclass' }).then((resp) => {
                                                let result = ""
                                                functions.AcetrixDB([{
                                                    action: 'join',
                                                    primaryCollection: 'mentors',
                                                    joincollections: ['profile'],
                                                    newKey: ['mentorData'],
                                                    keys: [{ leftKeys: 'userId', rightKeys: 'userId' }],
                                                    where: { userId: ObjectID(Mentorid) }
                                                }, db])
                                                    .then(mentorInfo => {
                                                        let Mentorcourses = [];
                                                        let Coursename = '';
                                                        let Prerequisites = '';
                                                        let Syllabus = '';
                                                        let Buyers = '';
                                                        let Maxpeople = '';
                                                        let Startdate = '';
                                                        let Starttime = '';
                                                        let Endtime = '';
                                                        mentorInfo.info[0].scheduleCourse.map(item => {
                                                            Mentorcourses.push(item.courseName);
                                                            if (item.scheduleId === Scheduleid) {
                                                                Coursename = item.courseName;
                                                                Prerequisites = item.preRequisties;
                                                                Syllabus = item.syllabus;
                                                                Buyers = item.buyers;
                                                                Maxpeople = item.maxPeople;
                                                                Startdate = moment(item.startDate).format('DD-MM-YYYY');
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
                                                                Starttime = sDate + " " + item.startTime;
                                                                Endtime = sDate + " " + item.endTime;
                                                            }
                                                        })
                                                        let experience = '';
                                                        let education = '';
                                                        if (mentorInfo.info[0].mentorData.education.length > 0) {
                                                            let maxedudate = moment.max(mentorInfo.info[0].mentorData.education.map(d => moment(d.toDate)));
                                                            mentorInfo.info[0].mentorData.education.map(item => {
                                                                if (moment(item.toDate) >= maxedudate) {
                                                                    education = item;
                                                                }
                                                            });
                                                        }
                                                        if (mentorInfo.info[0].mentorData.experience.length > 0) {
                                                            let maxexpdate = moment.max(mentorInfo.info[0].mentorData.experience.map(d => moment(d.toDate)));
                                                            mentorInfo.info[0].mentorData.experience.map(item => {
                                                                if (moment(item.toDate) >= maxexpdate) {
                                                                    experience = item;
                                                                }
                                                            })
                                                        }
                                                        return result = { scheduleId: Scheduleid, mentorEducation: education, mentorWorkExp: experience, endTime: Endtime, startTime: Starttime, startDate: Startdate, maxPeople: Maxpeople, buyers: Buyers, syllabus: Syllabus, preRequisties: Prerequisites, courseName: Coursename, mentorName: mentorInfo.info[0].mentorData.firstName + " " + mentorInfo.info[0].mentorData.lastName, mentorEmail: mentorInfo.info[0].mentorData.email, mentorPhoneNumber: mentorInfo.info[0].mentorData.phoneNumber, mentorCity: mentorInfo.info[0].mentorData.city, mentorImage: mentorInfo.info[0].mentorData.profileImage, mentorRole: mentorInfo.info[0].mentorData.role, mentorExpertise: mentorInfo.info[0].mentorData.expertise, courseType: 'Join', };
                                                    })
                                                    .then((result) => {
                                                        Promise.all(
                                                            result.buyers.map(buyers =>
                                                                functions.AcetrixDB([{
                                                                    action: "find",
                                                                    collection: "profile",
                                                                    where: { userId: ObjectID(buyers) },
                                                                    selectfields: { firstName: 1, lastName: 1, userId: 1, role: 1, profileImage: 1 }
                                                                }, db]))
                                                        )
                                                            .then(buyersdata => {
                                                                let allbuyersdata = []
                                                                if (buyersdata.length > 0) {
                                                                    buyersdata.map(buyersin => {
                                                                        if (buyersin.info.length > 0)
                                                                            allbuyersdata.push(buyersin.info[0]);
                                                                    })
                                                                }
                                                                result.buyers = allbuyersdata;
                                                                res.json({ message: 'course bought successfully!', length: 1, result: result });
                                                            })
                                                            .catch((err) => {
                                                                log.write(err.stack + "\n");
                                                                res.json({ message: err.message, length: 0 });
                                                            })
                                                    })
                                                    .catch((err) => {
                                                        log.write(err.stack + "\n");
                                                        res.json({ message: err.message, length: 0 });
                                                    })
                                            })
                                        })
                                        .catch((err) => {
                                            res.json({ message: err.message, length: 0 })
                                        })

                                })
                                .catch((err) => {
                                    res.json({ message: err.message, length: 0 })
                                })
                        }
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 });
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

exports.myClassInfo = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.params.id;
        functions.AcetrixDB([{
            action: "find",
            collection: "profile",
            where: { userId: ObjectID(Userid) },
            selectfields: {}
        }, db])
            .then((info) => {
                if (info.info[0].myClass) {
                    return Promise.all(info.info[0].myClass.map(item =>
                        functions.AcetrixDB([{
                            action: "find",
                            collection: "mentors",
                            where: { userId: ObjectID(item.mentorId), 'scheduleCourse.scheduleId': item.scheduleId },
                            selectfields: { 'scheduleCourse.$.scheduleId': 1, userId: 1 }
                        }, db])
                            .then(scheduleinfo => {
                                if (scheduleinfo.info.length > 0) {
                                    let mentorcourses = []
                                    functions.AcetrixDB([{
                                        action: "find",
                                        collection: "mentors",
                                        where: { userId: ObjectID(scheduleinfo.info[0].userId) },
                                        selectfields: {}
                                    }, db])
                                        .then(mentorclassesinfo => {
                                            mentorclassesinfo.info[0].scheduleCourse.map(item => {
                                                item.soDate = item.startDate
                                                item.startDate = moment(item.startDate).format('DD-MM-YYYY');
                                                mentorcourses.push(item.courseName);
                                            })
                                            scheduleinfo.mentorcourses = mentorcourses;
                                        })
                                    if (scheduleinfo.info[0].scheduleCourse[0].buyers.length > 1) {
                                        scheduleinfo.info[0].scheduleCourse[0].buyers.map((item, key) => {
                                            if (item == Userid) {
                                                scheduleinfo.info[0].scheduleCourse[0].buyers.splice(key, 1);
                                            }
                                        })
                                        return Promise.all(scheduleinfo.info[0].scheduleCourse[0].buyers.map(item =>
                                            functions.AcetrixDB([{
                                                action: "find",
                                                collection: "profile",
                                                where: { userId: ObjectID(item) },
                                                selectfields: { firstName: 1, lastName: 1, userId: 1, role: 1, profileImage: 1 }
                                            }, db])
                                        ))
                                            .then(buyerinfo => {
                                                let buy = []
                                                buyerinfo.map(buyersin => {
                                                    if (buyersin.info.length > 0)
                                                        buy.push(buyersin.info[0]);
                                                })
                                                scheduleinfo.info[0].scheduleCourse[0].buyers = buy;
                                                return scheduleinfo
                                            })
                                            .catch((err) => {
                                                log.write(err.stack + "\n");
                                                res.json({ message: err.message, length: 0 });
                                            })
                                    } else {
                                        scheduleinfo.info[0].scheduleCourse[0].buyers = [];
                                        return scheduleinfo
                                    }
                                }
                            })
                            .catch((err) => {
                                log.write(err.stack + "\n");
                                res.json({ message: err.message, length: 0 });
                            })
                    ))
                } else {
                    return []
                }
            })
            .then(data => {
                data = data.filter(e => { return e != null });
                Promise.all(data.map(item =>
                    functions.AcetrixDB([{
                        action: "find",
                        collection: "profile",
                        where: { userId: ObjectID(item.info[0].userId) },
                        selectfields: {}
                    }, db])
                        .then(info => {
                            let currenttime = moment().format("HH:mm");
                            let sDate
                            if (moment() > item.info[0].scheduleCourse[0].startDate) {
                                if (String(item.info[0].scheduleCourse[0].endTime) > currenttime) {
                                    sDate = moment.utc().format('LL');
                                } else {
                                    sDate = moment.utc(moment(new Date()).add(1, 'days')).format('LL');
                                }
                            } else {
                                sDate = moment.utc(moment(new Date(item.info[0].scheduleCourse[0].startDate))).format('LL');
                            }
                            let experience = '';
                            let education = '';
                            if (info.info[0].education.length > 0) {
                                let maxedudate = moment.max(info.info[0].education.map(d => moment(d.toDate)));
                                info.info[0].education.map(item => {
                                    if (moment(item.toDate) >= maxedudate) {
                                        education = item;
                                    }
                                });
                            }
                            if (info.info[0].experience.length > 0) {
                                let maxexpdate = moment.max(info.info[0].experience.map(d => moment(d.toDate)));
                                info.info[0].experience.map(item => {
                                    if (moment(item.toDate) >= maxexpdate) {
                                        experience = item;
                                    }
                                })
                            }
                            let Startdate = moment(item.info[0].scheduleCourse[0].startDate).format('DD-MM-YYYY');
                            return { scheduleId: item.info[0].scheduleCourse[0].scheduleId, preRequisites: item.info[0].scheduleCourse[0].preRequisties, syllabus: item.info[0].scheduleCourse[0].syllabus, mentorCourses: item.mentorcourses, mentorName: info.info[0].firstName + ' ' + info.info[0].lastName, mentorEmail: info.info[0].email, mentorPhoneNumber: info.info[0].phoneNumber, mentorCity: info.info[0].city, mentorImage: info.info[0].profileImage, mentorRole: info.info[0].role, mentorEducation: education, mentorWorkExp: experience, mentorExpertise: info.info[0].expertise, courseName: item.info[0].scheduleCourse[0].courseName, startDate: Startdate, startTime: sDate + ' ' + item.info[0].scheduleCourse[0].startTime, endTime: sDate + ' ' + item.info[0].scheduleCourse[0].endTime, buyers: item.info[0].scheduleCourse[0].buyers, maxPeople: item.info[0].scheduleCourse[0].maxPeople, courseType: "Join" }
                        })
                        .catch((err) => {
                            log.write(err.stack + "\n");
                            res.json({ message: err.message, length: 0 });
                        })
                ))
                    .then(result => {
                        res.json({ result: result, length: 1 })
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 });
                    })
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ result: [], length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
};

exports.joinClass = (req, res) => {
    getConnection.then((db) => {
        let UserName = req.body.userName;
        let Scheduleid = req.body.scheduleId;
        let Type = req.body.type;
        let require = ['userName', 'scheduleId', 'type'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "find",
                    collection: "mentors",
                    where: { 'scheduleCourse.scheduleId': Scheduleid },
                    selectfields: { 'scheduleCourse.$.scheduleId': 1, userId: 1 }
                }, db])
                    .then((result) => {
                        let checksum = sha1('isMeetingRunningmeetingID=' + Scheduleid + basepath.secret);
                        let url = ' http://' + basepath.id + '/bigbluebutton/api/isMeetingRunning?meetingID=' + Scheduleid + '&checksum=' + checksum;
                        requestPromise(url)
                            .then((body) => {
                                let json = JSON.parse(parser.toJson(body));
                                let joinUrl;
                                if (json.response.running === "true") {
                                    if (Type === 'Start') {
                                        let checksum = sha1('joinmeetingID=' + Scheduleid + '&password=mp&fullName=' + UserName + basepath.secret);
                                        joinUrl = 'http://' + basepath.id + '/bigbluebutton/api/join?meetingID=' + Scheduleid + '&password=mp&fullName=' + UserName + '&checksum=' + checksum;
                                    } else {
                                        let checksum = sha1('joinmeetingID=' + Scheduleid + '&password=ap&fullName=' + UserName + basepath.secret);
                                        joinUrl = 'http://' + basepath.id + '/bigbluebutton/api/join?meetingID=' + Scheduleid + '&password=ap&fullName=' + UserName + '&checksum=' + checksum;
                                    }
                                    res.json({ url: joinUrl, length: 1 });
                                } else {
                                    if (Type === 'Start') {
                                        let checksum = sha1('createname=' + result.info[0].scheduleCourse[0].courseName + '&meetingID=' + Scheduleid + '&moderatorPW=mp&attendeePW=ap&record=true&meta_presenter=' + result.info[0].Userid + basepath.secret);
                                        let url = ' http://' + basepath.id + '/bigbluebutton/api/create?name=' + result.info[0].scheduleCourse[0].courseName + '&meetingID=' + Scheduleid + '&moderatorPW=mp&attendeePW=ap&record=true&meta_presenter=' + result.info[0].Userid + '&checksum=' + checksum
                                        requestPromise(url)
                                            .then((body) => {
                                                let json = JSON.parse(parser.toJson(body));
                                                if (json.response.returncode === "SUCCESS") {
                                                    let checksum = sha1('joinmeetingID=' + Scheduleid + '&password=mp&fullName=' + UserName + basepath.secret);
                                                    joinUrl = 'http://' + basepath.id + '/bigbluebutton/api/join?meetingID=' + Scheduleid + '&password=mp&fullName=' + UserName + '&checksum=' + checksum;
                                                    res.json({ url: joinUrl, length: 1 });
                                                } else {
                                                    res.json({ message: "cannot start class due to technical issue. please try again", length: 3 });
                                                }
                                            })
                                            .catch((err) => {
                                                log.write(err.stack + "\n");
                                                res.json({ message: err.toString(), length: 0 });
                                            })
                                    } else {
                                        res.json({ message: "Class is not in session yet", length: 3 });
                                    }
                                }
                            })
                            .catch((err) => {
                                log.write(err.stack + "\n");
                                res.json({ message: err.message, length: 0 });
                            })
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 });
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

exports.coursesList = (req, res) => {
    getConnection.then(db => {
        let DefaultList = [];
        let Userid = req.params.id;
        let Searchtext = req.params.text;
        functions.AcetrixDB([{
            action: 'join',
            primaryCollection: 'mentors',
            joincollections: ['profile'],
            newKey: ['mentorData'],
            keys: [{ leftKeys: 'userId', rightKeys: 'userId' }],
            where: { userId: { $nin: [ObjectID(Userid)] } }
        }, db])
            .then(mentorList => {
                let courselist = []
                mentorList.info.map((item, key) => {
                    item.scheduleCourse.map((scheduleitem, schukey) => {
                        courselist.push({ mentorId: mentorList.info[key].userId, mentorName: mentorList.info[key].mentorData.firstName + " " + mentorList.info[key].mentorData.lastName, mentorRole: mentorList.info[key].mentorData.role, schedule: scheduleitem });
                    })
                })
                return courselist;
            })
            .then(courseList => {
                DefaultList = courseList;
                let finalList = []
                courseList.map((list, key) => {
                    if (list.schedule.buyers.filter(e => (String(e) == String(Userid))).length === 0 && list.schedule.buyers.length !== Number(list.schedule.maxPeople)) {
                        let currenttime = moment().format("HH:mm");
                        let sDate
                        if (moment() > list.schedule.startDate) {
                            if (String(list.schedule.endTime) > currenttime) {
                                sDate = moment.utc().format('LL');
                            } else {
                                sDate = moment.utc(moment(new Date()).add(1, 'days')).format('LL');
                            }
                        } else {
                            sDate = moment.utc(moment(new Date(list.schedule.startDate))).format('LL');
                        }
                        list.schedule.startTime = sDate + ' ' + list.schedule.startTime;
                        list.schedule.endTime = sDate + ' ' + list.schedule.endTime;
                        list.schedule.startDate = moment(new Date(list.schedule.startDate)).format('DD-MM-YYYY');
                        finalList.push(list);
                    }
                })
                return finalList;
            })
            .then(searchlist => {
                if (searchlist.length > 0) {
                    if (String(Searchtext) != String(undefined)) {
                        let list = [];
                        searchlist.map(val => {
                            if (val.schedule.courseName.toUpperCase().search(Searchtext.toUpperCase()) >= 0) {
                                list.push(val);
                            }
                        })
                        res.json({ result: list, length: 1 });
                    } else {
                        functions.AcetrixDB([{
                            action: "find",
                            collection: "profile",
                            where: { userId: ObjectID(Userid) },
                            selectfields: {}
                        }, db])
                            .then(info => {
                                if (timeLine[info.info[0].goal]) {
                                    let list = [];
                                    timeLine[info.info[0].goal].map(item => {
                                        if (item.title !== undefined && item.title !== null)
                                            list.push(item.title)
                                    });
                                    if (list.length > 0) {
                                        let final = []
                                        let recomArray = []
                                        let tempArray
                                        list.map(title => {
                                            tempArray = searchlist.filter(e => { return e.schedule.courseName.toUpperCase() === title.toUpperCase() });
                                            recomArray = tempArray[0]
                                            if (recomArray !== undefined)
                                                final.push(recomArray)

                                        })
                                        if (final.length > 0) {
                                            res.json({ message: 'sucessful recommended classes list', result: final, length: 1 });

                                        } else {
                                            res.json({ message: 'sucessful recommended classes list', result: searchlist.slice(0, 10), length: 1 });
                                        }
                                    } else {
                                        res.json({ result: searchlist.slice(0, 10), length: 1 });
                                    }
                                } else {
                                    res.json({ result: searchlist.slice(0, 10), length: 1 });
                                }
                            })
                    }
                } else {
                    res.json({ result: DefaultList.slice(0, 10), length: 1 });
                }
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err, length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
};

exports.classRecordings = (req, res) => {
    getConnection.then(db => {
        let meetingId = req.params.meetingId;
        let checksum = sha1('getRecordingsmeetingID=' + meetingId + basepath.secret);
        let url = ' http://' + basepath.id + '/bigbluebutton/api/getRecordings?meetingID=' + meetingId + '&checksum=' + checksum;
        requestPromise(url)
            .then((body) => {
                let json = JSON.parse(parser.toJson(body));
                if (json.response.messageKey !== 'noRecordings') {
                    if (!Array.isArray(json.response.recordings.recording)) {
                        json.response.recordings.recording.Date = new Date(Number(json.response.recordings.recording.startTime));
                        json.response.recordings.recording.startTime = moment(json.response.recordings.recording.Date).format("HH:mm");
                        json.response.recordings.recording.Date = moment(json.response.recordings.recording.Date).format('LL');
                        json.response.recordings.recording.endTime = moment(new Date(Number(json.response.recordings.recording.endTime))).format("HH:mm");
                    } else {
                        json.response.recordings.recording.map(val => {
                            val.Date = new Date(Number(val.startTime));
                            val.startTime = moment(val.Date).format("HH:mm");
                            val.Date = moment(val.Date).format('LL');
                            val.endTime = moment(new Date(Number(val.endTime))).format("HH:mm");
                        })
                    }
                    res.json({ info: json.response.recordings.recording, length: 1 })
                } else {
                    res.json({ message: "", length: 0 })
                }
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err, length: 0 });
            })
    })
};

exports.classesActivity = (req, res) => {
    let id = req.params.id;
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: 'join',
            primaryCollection: 'profile',
            joincollections: ['mentors'],
            newKey: ['classesData'],
            keys: [{ leftKeys: 'userId', rightKeys: 'userId' }],
            where: { userId: ObjectID(id) }
        }, db])
            .then((info) => {
                let profileactivity = info.info[0].acceptIds;
                profileactivity.push(id);
                return Promise.all(profileactivity.map(item =>
                    functions.AcetrixDB([{
                        action: 'join',
                        primaryCollection: 'activity',
                        joincollections: ['profile'],
                        newKey: ['profileData'],
                        keys: [{ leftKeys: 'userId', rightKeys: 'userId' }],
                        where: { userId: ObjectID(item) }
                    }, db])))
            })
            .then(Data => {
                let dataActivity = [];
                Data.map(item => {
                    if (item.info.length > 0) {
                        item.info.map(eachitem => {
                            dataActivity.push(eachitem);
                        })
                    }
                })
                classactivityData([dataActivity, db]).then(ret => {
                    return Promise.all(ret)
                })
                    .then(reslt => {
                        return reslt.sort(function (a, b) { return new Date(b.todatDate).getTime() - new Date(a.todatDate).getTime(); });
                    })
                    .then(final => {
                        final = final.filter(e => { return e != null });
                        final.map(item => {
                            item.date = moment.utc(item.todatDate).format('LL');
                            item.time = moment(item.todatDate).format("hh:mm A");
                        });
                        let val = groupBy(final, 'date', 'todayActivity', function (item) {
                            return [item.date];
                        });
                        val.map(item => {
                            let group = groupBy(item.todayActivity, 'userId', 'activity', function (eachitem) {
                                return [eachitem.userId];
                            });
                            item.todayActivity = group
                        })
                        val.map(item => {
                            item.todayActivity.map(activityitem => {
                                activityitem['name'] = activityitem.activity[0].Name;
                                activityitem['role'] = activityitem.activity[0].role;
                                activityitem['profileImage'] = activityitem.activity[0].profileImage;
                            })
                        })
                        res.json({ info: val, length: 1 });
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
    })
};

function groupBy(array, a, b, f) {
    var groups = {};
    array.forEach(function (o) {
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        let val = JSON.parse(group)
        let final = {};
        final[a] = val[0];
        final[b] = groups[group];
        return final;
    })
};

classactivityData = (info) => {
    return new Promise((reslove, reject) => {
        let promises = []
        info[0].map(item => {
            if (item.type == 'createclass') {
                promises.push(functions.AcetrixDB([{
                    action: "find",
                    collection: "mentors",
                    where: { userId: ObjectID(item.userId), 'scheduleCourse.scheduleId': item.activityId },
                    selectfields: { 'scheduleCourse.$.scheduleId': 1, userId: 1, _id: 1 }
                }, info[1]])
                    .then(scheduleinfo => {
                        return { mentorUserId: item.profileData.userId, mentorName: item.profileData.firstName + " " + item.profileData.lastName, mentorProfileImage: item.profileData.profileImage, id: scheduleinfo.info[0]._id, todatDate: item.todayDate, type: item.type, userId: item.profileData.userId, role: item.profileData.role, profileImage: item.profileData.profileImage, Name: item.profileData.firstName + " " + item.profileData.lastName, typeOfActivity: item.typeofactivity, CourseName: scheduleinfo.info[0].scheduleCourse[0].courseName, scheduleId: scheduleinfo.info[0].scheduleCourse[0].scheduleId, text: "Created this class" }
                    })
                    .catch(err => {
                        reject(err)
                    }))
            } else if (item.type == 'buyclass') {
                promises.push(functions.AcetrixDB([{
                    action: "find",
                    collection: "profile",
                    where: { userId: ObjectID(item.userId), 'myClass.scheduleId': item.activityId },
                    selectfields: { 'myClass.$.scheduleId': 1, userId: 1, _id: 1 }
                }, info[1]])
                    .then(profilescheduleinfo => {
                        return functions.AcetrixDB([{
                            action: "find",
                            collection: "mentors",
                            where: { userId: ObjectID(profilescheduleinfo.info[0].myClass[0].mentorId), 'scheduleCourse.scheduleId': item.activityId },
                            selectfields: { 'scheduleCourse.$.scheduleId': 1, userId: 1, _id: 1 }
                        }, info[1]])
                            .then(scheduleinfo => {
                                return functions.AcetrixDB([{
                                    action: "find",
                                    collection: "profile",
                                    where: { userId: ObjectID(profilescheduleinfo.info[0].myClass[0].mentorId) },
                                    selectfields: { userId: 1, firstName: 1, lastName: 1, profileImage: 1 }
                                }, info[1]])
                                    .then(mentorInfo => {
                                        return { mentorUserId: mentorInfo.info[0].userId, mentorName: mentorInfo.info[0].firstName + " " + mentorInfo.info[0].lastName, mentorProfileImage: mentorInfo.info[0].profileImage, id: scheduleinfo.info[0]._id, todatDate: item.todayDate, userId: item.profileData.userId, profileImage: item.profileData.profileImage, type: item.type, role: item.profileData.role, Name: item.profileData.firstName + " " + item.profileData.lastName, typeOfActivity: item.typeofactivity, CourseName: scheduleinfo.info[0].scheduleCourse[0].courseName, scheduleId: scheduleinfo.info[0].scheduleCourse[0].scheduleId, text: "Bought this class" }
                                    })
                            })
                            .catch(err => {
                                reject(err)
                            })
                    })
                    .catch(err => {
                        reject(err)
                    }))
            }
        })
        reslove(promises);
    })
};

exports.singleClassData = (req, res) => {
    getConnection.then(db => {
        let Userid = req.params.userId;
        let Scheduleid = req.params.scheduleId;
        functions.AcetrixDB([{
            action: "find",
            collection: "mentors",
            where: { userId: ObjectID(Userid), 'scheduleCourse.scheduleId': Scheduleid },
            selectfields: { 'scheduleCourse.$.scheduleId': 1, userId: 1 }
        }, db])
            .then(scheduleinfo => {
                if (scheduleinfo.info[0].scheduleCourse[0].buyers.length > 1) {
                    scheduleinfo.info[0].scheduleCourse[0].buyers.map((item, key) => {
                        if (item == Userid) {
                            scheduleinfo.info[0].scheduleCourse[0].buyers.splice(key, 1);
                        }
                    })
                    return Promise.all(scheduleinfo.info[0].scheduleCourse[0].buyers.map(item =>
                        functions.AcetrixDB([{
                            action: "find",
                            collection: "profile",
                            where: { userId: ObjectID(item) },
                            selectfields: { firstName: 1, lastName: 1, userId: 1, role: 1, profileImage: 1 }
                        }, db])
                    ))
                        .then(buyerinfo => {
                            let buy = []
                            buyerinfo.map(buyersin => {
                                if (buyersin.info.length > 0)
                                    buy.push(buyersin.info[0]);
                            })
                            scheduleinfo.info[0].scheduleCourse[0].buyers = buy;
                            return scheduleinfo
                        })
                        .catch((err) => {
                            log.write(err.stack + "\n");
                            res.json({ message: err.message, length: 0 });
                        })
                } else {
                    scheduleinfo.info[0].scheduleCourse[0].buyers = [];
                    return scheduleinfo
                }
            })
            .then(data => {
                functions.AcetrixDB([{
                    action: "find",
                    collection: "profile",
                    where: { userId: ObjectID(Userid) },
                    selectfields: {}
                }, db])
                    .then((info) => {
                        let Startdate = moment(data.info[0].scheduleCourse[0].startDate).format('DD-MM-YYYY');
                        let currenttime = moment().format("HH:mm");
                        let sDate
                        if (moment() > data.info[0].scheduleCourse[0].startDate) {
                            if (String(data.info[0].scheduleCourse[0].endTime) > currenttime) {
                                sDate = moment.utc().format('LL');
                            } else {
                                sDate = moment.utc(moment(new Date()).add(1, 'days')).format('LL');
                            }
                        } else {
                            sDate = moment.utc(moment(new Date(data.info[0].scheduleCourse[0].startDate))).format('LL');
                        }
                        return { scheduleId: data.info[0].scheduleCourse[0].scheduleId, preRequisites: data.info[0].scheduleCourse[0].preRequisties, syllabus: data.info[0].scheduleCourse[0].syllabus, mentorName: info.info[0].firstName + ' ' + info.info[0].lastName, mentorEmail: info.info[0].email, mentorPhoneNumber: info.info[0].phoneNumber, mentorCity: info.info[0].city, mentorImage: info.info[0].profileImage, mentorRole: info.info[0].role, courseName: data.info[0].scheduleCourse[0].courseName, startDate: Startdate, startTime: sDate + ' ' + data.info[0].scheduleCourse[0].startTime, endTime: sDate + ' ' + data.info[0].scheduleCourse[0].endTime, buyers: data.info[0].scheduleCourse[0].buyers, maxPeople: data.info[0].scheduleCourse[0].maxPeople, type: "demo" }
                    })
                    .then(result => {
                        res.json({ result: result, length: 1 })
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 });
                    })
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
} 