import { GET_PROFILE_IMAGE } from './Types';
import BasePath from '../basepath';
export const getProfileImage = (serdata) => dispatch => {
    fetch(BasePath + '/organizationImageUploads', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(serdata)
    }).then((resp) => resp.json())
        .then((resp) => dispatch({
            type: GET_PROFILE_IMAGE,
            payload: serdata.path
        }));
};