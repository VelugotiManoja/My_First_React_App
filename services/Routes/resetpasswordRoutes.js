const resetpassword = require('./../Login/resetpassword.js');
exports.resetpasswordroutes = (app) => {
app.post('/resetpassword', resetpassword.resetpassword);
app.post('/resettime', resetpassword.resettime);
}
