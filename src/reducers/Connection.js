import { GET_CONNECTIONLIST, GET_CONNECTREQUESTS, GET_MYCONNECTS, GET_MYACTIVITY, GET_PEOPLE_YOU_MAY_KNOW } from '../actions/Types';

const initialState = { connectionsList: [], connectRequests: [], myConnects: [], connectClasses: [], myActivity: [], peopleYoyMayKnow: [], componentupdate: false };

const connectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONNECTIONLIST:
            return {
                ...state,
                connectionsList: action.payload
            }
        case GET_CONNECTREQUESTS:
            return {
                ...state,
                connectRequests: action.payload
            }
        case GET_MYCONNECTS:
            return {
                ...state,
                myConnects: action.payload.info,
                connectClasses: action.payload.classes
            }
        case GET_MYACTIVITY:
            return {
                ...state,
                myActivity: action.payload,
                componentupdate: true
            }
        case GET_PEOPLE_YOU_MAY_KNOW:
            return {
                ...state,
                peopleYoyMayKnow: action.payload,
            }
        default:
            return state;
    }
}

export default connectionsReducer;