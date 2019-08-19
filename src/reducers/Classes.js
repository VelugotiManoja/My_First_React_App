import {GET_CLASSES, GET_MYCLASSES, GET_COURSES, GET_CLASS_ACTIVITY, GET_SEARCH_COURSES, UPDATE_SEARCH_COURSES} from '../actions/Types';

const initialState = {classesList: [],myClassesList:[],coursesList:[],classactivity:[], searchcourses:[], componentupdate: false};

const classesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLASSES:
            return {
                ...state,
                classesList: action.payload
            }
        case GET_MYCLASSES:
        return {
            ...state,
            myClassesList: action.payload
        }
        case GET_COURSES:
        return {
            ...state,
            coursesList: action.payload,
            searchcourses: []
        }
        case GET_CLASS_ACTIVITY:
        return {
            ...state,
            classactivity: action.payload,
            componentupdate: true
        }
        case GET_SEARCH_COURSES:
        return {
            ...state,
            searchcourses: action.payload
        }
        case UPDATE_SEARCH_COURSES:
        let array = state.searchcourses.filter(e => { return e.schedule.scheduleId != action.payload.scheduleId })
        return {
            ...state,
            searchcourses: array
        }
        default:
            return state;
    }
}

export default classesReducer;