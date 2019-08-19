const getConnection = require('../../lib/connection.js');
const functions = require('./../functions.js');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const moment = require('moment');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');

exports.goalsList = (req, res) => {
    getConnection.then((db) => {
        functions.AcetrixDB([{
            action: "find",
            collection: "goals",
            where: {},
            selectfields: { suggestions: 0 }
        }, db])
            .then((info) => {
                res.json({ result: info.info, length: 1 });
            })
            .catch((err) => {
                res.json({ message: err.message, length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
}

exports.updateGoal = (req, res) => {
    getConnection.then((db) => {
        let Userid = req.body.userId;
        let Goal = req.body.goal;
        let TimeLine = req.body.timeline;
        let require = ['userId', 'goal'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then(() => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "profile",
                    fields: {goal: ObjectID(Goal),timeline:TimeLine },
                    where: { userId: ObjectID(Userid) },
                    check: "false"
                }, db])
                    .then((info) => {
                        functions.AcetrixDB([{
                            action: "find",
                            collection: "goals",
                            where: { _id: ObjectID(Goal) },
                            selectfields: {}
                        }, db])
                            .then((info) => {
                                res.json({ message: "Goal succesfully updated", result: info.info[0].suggestions, length: 1 });
                            })
                            .catch((err) => {
                                res.json({ message: err.message, length: 0 });
                            })
                    })
                    .catch((err) => {
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
}