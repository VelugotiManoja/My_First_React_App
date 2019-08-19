const forgot = require('./../Login/forgot.js');

exports.forgotroutes = (app) => {
app.post('/forgotpassword', forgot.forgotpassword);
}
