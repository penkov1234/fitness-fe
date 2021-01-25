import { LOGIN, STORAGE_PERSIST } from 'redux/constants/auth.constants';
import { ActionStatus } from 'redux/core/ActionStatus';
import { persistor } from 'redux/config/store';
import { loginApiRequest, refreshTokenRequest } from 'services/apiRequests/login';
import { buildActionType } from 'redux/actions/buildActionType';
import { REGISTER, REGISTER_PROGRESS, FIRST_STEP_DATA, SECOND_STEP_DATA } from '../constants/register.constants';
import { useSelector } from 'react-redux';
import requestAgent from '../../services/requestAgent';
import { REGISTER_API } from '../../services/api';
import { LOGOUT } from '../constants/auth.constants';
import { PostRequestWithData } from '../../services/apiRequests';

const passwordLoginAction = (email, password) => async dispatch => {
    dispatch({ type: buildActionType(LOGIN, ActionStatus.START) });
    const response = await loginApiRequest(email, password);

    if (response.success) {
        dispatch({
            type: buildActionType(LOGIN, ActionStatus.DONE),
            payload: {
                ...response,
                auth: 'Basic ' + btoa(email + ':' + password),
            },
        });
        // dispatch({ type: NOTIFICATION, payload: { message: `${SuccessNotification[LOGIN.action]} logged in`, variant: NotificationType.Success } });
        await persistor.flush();
        dispatch({ type: buildActionType(STORAGE_PERSIST, ActionStatus.DONE) });
    } else {
        dispatch({
            type: buildActionType(LOGIN, ActionStatus.FAILED),
        });
    }
};

const refreshProviderToken = async dispatch => {
    let tokenPromise = refreshTokenRequest().then(response => {
        console.log(response);
        response.data.token_creation = Date.now();
        dispatch({ type: buildActionType(LOGIN, ActionStatus.DONE), payload: { ...response, fetchingToken: false } });
        persistor.flush();
        dispatch({ type: buildActionType(STORAGE_PERSIST, ActionStatus.DONE) });
        return Promise.resolve();
    });
    console.log(tokenPromise);

    dispatch({
        type: buildActionType(LOGIN, ActionStatus.REFRESH),
        payload: {
            fetchingToken: tokenPromise,
        },
    });
    return tokenPromise;
    // try {
    //     const response = await refreshTokenRequest();
    //     if (response.success) {
    //         response.data.token_creation = Date.now();
    //         dispatch({ type: buildActionType(LOGIN, ActionStatus.DONE), payload: { ...response, fetchingToken: false } });
    //         await persistor.flush();
    //         dispatch({ type: buildActionType(STORAGE_PERSIST, ActionStatus.DONE) });
    //         return Promise.resolve(response.data.data.refresh_token);
    //     }
    // } catch (error) {
    //     return Promise.reject();
    // }
};

const registerStartedAction = () => async dispatch => {
    dispatch({ type: buildActionType(REGISTER, ActionStatus.START) });
    dispatch({
        type: buildActionType(REGISTER_PROGRESS, ActionStatus.DONE),
        payload: {
            progress: 1,
        },
    });
};

const registerNextStepAction = data => async dispatch => {
    dispatch({
        type: buildActionType(REGISTER_PROGRESS, ActionStatus.DONE),
        payload: {
            progress: 2,
        },
    });
    dispatch({
        type: buildActionType(FIRST_STEP_DATA, ActionStatus.DONE),
        payload: {
            data: data,
        },
    });
};
const previousStepAction = () => async dispatch => {
    console.log('dispatch here');
    dispatch({
        type: buildActionType(REGISTER_PROGRESS, ActionStatus.DONE),
        payload: {
            progress: 1,
        },
    });
};

const registerUserAction = (firstStepData, name, lastName, weight, height, bodyFat) => async dispatch => {
    let user = {};
    user.email = firstStepData.username;
    user.password = firstStepData.password;
    user.name = name;
    user.lastName = lastName;
    user.weight = weight;
    user.height = height;
    user.bodyFat = bodyFat;
    const response = await requestAgent.post(REGISTER_API, user, { 'Content-Type': 'application/json' });

    if (response.status === 200) {
        dispatch({
            type: buildActionType(REGISTER, ActionStatus.DONE),
        });
    } else {
        dispatch({
            type: buildActionType(REGISTER, ActionStatus.FAILED),
        });
    }
};
const logoutAction = () => async dispatch => {
    dispatch({ type: buildActionType(LOGOUT, ActionStatus.DONE) });
};
// const logoutAction = () => async dispatch => dispatch({ type: LOGOUT });

export {
    passwordLoginAction,
    refreshProviderToken,
    registerStartedAction,
    registerNextStepAction,
    previousStepAction,
    registerUserAction,
    logoutAction,
};
