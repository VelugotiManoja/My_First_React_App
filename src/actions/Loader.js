import {LOADER_TRUE, LOADER_FALSE} from './Types';

export const loadertrue = () => dispatch => {
    dispatch({
        type: LOADER_TRUE,
    })
}

export const loaderfalse = (data) => dispatch => {
    let location = data;
    if(data.includes("?")){
        location= data.split('?')[0]
    }
    dispatch({
        type: LOADER_FALSE,
        payload: location
    })
}