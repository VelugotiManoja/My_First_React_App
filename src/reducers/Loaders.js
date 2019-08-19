import { LOADER_TRUE, LOADER_FALSE } from '../actions/Types';

const initialState = { loader: false, location:'' }

const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADER_TRUE:
            return {
                ...state,
                loader: true
            }
        case LOADER_FALSE:
            return {
                ...state,
                loader: false,
                location: action.payload
            }
        default:
            return state;
    }
}

export default loaderReducer;