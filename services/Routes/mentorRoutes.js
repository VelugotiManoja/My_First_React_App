const mentors = require('../Mentor/mentor.js');
exports.mentorroutes = (app) => {
    app.post('/mentordetailscreate', mentors.mentorDetailsCreate);
    app.get('/mentorinfo/:id', mentors.mentorInfo);
    app.put('/mentordetailsupdate', mentors.mentorDetailsUpdate);
    app.post('/schedulecoursecreate', mentors.scheduleCourseCreate);
    app.get('/schedulecourseinfo/:id', mentors.scheduleCourseInfo);
    app.put('/schedulecourseupdate', mentors.scheduleCourseUpdate);
    app.delete('/schedulecoursedelete', mentors.scheduleCourseDelete);
    app.post('/paymentdetailscreate', mentors.paymentDetailsCreate);
    app.get('/paymentdetailsinfo/:id', mentors.paymentDetailsInfo);
    app.put('/paymentdetailsupdate', mentors.paymentDetailsUpdate);
    app.get('/trainerslist/:id', mentors.trainersList);
    app.get('/schedulecourselist', mentors.scheduleCourseList);
    app.put('/feedbackcreation', mentors.feedbackCreation);
    app.get('/searchtrainers/:searchkey', mentors.searchTrainers);
    app.get('/courselist', mentors.courseList);
   }
