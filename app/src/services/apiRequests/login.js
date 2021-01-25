import requestAgent from 'services/requestAgent';
import { handleSuccess, handleError } from './utils';
import { LOGIN_API } from 'services/api';
import { tokenHelper } from 'services/tokenHelpers';

export const loginApiRequest = async (email, password) => {
    try {
        const responseData = await requestAgent.post(
            LOGIN_API,
            {},
            {
                Authorization: 'Basic ' + btoa(email + ':' + password),
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        );
        // console.log(responseData);
        return handleSuccess(responseData);
    } catch (e) {
        return handleError();
    }
};

export const refreshTokenRequest = async () => {
    let data = new FormData();
    let refreshToken = tokenHelper.refreshToken;
    if (refreshToken) {
        data.set('refresh_token', refreshToken);

        const responseData = await requestAgent.post(LOGIN_API + '?grant_type=refresh_token', data, {
            Authorization: 'Basic ' + btoa('ClientId' + ':' + 'secret'),
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        if (responseData.status === 200) {
            return handleSuccess(responseData);
        }
    }
    return handleError();
};
