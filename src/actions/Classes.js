import { GET_CLASSES, GET_MYCLASSES, GET_COURSES, GET_CLASS_ACTIVITY, GET_SEARCH_COURSES } from './Types';
import BasePath from '../basepath';

export const getClassesList = (userId) => dispatch => {
    fetch(BasePath + '/teachingclassesinfo/' + userId, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(response => {
            if (response.length === 1) {
                dispatch({
                    type: GET_CLASSES,
                    payload: response.result
                })
            }
        })
};

export const getMyClassesList = (userId) => dispatch => {
    fetch(BasePath + '/myclassinfo/' + userId, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(response => {
            if (response.length === 1) {
                dispatch({
                    type: GET_MYCLASSES,
                    payload: response.result
                })
            }
        })
};


export const getCoursesList = (data) => dispatch => {
    fetch(BasePath + '/courseslist/' + data.userId + '/' + data.searchtext + '?', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(response => {
            if (response.length === 1) {
                if(data.searchtext === undefined || data.searchtext === ''){
                    dispatch({
                        type: GET_COURSES,
                        payload: response.result
                    })
                } else {
                    dispatch({
                        type: GET_SEARCH_COURSES,
                        payload: response.result
                    })
                }

            }
        })
};

export const getClassActivity = (userId) => dispatch => {
    fetch(BasePath + '/classactivity/' + userId, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(response => {
            if (response.length === 1) {
                dispatch({
                    type: GET_CLASS_ACTIVITY,
                    payload: response.info
                })
            }
        })
};