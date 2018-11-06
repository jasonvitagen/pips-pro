import jwtDecode from 'jwt-decode';
import {notify} from 'react-notify-toast';
import cookie from 'react-cookie';
import {cognitoUserPool} from '../components/payment-container';

const cognitoSessionMiddleware = store => next => action => {
        switch (action.type) {
            case 'CREATE_ACCOUNT_FULFILLED':
            case 'SIGN_IN_USER_FULFILLED':
            case 'EDIT_USER_ACCOUNT_FULFILLED':
            case 'CHANGE_USER_PASSWORD_FULFILLED':
                // cookie.save('Authorization', action.payload.data, {
                //     maxAge: 604800
                // });
                // action.payload = {
                //     ...jwtDecode(action.payload.data),
                //     token: action.payload.data
                // };
                $('#buy-signals-link').click();
                return next(action);
            case 'CHECK_COGNITO_SESSION': {
                const cognitoUser = cognitoUserPool.getCurrentUser();
                if (cognitoUser) {
                    cognitoUser.getSession((err, session) => {
                        if (err) {
                            console.log(err.message || JSON.stringify(err));
                        }
                        cognitoUser.getUserData((err, result) => {
                            if (err) {
                                console.log(err.message || JSON.stringify(err));
                            }
                            const userDataObj = result.UserAttributes.reduce(
                                (acc, {Name, Value}) => ({
                                    ...acc,
                                    [Name]: Value
                                }),
                                {}
                            );
                            action.payload = {
                                email: userDataObj.email,
                                name: userDataObj.name,
                                phone_number: userDataObj.phone_number
                            };
                            return next(action);
                        });
                    });
                }
                break;
            }
            case 'SIGN_OUT': {
                const cognitoUser = cognitoUserPool.getCurrentUser();

                if (cognitoUser) {
                    cognitoUser.getSession((err, result) => {
                        if (err) {
                            console.log(err.message || JSON.stringify(err));
                            return;
                        }
                        cognitoUser.signOut();
                        action.payload = {};
                        return next(action);
                    });
                }
            }
        }
        next(action);
    },
    notificationMiddleware = store => next => action => {
        switch (action.type) {
            case 'CREATE_ACCOUNT_REJECTED':
                if (typeof action.payload.response.data === 'string') {
                    if (
                        action.payload.response.data.indexOf(
                            'invalid recaptcha'
                        ) > -1
                    ) {
                        notify.show('Invalid recaptcha', 'error');
                    } else {
                        notify.show(action.payload.response.data, 'error');
                    }
                } else {
                    notify.show(
                        'Registration is unsuccessful, please check',
                        'error'
                    );
                }
                break;
            case 'SIGN_IN_USER_REJECTED':
                notify.show('Invalid username or password', 'error');
                break;
            case 'EDIT_USER_ACCOUNT_REJECTED':
                notify.show('Edit is unsuccessful, please check', 'error');
                break;
            case 'CHANGE_USER_PASSWORD_REJECTED':
                if (typeof action.payload.response.data === 'string') {
                    if (
                        action.payload.response.data.indexOf(
                            'Incorrect username or password'
                        ) > -1
                    ) {
                        notify.show('Incorrect old password', 'error');
                    } else {
                        notify.show(action.payload.response.data, 'error');
                    }
                } else {
                    notify.show(
                        'Password change is unsuccessful, please check',
                        'error'
                    );
                }
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
            case 'FORGOT_USER_PASSWORD_VERIFICATION_FULFILLED':
                notify.show('Password has been reset successfully', 'success');
                break;
            case 'FORGOT_USER_PASSWORD_VERIFICATION_REJECTED':
                notify.show('Password reset failed', 'error');
                break;
            case 'FORGOT_USER_PASSWORD_REJECTED':
                console.log(action.payload);
                if (typeof action.payload === 'string') {
                    if (
                        action.payload.indexOf(
                            "Value at 'username' failed to satisfy constraint"
                        ) > -1
                    ) {
                        notify.show('Please enter a valid email', 'error');
                    } else if (
                        action.payload.indexOf('no registered/verified email') >
                        -1
                    ) {
                        notify.show('No registered email', 'error');
                    } else {
                        notify.show(action.payload, 'error');
                    }
                }
                break;
            case 'RESET_USER_PASSWORD_REJECTED':
                notify.show(
                    'Password change is unsuccessful, please check',
                    'error'
                );
                break;
            case 'RESET_USER_PASSWORD_FULFILLED':
                notify.show(action.payload.data, 'success');

                break;
        }
        next(action);
    };

export {cognitoSessionMiddleware, notificationMiddleware};
