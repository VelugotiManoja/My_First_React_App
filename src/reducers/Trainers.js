import {GET_TRAINERSLIST, UPDATE_COURSE_BUYERS, TRAINERS_ERROR_INFO, TRAINERS_UNMOUNT} from '../actions/Types';

const initialState = {trainersList: [], classBuyInfo: '', error: ''};

const trainersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRAINERSLIST:
            return {
                ...state,
                trainersList: action.payload
            }
        case UPDATE_COURSE_BUYERS:
        return {
            ...state,
            classBuyInfo: action.payload
        }
        case TRAINERS_ERROR_INFO:
        return {
            ...state,
            error: action.payload
        }
        case TRAINERS_UNMOUNT:
        return {
            ...state,
            error: '',
            classBuyInfo: ''
        }
        default:
            return state;
    }
}

export default trainersReducer;