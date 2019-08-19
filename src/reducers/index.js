import {combineReducers} from 'redux';
import profileReducer from './Profile';
import TrainersReducer from './Trainers';
import connectionsReducer from './Connection';
import classesReducer from './Classes';
import loaderReducer from './Loaders';
import jobsReduces from './Jobs';

const reducers = combineReducers({
    profile: profileReducer,
    trainers: TrainersReducer,
    connections: connectionsReducer,
    classes: classesReducer,
    loader: loaderReducer,
    jobs: jobsReduces,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_CLEAR') {
      state = undefined
    }
    return reducers(state, action)
  }

export default rootReducer;