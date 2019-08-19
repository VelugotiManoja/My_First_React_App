const getConnection = require('../../lib/connection.js');
const fs = require('fs');
const moment = require('moment');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');
const bcrypt = require('bcryptjs');
const emailjs = require('emailjs');
const basePath = require('./../basepath.json');
const ObjectID = require('mongodb').ObjectId;
exports.registerauth = (req, res) => {
  try {
    let Email = req.body.email;
    let Password = bcrypt.hashSync(req.body.password);
    let Usertype = req.body.userType;
    getConnection.then((db) => {
      try {
        db.collection('users', function (err, users) {
          try {
            users.find({ "email": Email }).toArray(function (err, userinfo) {
              if (userinfo.length === 0) {
                users.insert({ email: Email, password: Password, usertype: Usertype, verified: 0, todayDate: new Date() }, (err, result) => {
                  if (err) {
                    res.json({ message: err.message, length: 0 });
                  } else {
                    // var server = emailjs.server.connect({
                    //   user: "merritostechnologies@gmail.com",
                    //   password: "$VaKiSi$143",
                    //   host: "smtp.gmail.com",
                    //   ssl: true
                    // });

                    // var message = {
                    //   from: "merritostechnologies@gmail.com",
                    //   to: Email,
                    //   subject: "Welcome to Merritos",
                    //   attachment:
                    //     [
                    //       {
                    //         data: '<div style="margin:0px auto;max-width:600px;background:#fff;" class="content-wrapper" data-class="content-wrapper">\n\
                    //                             <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#fff;" align="center" border="0">\n\
                    //                               <tbody>\n\
                    //                                 <tr>\n\
                    //                                   <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;">\n\
                    //                                           <div style="margin:0px auto;max-width:600px;">\n\
                    //                                             <img alt="Logo" title="" height="auto" src="https://merritos.in/img/merritos.png" width="150" />\n\
                    //                                           </div><br/><br/>\n\
                    //                                           <div style="margin:0px auto;max-width:600px;">\n\
                    //                                             <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">\n\
                    //                                               <tbody>\n\
                    //                                                 <tr>\n\
                    //                                                   <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;">\n\
                    //                                                           <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">\n\
                    //                                                             <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">\n\
                    //                                                               <tbody>\n\
                    //                                                                 <tr>\n\
                    //                                                                   <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="left">\n\
                    //                                                                     <div style="cursor:auto;color:#5d7079;font-family:TW-Averta-Regular, Averta, Helvetica, Arial;font-size:16px;line-height:24px;letter-spacing:0.4px;text-align:left;">\n\
                    //                                                                       <p>Hello,</p>\n\
                    //                                                                       <p class="hero">It’s time to confirm your email address.</p>\n\
                    //                                                                       <p>Have we got the right email address to reach you on? To confirm that you can get our emails, just click the button below.</p>\n\
                    //                                                                       <p>\n\
                    //                                                                         <a href= "'+ basePath.basePath + '/#/App/Emailverification?' + result.insertedIds[0] + '" style="box-sizing: border-box;display: inline-block;min-height: 36px;padding: 12px 24px;margin: 0 0 24px;font-size: 16px;font-weight: 600;line-height: 24px;text-align: center;cursor: pointer;border: 0;border-radius: 3px;color: #fff;background-color: #00b9ff;text-decoration: none;" >Confirm my email address</a>\n\
                    //                                                                       </p>\n\
                    //                                                                       <p>If you don’t know why you got this email, please tell us straight away so we can fix this for you.</p>\n\
                    //                                                                       <hr style="margin-top: 56px">\n\
                    //                                                                       <p class="mb-0">Thanks,</p>\n\
                    //                                                                       <p class="mb-0">The Merritos Team</p>\n\
                    //                                                                     </div>\n\
                    //                                                                   </td>\n\
                    //                                                                 </tr>\n\
                    //                                                               </tbody>\n\
                    //                                                             </table>\n\
                    //                                                           </div>\n\
                    //                                                   </td>\n\
                    //                                                 </tr>\n\
                    //                                               </tbody>\n\
                    //                                             </table>\n\
                    //                                           </div>\n\
                    //                                   </td>\n\
                    //                                 </tr>\n\
                    //                               </tbody>\n\
                    //                             </table>\n\
                    //                           </div>', alternative: true
                    //       }

                    //     ]
                    // };
                    // server.send(message, function (err, message) {
                    //   if (err) {
                    //     res.json({ message: "mail cannot be send due to technical issue", length: 0 })
                    //   }
                    //   else {
                       
                    //   }
                    // });


                    if (Usertype === 'individual') {
                      let firstName = req.body.firstName, lastName = req.body.lastName;
                      let Obj = { email: Email, percentage: 5, flag: 0, role: "Student", firstName: firstName, lastName: lastName, phoneNumber: '',
                      userId: ObjectID(result.insertedIds[0]), summary: '', isCoach: "no",
                    street: '', city: '', state: '', country: '', pinCode: '' };
                      Obj.education = [];
                      Obj.experience = [];
                      Obj.achievements = [];
                      Obj.expertise = [];
                      Obj.recommendation = [];
                      Obj.goal = '';
                      Obj.ssc = '';
                      Obj.intermediate = '';
                      Obj.preGraduation = '';
                      Obj.postGraduation = '';
                      Obj.requestIds = [];
                      Obj.acceptIds = [];
                      Obj.timeline = [];
                      Obj.sentrequestIds = [];
                      Obj.myClass = [];
                      db.collection('profile', (err, profile) => {
                        profile.insert(Obj, (err, result) => {
                          if (err) {
                            res.json({ message: err.message, length: 0 });
                          } else {
                            res.json({ message: "Please check your email for activate your account", length: 1 });
                          }
                        });
                      });
                    } else {
                      let Obj = {email: Email, companyName: req.body.companyName, website: "", primary: "", secondary: "", address: "", profileImage: '', companyId: ObjectID(result.insertedIds[0])};
                      db.collection('company', (err, profile) => {
                        profile.insert(Obj, (err, result) => {
                          if (err) {
                            res.json({ message: err.message, length: 0 });
                          } else {
                            res.json({ message: "Please check your email for activate your account", length: 1 });
                          }
                        });
                      });
                    }
                  }
                });
              } else {
                res.json({ message: "User already exsits", length: 0 });
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
    });
  } catch (err) {
    log.write(err.stack + "\n");
    res.json({ message: err.toString(), length: 0 });
  }
};
