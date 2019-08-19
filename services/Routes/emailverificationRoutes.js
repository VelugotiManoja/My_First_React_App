const emailverification = require('./../Register/emailverification.js');

exports.emailverificationroutes = (app) => {
app.post('/emailverification', emailverification.emailverification);
}