const jobs = require('./../Jobs/jobs.js');
exports.jobsroutes = (app) => {
    app.post('/jobscreate', jobs.jobsCreate);
    app.get('/jobslist/:id', jobs.jobsList);
    app.get('/organizationjobslist/:id', jobs.organizationJobsList);
    app.put('/jobsupdate', jobs.jobsUpdate);
    app.delete('/jobsdelete', jobs.jobsDelete);
    app.post('/jobinfo', jobs.jobInfo);
    app.get('/jobsdashboard/:id', jobs.jobsDashboard);
    app.get('/jobsapplied', jobs.jobsApplied);
    app.put('/jobsapply', jobs.jobsApply);
    app.get('/searchdata/:id/:text?', jobs.searchData);
    app.get('/jobappliedcandidateslist/:id', jobs.jobAppliedCandidatesList);
    app.post('/filterjobsearchdata', jobs.filterJobSearchData);
    app.get('/appliedjobssearch/:id/:text?', jobs.appliedJobsSearch);
    app.get('/organizationappliedjobssearch/:id/:text?', jobs.organizationAppliedJobsSearch);
    app.get('/jobsactivity/:id', jobs.jobsActivity);
    }