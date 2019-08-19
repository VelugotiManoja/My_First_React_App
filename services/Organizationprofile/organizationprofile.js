const getConnection = require('./../../lib/connection.js');
const functions = require('./../functions.js');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const moment = require('moment');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');

exports.companyData = (req, res) => {
    getConnection.then((db) => {
        let Companyname = req.body.companyName;
        let Website = req.body.website;
        let Primarynumber = req.body.primary;
        let Secondarynumber = req.body.secondary;
        let Address = req.body.address;
        let CompanyId = req.body.companyId, profileImage = req.body.profileImage;
        let require = ['companyName', 'website', 'primary', 'secondary', 'address', 'companyId'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then((result) => {
                let companyData = { companyId: ObjectID(CompanyId), companyName: Companyname, website: Website, primary: Primarynumber, secondary: Secondarynumber, address: Address, profileImage: profileImage, todayDate: new Date() };
                functions.AcetrixDB([{
                    action: "update",
                    collection: "company",
                    fields: companyData,
                    where: { companyId: ObjectID(CompanyId) },
                    check: 'false'
                }, db])
                    .then((info) => {
                        res.json(info);
                    })
                    .catch((err) => {
                        log.write(err.stack + "\n");
                        res.json({ message: err.message, length: 0 });
                    })
            }).catch((err) => {
                res.json({ message: err.message, length: 0 });
            })
    })
        .catch((err) => {
            log.write(err.stack + "\n");
            res.json({ message: err.toString(), length: 0 });
        })
};
exports.organizationprofileInfo = (req, res) => {
    let id = req.params.id;
    getConnection.then((db) => {
        return db.collection('company')
    })
        .then((company) => {
            company.find({ companyId: ObjectID(id) }).toArray()
                .then((info) => {
                    res.json({ message: "Successfully retrived", length: 1, info });
                })
                .catch((err) => {
                    res.json({ message: err.toString(), length: 0 });
                })
        })
        .catch((err) => {
            res.json({ message: err.toString(), length: 0 });
        })
}
exports.updateData = (req, res) => {
    getConnection.then((db) => {
        let id = req.body.userId;
        let Companyname = req.body.companyname;
        let Primarynumber = req.body.primary;
        let Address = req.body.address;
        let require = ['userId', 'companyname', 'primary', 'address'];
        let integer = [];
        functions.validation([req.body, require, integer])
            .then((result) => {
                functions.AcetrixDB([{
                    action: "update",
                    collection: "company",
                    fields: {
                        'companyname': Companyname,
                        'primary': Primarynumber,
                        'address': Address,
                    },
                    where: { companyId: ObjectID(id) },
                    check: "false"
                }, db])
                    .then(() => {
                        res.json({ message: 'Company details has been updated successfully!', length: 1 })
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


exports.organizationImageUploads = (req, res) => {
    let id = req.body._id;
    let profileImage = req.body.profileImage;
    getConnection.then((db) => {
        require = ['_id'];
        integer = [];
        functions.validation([req.body, require, integer])
        functions.AcetrixDB([{
            action: "find",
            collection: "company",
            fields: {},
            where: { companyId: ObjectID(id) },
            check: "false"
        }, db])
            .then((info) => {
                let Profileimage = info.info[0].profileImage;
                fs.unlink('./uploads/' + Profileimage, function (err) {
                    fs.unlink('./uploads/150/' + Profileimage, function (err) {
                        fs.unlink('./uploads/20/' + Profileimage, function (err) {
                            functions.AcetrixDB([{
                                action: "update",
                                collection: "company",
                                fields: { profileImage: profileImage },
                                where: { companyId: ObjectID(id) },
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
