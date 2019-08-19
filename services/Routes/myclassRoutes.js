const myclass = require('../Myclass/myclass.js');
exports.myclassroutes = (app) => {
    app.get('/teachingclassesinfo/:id', myclass.teachingClassesInfo);
    app.post('/classbuy', myclass.classBuy);
    app.get('/myclassinfo/:id', myclass.myClassInfo);
    app.post('/joinclass', myclass.joinClass);
    app.get('/courseslist/:id/:text?', myclass.coursesList);
    app.get('/classrecordings/:meetingId', myclass.classRecordings);
    app.get('/classactivity/:id', myclass.classesActivity);
    app.get('/singleclassdata/:userId/:scheduleId', myclass.singleClassData);
};