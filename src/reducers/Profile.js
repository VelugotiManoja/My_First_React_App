import { GET_PROFILE_IMAGE, COMPANY_DATA, PROFILE_DATA, ADD_EDUCATION, ADD_WORKEXPERIENCE, ADD_ACHIEVEMENTS, ADD_EXPERTISE, ADD_RECOMMENDATION, UPDATE_RECOMMENDATION, UPDATE_WORKEXPERIENCE, UPDATE_EDUCATION, UPDATE_ACHIEVEMENTS, UPDATE_EXPERTISE, UPDATE_USERID } from '../actions/Types';

const initialState = {
    profileData: [{ education: [], experience: [], achievements: [], expertise: [], recommendation: [], goalinfo: [], componentupdate: false }],
    companydata: {},
    education: [],
    workExperience: [],
    achievements: [],
    expertise: [],
    updateworkExperience: [],
    profileImage: '',
    userId: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMPANY_DATA:
            return {
                ...state,
                companydata: action.payload

            }
        case PROFILE_DATA:
            return {
                ...state,
                profileData: action.payload,
                componentupdate: true
            }
        case UPDATE_USERID:
            return {
                ...state,
                userId: action.payload
            }
        case ADD_EDUCATION:
            state.profileData[0].education.push(action.payload);
            return {
                ...state,
                education: action.payload
            }
        case UPDATE_EDUCATION:
            return {
                ...state,
                educationUpdate: action.payload
            }
        case ADD_WORKEXPERIENCE:
            state.profileData[0].experience.push(action.payload);
            return {
                ...state,
                workExperience: action.payload
            }
        case UPDATE_WORKEXPERIENCE:
            return {
                ...state,
                workExperienceUpdate: action.payload
            }
        case ADD_ACHIEVEMENTS:
            state.profileData[0].achievements.push(action.payload);
            return {
                ...state,
                achievements: action.payload
            }
        case UPDATE_ACHIEVEMENTS:
            return {
                ...state,
                achievementsUpdate: action.payload
            }
        case ADD_EXPERTISE:
            state.profileData[0].expertise.push(action.payload);
            action.payload.flag = 0;
            return {
                ...state,
                expertise: action.payload
            }
        case UPDATE_EXPERTISE:
            return {
                ...state,
                expertiseUpdate: action.payload
            }
        case ADD_RECOMMENDATION:
            state.profileData[0].recommendation.push(action.payload);
            return {
                ...state,
                recommendation: action.payload
            }
        case UPDATE_RECOMMENDATION:
            return {
                ...state,
                recommendationUpdate: action.payload
            }
        case GET_PROFILE_IMAGE:
            return {
                ...state,
                profileImage: action.payload
            }
        default:
            return state;
    }
};

export default profileReducer;
