const goals = require('../Goals/goals.js');
exports.goalsroutes = (app) => {
    app.get('/goalslist', goals.goalsList);
    app.put('/updategoal', goals.updateGoal);
};