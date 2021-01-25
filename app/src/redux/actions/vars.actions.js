import { FETCH_CALENDAR } from 'redux/constants/vars.constants';

export const setFetchCalendar = flag => async dispatch => {
    console.log('fetch calendar with flag', flag);
    dispatch({ type: FETCH_CALENDAR, payload: flag });
};
