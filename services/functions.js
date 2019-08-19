const validator = require('validator');
const _ = require("underscore");
const moment = require('moment');
const fs = require('fs');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');

function IsArray(info) {
    var array = [];
    if (info instanceof Array) {
        return info;
    } else {
        array.push(info);
        return array;
    }
}
;
exports.IsArray = IsArray;

function DeleteCollection(Obj, db, callback) {
    try {
        var Fail = 0;
        var Count = Obj.checkCollection.length;
        _.map(Obj.checkCollection, function (Objval, Objkey) {
            try {
                db.collection(Objval, function (err, collection) {
                    try {
                        collection.count(Obj.checkWhere[Objkey], function (err, info) {
                            if (err) {
                                log.error(err.stack);
                                callback({ message: err, length: 0 });
                            } else {
                                try {
                                    if (info > 0) {
                                        Fail = 1;
                                    }
                                    if (Number(Count) === Number(Objkey + 1)) {
                                        if (Fail !== 1) {
                                            var removeCount = Obj.removeCollection.length;
                                            _.map(Obj.removeCollection, function (removeval, revomekey) {
                                                try {
                                                    AcetrixDB({
                                                        action: "remove",
                                                        collection: removeval,
                                                        where: Obj.removeWhere[revomekey]
                                                    },
                                                        db,
                                                        function (result) {
                                                            try {
                                                                if (result.length === 0) {
                                                                    callback(result).status(500);
                                                                } else {
                                                                    if (Number(removeCount) === (revomekey + 1)) {
                                                                        callback(result);
                                                                    }
                                                                }
                                                            } catch (err) {
                                                                log.error(err.stack + '\n');
                                                                callback({ message: err.toString(), length: 0 });
                                                            }
                                                        });
                                                } catch (err) {
                                                    log.error(err.stack + '\n');
                                                    callback({ message: err.toString(), length: 0 });
                                                }
                                            });
                                        } else {
                                            callback({ message: "Cann't delete this action because some transactions are done based on it", length: 0 });
                                        }
                                    }
                                } catch (err) {
                                    log.error(err.stack + '\n');
                                    callback({ message: err.toString(), length: 0 });
                                }
                            }
                        });
                    } catch (err) {
                        log.error(err.stack + '\n');
                        callback({ message: err.toString(), length: 0 });
                    }
                });
            } catch (err) {
                log.error(err.stack + '\n');
                callback({ message: err.toString(), length: 0 });
            }
        });
    } catch (err) {
        log.error(err.stack + '\n');
        callback({ message: err.toString(), length: 0 });
    }
}
exports.DeleteCollection = DeleteCollection;

const AcetrixDB = (data) => {
    let Obj = data[0];
    let db = data[1];
    return new Promise((resolve, reject) => {
        if (Obj.action === 'join') {
            let Where = {};
            if (Obj.where)
                Where = Obj.where;
            let Match = {};
            if (Obj.match)
                Match = Obj.match;
            let SkipNo = 0;
            if (Obj.skipNo)
                SkipNo = Number(Obj.skipNo);
            let mongo = [{ $sort: { todayDate: -1 } }, { $match: Where }];
            let mongodb = [{ $match: Where }];
            _.map(Obj.joincollections, (val, key) => {
                let LKey = Obj.keys[key].leftKeys.split('.');
                if (LKey.length > 1) {
                    mongo.push({ $unwind: "$" + LKey[0] });
                }
                let objJoin = { $lookup: { from: val, localField: Obj.keys[key].leftKeys, foreignField: Obj.keys[key].rightKeys, as: Obj.newKey[key] } };
                mongo.push(objJoin);
                mongodb.push(objJoin);
                if (!Obj.unwind) {
                    let Objwind = { $unwind: { path: "$" + Obj.newKey[key], preserveNullAndEmptyArrays: true } };
                    mongo.push(Objwind);
                    mongodb.push(Objwind);
                }
            });
            mongodb.push({ $match: Match }, { $group: { _id: "", count: { $sum: 1 } } });
            mongo.push({ $match: Match }, { $skip: SkipNo }, { $limit: 100 });
            db.collection(Obj.primaryCollection).aggregate(mongo, { allowDiskUse: true }).toArray()
                .then((info) => {
                    db.collection(Obj.primaryCollection).aggregate(mongodb, { allowDiskUse: true }).toArray()
                        .then((data) => {
                            var PCnt = 0;
                            if (data.length > 0) {
                                PCnt = data[0].count;
                            }
                            var PageCnt = PagesCount(Number(PCnt));
                            resolve({ info: info, PagesCnt: PageCnt, length: 1 });
                        })
                        .catch((err) => {
                            log.write(err.stack + '\n');
                            reject({ message: err, length: 0 });
                        })
                })
                .catch((err) => {
                    log.write(err.stack + '\n');
                    reject({ message: err, length: 0 });
                })
        }
        if (Obj.action === 'insert') {
            db.collection(Obj.collection).count(Obj.where)
                .then((rows) => {
                    if (rows > 0) {
                        reject({ message: 'Alreay exists', length: 0 });
                    } else {
                        db.collection(Obj.collection)[Obj.action](Obj.fields)
                            .then((info) => {
                                resolve({ info: info, message: "Inserted successfully", length: 1 });
                            })
                            .catch((err) => {
                                log.write(err.stack + '\n');
                                reject({ message: err.toString(), length: 0 });
                            })
                    }
                })
                .catch((err) => {
                    log.write(err.stack + '\n');
                    reject({ message: err.toString(), length: 0 });
                })
        }
        if (Obj.action === 'find') {
            var SkipNo = 0;
            var limit = 0;
            if (Obj.skipNo !== undefined && Number(Obj.skipNo) !== 1) {
                SkipNo = Number(Obj.skipNo);
                limit = 100;
            }
            db.collection(Obj.collection)[Obj.action](Obj.where, Obj.selectfields).sort({ todayDate: -1 }).skip(SkipNo).limit(limit).toArray()
                .then((info) => {
                    if (Obj.skipNo !== undefined) {
                        db.collection(Obj.collection).count(Obj.where)
                            .then((rows) => {
                                var PageCnt = PagesCount(Number(rows));
                                resolve({ info: info, PagesCnt: PageCnt, length: 1 });
                            })
                            .catch((err) => {
                                log.write(err.stack + '\n');
                                reject({ message: err.message, length: 0 });
                            })
                    } else {
                        resolve({ info: info, length: 1 });
                    }
                })
                .catch((err) => {
                    log.write(err.stack + '\n');
                    reject({ message: err, length: 0 });
                })
        }
        if (Obj.action === 'update') {
            if (Obj.check === 'true') {
                db.collection(Obj.collection).find(Obj.search).toArray()
                    .then((rows) => {
                        if (rows.length > 0) {
                            if (JSON.stringify(rows[0]._id) === JSON.stringify(Obj._id)) {
                                db.collection(Obj.collection)[Obj.action](Obj.where, { $set: Obj.fields }, { multi: true })
                                    .then((info) => {
                                        resolve({ info: info, message: "Updated successfully", length: 1 });
                                    })
                                    .catch((err) => {
                                        log.write(err.stack);
                                        reject({ message: err, length: 0 });
                                    })
                            } else {
                                reject({ message: "Already exists", length: 0 });
                            }
                        } else {
                            db.collection(Obj.collection)[Obj.action](Obj.where, { $set: Obj.fields }, { multi: true })
                                .then((info) => {
                                    resolve({ info: info, message: "Updated successfully", length: 1 });
                                })
                                .catch((err) => {
                                    log.write(err.stack);
                                    reject({ message: err, length: 0 });
                                })
                        }
                    })
                    .catch((err) => {
                        log.write(err.stack + '\n');
                        reject({ message: err, length: 0 });
                    })
            }
            if (Obj.check === 'false') {
                db.collection(Obj.collection)[Obj.action](Obj.where, { $set: Obj.fields }, { multi: true })
                    .then((info) => {
                        resolve({ info: info, message: "Updated successfully", length: 1 });
                    })
                    .catch((err) => {
                        log.write(err.stack + '\n');
                        reject({ message: err.toString(), length: 0 });
                    })
            }
        }
        if (Obj.action === 'remove') {
            db.collection(Obj.collection)[Obj.action](Obj.where, { multi: true })
                .then((info) => {
                    resolve({ info: info, message: "Deleted successfully", length: 1 });
                })
                .catch((err) => {
                    log.write(err.stack);
                    reject({ message: err, length: 0 });
                })
        }
    })
};
exports.AcetrixDB = AcetrixDB;

function PagesCount(Cnt) {
    var PCnt = Math.ceil(Number(Cnt) / 100);
    var Arr = [];
    for (var c = 1; c <= PCnt; c++) {
        Arr.push({ count: c });
    }
    return Arr;
}
exports.PagesCount = PagesCount;

function DateConversion(ReqDate) {
    var LastDate = new Date(0);
    LastDate.setDate(ReqDate.getDate());
    LastDate.setMonth(ReqDate.getMonth());
    LastDate.setFullYear(ReqDate.getFullYear());
    return LastDate;
}
exports.DateConversion = DateConversion;

exports.validation = function (data) {
    let object = data[0];
    let require = data[1];
    let integer = data[2];
    return new Promise((resolve, reject) => {
        for (let r = 0; r < require.length; r++) {
            if (object[require[r]]) {
                if (validator.isEmpty(object[require[r]])) {
                    reject({ length: 0, status: false, message: "Please select " + require[r] });
                }
            } else {
                reject({ length: 0, status: false, message: "Please select " + require[r] });
            }
        }
        for (let i = 0; i < integer.length; i++) {
                if (object[integer[i]]) {
                    if (!validator.isNumeric(object[integer[i]]) & object[integer[i]] !== "") {
                        reject({ length: 0, status: false, message: integer[i] + " is in numeric characters only" });
                    }
                } else {
                    reject({ length: 0, status: false, message: "Please select " + require[r] });
                }
        }
        resolve({ status: true, message: "" });
    })
};
exports.emailvalidation = function (data) {
    let object = data[0];
    let email = data[1];
    return new Promise((resolve, reject) => {
        for (let r = 0; r < email.length; r++) {
            if (object[email[r]]) {
                if (!validator.isEmail(object[email[r]]) & object[email[r]] !== "") {
                    reject({ status: false, message: email[r] + " is not in correct format" });
                }
            } else {
                reject({ length: 0, status: false, message: "Please select " + email[r] });
            }
        }
        resolve({ status: true, message: "" });
    });
};
exports.floatvalidation = function (data) {
    let object = data[0];
    let float = data[1];
    return new Promise((resolve, reject) => {
        for (let r = 0; r < float.length; r++) {
            if (object[float[r]]) {
                if (!validator.isFloat(object[float[r]]) & object[float[r]] !== "") {
                    reject({ status: false, message: float[r] + " is not in correct format" });
                }
            } else {
                reject({ length: 0, status: false, message: "Please select " + email[r] });
            }
        }
        resolve({ status: true, message: "" });
    });
};
var options = {
    drag: true,
    anchor: null,
    digits: 14
};
exports.format = function (result) {
    try {
        var s = result.toString();
        var parts = s.split('.');
        var integer = parts[0];
        var decimal = parts.length === 2 ? parts[1] : null;
        if (integer && integer.length > options.digits) {
            return Number(result.toExponential(options.digits - 6 > 0 ? options.digits - 6 : 0));
        } else if (integer && decimal) {
            if (integer.length + decimal.length < options.digits) {
                return Number(s);
            } else if (integer.length < options.digits) {
                if (/e/.test(decimal)) {
                    return Number(result.toExponential(options.digits - 5 - integer.length > 0 ? options.digits - 5 - integer.length : 0));
                } else {
                    var factor = Math.pow(10, (options.digits - 1 - integer.length));
                    return Math.round(result * factor) / factor;
                }
            } else if (integer.length === options.digits) {
                return Math.round(result);
            }
        } else {
            return Number(s);
        }
    } catch (err) {
        log.error(err.stack + '\n');
        callback({ message: err.toString(), length: 0 });
    }
};
function WeekendsCount(start, end) {
    try {
        var d1 = new Date(start);
        var d2 = new Date(end);
        var days = 0;
        while (d1 <= d2) {
            var day = d1.getDay();
            if (day === 0 || day === 6) {
                days++;
            }
            d1 = DateConversion(new Date(moment(d1).add(1, 'days').format("YYYY-MM-DD")));
        }
        return days;
    } catch (err) {
        log.error(err.stack + '\n');
        callback({ message: err.toString(), length: 0 });
    }
}
exports.WeekendsCount = WeekendsCount;