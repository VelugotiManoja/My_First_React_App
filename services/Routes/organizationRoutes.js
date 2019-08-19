const register = require('./../Organizationprofile/organizationprofile.js');

exports.organizationroutes = (app) => {
app.put('/companydata', register.companyData);
app.get('/organizationprofileInfo/:id', register.organizationprofileInfo);
app.put('/updateData', register.updateData);
app.put('/organizationImageUploads', register.organizationImageUploads);
}