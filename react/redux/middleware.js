import jwtDecode from 'jwt-decode';
import {notify} from 'react-notify-toast';
import cookie from 'react-cookie';

const
    jwtDecodeMiddleware = store => next => action => {
        switch (action.type) {
            case 'CREATE_ACCOUNT_FULFILLED':
            case 'SIGN_IN_USER_FULFILLED':
            case 'EDIT_USER_ACCOUNT_FULFILLED':
            case 'CHANGE_USER_PASSWORD_FULFILLED':
                cookie.save('Authorization', action.payload.data, {maxAge: 604800});
                action.payload = {...jwtDecode(action.payload.data), token: action.payload.data};
                $('#sign-up-link').click();
                break;
            case 'CHECK_COOKIE':
                const cookieVal = cookie.load('Authorization');
                if (cookieVal) {
                    const user = jwtDecode(cookieVal);
                    if (Date.now() > user.exp * 1000) {
                        cookie.remove('Authorization');
                    } else {
                        action.payload = {...user, token: cookieVal};
                    }
                }
                break;
            case 'SIGN_OUT':
                cookie.remove('Authorization');
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
            case 'SIGN_IN_USER_REJECTED':
                notify.show('Invalid username or password', 'error');
                break;
            case 'EDIT_USER_ACCOUNT_REJECTED':
                notify.show('Edit is unsuccessful, please check', 'error');
                break;
            case 'CHANGE_USER_PASSWORD_REJECTED':
                notify.show('Password change is unsuccessful, please check', 'error');
                break;
            case 'SIGN_IN_USER_FULFILLED':
                notify.show('Signed in successfully', 'success');
                break;
            case 'CREATE_ACCOUNT_FULFILLED':
                notify.show('Registered successfully', 'success');
                break;
            case 'EDIT_USER_ACCOUNT_FULFILLED':
                notify.show('Edited successfully', 'success');
                break;
            case 'CHANGE_USER_PASSWORD_FULFILLED':
                notify.show('Password changed successfully', 'success');
                break;
            case 'SIGN_OUT':
                notify.show('Signed out successfully', 'success');
                break;
            case 'FORGOT_USER_PASSWORD_FULFILLED':
                notify.show('Check your email', 'success');
                break;
        }
        next(action);
    }

export {
    jwtDecodeMiddleware,
    notificationMiddleware
};