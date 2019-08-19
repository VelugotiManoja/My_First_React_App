const getConnection = require('../../lib/connection.js');
const fs = require('fs');
const moment = require('moment');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');
const bcrypt = require('bcryptjs');
exports.resetpassword = (req, res) => {
    try {
        let Password = bcrypt.hashSync(req.body.password);
        getConnection.then((db) => {
            try {
                db.collection('users', function (err, users) {
                    try {
                        users.updateOne({ "email": req.body.email },
                            { $set: { "password": Password } },
                            function (err, docs) {
                                if (err) {
                                    res.json({ message: err.message, length: 0 });
                                } else {
                                    res.json({ message: "Your new password updated successfully", length: 1 });
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

exports.resettime = (req, res) => {
    getConnection.then((db) => {
        try {
            let Email = req.body.emailObj;
            let RandomId = req.body.randomId;
            let presettime = moment(new Date());
            db.collection('users', function (err, users) {
                try {
                    users.find({ "email": Email }).toArray(function (err, userinfo) {
                        if (userinfo[0].randomId === RandomId) {
                            let then = moment(new Date(userinfo[0].resetTime));
                            if (presettime.diff(then, 'minutes') < 60) {
                                res.json({ message: "success", length: 1 });
                            }
                            else {
                                res.json({ message: "Your reset password link is expired", length: 0 });
                            }
                        } else {
                            res.json({ message: "Your reset password link is expired", length: 0 });
                        }
                    })
                } catch (err) {
                    log.write(err.stack + "\n");
                    res.json({ message: err.toString(), length: 0 });
                }
            })
        } catch (err) {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        }
    })
}
