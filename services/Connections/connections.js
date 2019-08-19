const getConnection = require('../../lib/connection.js');
const functions = require('./../functions.js');
const fs = require('fs');
const moment = require('moment');
const ObjectID = require('mongodb').ObjectId;
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');

exports.getConnectionList = (req, res) => {
    const id = req.params.id;
    const scheduleId = req.body.scheduleId;
    const ids = req.body.ids;
    const companyName = req.body.companyName;
    const educations = req.body.educations;
    let acceptids = []
    ids.map((val, key) => {
        ids[key] = ObjectID(val);
    })
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "find",
            collection: "profile",
            where: { userId: ObjectID(id) },
            selectfields: {}
        }, db]).then((acptids) => {
            if (acptids.info[0].acceptIds.length > 0) {
                acceptids = acptids.info[0].acceptIds;
            }
            acceptids.push(acptids.info[0].userId)
            cond = { userId: { $nin: acceptids }, $or: [{ userId: { $in: ids } }, { 'myClass.scheduleId': { $in: scheduleId } }, { 'experience.companyName': { $in: companyName } }, { 'education.universityName': { $in: educations } }] }
            functions.AcetrixDB([{
                action: "find",
                collection: "profile",
                where: cond,
                selectfields: {}
            }, db])
                .then((info) => {
                    if (info.info.length === 0) {
                        functions.AcetrixDB([{
                            action: "find",
                            collection: "profile",
                            where: { userId: { $nin: acceptids }},
                            selectfields: {}
                        }, db]).then((toplist) => {
                            res.json({ info: toplist.info.slice(0, 12), length: 1 });
                        })
                    } else {
                        res.json({ info: info.info, length: 1 });
                    }
                })
                .catch((err) => {
                    res.json({ message: err.toString(), length: 0 });
                })
        })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}


exports.getsearchConnectionsList = (req, res) => {
    var uid = req.params.uid;
    var searchkey = req.query.q;
    if (searchkey == '') {
        searchkey = 'no-result-found';
    }
    getConnection.then((db) => {
        cond = { userId: { $ne: ObjectID(uid) }, $or: [{ firstName: { $regex: new RegExp('^' + searchkey, 'i') } }, { lastName: { $regex: new RegExp('^' + searchkey, 'i') } }, { 'experience.companyName': { $regex: new RegExp('^' + searchkey, 'i') } }, { 'education.universityName': { $regex: new RegExp('^' + searchkey, 'i') } }] }

        functions.AcetrixDB([{
            action: "find",
            collection: "profile",
            where: cond,
            selectfields: {}
        }, db])
            .then((info) => {

                res.json({ info: info.info, length: 1 });
            })
            .catch((err) => {

                res.json({ message: err.toString(), length: 0 });
            })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}
exports.addSkill = (req, res) => {
    var id = req.params.id;
   var skill = req.body.skill;
   var skillset = {"date":"",
   "title":skill,
   "author":"",
 "startTime":"",
 "status":0,
 "sq":5,
 "close":true,
 "action":"Find a class",
 "color":"#2196f3"}
    getConnection.then((db) => {
        
        db.collection('profile').update({ userId: ObjectID(id) },
        { $push: { timeline:{ $each:[skillset], $position:0 }} })
        .then((info) => {
            res.json({message:"Updated Successfully",data:info,length:1});
        })
    }).catch((err) => {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    })
}
exports.removeTimeline = (req, res) => {
    var id = req.body.id;
   var pos = req.body.pos;
    getConnection.then((db) => {
      
        functions.AcetrixDB([{
            action: "find",
            collection: "profile",
            where: {userId:ObjectID(id)},
            selectfields: {timeline:1}
        }, db])
            .then((info) => {
let line = info.info[0].timeline;
line.splice(Number(pos),1)
functions.AcetrixDB([{
    action: "update",
    collection: "profile",
    fields: { timeline: line },
    where: { userId: ObjectID(id) },
    check: "false"
}, db])
    .then(() => {
        res.json({message:"Updated Successfully",data:info,length:1});
    })
})
})
}