import { GET_CONNECTIONLIST, GET_CONNECTREQUESTS, GET_MYCONNECTS, GET_MYACTIVITY, GET_PEOPLE_YOU_MAY_KNOW } from './Types';
import BasePath from '../basepath';
export const getConnectionsList = (userId) => dispatch => {
    fetch(BasePath + '/relatedprofiles/' + userId, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(response => dispatch({
            type: GET_CONNECTIONLIST,
            payload: response.result
        }))
};

export const getConnectRequests = (userId) => dispatch => {
    fetch(BasePath + '/connectrequestlist/' + userId, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then((resp) => resp.json())
        // Transform the data into json
        .then(response => dispatch({
            type: GET_CONNECTREQUESTS,
            payload: response.result
        }))
};

export const getMyConnects = (userId) => dispatch => {
    fetch(BasePath + '/myconnectlist/' + userId, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then((resp) => resp.json())
        // Transform the data into json
        .then(response => dispatch({
            type: GET_MYCONNECTS,
            payload: response.result
        }))
};

export const getMyActivity = (userId) => dispatch => {
    fetch(BasePath + '/myactivity/' + userId, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },

    }).then((resp) => resp.json()) // Transform the data into json
        .then(function (resp) {
            if (resp.length === 1) {
                dispatch({
                    type: GET_MYACTIVITY,
                    payload: resp.info
                })
            }
        })
};

export const getMyConnectionsList = (data) => dispatch => {
    fetch(BasePath + '/getConnectionList/' + data[0], {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data[1]),
    }).then((resp) => resp.json()) // Transform the data into json
        .then(function (resp) {
            if (resp.length === 1) {
                dispatch({
                    type: GET_PEOPLE_YOU_MAY_KNOW,
                    payload: resp.info
                })
            }
        })
}