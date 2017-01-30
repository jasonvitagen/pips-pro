import jwtDecode from 'jwt-decode';
import {notify} from 'react-notify-toast';
import cookie from 'react-cookie';

const
    jwtDecodeMiddleware = store => next => action => {
        switch (action.type) {
            case 'CREATE_ACCOUNT_FULFILLED':
                cookie.save('Authorization', action.payload.data, {maxAge: 604800});
                action.payload = jwtDecode(action.payload.data);
                $('#sign-up-link').click();
            case 'CHECK_COOKIE':
                const cookieVal = cookie.load('Authorization');
                if (cookieVal) {
                    const user = jwtDecode(cookieVal);
                    if (Date.now() > user.exp * 1000) {
                        cookie.remove('Authorization');
                    } else {
                        action.payload = user;
                    }
                }
        }
        next(action);
    }
    , notificationMiddleware = store => next => action => {
        switch(action.type) {
            case 'CREATE_ACCOUNT_REJECTED':
                if (typeof action.payload.response.data === 'string') {
                    notify.show(action.payload.response.data, 'error');
                } else {
                    notify.show('Registration is unsuccessful, please check', 'error');
                }
                break;
            case 'CREATE_ACCOUNT_FULFILLED':
                notify.show('Registration is successful', 'success');
        }
        next(action);
    }

export {
    jwtDecodeMiddleware,
    notificationMiddleware
};