const getConnection = require('../../lib/connection.js');
const functions = require('./../functions.js');
const fs = require('fs');
const moment = require('moment');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');
const ObjectID = require('mongodb').ObjectID;

exports.jobsCreate = (req, res) => {
    let jobCreation = { jobdetails: '', profileImage: '' }
    let Organizationid = req.body.organizationId;
    let Jobtitle = req.body.jobTitle;
    let Jobtype = req.body.jobType;
    let Jobdesc = req.body.jobDesc;
    let JobLocation = req.body.jobLocation;
    getConnection.then((db) => {
        require = ['organizationId', 'jobTitle', 'jobType', 'jobDesc', 'jobLocation'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "find",
                    collection: "company",
                    where: { companyId: ObjectID(Organizationid) },
                    selectfields: {}
                }, db])
                    .then((response) => {
                        let job = { organizationId: ObjectID(Organizationid), jobTitle: Jobtitle, jobType: Jobtype, jobLocation: JobLocation, jobDesc: Jobdesc, appliedCandidates: [], todayDate: new Date() }
                        getConnection.then((db) => {
                            functions.AcetrixDB([{
                                action: "insert",
                                collection: "jobs",
                                fields: job,
                                where: { todayDate: new Date() }
                            }, db])
                                .then((info) => {
                                    jobCreation.jobdetails = info.info.ops
                                    jobCreation.profileImage = response.info[0].profileImage
                                    res.json({ message: 'Job created successfully!', length: 1, info: jobCreation });
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
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.message, length: 0 })
            })

    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.message, length: 0 })
        })
}
/*deprecated service*/
exports.jobsList = (req, res) => {
    Id = req.params.id;
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: 'join',
            primaryCollection: 'jobs',
            joincollections: ['company'],
            newKey: ['CompanyData'],
            keys: [{ leftKeys: 'organizationId', rightKeys: 'companyId' }],
            where: { appliedCandidates: { $nin: [ObjectID(Id)] } }
        }, db])
            .then((info) => {
                res.json({ message: 'job details got successfully!', length: 1, info: info.info });
            }).catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.message, length: 0 });
            })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}
/**service to show organization created jobs and also show list of jobs having applied by candidates */
exports.organizationJobsList = (req, res) => {
    let organizationJobsListArray = { appliedJobsList: [], orgjobslist: [] }
    getConnection.then((db) => {
        require = ['id'];
        integer = [];
        functions.validation([req.params, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "join",
                    primaryCollection: 'jobs',
                    joincollections: ['company'],
                    newKey: ['CompanyData'],
                    keys: [{ leftKeys: 'organizationId', rightKeys: 'companyId' }],
                    where: { organizationId: ObjectID(req.params.id) },
                    selectfields: { sort: { todayDate: -1 } }
                }, db])
                    .then((info) => {
                        organizationJobsListArray.orgjobslist = info.info;
                        info.info.map(val => {
                            if (val.appliedCandidates.length > 0) {
                                organizationJobsListArray.appliedJobsList.push(val)
                            }
                        })
                        res.json({ message: 'job details got successfully!', info: organizationJobsListArray, length: 1 });
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
/*service for update the job specs */
exports.jobsUpdate = (req, res) => {
    let jobObj = req.body;
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "update",
            collection: "jobs",
            fields: { jobTitle: jobObj.jobTitle, jobType: jobObj.jobType, jobLocation: jobObj.jobLocation, jobDesc: jobObj.jobDesc },
            where: { _id: ObjectID(req.body.jobId) },
            check: "false"
        }, db])
            .then(() => {
                res.json({ message: 'jobs has been updated successfully!', length: 1 });
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
/** service for delete jobs */
exports.jobsDelete = (req, res) => {
    let jobObj = req.body;
    let id = jobObj.deleteJob;
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "remove",
            collection: "jobs",
            where: { _id: ObjectID(id) }
        }, db])
            .then(() => {
                res.json({ message: 'jobs are deleted successfully!', length: 1 })
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
}

/* On load of jobs page will show related jobs and applied jobs */
exports.jobsDashboard = (req, res) => {
    let id = req.params.id;
    let jobsArr = { relatedjobs: [], appliedjobs: [], alljobs:[] }
    getConnection.then((db) => {
        require = ['id'];
        integer = [];
        functions.validation([req.params, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: 'join',
                    primaryCollection: 'jobs',
                    joincollections: ['company'],
                    newKey: ['CompanyData'],
                    keys: [{ leftKeys: 'organizationId', rightKeys: 'companyId' }],
                    where: { appliedCandidates:{$ne: ObjectID(id)} }
                }, db]).then((alljobsinfo)=>{
                    jobsArr.alljobs=alljobsinfo.info
                })
                functions.AcetrixDB([{
                    action: "find",
                    collection: "profile",
                    where: { userId: ObjectID(id) },
                    selectfields: { goal: 1 }
                }, db])
                    .then((info) => {
                        if (info.info.length > 0) {
                            let Textname = info.info[0].goal;
                            if (Textname !== undefined) {
                                selectcond = {
                                    $text: { $search: Textname, $diacriticSensitive: false, $caseSensitive: false }
                                }
                            } else {
                                selectcond = {};
                            }
                            functions.AcetrixDB([{
                                action: "find",
                                collection: "jobs",
                                where: selectcond
                            }, db])
                                .then((finalrest) => {
                                    Promise.all(finalrest.info.map(val => {
                                        if (val.appliedCandidates.filter(e => (String(e) == String(id))).length === 0) {
                                            functions.AcetrixDB([{
                                                action: "find",
                                                collection: "company",
                                                where: { companyId: ObjectID(val.organizationId) }
                                            }, db]).then((cmpydata) => {
                                                val.CompanyData = cmpydata.info[0]
                                                jobsArr.relatedjobs.push(val)
                                            })

                                        }
                                    }))
                                    functions.AcetrixDB([{
                                        action: 'join',
                                        primaryCollection: 'jobs',
                                        joincollections: ['company'],
                                        newKey: ['CompanyData'],
                                        keys: [{ leftKeys: 'organizationId', rightKeys: 'companyId' }],
                                        where: { appliedCandidates: { $elemMatch: { $eq: ObjectID(id) } } },
                                        selectfields: { sort: { todayDate: -1 } }
                                    }, db])
                                        .then((appliedjobsresult) => {
                                            jobsArr.appliedjobs = appliedjobsresult.info
                                            res.json({ result: jobsArr, length: 1 })
                                        })
                                        .catch((err) => {
                                            log.write(err.stack + "\n");
                                            res.json({ message: err.message, length: 0 })
                                        })


                                })
                                .catch((err) => {
                                    log.write(err.stack + "\n");
                                    res.json({ message: err.message, length: 0 })
                                })
                        }
                        else {
                            res.json({ result:jobsArr, length: 1 })
                        }
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })
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

/**service for getting job details and his friends list who ever have been applied for this job */
exports.jobInfo = (req, res) => {
    let AppliedJobsInfo = { jobinfo: {}, appliedfriends: [] }
    let id = req.body._id;
    getConnection.then((db) => {
        require = ['_id', 'userId'];
        integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: 'join',
                    primaryCollection: 'jobs',
                    joincollections: ['company'],
                    newKey: ['companyinfo'],
                    keys: [{ leftKeys: 'organizationId', rightKeys: 'companyId' }],
                    where: { _id: ObjectID(id) }
                }, db])
                    .then((info) => {
                        AppliedJobsInfo.jobinfo = info.info[0]
                        appliedCandidatesArray = info.info[0].appliedCandidates;
                        functions.AcetrixDB([{
                            action: "find",
                            collection: "profile",
                            where: { userId: ObjectID(req.body.userId) },
                            selectfields: { acceptIds: 1 }
                        }, db])
                            .then((profresult) => {
                                let acceptIdsArray = [];
                                if (profresult.info[0].acceptIds.length > 0) {
                                    acceptIdsArray = profresult.info[0].acceptIds;
                                    finalArr = []
                                    appliedCandidatesArray.map(val => {
                                        acceptIdsArray.map(item => {
                                            if (String(item) == String(val)) {
                                                finalArr.push(item)
                                            }
                                        })
                                    })
                                    if (finalArr.length > 0) {
                                        Promise.all(finalArr.map(val =>
                                            functions.AcetrixDB([{
                                                action: "find",
                                                collection: "profile",
                                                where: { userId: ObjectID(val) },
                                                selectfields: { role: 1, firstName: 1, lastName: 1, userId: 1, profileImage: 1 }
                                            }, db])
                                                .then((finalresult) => {
                                                    AppliedJobsInfo.appliedfriends.push(finalresult.info[0])
                                                    return
                                                })
                                        ))
                                            .then(() => {
                                                delete AppliedJobsInfo.jobinfo.appliedCandidates;
                                                res.json({ result: AppliedJobsInfo, length: 1 })
                                            })
                                    }
                                    else if (finalArr.length === 0) {
                                        res.json({ result: AppliedJobsInfo, length: 1 })

                                    }
                                } else if (profresult.info[0].acceptIds.length === 0) {
                                    res.json({ result: AppliedJobsInfo, length: 1 })

                                }
                            })
                    })
                    .catch((err) => {

                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 })
                    })
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

/** service for candidates list who ever has applied for perticular job  */
exports.jobAppliedCandidatesList = (req, res) => {
    getConnection.then((db) => {
        let jobAppliedCandidatesListArray = { appliedCandidateslist: [], jobdetails: {} }
        let id = req.params.id;
        require = ['id'];
        integer = [];
        functions.validation([req.params, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: 'join',
                    primaryCollection: 'jobs',
                    joincollections: ['company'],
                    newKey: ['CompanyData'],
                    keys: [{ leftKeys: 'organizationId', rightKeys: 'companyId' }],
                    where: { _id: ObjectID(id) }
                }, db])
                    .then(info => {
                        jobAppliedCandidatesListArray.jobdetails = info.info[0];
                        return Promise.all(info.info[0].appliedCandidates.map(item =>
                            functions.AcetrixDB([{
                                action: "find",
                                collection: "profile",
                                where: { userId: ObjectID(item) },
                                selectfields: { userId: 1, firstName: 1, lastName: 1, email: 1, phoneNumber: 1, profileImage: 1 ,role:1}
                            }, db])
                        ))
                    })
                    .then(data => {
                        data.map(val => {
                            jobAppliedCandidatesListArray.appliedCandidateslist.push(val.info[0]);
                        })
                        res.json({ info: jobAppliedCandidatesListArray, length: 1 });
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
/**service for apply a perticular job by a perticular user */
exports.jobsApply = (req, res) => {
    let Userid = req.body.applyUserId;
    let id = req.body.applyJobId;
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "find",
            collection: "jobs",
            where: { _id: ObjectID(id) },
            selectfields: {}
        }, db])
            .then((userinfo) => {
                if (userinfo.length !== 0) {
                    functions.AcetrixDB([{
                        action: "find",
                        collection: "jobs",
                        where: { $and: [{ _id: ObjectID(id) }, { appliedCandidates: { $elemMatch: { $eq: ObjectID(Userid) } } }] },
                        selectfields: {}
                    }, db])
                        .then((applyinfo) => {
                            if (applyinfo.info.length === 0) {
                                db.collection('jobs').update({ _id: ObjectID(id) },
                                    { $push: { appliedCandidates: ObjectID(Userid) } })
                                    .then((info) => {
                                        db.collection('activity').insert({ activityId: ObjectID(id), userId: ObjectID(Userid), typeofactivity: 'Applied a Job', todayDate: new Date(), type: 'job' }).then((resp) => {
                                            res.json({ message: 'Job applied successfully!', length: 1 });
                                        })
                                            .catch(err => {
                                                res.json({ message: err.toString(), length: 0 });
                                            })
                                    })
                                    .catch((err) => {
                                        res.json({ message: err.message, length: 0 });
                                    })
                            } else {
                                res.json({ message: 'Job already applied', length: 0 });
                            }
                        })
                        .catch((err) => {
                            log.write(err.stack + "\n");
                            res.json({ message: err.toString(), length: 0 });
                        })
                } else {
                    res.json({ message: 'Job does not exist', length: 0 });
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
exports.jobsApplied = (req, res) => {
    let Id = req.params.id;
    getConnection.then((db) => {
        return db.collection("jobs")
    })
        .then((jobs) => {
            jobs.find({ appliedCandidates: { $elemMatch: { $eq: ObjectID(Id) } } }, { sort: { date: -1 } }).toArray()
                .then((info) => {
                    res.json({ message: "Successfully jobApplied list retrived", length: 1, info });
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
/* service for search of appliedjobs list of perticular user  */
exports.appliedJobsSearch = (req, res) => {
    let Textname = req.params.text;
    let Id = req.params.id
    if (Textname !== undefined) {
        selectcond = {
            $and: [{ appliedCandidates: { $elemMatch: { $eq: ObjectID(Id) } } },
            {
                jobTitle: { $regex: Textname, '$options': 'i' }
            }]
        }
    } else {
        selectcond = { appliedCandidates: { $elemMatch: { $eq: ObjectID(Id) } } };
    }
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "join",
            primaryCollection: 'jobs',
            joincollections: ['company'],
            newKey: ['CompanyData'],
            keys: [{ leftKeys: 'organizationId', rightKeys: 'companyId' }],
            where: selectcond,
            selectfields: {}
        }, db])
            .then((info) => {
                info.info.map(val => {
                    delete val.appliedCandidates
                })
                res.json({ result: info.info, length: 1 })
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.message, length: 0 })
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.message, length: 0 })
        })
}
/*service for search of organization job search */
exports.organizationAppliedJobsSearch = (req, res) => {
    let Textname = req.params.text;
    let Id = req.params.id
    if (Textname !== undefined) {
        selectcond = {
            $and: [{ organizationId: { $eq: ObjectID(Id) } }, { appliedCandidates: { $ne: null } },
            {
                jobTitle: { $regex: Textname, '$options': 'i' }
            }]
        }
    } else {
        selectcond = {}
    };
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "join",
            primaryCollection: 'jobs',
            joincollections: ['company'],
            newKey: ['CompanyData'],
            keys: [{ leftKeys: 'organizationId', rightKeys: 'companyId' }],
            where: selectcond,
            selectfields: {}
        }, db])
            .then((info) => {
                res.json({ result: info.info, length: 1 })
            })
            .catch((err) => {
                log.write(err.stack + "\n");
                res.json({ message: err.message, length: 0 })
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.message, length: 0 })
        })
}

exports.searchData = (req, res) => {
    let Textname = req.params.text;
    let Id = req.params.id
    if (Textname !== undefined) {
        selectcond = { jobTitle: { $regex: Textname, '$options': 'i' } };
    } else {
        selectcond = {};
    }
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "join",
            primaryCollection: 'jobs',
            joincollections: ['company'],
            newKey: ['CompanyData'],
            keys: [{ leftKeys: 'organizationId', rightKeys: 'companyId' }],
            where: selectcond,
            selectfields: {}
        }, db])
            .then((info) => {
                let list = [];
                if (info.info.length > 0) {
                   
                    info.info.map(val => {
                        if (val.appliedCandidates.filter(e => (String(e) == String(Id))).length === 0)
                            list.push(val)
                    })
                    res.json({ message: "Searching is done", length: 1, info: list });
                } else {
                    res.json({ message: "No search data found",info:list, length: 1 });
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
}
/* service for filter jobs */
exports.filterJobSearchData = (req, res) => {
    const filtersObj = req.body.filtersObj;
    if (req.body.type !== 'all') {
        filtersObj.organizationId = ObjectID(req.body.type);
    }
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "join",
            primaryCollection: 'jobs',
            joincollections: ['company'],
            newKey: ['CompanyData'],
            keys: [{ leftKeys: 'organizationId', rightKeys: 'companyId' }],
            where: filtersObj
        }, db])
            .then((info) => {
                let list = [];
                if (info.info.length > 0) {
                    info.info.map(val => {
                        if (val.appliedCandidates.filter(e => (String(e) == String(req.body.userId))).length === 0)
                            list.push(val)
                    })
                }
                res.json({ message: "Searching is done", length: 1, info: list });
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
/* service for jobs activity */
exports.jobsActivity = (req, res) => {
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
                    selectfields: { acceptIds: 1 },
                }, db])
                    .then((info) => {
                        let profileactivity = [];
                        if (info.info[0].acceptIds.length > 0) {
                            profileactivity = info.info[0].acceptIds;
                            profileactivity.push(id);
                        } else {
                            profileactivity.push(id);
                        }

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
                        jobsActivityData([dataActivity, db]).then(ret => {
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
                                log.write(err.stack + "\n");
                                res.json({ message: err.message, length: 0 })
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
            res.json({ message: err.message, length: 0 });
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
jobsActivityData = (info) => {
    return new Promise((reslove, reject) => {
        let promises = []
        info[0].map(item => {
            if (item.type == 'job') {
                promises.push(
                    functions.AcetrixDB([{
                        action: "join",
                        primaryCollection: 'jobs',
                        joincollections: ['company'],
                        newKey: ['CompanyData'],
                        keys: [{ leftKeys: 'organizationId', rightKeys: 'companyId' }],
                        where: { _id: ObjectID(item.activityId) }
                    }, info[1]])
                        .then((jobinfo) => {
                            return {
                                id: jobinfo.info[0]._id,
                                todatDate: item.todayDate,
                                userId: item.profileData.userId,
                                profileImage: item.profileData.profileImage,
                                type: item.type,
                                role: item.profileData.role,
                                Name: item.profileData.firstName + " " + item.profileData.lastName,
                                typeOfActivity: item.typeofactivity,
                                jobTitle: jobinfo.info[0].jobTitle,
                                jobType: jobinfo.info[0].jobType,
                                companyId: jobinfo.info[0].CompanyData.companyId,
                                companyName: jobinfo.info[0].CompanyData.companyName,
                                website: jobinfo.info[0].CompanyData.website,
                                primary: jobinfo.info[0].CompanyData.primary,
                                secondary: jobinfo.info[0].CompanyData.secondary
                                , address: jobinfo.info[0].CompanyData.address,
                                companyProfileImage: jobinfo.info[0].CompanyData.profileImage
                            }
                        })
                        .catch(err => {
                            reject(err)
                        }))
            }
        })
        reslove(promises);
    })
}

