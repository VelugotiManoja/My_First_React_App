const getConnection = require('../../lib/connection.js');
const fs = require('fs');
const moment = require('moment');
const bcrypt = require('bcryptjs');
var crypto = require('crypto');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');
const ObjectID = require('mongodb').ObjectId;
exports.newsfeed = (req,res)=>{
    try {
        let Parser = require('rss-parser');
    let parser = new Parser();
        (async () => {
             let feed = await parser.parseURL('https://www.reddit.com/.rss');
           res.json(feed);   
          })();
    }
    catch (err) {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    }
}
exports.loginauth = (req, res) => {
     try {
        var email = req.body.email;
        var password = req.body.password;
        getConnection.then((db) => {
            db.collection('users', function (error, users) {
                    try {
                    users.find({ "email": email }).toArray(function (err, userinfo) {
                        try {
                            if (err) {
                                res.json({ message: err.message, length: 0 });
                            } else {
                                if (userinfo.length === 0) {
                                    res.json({ result: 'Unsuccess', message: 'Invalid Email', length: 2 });
                                } else if(Number(userinfo[0].verified) === 1 || Number(userinfo[0].verified) === 0){
                                    var hash = userinfo[0].password;
                                    var newpass = bcrypt.compareSync(password, hash);
                                    var userType = userinfo[0].usertype;
                                    if (newpass === false) {
                                        res.json({ result: 'Unsuccess', message: 'Invalid Password', length: 3 });
                                    }
                                    else {
                                        var rmd = randomValueBase64(11);
                                        try {
                                            db.collection('token', function (error, token) {
                                                token.insert({ "email": email, "tokenId": rmd }, function (err, docs) {
                                                    try {
                                                        if (err) {
                                                            res.json({ message: err.message, length: 0 });
                                                        } else {
                                                          if(userType === "individual" ){
                                                            db.collection('profile', function (error, profile) {
                                                               try {
                                                                    let id=userinfo[0]._id.toString();

                                                                    profile.find({"userId":ObjectID(id)}).toArray(function (err, profileinfo) {
                                                                        if (profileinfo.length > 0) {
                                                                            res.json({ result: 'success', length: 1, rmd, email, userId: userinfo[0]._id, type: 'individual', profile: 1 })
                                                                        } else {
                                                                            res.json({ result: 'success', length: 1, rmd, email, userId: userinfo[0]._id, type: 'individual', profile: 1 })
                                                                        }
                                                                    });
                                                                } catch (err) {
                                                                    log.write(err.stack + "\n");
                                                                    res.json({ message: err.toString(), length: 0 });
                                                                }
                                                            })
                                                          } else{
                                                            db.collection('company', function (error, company) {
                                                              try {
                                                                  let id = userinfo[0]._id.toString();
                                                                  company.find({ "companyId": ObjectID(id) }).toArray(function (err, companyinfo) {
                                                                      if (companyinfo.length > 0) {
                                                                          res.json({ result: 'success', length: 1, rmd, email, userId: userinfo[0]._id, type: 'organization', profile: 1 })
                                                                      } else {
                                                                          res.json({ result: 'success', length: 1, rmd, email, userId: userinfo[0]._id, type: 'organization', profile: 1 })
                                                                      }
                                                                  });
                                                              } catch (err) {
                                                                  log.write(err.stack + "\n");
                                                                  res.json({ message: err.toString(), length: 0 });
                                                              }
                                                            })
                                                          }
                                                        }
                                                    } catch (err) {
                                                        log.write(err.stack + "\n");
                                                        res.json({ message: err.toString(), length: 0 });
                                                    }
                                                });
                                            });
                                        } catch (err) {
                                            log.write(err.stack + "\n");
                                            res.json({ message: err.toString(), length: 0 });
                                        }
                                    }
                                } else{
                                  res.json({message:'Your account is not activated', length:0})
                                }
                            }
                        } catch (err) {
                            log.write(err.stack + "\n");
                            res.json({ message: err.toString(), length: 0 });
                        }
                    });
                } catch (err) {
                    log.write(err.stack + "\n");
                    res.json({ message: err.toString(), length: 0 });
                }
            });
        });
    } catch (err) {
        log.write(err.stack + "\n");
        res.json({ message: err.toString(), length: 0 });
    }
}
function randomValueBase64(len) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64')   // convert to base64 format
        .slice(0, len)        // return required number of characters
        .replace(/\+/g, '0')  // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
}
exports.Tokendelete = (req, res) => {
    var data = req.body;
    try {
        let email = req.body.email;
        getConnection((err, db) => {
            try {
                db.collection('token', function (err, token) {
                    try {
                        token.remove({ 'email': email }, function (err, result) {
                            if (err) {
                                res.json({ message: 'unsuccess', length: 0 });
                            } else {
                                res.json({ message: 'success', length: 1 });
                            }
                        })
                    } catch (err) {
                        res.json({ message: 'connection' + err.message, length: 0 })
                    }
                })
            } catch (err) {
                res.json({ message: 'connection' + err.message, length: 0 })
            }
        })
    } catch (err) {
        res.json({ message: 'connection' + err.message, length: 0 });
    }
}
