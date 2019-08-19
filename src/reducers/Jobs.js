import { GET_JOBS_DASHBOARD, GET_JOBS_ACTIVITY } from '../actions/Types';

const initialState = { trendingJobs: [], relatedJobsList: '', appliedJobsList: [], jobsTimeline: '', componentupdate: false };

const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_JOBS_DASHBOARD:
            return {
                ...state,
                trendingJobs: action.payload.alljobs.slice(0, 12),
                relatedJobsList: action.payload.relatedjobs,
                appliedJobsList: action.payload.appliedjobs
            }
        case GET_JOBS_ACTIVITY:
            return {
                ...state,
                jobsTimeline: action.payload,
                componentupdate: true
            }
        default:
            return state;
    }
}

export default jobsReducer;