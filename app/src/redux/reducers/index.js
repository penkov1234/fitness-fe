import { combineReducers } from 'redux';
import { WORKOUTS_NEW, GET_ALL_EXERCIESES } from 'redux/constants/main.constants';
import register from './register.reducer';

// import { workoutsReducer } from './workouts.reducer';
import { basicReducer } from './basic.reducer';
import { auth } from './auth';
import { CHECK_FOR_SUBSCRIPTION, STATISTICS, USER_INFO, WORKOUTS_GET_ALL_FILTERED, WORKOUTS_GET_SUBSCRIBED } from '../constants/main.constants';

import { buildActionType } from '../actions/buildActionType';
import { LOGOUT } from '../constants/auth.constants';
import { ActionStatus } from '../core/ActionStatus';
import { globalVars } from 'redux/reducers/global.vars.reducer';

const rootReducer = combineReducers({
    auth,
    register,
    workoutsNew: basicReducer(WORKOUTS_NEW),
    allExercises: basicReducer(GET_ALL_EXERCIESES),
    workoutsFiltered: basicReducer(WORKOUTS_GET_ALL_FILTERED),
    workoutsSubscribed: basicReducer(WORKOUTS_GET_SUBSCRIBED),
    userInfo: basicReducer(USER_INFO),
    checkForSubscription: basicReducer(CHECK_FOR_SUBSCRIPTION),
    statistics: basicReducer(STATISTICS),
    globalVars,
});

export default (state, action) => rootReducer(action.type === buildActionType(LOGOUT, ActionStatus.DONE) ? undefined : state, action);
