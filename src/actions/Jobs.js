import { GET_JOBS_DASHBOARD, GET_JOBS_ACTIVITY } from './Types';
import BasePath from '../basepath';

export const getJobsDashboard = (userId) => dispatch => {
    fetch(BasePath + '/jobsdashboard/' + userId, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
      }).then((resp) => resp.json()) // Transform the data into json
        .then(function (resp) {
          if (resp.length === 1) {
            dispatch({
                type: GET_JOBS_DASHBOARD,
                payload: resp.result
            })
          }
        })
};

export const getJobsActivity = (userId) => dispatch => {
    fetch(BasePath + '/jobsactivity/' + userId, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
      }).then((resp) => resp.json()) // Transform the data into json
        .then(function (resp) {
            dispatch({
                type: GET_JOBS_ACTIVITY,
                payload: resp.info
            })
        })
}