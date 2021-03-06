const profile=require('./../Profile/profile.js')
exports.profileroutes = (app) => {
    app.post('/createpersonalinfo', profile.createPersonalInfo);
    app.get('/profileinfo/:id', profile.profileInfo);
    app.put('/profileupdate', profile.profileUpdate);
    app.post('/educationcreate', profile.educationCreate);
    app.put('/educationupdate', profile.educationUpdate);
    app.post('/experiencecreate', profile.experienceCreate);
    app.put('/experienceupdate', profile.experienceUpdate);
    app.post('/achievementscreate', profile.achievementsCreate);
    app.put('/achievementsupdate', profile.achievementsUpdate);
    app.post('/recommendationcreate', profile.recommendationCreate);
    app.put('/recommendationupdate', profile.recommendationUpdate);
    app.delete('/recommendationdelete',profile.recommendationDelete);
    app.post('/expertisecreate', profile.expertiseCreate);
    app.put('/expertiseupdate', profile.expertiseUpdate);
    app.put('/documentsupload',profile.documentsUploads);
    app.get('/relatedprofiles/:id', profile.relatedProfiles);
    app.post('/requestprofile', profile.requestProfile);
    app.get('/connectrequestlist/:id',profile.connectRequestList);
    app.put('/acceptrequest',profile.acceptRequest);
    app.put('/rejectrequest',profile.rejectRequest);
    app.put('/passwordAuth',profile.passwordAuth);
    app.put('/userimageupload',profile.userimageUploads);
    app.get('/myactivity/:id',profile.myActivity);
    app.delete('/educationdelete',profile.educationDelete);
    app.delete('/experiencedelete',profile.experienceDelete);
    app.delete('/achievementsdelete',profile.achievementsDelete);
    app.delete('/expertisedelete',profile.expertiseDelete);
    app.put('/imageUploads',profile.userimageUploads);
    app.put('/coachupdate',profile.coachUpdate);
    app.post('/connectionsearchdata',profile.connectionSearchData);
    app.put('/goalupdate',profile.goalUpdate);
    app.put('/summaryupdate',profile.summaryUpdate);
    app.get('/myconnectlist/:id',profile.myConnectList);
    app.get('/activityDashboard/:userId',profile.activityDashboard);
    app.put('/education',profile.educationDetails);
    app.post('/connectprofileactivity',profile.connectProfileActivity);
    app.put('/disconnect',profile.disconnect);
    app.post('/updateallgoals/:role',profile.updateallgoals);
}