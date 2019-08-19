const register = require('./../Register/register.js');

exports.registerroutes = (app) => {
app.post('/registerauth', register.registerauth);
}