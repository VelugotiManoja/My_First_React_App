import {PROFILE_DATA, COMPANY_DATA,UPDATE_DATA, ADD_EDUCATION, ADD_WORKEXPERIENCE, ADD_ACHIEVEMENTS, ADD_EXPERTISE, ADD_RECOMMENDATION, UPDATE_RECOMMENDATION, UPDATE_WORKEXPERIENCE, UPDATE_EDUCATION, UPDATE_ACHIEVEMENTS, UPDATE_EXPERTISE, UPDATE_USERID } from './Types';
import BasePath from '../basepath';
export const fetchprofileData = (userId,callback) => dispatch => {
    fetch(BasePath + '/profileinfo/' + userId, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then((resp) => resp.json())
        .then(profile => {
            if(callback)
            callback(profile.info)
            dispatch(
            {
                type: PROFILE_DATA,
                payload: profile.info
 
            })})
    };
export const fetchOrganizationData = (userId) => dispatch => {
    fetch(BasePath + '/organizationprofileInfo/' + userId, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then((resp) => resp.json())
        // Transform the data into json
        .then(company =>{
             dispatch(
            {
                type: COMPANY_DATA,
                payload: company.info[0]

            })})
};
export const setUserId = (data) => dispatch => {
    dispatch({
        type: UPDATE_USERID,
        payload: data
    });
};
export const addeducationDetails = (data) => dispatch => {
    fetch(BasePath + '/educationcreate', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(profile => {
            dispatch({
                type: ADD_EDUCATION,
                payload:profile.result
            })
        })
};
export const updateEducation = (data) => dispatch => {
    fetch(BasePath + '/educationupdate', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(profile => dispatch({
            type: UPDATE_EDUCATION,
            payload: data.educationData
        }))
    
};

export const updateCompany = (data) => dispatch => {
    fetch(BasePath + '/updateData', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(updatecompany => dispatch({
            type: UPDATE_DATA,
            payload: updatecompany.info[0]
        }))
};
export const addworkExperience = (data) => dispatch => {
    fetch(BasePath + '/experiencecreate', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(profile => dispatch({
            type: ADD_WORKEXPERIENCE,
            payload:profile.result
        }))
};
export const updateworkExperience = (data) => dispatch => {
    fetch(BasePath + '/experienceupdate', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(profile => dispatch({
            type: UPDATE_WORKEXPERIENCE,
            payload: data.experienceData
        }))
};
export const addAchievements = (data) => dispatch => {
    fetch(BasePath + '/achievementscreate', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(profile => dispatch({
            type: ADD_ACHIEVEMENTS,
            payload:profile.result
        }))
};
export const updateAchievements = (data) => dispatch => {
    fetch(BasePath + '/achievementsupdate', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(profile => dispatch({
            type: UPDATE_ACHIEVEMENTS,
            payload: data.achievementsData
        }))
};

export const addExpertise = (data) => dispatch => {
    
    fetch(BasePath + '/expertisecreate', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(profile => dispatch({
            type: ADD_EXPERTISE,
            payload:profile.result
        }))

};

export const updateExpertise = (data) => dispatch => {
    fetch(BasePath + '/expertiseupdate', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(profile => dispatch({
            type: UPDATE_EXPERTISE,
            payload: data.expertiseData
        }))

};

export const addRecommendation = (data) => dispatch => {
    fetch(BasePath + '/recommendationcreate', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(profile => dispatch({
            type: ADD_RECOMMENDATION,
            payload: data.recommendationData
        }))

};
export const updateRecommendation = (data) => dispatch => {
    fetch(BasePath + '/recommendationupdate', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(profile => dispatch({
            type: UPDATE_RECOMMENDATION,
            payload: data.recommendationData
        }))
};

export const logoutaction = () => dispatch => {
    dispatch({
        type: 'LOGOUT_CLEAR',
    })
};