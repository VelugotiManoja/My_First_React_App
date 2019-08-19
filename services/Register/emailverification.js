const getConnection = require('../../lib/connection.js');
const fs = require('fs');
const moment = require('moment');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');
const ObjectID = require('mongodb').ObjectId;
exports.emailverification = (req, res) => {
    try {
        getConnection.then((db) => {
            try {
                db.collection('users', function (err, users) {
                    try {
                        users.updateOne({ _id : ObjectID(req.body.id) },
                            { $set: { "verified": 1 } },
                            function (err, docs) {
                                if (err) {
                                    res.json({ message: err.message, length: 0 });
                                } else {
                                    res.json({ message: "ok", length: 1 });
                                }
                            });
                    }
                    catch (err) {
                        log.write(err.stack + "\n");
                        res.json({ message: err.toString(), length: 0 });
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
};
