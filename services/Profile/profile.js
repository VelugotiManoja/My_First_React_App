const getConnection = require('../../lib/connection.js');
const functions = require('./../functions.js');
const crypto = require('crypto');
const ObjectID = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const moment = require('moment');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');
const upload = multer({ dest: 'uploads/' });
const _ = require('underscore');
exports.createPersonalInfo = (req, res) => {
    try {
        let Obj = req.body;
        getConnection.then((db) => {
            try {
                db.collection('profile', (err, profile) => {
                    try {
                        profile.count({ userId: ObjectID(Obj.userId) }, (err, profInfo) => {
                            if (err)
                                res.json({ message: err.message, length: 0 });
                            else {
                                if (profInfo > 0) {
                                    let id = Obj.userId;
                                    Obj.flag = 1;
                                    delete Obj.userId;
                                    functions.AcetrixDB([{
                                        action: "update",
                                        collection: "profile",
                                        fields: Obj,
                                        where: { userId: ObjectID(id) },
                                        check: "false"
                                    }, db])
                                        .then(() => {
                                            res.json({ message: 'uploaded successfully!', length: 1 });
                                        })
                                        .catch((err) => {
                                            log.write(err.stack + "\n");
                                            res.json({ message: err.message, length: 0 })
                                        })
                                } else {
                                    Obj.goal = '';
                                    Obj.userId = ObjectID(req.body.userId);
                                    Obj.education = [];
                                    Obj.experience = [];
                                    Obj.achievements = [];
                                    Obj.expertise = [];
                                    Obj.recommendation = [];
                                    Obj.ssc = '';
                                    Obj.intermediate = '';
                                    Obj.preGraduation = '';
                                    Obj.postGraduation = '';
                                    Obj.requestIds = [];
                                    Obj.acceptIds = [];
                                    Obj.sentrequestIds = [];
                                    Obj.myClass = [];
                                    profile.insert(Obj, (err, result) => {
                                        if (err) {
                                            res.json({ message: err.message, length: 0 });
                                        } else {
                                            res.json({ message: "Successfully inserted!!", length: 1 });
                                        }
                                    });
                                }
                            }
                        });
                    } catch (err) {
                        log.write(err.stack + "\n");
                        res.json({ message: err.toString(), length: 0 });
                    }
                });
            } catch (err) {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            }
        }).catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        });
    } catch (err) {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    }
};
exports.profileInfo = (req, res) => {
    let id = req.params.id;
    getConnection.then((db) => {
        require = ['id'];
        integer = [];
        functions.validation([req.params, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "find",
                    collection: "profile",
                    where: { userId: ObjectID(id) },
                    selectfields: {}
                }, db])
                    .then((info) => {
                        if (info.info.length < 1) {
                            functions.AcetrixDB([{
                                action: "find",
                                collection: "users",
                                where: { _id: ObjectID(id) },
                                selectfields: {}
                            }, db])
                                .then((info) => {
                                    res.json({ info: info.info, length: 1 });
                                })
                                .catch((err) => {
                                    res.json({ message: err.message, length: 0 });
                                })
                        }
                        else {
                            functions.AcetrixDB([{
                                action: "find",
                                collection: "goals",
                                where: { goal: info.info[0].goal },
                                selectfields: {}
                            }, db])
                                .then((goalinfo) => {
                                    info.info[0].goalinfo = goalinfo.info
                                    if (info.info[0].profileImage) {
                                        info.info[0].percentage += 10;
                                    }
                                    if (info.info[0].summary) {
                                        info.info[0].percentage += 10;
                                    }
                                    if (info.info[0].street !== "" || info.info[0].city !== "" || info.info[0].state !== "" || info.info[0].country !== "") {
                                        info.info[0].percentage += 10;
                                    }
                                    if (info.info[0].education.length > 0) {
                                        info.info[0].percentage += 10;
                                    }
                                    if (info.info[0].experience.length > 0) {
                                        info.info[0].percentage += 10;
                                    }
                                    if (info.info[0].ssc !== "" || info.info[0].intermediate !== "" || info.info[0].preGraduation !== "" || info.info[0].postGraduation !== "") {
                                        info.info[0].percentage += 15;
                                    }
                                    if (info.info[0].achievements.length > 0) {
                                        info.info[0].percentage += 10;
                                    }
                                    if (info.info[0].expertise.length > 0) {
                                        info.info[0].percentage += 10;
                                    }
                                    if (info.info[0].recommendation.length > 0) {
                                        info.info[0].percentage += 10;
                                    }
                                    res.json({ info: info.info, length: 1 });
                                })
                                .catch((err) => {
                                    res.json({ message: err.message, length: 0 });
                                })
                        }
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })

            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}
exports.userimageUploads = (req, res) => {
    let id = req.body._id;
    let profileImage = req.body.profileImage;
    getConnection.then((db) => {
        require = ['_id'];
        integer = [];
        functions.validation([req.body, require, integer])
        functions.AcetrixDB([{
            action: "find",
            collection: "profile",
            fields: {},
            where: { userId: ObjectID(id) },
            check: "false"
        }, db])
            .then((info) => {
                let Profileimage = info.info[0].profileImage;
                fs.unlink('./uploads/' + Profileimage, function (err) {
                    fs.unlink('./uploads/150/' + Profileimage, function (err) {
                        fs.unlink('./uploads/20/' + Profileimage, function (err) {
                            functions.AcetrixDB([{
                                action: "update",
                                collection: "profile",
                                fields: { profileImage: profileImage },
                                where: { userId: ObjectID(id) },
                                check: "false"
                            }, db])
                                .then((info) => {
                                    res.json({ message: 'files are uploaded successfully!', length: 1, info: info });
                                })
                                .catch((err) => {
                                    log.write(err.stack + "\n");
                                    res.json({ message: err.message, length: 0 })
                                })

                        });

                    });

                });

            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.message, length: 0 })
            })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}

exports.educationDetails = (req, res) => {
    getConnection.then((db) => {
        require = ['universityName', 'fieldOfStudy', 'Degree', 'fromDate', 'toDate'];
        integer = [];
        Promise.all(
            req.body.educationData.map(item =>
                functions.validation([item, require, integer])
            )
        )
            .then(() => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: { education: req.body.educationData },
                    where: { userId: ObjectID(req.body._id) },
                    check: "false"
                }, db])
                    .then(() => {
                        res.json({ message: 'files are uploaded successfully!', length: 1, info: info });
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })
            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}

exports.passwordAuth = (req, res) => {
    try {
        let Oldpassword = req.body.oldpassword;
        let Confirm = bcrypt.hashSync(req.body.newpassword);
        let Userid = req.body._id;
        getConnection.then((db) => {
            try {
                db.collection('users', function (err, users) {
                    users.find({ _id: ObjectID(Userid) }, {}).toArray(function (err, userinfo) {
                        let hash = userinfo[0].password;
                        let newpass = bcrypt.compareSync(Oldpassword, hash);
                        if (newpass === false) {
                            res.json({ result: 'Unsuccess', message: 'Invalid Password', length: 0 });
                        }
                        else {
                            users.updateOne({ "_id": ObjectID(Userid) },
                                { $set: { "password": Confirm } },
                                function (err, docs) {
                                    if (err) {
                                        res.json({ message: err.message, length: 0 });
                                    } else {
                                        res.json({ message: "Your new password updated successfully", length: 1 });
                                    }
                                });
                        }
                    });
                });

            } catch (err) {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            }
        });
    } catch (err) {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    }
};

exports.profileUpdate = (req, res) => {
    getConnection.then((db) => {
        let profObj = req.body.personalData;
        let id = profObj._id;
        require = ['_id', 'firstName', 'lastName', 'email', 'phoneNumber'];
        integer = [];
        functions.validation([req.body.personalData, require, integer])
            .then(() => {
                delete profObj._id;
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: profObj,
                    where: { userId: ObjectID(id) },
                    check: "false"
                }, db])
                    .then(() => {
                        res.json({ message: 'Profile has been updated successfully!', length: 1 })
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })

            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}

exports.educationCreate = (req, res) => {
    let Education = req.body.educationData;
    let Userid = req.body._id;
    require = ['_id', 'universityName', 'fieldOfStudy', 'degree', 'fromDate', 'toDate'];
    integer = [];
    getConnection.then((db) => {
        Education = functions.IsArray(Education);
        // functions.validation([req.body.educationData, require, integer])
        //     .then(() => {
        Promise.all(
            Education.map(eduval => {
                if (!_.isEmpty(eduval)) {
                    if (eduval.eduId) {
                        functions.AcetrixDB([{
                            action: "update",
                            collection: "profile",
                            fields: {
                                'education.$.universityName': eduval.universityName,
                                'education.$.fieldOfStudy': eduval.fieldOfStudy,
                                'education.$.degree': eduval.degree,
                                'education.$.fromDate': eduval.fromDate,
                                'education.$.toDate': eduval.toDate
                            },
                            where: { userId: ObjectID(Userid), 'education.eduId': eduval.eduId },
                            check: "false"
                        }, db])
                    } else {
                        eduval.eduId = randomNumber(11);
                        db.collection('profile').update({ userId: ObjectID(Userid) },
                            {
                                $set: { flag: 1 },
                                $push: { education: eduval }
                            })
                    }
                }
            })).then(() => {
                res.json({ message: 'Education details has Created successfully!', result: Education[0], length: 1 });
            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            });
        // })
        // .catch((err) => {
        //     log.write(err.stack + "\n");
        //     res.json({ message: err.toString(), length: 0 });
        // });
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        });
}

exports.educationUpdate = (req, res) => {
    let Education = req.body.educationData;
    let Userid = req.body.educationData._id;
    getConnection.then((db) => {
        require = ['_id', 'universityName', 'fieldOfStudy', 'degree', 'eduId', 'fromDate', 'toDate'];
        integer = [];
        functions.validation([req.body.educationData, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: {
                        'education.$.universityName': Education.universityName,
                        'education.$.fieldOfStudy': Education.fieldOfStudy,
                        'education.$.degree': Education.degree,
                        'education.$.fromDate': Education.fromDate,
                        'education.$.toDate': Education.toDate
                    },
                    where: { userId: ObjectID(Userid), 'education.eduId': Education.eduId },
                    check: "false"
                }, db])
                    .then(() => {
                        res.json({ message: 'Education details has been updated successfully!', length: 1 })
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })

            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}

exports.educationDelete = (req, res) => {
    getConnection.then((db) => {
        require = ['userId', 'eduId'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                db.collection('profile').update({ userId: ObjectID(req.body.userId) },
                    { $pull: { education: { eduId: req.body.eduId } } })
                    .then(() => {
                        res.json({ message: "Education details deleted succesfully", length: 1 });
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
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
}

exports.experienceCreate = (req, res) => {
    let Experience = req.body.experienceData;
    // Experience.expId = randomNumber(11);
    let Userid = req.body._id;
    // require = ['_id', 'companyName', 'designation', 'fromDate', 'toDate'];
    // integer = [];
    getConnection.then((db) => {
        Experience = functions.IsArray(Experience);
        // functions.validation([req.body.experienceData, require, integer])
        //     .then(() => {
        Promise.all(
            Experience.map(expval => {
                if (!_.isEmpty(expval)) {
                    if (expval.expId) {
                        functions.AcetrixDB([{
                            action: "update",
                            collection: "profile",
                            fields: {
                                'experience.$.companyName': expval.companyName,
                                'experience.$.designation': expval.designation,
                                'experience.$.fromDate': expval.fromDate,
                                'experience.$.toDate': expval.toDate
                            },
                            where: { userId: ObjectID(Userid), 'experience.expId': expval.expId },
                            check: "false"
                        }, db])
                    } else {
                        expval.expId = randomNumber(11);
                        db.collection('profile').update({ userId: ObjectID(Userid) },
                            { $set: { flag: 1 }, $push: { experience: expval } })
                    }
                }
            }))
            .then(() => {
                res.json({ message: 'Experience details has Created successfully!', result: Experience[0], length: 1 });
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            });
        // })
        // .catch((err) => {
        //     log.write(err.stack + "\n");
        //     res.json({ message: err.toString(), length: 0 });
        // });
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        });
}

exports.experienceUpdate = (req, res) => {
    let Experience = req.body.experienceData;
    let Userid = req.body.experienceData._id;
    require = ['_id', 'companyName', 'designation', 'fromDate', 'toDate', 'expId'];
    integer = [];
    getConnection.then((db) => {
        functions.validation([req.body.experienceData, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: {
                        'experience.$.companyName': Experience.companyName,
                        'experience.$.designation': Experience.designation,
                        'experience.$.fromDate': Experience.fromDate,
                        'experience.$.toDate': Experience.toDate
                    },
                    where: { userId: ObjectID(Userid), 'experience.expId': Experience.expId },
                    check: "false"
                }, db])
                    .then(() => {
                        res.json({ message: 'Experience details has been updated successfully!', length: 1 })
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })
            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })

    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}

exports.experienceDelete = (req, res) => {
    getConnection.then((db) => {
        require = ['userId', 'expId'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                db.collection('profile').update({ userId: ObjectID(req.body.userId) },
                    { $pull: { experience: { expId: req.body.expId } } })
                    .then(() => {
                        res.json({ message: "Experience details deleted succesfully", length: 1 });
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
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })

}

exports.achievementsCreate = (req, res) => {
    let Achievements = req.body.achievementsData;
    Achievements.achivId = randomNumber(11);
    let Userid = req.body.achievementsData._id;
    require = ['_id', 'achievements'];
    integer = [];
    getConnection.then((db) => {
        functions.validation([req.body.achievementsData, require, integer])
            .then(() => {
                delete Achievements._id;
                db.collection('profile').update({ userId: ObjectID(Userid) },
                    { $set: { flag: 1 }, $push: { achievements: Achievements } })
                    .then(() => {
                        res.json({ message: 'Achievement details has Created successfully!', result: Achievements, length: 1 });
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.toString(), length: 0 });
                    });

            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })

    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}
exports.achievementsUpdate = (req, res) => {
    getConnection.then((db) => {
        let Achievements = req.body.achievementsData.achievements;
        let Achivid = req.body.achievementsData.achivId;
        let Userid = req.body.achievementsData._id;
        require = ['_id', 'achievements', 'achivId'];
        integer = [];
        functions.validation([req.body.achievementsData, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: { 'achievements.$.achievements': Achievements },
                    where: { userId: ObjectID(Userid), 'achievements.achivId': Achivid },
                    check: "false"
                }, db])
                    .then(() => {
                        res.json({ message: 'Achievement details has been updated successfully!', length: 1 })
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })
            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.message, length: 0 });
            })

    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}

exports.achievementsDelete = (req, res) => {
    getConnection.then((db) => {
        require = ['userId', 'achivId'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                db.collection('profile').update({ userId: ObjectID(req.body.userId) },
                    { $pull: { achievements: { achivId: req.body.achivId } } })
                    .then(() => {
                        res.json({ message: "Achievement details deleted succesfully", length: 1 });
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
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })

}

exports.recommendationCreate = (req, res) => {
    let Recommendation = req.body.recommendationData;
    Recommendation.recomId = randomNumber(11);
    let Userid = req.body.recommendationData._id;
    require = ['_id', 'recommendation'];
    integer = [];
    getConnection.then((db) => {
        functions.validation([req.body.recommendationData, require, integer])
            .then(() => {
                delete Recommendation._id;
                db.collection('profile').update({ userId: ObjectID(Userid) },
                    { $set: { flag: 1 }, $push: { recommendation: Recommendation } })
                    .then(() => {
                        res.json({ message: 'Recommendation details has Created successfully!', length: 1 });
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

    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })

}
exports.recommendationUpdate = (req, res) => {
    getConnection.then((db) => {
        let recommendation = req.body.recommendationData.recommendation;
        let Recomid = req.body.recommendationData.recomId;
        let Userid = req.body.recommendationData._id;
        require = ['_id', 'recommendation', 'recomId'];
        integer = [];
        functions.validation([req.body.recommendationData, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: { 'recommendation.$.recommendation': recommendation },
                    where: { userId: ObjectID(Userid), 'recommendation.recomId': Recomid },
                    check: "false"
                }, db])
                    .then(() => {
                        res.json({ message: 'recommendation has been updated successfully!', length: 1 })
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })
            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.message, length: 0 });
            })

    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}

exports.recommendationDelete = (req, res) => {
    getConnection.then((db) => {
        require = ['userId', 'recomId'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                db.collection('profile').update({ userId: ObjectID(req.body.userId) },
                    { $pull: { recommendation: { recomId: req.body.recomId } } })
                    .then(() => {
                        res.json({ message: "recommendation has been deleted succesfully", length: 1 });
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
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })

}
exports.documentsUploads = (req, res) => {
    let id = req.body._id;
    let dockey = req.body.type;
    let docpath = req.body.path;
    let Obj = '{"' + dockey + '": "' + docpath + '"}';
    Obj = JSON.parse(Obj);
    // Obj.activetab = req.body.activetab;
    getConnection.then((db) => {
        require = ['_id', 'type', 'path'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: Obj,
                    where: { userId: ObjectID(id) },
                    check: "false"
                }, db])
                    .then(() => {
                        res.json({ message: 'Documents are Uploaded successfully!', length: 1 })
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })

            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}

exports.expertiseCreate = (req, res) => {
    let Expertise = req.body.expertiseData;
    Expertise.experId = randomNumber(11);
    let Userid = req.body.expertiseData._id;
    let require = ['_id', 'expertise'];
    let integer = [];
    getConnection.then((db) => {
        functions.validation([req.body.expertiseData, require, integer])
            .then(() => {
                delete Expertise._id;
                db.collection('profile').update({ userId: ObjectID(Userid) },
                    { $set: { flag: 1 }, $push: { expertise: Expertise } })
                    .then(() => {
                        res.json({ message: 'Expertise details has been Created successfully!', result: Expertise, length: 1 });
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
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        });

}

exports.expertiseUpdate = (req, res) => {
    getConnection.then((db) => {
        let Expertise = req.body.expertiseData.expertise;
        let Experid = req.body.expertiseData.experId;
        let Userid = req.body.expertiseData._id;
        let require = ['_id', 'expertise', 'experId'];
        let integer = [];
        functions.validation([req.body.expertiseData, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: { 'expertise.$.expertise': Expertise },
                    where: { 'userId': ObjectID(Userid), 'expertise.experId': Experid },
                    check: "false"
                }, db])
                    .then(() => {
                        res.json({ message: 'Expertise details has been updated successfully!', length: 1 })
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })
            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })

    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}

exports.expertiseDelete = (req, res) => {
    getConnection.then((db) => {
        let require = ['userId', 'experId'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                db.collection('profile').update({ userId: ObjectID(req.body.userId) },
                    { $pull: { expertise: { experId: req.body.experId } } })
                    .then(() => {
                        res.json({ message: "Expertise details deleted succesfully", length: 1 });
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
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
}
// It shows the list of Avail people 
exports.relatedProfiles = (req, res) => {
    getConnection.then((db) => {
        let id = req.params.id;
        let require = ['id'];
        let integer = [];
        functions.validation([req.params, require, integer])
            .then(() => {

                functions.AcetrixDB([{
                    action: "find",
                    collection: "profile",
                    where: { userId: ObjectID(id) },
                    selectfields: {},
                    check: "false"
                }, db])
                    .then((info) => {
                        if (info.info.length > 0) {
                            info.info[0].acceptIds.push(ObjectID(id));
                            let array = info.info[0].acceptIds.concat(info.info[0].sentrequestIds);
                            let array1 = array.concat(info.info[0].requestIds);
                            functions.AcetrixDB([{
                                action: "find",
                                collection: "profile",
                                where: { userId: { $nin: array1 } },
                                selectfields: { firstName: 1, lastName: 1, userId: 1 },
                                check: "false"
                            }, db])
                                .then((result) => {
                                    res.json({ message: "hi this is suggest request list URL", result: result.info, length: 1 });
                                })
                                .catch((err) => {
                                    log.write(err.stack + "\n");
                                    res.json({ message: err.toString(), length: 0 });
                                })
                        }
                        else {
                            res.json({ message: "hi this is suggest request list URL", result: info, length: 1 });
                        }
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
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
}
// It puts a request to a perticular user
exports.requestProfile = (req, res) => {
    let requestid = req.body.requestId;
    let userid = req.body.userId;
    getConnection.then((db) => {
        require = ['userId', 'requestId'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                db.collection('profile').update({ userId: ObjectID(requestid) },
                    {
                        $push: {
                            requestIds: ObjectID(userid)
                        }
                    })
                    .then(() => {
                        db.collection('profile').update({ userId: ObjectID(userid) },
                            {
                                $push: {
                                    sentrequestIds: ObjectID(requestid)
                                }
                            })
                            .then((info) => {

                                db.collection('activity').insert({ activityId: ObjectID(requestid), userId: ObjectID(userid), typeofactivity: 'sent connection request', todayDate: new Date(), type: 'profile' }).then((resp) => {
                                    res.json({ message: 'request sent successfully!', length: 1, info: info });
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
                    });
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            });
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        });
}

//It shows List of people who are sent a request to a user
exports.connectRequestList = (req, res) => {
    let userid = req.params.id;
    getConnection.then((db) => {
        require = ['id'];
        integer = [];
        functions.validation([req.params, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "find",
                    collection: "profile",
                    where: { userId: ObjectID(userid) },
                    selectfields: { requestIds: 1 },
                    check: "false"
                }, db])
                    .then((info) => {
                        if (info.info.length > 0) {
                            functions.AcetrixDB([{
                                action: "find",
                                collection: "profile",
                                where: { userId: { "$in": info.info[0].requestIds } },
                                selectfields: { firstName: 1, lastName: 1, userId: 1, role: 1, profileImage: 1 },
                                check: "false"
                            }, db])
                                .then((result) => {
                                    res.json({ message: "hi this is connectrequest list URL", result: result.info, length: 1 });
                                })
                                .catch((err) => {
                                    log.write(err.stack + "\n");
                                    res.json({ message: err.toString(), length: 0 });
                                })

                        } else {
                            res.json({ message: "hi this is connectrequest list URL", result: info, length: 1 });
                        }
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.toString(), length: 0 });
                    });
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

exports.acceptRequest = (req, res) => {
    let userid = req.body.userId
    let requestid = req.body.requestId
    getConnection.then((db) => {
        require = ['userId', 'requestId'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                db.collection('profile').update({ userId: ObjectID(userid) },
                    { $pull: { requestIds: ObjectID(requestid) } })
                    .then(() => {
                        db.collection('profile').update({ userId: ObjectID(userid) },
                            { $push: { acceptIds: ObjectID(requestid) } })
                            .then(() => {
                                db.collection('profile').update({ userId: ObjectID(requestid) },
                                    { $push: { acceptIds: ObjectID(userid) } })
                                    .then((info) => {
                                        db.collection('profile').update({ userId: ObjectID(requestid) },
                                            { $pull: { sentrequestIds: ObjectID(userid) } })
                                        db.collection('activity').insert({ activityId: ObjectID(requestid), userId: ObjectID(userid), typeofactivity: 'accepted connection request', todayDate: new Date(), type: 'profile' }).then((resp) => {
                                            res.json({ message: "Request accepted successful.... ", info: info, length: 1 });
                                        });
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
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });

        })
}
exports.rejectRequest = (req, res) => {
    getConnection.then((db) => {
        let userid = req.body.userId
        let requestid = req.body.requestId
        require = ['userId', 'requestId'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                db.collection('profile').update({ userId: ObjectID(userid) },
                    { $pull: { requestIds: ObjectID(requestid) } })
                    .then(() => {
                        db.collection('profile').update({ userId: ObjectID(requestid) },
                            { $pull: { sentrequestIds: ObjectID(userid) } })
                            .then((info) => {
                                res.json({ message: "request rejected.... ", info: info, length: 1 });
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

exports.connectProfileActivity = (req, res) => {
    getConnection.then((db) => {
        let global = [{ profile: {}, connections: {}, classes: [], activity: [], isFriend: "no" }];
        let Loginid = req.body.loginId;
        let Connectid = req.body.connectId
        functions.AcetrixDB([{
            action: 'join',
            primaryCollection: 'profile',
            joincollections: ['activity'],
            newKey: ['activityData'],
            keys: [{ leftKeys: 'userId', rightKeys: 'userId' }],
            where: { userId: ObjectID(Connectid) }
        }, db])
              .then((info) => {
                  global[0].activity=info.info[0].activityData
                  if(info.info[0].myClass){
              Promise.all(info.info[0].myClass.map(item =>
                        functions.AcetrixDB([{
                            action: "find",
                            collection: "mentors",
                            where: { userId: ObjectID(item.mentorId), 'scheduleCourse.scheduleId': item.scheduleId },
                            selectfields: { 'scheduleCourse.$.scheduleId': 1, userId: 1 }
                        }, db]))).then((buyedclasses)=>{
                            buyedclasses.map(val=>{ 
                                global[0].classes.push(val.info[0])
                            })
                            })
                  }
                global[0].profile = info.info[0];
                if (info.info[0].acceptIds.length > 0) {
                    Promise.all(info.info[0].acceptIds.map(val => {
                        if (val == Loginid) {
                            global[0].isFriend = "yes";
                        }
                    })).then(() => {

                    })
                    Promise.all(info.info[0].acceptIds.map(val =>
                        functions.AcetrixDB([{
                            action: "find",
                            collection: "profile",
                            where: { userId: ObjectID(val) },
                            selectfields: { firstName: 1, lastName: 1, role: 1, userId: 1 }
                        }, db])
                    ))
                        .then((info) => {
                            functions.AcetrixDB([{
                                action: "find",
                                collection: "mentors",
                                where: { userId: ObjectID(Connectid) },
                                selectfields: { feedback: 1 }
                            }, db]).then((info) => {
                                if(info.info){
                                    if (info.info[0].length > 0) {
                                        global[0].profile.feedback = info.info[0].feedback;
                                    }
                                } else {
                                    global[0].profile.feedback = 0
                                }
                            })
                            let num = [];
                            Promise.all(info.map(val => {
                                if (val.info[0].userId == Connectid) {
                                }
                                if (val.info[0].userId == Loginid) {
                                }
                                else { num.push(val.info[0]); }

                            })).then(() => {
                                global[0].connections = num;
                                res.json({ message: 'Activity details are fetch successfully!', length: 1, global })
                            })
                        }).catch((err) => {
                            log.write(err.stack + "\n");
                            res.json({ message: err.toString(), length: 0 });
                        })
                } else {
                    res.json({ message: 'Activity details are fetch successfully!', length: 1, global })
                }

            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })

    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}

exports.myActivity = (req, res) => {
    let id = req.params.id;
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "find",
            collection: "profile",
            where: { userId: ObjectID(id) },
            selectfields: { acceptIds: 1 },
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
                activityData([dataActivity, db]).then(ret => {
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
exports.myConnectList = (req, res) => {
    let userid = req.params.id;
    let global = [{ profile: [], classes: [] }];
    getConnection.then((db) => {
        require = ['id'];
        integer = [];
        functions.validation([req.params, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "find",
                    collection: "profile",
                    where: { userId: ObjectID(userid) },
                    selectfields: { acceptIds: 1 },
                    check: "false"
                }, db])
                    .then((info) => {
                        if (info.info.length > 0) {
                            let todate = functions.DateConversion(new Date());
                            functions.AcetrixDB([{
                                action: "find",
                                collection: "profile",
                                where: { userId: { "$in": info.info[0].acceptIds } },
                                selectfields: { firstName: 1, lastName: 1, userId: 1, role: 1, profileImage: 1, acceptIds: 1, 'myClass.scheduleId': 1 }

                            }, db])
                                .then((result) => {
                                    global[0].info = result.info;
                                    let Arr = [];

                                    if (result.info > 0) {
                                        res.json({ message: "connectionlist", result: result.info[0], length: 1 });
                                    } else {
                                        res.json({ message: "there are no connected people", result: global[0], length: 0 });
                                    }

                                })
                                .catch((err) => {
                                    log.write(err.stack + "\n");
                                    res.json({ message: err.toString(), length: 0 });

                                })
                        }
                        else {
                            res.json({ message: "there are no connected people", result: { info: [] }, length: 0 });
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
            });
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        });
}
profileFunc = (profInfo, global, pg, cnt, db, res) => {
    if (pg < cnt) {
        let val = profInfo[pg];
        mentorFunc(val.myClass, profInfo, global, 0, val.myClass.length, pg, cnt, db, res);
    }
}
mentorFunc = (val, profInfo, global, m, mCnt, pg, cnt, db, res) => {
    if (m < mCnt) {
        let mval = val[m];
        functions.AcetrixDB([{
            action: "find",
            collection: "mentors",
            where: { userId: ObjectID(mval.mentorId) },
            selectfields: { scheduleCourse: { $elemMatch: { scheduleId: mval.scheduleId } } },
        }, db])
            .then((classinfo) => {
                let ClassObj = {
                    firstName: profInfo[pg].firstName,
                    lastName: profInfo[pg].lastName,
                    userId: profInfo[pg].userId, role: profInfo[pg].role,
                    profileImage: profInfo[pg].profileImage,
                    courseName: classinfo.info[0].scheduleCourse[0].courseName,
                    maxPeople: classinfo.info[0].scheduleCourse[0].maxPeople,
                    buyers: classinfo.info[0].scheduleCourse[0].buyers,
                    scheduleId: classinfo.info[0].scheduleCourse[0].scheduleId,

                };

                let currenttime = moment().format("HH:mm");
                let sDate
                if (moment() > classinfo.info[0].scheduleCourse[0].startDate) {
                    if (String(classinfo.info[0].scheduleCourse[0].endTime) > currenttime) {
                        sDate = moment.utc().format('LL');
                    } else {
                        sDate = moment.utc(moment(new Date()).add(1, 'days')).format('LL');
                    }
                } else {
                    sDate = moment.utc(moment(new Date(classinfo.info[0].scheduleCourse[0].startDate))).format('LL');
                }
                ClassObj.startTime = sDate + " " + classinfo.info[0].scheduleCourse[0].startTime
                ClassObj.endTime = sDate + ' ' + classinfo.info[0].scheduleCourse[0].endTime
                classinfo.info[0].scheduleCourse[0].startDate = moment(classinfo.info[0].scheduleCourse[0].startDate).format('DD-MM-YYYY');
                global[0].classes.push(ClassObj);
                if (Number(m + 1) === Number(mCnt)) {
                    if (Number(pg + 1) === Number(cnt)) {
                        res.json({ message: "this is a List of my connected people", result: global[0], length: 1 });
                    } else {
                        pg++;
                        profileFunc(profInfo, global, pg, cnt, db, res);
                    }
                } else {
                    m++;
                    mentorFunc(val, profInfo, global, m, mCnt, pg, cnt, db, res);
                }
            })
    }
}
exports.userimageUploads = (req, res) => {
    getConnection.then((db) => {
        let id = req.body._id;
        let profileImage = req.body.profileImage;
        let require = ['_id', 'profileImage'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: {
                        'profileImage': profileImage,
                    },
                    where: { userId: ObjectID(id) },
                    check: "false"
                }, db])
                    .then((info) => {
                        res.json(info)
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })
            }).catch((err) => {
                res.json({ message: err, length: 0 });
            })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}

//for coach details update
exports.coachUpdate = (req, res) => {
    getConnection.then((db) => {
        let Iscoach = req.body.isCoach;
        let Userid = req.body.userId;
        let require = ['isCoach', 'userId'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: { 'isCoach': Iscoach },
                    where: { 'userId': ObjectID(Userid) },
                    check: "false"
                }, db])
                    .then((info) => {
                        res.json({ message: 'coach details has been updated successfully!', length: 1, info })
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })
            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })

    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
};

exports.connectionSearchData = (req, res) => {
    let Textname = req.body.text;
    let Userid = req.body.userId;
    if (Textname !== undefined) {
        selectcond = { $text: { $search: Textname } };
    } else {
        selectcond = {};
    }
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "find",
            collection: "profile",
            where: selectcond,
            selectfields: {}
        }, db])
            .then((info) => {
                if (info.info.length === 0) {
                    functions.AcetrixDB([{
                        action: "find",
                        collection: "mentors",
                        where: {
                            scheduleCourse:
                            {
                                $elemMatch:
                                {
                                    courseName: Textname
                                }
                            }
                        },
                        selectfields: { scheduleCourse: 1, feedback: 1 }
                    }, db])
                        .then((info) => {
                            if (info.info.length === 0) {
                                res.json({ message: "No Data Found", length: 0 });
                            } else {

                                res.json({ message: "Searching is done", length: 1, info: info.info[0] });
                            }
                        }).catch((err) => {
                            log.write(err.stack + "\n");
                            res.json({ message: err.toString(), length: 0 });
                        })
                }
                else {
                    info.info.map((val, key) => {
                        if (val.userId == Userid) {
                            info.info.splice(key, 1);
                        }
                    })
                    res.json({ message: "Searching is done", length: 1, info: info.info });
                }
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
};
exports.activityDashboard = (req, res) => {
    let id = req.params.userId;
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: 'join',
            primaryCollection: 'activity',
            joincollections: ['profile'],
            newKey: ['profileData'],
            keys: [{ leftKeys: 'userId', rightKeys: 'userId' }],
            where: { userId: ObjectID(id) }
        }, db])
            .then((info) => {
                activityData([info.info, db]).then(ret => {
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
                    .catch(err => {
                        res.json({ message: err.message, length: 0 })
                    })
            })
            .catch((err) => {
                res.json({ message: err.message, length: 0 });
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
activityData = (info) => {
    return new Promise((reslove, reject) => {
        let promises = []
        info[0].map(item => {
            if (item.type == 'profile') {
                promises.push(functions.AcetrixDB([{
                    action: 'find',
                    collection: 'profile',
                    where: { userId: ObjectID(item.activityId) },
                    selectfields: { firstName: 1, lastName: 1, role: 1, userId: 1, _id: 1,profileImage:1 }
                }, info[1]])
                    .then(activityInfo => {
                        let data = [{ userId: activityInfo.info[0].userId, profileImage: activityInfo.info[0].profileImage, profileName: activityInfo.info[0].firstName + " " + activityInfo.info[0].lastName, role: activityInfo.info[0].role }]
                        return { userId: item.profileData.userId, profileImage: item.profileData.profileImage, todatDate: item.todayDate, type: item.type, role: item.profileData.role, Name: item.profileData.firstName + " " + item.profileData.lastName, typeOfActivity: item.typeofactivity, Data: data }
                    })
                    .catch(err => {
                        reject(err)
                    }))
            }
        })
        reslove(promises);
    })
}

exports.goalUpdate = (req, res) => {
    let id = req.body.userId, goal = req.body.goal, activetab = req.body.activetab, timeline=req.body.timeline;
    getConnection.then((db) => {
        require = ['userId', 'goal'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: { goal: goal, activetab: activetab,timeline:timeline },
                    where: { userId: ObjectID(id) },
                    check: "false"
                }, db])
                    .then(() => {
                        res.json({ message: 'Goal has been updated successfully!', length: 1 });
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })

            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}
exports.summaryUpdate = (req, res) => {
    let id = req.body.userId, summary = req.body.summary;
    getConnection.then((db) => {
        require = ['userId', 'summary'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: { summary: summary },
                    where: { userId: ObjectID(id) },
                    check: "false"
                }, db])
                    .then(() => {
                        res.json({ message: 'summary has been updated successfully!', length: 1 });
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })

            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.toString(), length: 0 });
            })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}
exports.disconnect = (req, res) => {
    getConnection.then((db) => {
        let userId = req.body.userId
        let connectId = req.body.connectId
        require = ['userId', 'connectId'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                db.collection('profile').update({ userId: ObjectID(userId) },
                    { $pull: { acceptIds: ObjectID(connectId) } })
                    .then(() => {
                        db.collection('profile').update({ userId: ObjectID(connectId) },
                            { $pull: { acceptIds: ObjectID(userId) } })
                            .then((info) => {
                                res.json({ message: " disconneted .... ", info: info, length: 1 });
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

exports.updateallgoals = (req, res) => {
  var role = req.params.role
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "update",
            collection: "profile",
            fields: { goal: '' },
            where: { role: role},
            check: "false"
        }, db])
            .then(() => {
                res.json({ message: 'summary has been updated successfully!', length: 1 });
            })
           
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}
randomNumber = (len) => {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64')   // convert to base64 format
        .slice(0, len)        // return required number of characters
        .replace(/\+/g, '0')  // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
}
