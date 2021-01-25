import { Action } from '../core/Action';

export const SCROLL_STICKY_ZONE = {
    entity: 'SCROLL_ABOVE_LIMIT',
    action: Action.HANDLE,
};

export const WORKOUTS_NEW = {
    entity: 'WORKOUTS_NEW',
    action: Action.HANDLE,
};

export const GET_ALL_EXERCIESES = {
    entity: 'GET_ALL_EXERCIESES',
    action: Action.HANDLE,
};
export const WORKOUTS_GET_ALL_FILTERED = {
    entity: 'ALL_WORKOUTS_FILTERED',
    action: Action.GET,
};
export const WORKOUTS_GET_SUBSCRIBED = {
    entity: 'SUBSCRIBED_WORKOUT',
    action: Action.GET,
};
export const WORKOUTS_SUBSCRIBE = {
    entity: 'WORKOUTS_SUBSCRIBE',
    action: Action.HANDLE,
};
export const USER_INFO = {
    entity: 'USER_INFO',
    action: Action.HANDLE,
};
export const CHECK_FOR_SUBSCRIPTION = {
    entity: 'SUBSCRIPTION_CHECK',
    action: Action.HANDLE,
};
export const WORKOUTS_UPDATE = {
    entity: 'WORKOUTS_UPDATE',
    action: Action.UPDATE,
};
export const STATISTICS = {
    entity: 'STATISTICS',
    action: Action.GET_MANY,
};
