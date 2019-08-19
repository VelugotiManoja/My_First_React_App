const getConnection = require('../../lib/connection.js');
const fs = require('fs');
const moment = require('moment');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');
const emailjs =require('emailjs');
const basePath = require('./../basepath.json');
exports.forgotpassword = (req, res) => {
  try {
        let Email = req.body.email;
        let randomId = randomNumber(15);
        getConnection.then((db) => {
            try {
                db.collection('users', function (err, users) {
                    try {
                        users.find({"email": req.body.email}).toArray(function (err, userinfo) {
                          if(userinfo.length === 0){
                            res.json({message: "Your account is not registered with merritos", length: 0});
                          }
                          else{
                      var server 	= emailjs.server.connect({
                                          user:	"merritostechnologies@gmail.com",
                                          password:"$VaKiSi$143",
                                          host:	"smtp.gmail.com",
                                          ssl:		true
                                       });

                                       var message	= {
                                        from:	"merritostechnologies@gmail.com",
                                        to:		Email,
                                        subject:	"Welcome to Merritos",
                                        attachment:
                                        [
                                            {data: '<div style="margin:0px auto;max-width:600px;background:#fff;" class="content-wrapper" data-class="content-wrapper">\n\
                                            <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#fff;" align="center" border="0">\n\
                                              <tbody>\n\
                                                <tr>\n\
                                                  <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;">\n\
                                                          <div style="margin:0px auto;max-width:600px;">\n\
                                                            <img alt="Logo" title="" height="auto" src="https://merritos.in/img/merritos.png" width="150" />\n\
                                                          </div><br/><br/>\n\
                                                          <div style="margin:0px auto;max-width:600px;">\n\
                                                            <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">\n\
                                                              <tbody>\n\
                                                                <tr>\n\
                                                                  <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;">\n\
                                                                          <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">\n\
                                                                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">\n\
                                                                              <tbody>\n\
                                                                                <tr>\n\
                                                                                  <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="left">\n\
                                                                                    <div style="cursor:auto;color:#5d7079;font-family:TW-Averta-Regular, Averta, Helvetica, Arial;font-size:16px;line-height:24px;letter-spacing:0.4px;text-align:left;">\n\
                                                                                      <p>Hello,</p>\n\
                                                                                      <p class="hero">You recently requested to reset your password for your merritos account</p>\n\
                                                                                      <p>Click the button below to reset it.</p>\n\
                                                                                      <p>\n\
                                                                                        <a href= "' +basePath.basePath+ '/#/App/Resetpassword?'+req.body.email+'&'+randomId+'" style="box-sizing: border-box;display: inline-block;min-height: 36px;padding: 12px 24px;margin: 0 0 24px;font-size: 16px;font-weight: 600;line-height: 24px;text-align: center;cursor: pointer;border: 0;border-radius: 3px;color: #fff;background-color: #00b9ff;text-decoration: none;" >Reset your password</a>\n\
                                                                                      </p>\n\
                                                                                      <p>If you did not request a password reset, please ignore this email or reply to let us know.This password reset is only valid for next 60 minutes.</p>\n\
                                                                                      <hr style="margin-top: 56px">\n\
                                                                                      <p class="mb-0">Thanks,</p>\n\
                                                                                      <p class="mb-0">The Merritos Team</p>\n\
                                                                                    </div>\n\
                                                                                  </td>\n\
                                                                                </tr>\n\
                                                                              </tbody>\n\
                                                                            </table>\n\
                                                                          </div>\n\
                                                                  </td>\n\
                                                                </tr>\n\
                                                              </tbody>\n\
                                                            </table>\n\
                                                          </div>\n\
                                                  </td>\n\
                                                </tr>\n\
                                              </tbody>\n\
                                            </table>\n\
                                          </div>', alternative: true}

                                        ]
                                     };
                                       server.send(message, (err, message) => { 
                                           if(err){
                                               res.json({message: "mail is not sent", length: 0})
                                           }
                                           else{
                                            users.updateOne({"email": req.body.email},
                                            {$set:{"resetTime":new Date(), "randomId" :randomId}},
                                           function (err, docs) {
                                                try{
                                                    if(err){
                                                        res.json({message:'dummy message' , length:0})
                                                    }
                                                    else{
                                                        res.json({message:'Please check your mail to reset your password' , length:1})
                                                    }
                                                }
                                                catch(err){
                                                    log.write(err.stack + "\n");
                                                    res.json({ message: err.toString(), length: 0 });
                                                }
                                            })
                                           }
                                       });
                                       
                                     }
                                     });

                    } catch (err) {
                        log.write(err.stack + "\n");
                        res.json({message: err.toString(), length: 0});
                    }
                });
            } catch (err) {
                log.write(err.stack + "\n");
                res.json({message: err.toString(), length: 0});
            }
        });
    } catch (err) {
            log.write(err.stack + "\n");
            res.json({message: err.toString(), length: 0});
    }
};
randomNumber = (len) => {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64')   // convert to base64 format
        .slice(0, len)        // return required number of characters
        .replace(/\+/g, '0')  // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
}