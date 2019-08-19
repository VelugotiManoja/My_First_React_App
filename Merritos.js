const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require("path");
const exec = require('child_process').exec;
const loginroutes = require('./services/Routes/loginRoutes.js');
const jobsroutes = require('./services/Routes/jobsRoutes.js');
const connectionroutes = require('./services/Routes/connectionRoutes.js');
const profileroutes = require('./services/Routes/profileRoutes.js');
const forgotroutes = require('./services/Routes/forgotRoutes.js');
const resetpasswordroutes = require('./services/Routes/resetpasswordRoutes.js');
const registerroutes = require('./services/Routes/registerRoutes.js');
const emailverificationroutes = require('./services/Routes/emailverificationRoutes.js');
const mentorroutes = require('./services/Routes/mentorRoutes.js');
const oraganizationroutes = require('./services/Routes/organizationRoutes.js');
const myclassroutes = require('./services/Routes/myclassRoutes.js');
const goalsroutes = require('./services/Routes/goalsRoutes.js');
const app = express();
const gm = require('gm');
var fs = require('fs');
var dir = './uploads/150/';
var dir1 = './uploads/20/';

dbSet = {};
dirpath = __dirname;


//This is done by Sreekanth to test git again

app.set('port', process.env.PORT || 3800);
app.set("view options", { layout: false });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', express.static(__dirname + '/'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors());


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  } else {
    return next();
  }
});
app.use(bodyParser.urlencoded({ extended: true }));

exec('npm start', function (err, so, se) {
   console.log(so);
  console.log(se);
});
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    if (req.headers.ext)
      cb(null, req.headers.ext + '_' + req.headers.userid + path.extname(file.originalname));
    else
      cb(null, req.headers.userid + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
app.post('/save', function (req, res) {
  res.json({ msg: "Saved" })
});
app.post('/savedata', upload.single('file'), function (req, res, next) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.mkdirSync(dir1);
  }
  gm(req.file.path)
    .gravity('Center') 
    .resize(150,null, '!')
    .autoOrient()
    .write('./uploads/150/' + req.file.filename, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        gm(req.file.path)
        .gravity('Center') 
          .resize(50,null, '!')
          .autoOrient()
          .write('./uploads/20/' + req.file.filename, function (err) {
            if (err) {
              console.log(err);
            }
            else {
              res.json(req.file);
            }
          })
      }
    });

});
app.post('/imagedata', upload.single('file'), function (req, res, next) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.mkdirSync(dir1);
  }
  gm(req.file.path)
    .resize(150, 150, '!')
    .noProfile()
    .write('./uploads/150/' + req.file.filename, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        gm(req.file.path)
          .resize(20, 20, '!')
          .noProfile()
          .write('./uploads/20/' + req.file.filename, function (err) {
            if (err) {
              console.log(err);
            }
            else {
              res.json(req.file);
            }
          })
      }
    });

});

loginroutes.loginroutes(app);
jobsroutes.jobsroutes(app);
profileroutes.profileroutes(app);
connectionroutes.connectionroutes(app);
registerroutes.registerroutes(app);
emailverificationroutes.emailverificationroutes(app);
forgotroutes.forgotroutes(app);
resetpasswordroutes.resetpasswordroutes(app);
mentorroutes.mentorroutes(app);
oraganizationroutes.organizationroutes(app);
myclassroutes.myclassroutes(app);
goalsroutes.goalsroutes(app);
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;
