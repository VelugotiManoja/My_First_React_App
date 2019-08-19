const connections = require('./../Connections/connections.js')

exports.connectionroutes = (app) => {
    app.post('/getConnectionList/:id', connections.getConnectionList);
    app.post('/addskill/:id', connections.addSkill);
    app.get('/getsearchconnectionslist/:uid', connections.getsearchConnectionsList);
    app.put('/removetimeline',connections.removeTimeline);
}