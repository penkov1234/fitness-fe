export const tokenHelper = {
    get auth() {
        let persist = localStorage.getItem('persist:fitness');
        if (persist) {
            try {
                let access_token = JSON.parse(JSON.parse(persist).auth).data.auth;
                return access_token;
            } catch {
                return false;
            }
        } else {
            return false;
        }
    },
    get refreshToken() {
        let persist = localStorage.getItem('persist:coach');
        if (persist) {
            try {
                let refresh_token = JSON.parse(JSON.parse(persist).auth).data.data.refresh_token;
                return refresh_token;
            } catch {
                return false;
            }
        } else {
            return false;
        }
    },
    get isAccessTokenExpired() {
        let persist = localStorage.getItem('persist:coach');
        if (persist) {
            try {
                let data = JSON.parse(JSON.parse(persist).auth).data.data;
                // console.log(data);
                let expires_in = data.expires_in;

                let token_creation = data.token_creation;
                let date_now = Date.now();

                return (date_now - token_creation) / 1000 + 500 > expires_in;
            } catch (message) {
                console.warn('Catch exception parsing persist:coach', message);
                return false;
            }
        } else {
            return false;
        }
    },
    sendTokenToUnity() {
        let token = this.auth;
        if (token) {
            window.location.href = `uniwebview://Auth?auth=${token}`;
        }
        return token;
    },
};
