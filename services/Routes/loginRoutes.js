const login = require('./../Login/login.js');
exports.loginroutes = (app) => {
app.post('/loginauth', login.loginauth);
app.post('/tokendelete',login.Tokendelete);
app.get('/newsfeed',login.newsfeed);
}
