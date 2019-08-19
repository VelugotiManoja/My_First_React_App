import { GET_TRAINERSLIST, UPDATE_COURSE_BUYERS, TRAINERS_ERROR_INFO, TRAINERS_UNMOUNT, UPDATE_SEARCH_COURSES } from './Types';
import BasePath from '../basepath';

export const getTrainersList = (userId) => dispatch => {
    fetch(BasePath + '/trainerslist/' + userId, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(response => {
            if (response.length === 1) {
                response.info.map(trainer => {
                    trainer.scheduleCourse.map(schedule => {
                        let stime = schedule.startTime.split(' ');
                        schedule.startDate = stime[3] + ' ' + stime[0].slice(0, 3) + ' ' + stime[1] + ' ' + stime[2];
                        let etime = schedule.endTime.split(' ');
                        schedule.endDate = etime[3] + ' ' + etime[0].slice(0, 3) + ' ' + etime[1] + ' ' + etime[2];
                    })
                })
                dispatch({
                    type: GET_TRAINERSLIST,
                    payload: response.info
                })
            }
        })
};

export const buyCourse = (data) => dispatch => {
    fetch(BasePath + '/classbuy', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(resp => resp.json())
        .then(response => {
            if (response.length === 1) {
                data.result = response.result
                dispatch({
                    type: UPDATE_COURSE_BUYERS,
                    payload: data
                })
                dispatch({
                    type: UPDATE_SEARCH_COURSES,
                    payload: data
                })
            } else if (response.length === 0) {
                let error = { message: response.message, time: new Date() }
                dispatch({
                    type: TRAINERS_ERROR_INFO,
                    payload: error
                })
            }
        })
};

export const trainersUnmount = (data) => dispatch => {
    dispatch({
        type: TRAINERS_UNMOUNT
    })
};