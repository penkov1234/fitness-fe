import { WORKOUTS_NEW, GET_ALL_EXERCIESES } from 'redux/constants/main.constants';
import { ActionStatus } from 'redux/core/ActionStatus';
import { PostRequestWithData, PlainApiRequest } from 'services/apiRequests';
import { buildActionType } from 'redux/actions/buildActionType';
import { FETCH_CALENDAR } from 'redux/constants/vars.constants';
import {
    CHECK_FOR_SUBSCRIPTION,
    STATISTICS,
    USER_INFO,
    WORKOUTS_GET_ALL_FILTERED,
    WORKOUTS_GET_SUBSCRIBED,
    WORKOUTS_SUBSCRIBE,
    WORKOUTS_UPDATE,
} from '../constants/main.constants';
import {
    CHECK_FOR_SUBSCRIPTION_API,
    GET_ALL_EXERCISES_API,
    GET_INFO_API,
    GET_STATISTICS_API,
    SUBSCRIBE_TO_WORKOUT_API,
    UPDATE_INFO_API,
    WORKOUTS_GET_FILTERED_API,
    WORKOUTS_GET_SUBSCRIBED_API,
    WORKOUTS_NEW_API,
    WORKOUTS_UPDATE_API,
} from '../../services/api';

export const newWorkoutAction = workoutObj => async dispatch => {
    console.log(workoutObj);
    dispatch({ type: buildActionType(WORKOUTS_NEW, ActionStatus.START) });
    const response = await PostRequestWithData(WORKOUTS_NEW_API, workoutObj, { 'Content-Type': 'application/json' });

    if (response.success) {
        dispatch({
            type: buildActionType(WORKOUTS_NEW, ActionStatus.DONE),
            payload: {
                ...response,
            },
        });
    }
};
export const getSubscribedWorkout = (month, year) => async dispatch => {
    dispatch({ type: buildActionType(WORKOUTS_GET_SUBSCRIBED, ActionStatus.START) });
    let response;
    if (!month && !year) {
        response = await PlainApiRequest(WORKOUTS_GET_SUBSCRIBED_API);
    } else {
        if (month && year) {
            response = await PlainApiRequest(`${WORKOUTS_GET_SUBSCRIBED_API}?month=${month}&year=${year}`);
        } else if (month) {
            response = await PlainApiRequest(`${WORKOUTS_GET_SUBSCRIBED_API}?month=${month}`);
        } else {
            response = await PlainApiRequest(`${WORKOUTS_GET_SUBSCRIBED_API}?year=${year}`);
        }
    }

    if (response.success) {
        dispatch({
            type: buildActionType(WORKOUTS_GET_SUBSCRIBED, ActionStatus.DONE),
            payload: {
                ...response.data,
            },
        });
    }
};
export const subscribeToWorkout = workoutPlanId => async dispatch => {
    let data = new FormData();
    data.set('workoutPlanId', workoutPlanId);

    dispatch({ type: buildActionType(WORKOUTS_SUBSCRIBE, ActionStatus.START) });
    const response = await PostRequestWithData(SUBSCRIBE_TO_WORKOUT_API, data, { 'Content-Type': 'application/json' });

    if (response.success) {
        dispatch({
            type: buildActionType(WORKOUTS_SUBSCRIBE, ActionStatus.DONE),
            payload: {
                workoutPlanId,
            },
        });
        dispatch({ type: FETCH_CALENDAR, payload: true });
    }
};
export const getAllWorkoutsFiltered = (frequency, difficulty) => async dispatch => {
    dispatch({ type: buildActionType(WORKOUTS_GET_ALL_FILTERED, ActionStatus.START) });

    const response = await PlainApiRequest(`${WORKOUTS_GET_FILTERED_API}?frequency=${frequency}&difficulty=${difficulty}`);

    if (response.success) {
        dispatch({
            type: buildActionType(WORKOUTS_GET_ALL_FILTERED, ActionStatus.DONE),
            payload: {
                ...response.data,
            },
        });
    }
};
export const getUserInfo = () => async dispatch => {
    dispatch({ type: buildActionType(USER_INFO, ActionStatus.START) });
    const response = await PlainApiRequest(GET_INFO_API);

    if (response.success) {
        dispatch({
            type: buildActionType(USER_INFO, ActionStatus.DONE),
            payload: {
                ...response,
            },
        });
    }
};
export const checkForSubscription = () => async dispatch => {
    dispatch({ type: buildActionType(CHECK_FOR_SUBSCRIPTION, ActionStatus.START) });
    const response = await PlainApiRequest(CHECK_FOR_SUBSCRIPTION_API);

    if (response.success) {
        dispatch({
            type: buildActionType(CHECK_FOR_SUBSCRIPTION, ActionStatus.DONE),
            payload: {
                ...response,
            },
        });
    }
};
export const resetCheckForSubscription = () => async dispatch => {
    dispatch({ type: buildActionType(CHECK_FOR_SUBSCRIPTION, ActionStatus.RESET) });
};
export const updateUserInfo = (name, surname, image) => async dispatch => {
    let data = new FormData();
    data.set('name', name);
    data.set('surname', surname);
    data.set('image', image);

    const response = await PostRequestWithData(UPDATE_INFO_API, data);

    if (response.success) {
        dispatch({
            type: buildActionType(USER_INFO, ActionStatus.DONE),
            payload: {
                ...response,
            },
        });
    }
};
export const getAllExercises = () => async dispatch => {
    dispatch({ type: buildActionType(GET_ALL_EXERCIESES, ActionStatus.START) });
    const response = await PlainApiRequest(GET_ALL_EXERCISES_API);

    if (response.success) {
        dispatch({
            type: buildActionType(GET_ALL_EXERCIESES, ActionStatus.DONE),
            payload: {
                ...response,
            },
        });
    }
};
export const updateWorkout = (dailyWorkoutId, dateTrained, hoursSpent, isCompleted) => async dispatch => {
    dispatch({ type: buildActionType(WORKOUTS_UPDATE, ActionStatus.START) });

    let data = new FormData();
    data.set('dailyWorkoutId', dailyWorkoutId);
    data.set('dateTrained', dateTrained);
    data.set('hoursSpent', hoursSpent);
    data.set('isCompleted', isCompleted);

    const response = await PostRequestWithData(WORKOUTS_UPDATE_API, data);

    if (response.success) {
        dispatch({
            type: buildActionType(WORKOUTS_UPDATE, ActionStatus.DONE),
            payload: {
                ...response,
            },
        });
        dispatch({ type: FETCH_CALENDAR, payload: true });
    }
};
export const getStatistics = () => async dispatch => {
    dispatch({ type: buildActionType(STATISTICS, ActionStatus.START) });

    const response = await PlainApiRequest(GET_STATISTICS_API);

    if (response.success) {
        dispatch({
            type: buildActionType(STATISTICS, ActionStatus.DONE),
            payload: {
                ...response,
            },
        });
    }
};
