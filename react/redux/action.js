import axios from 'axios';
import {cognitoUserPool} from '../components/payment-container';
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';

export function typeInRegistration(payload) {
    return {
        type: 'TYPE_IN_REGISTRATION',
        payload
    };
}

export function typeInSignIn(payload) {
    return {
        type: 'TYPE_IN_SIGN_IN',
        payload
    };
}

export function createAccount(registration) {
    const {
            name,
            mobile,
            email,
            password,
            confirmPassword,
            recaptcha,
            editAccount
        } = registration,
        validationErrors = {};

    if (!name) validationErrors.name = 'Name is required';
    if (mobile.length > 15)
        validationErrors.mobile = 'Max 15 digits for mobile number';
    if (!/^\d*$/.test(mobile))
        validationErrors.mobile = 'Please enter a valid mobile number';
    if (!mobile) validationErrors.mobile = 'Mobile number is required';
    if (email.length > 254)
        validationErrors.email = 'Max 254 characters for email';
    if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            email
        )
    )
        validationErrors.email = 'Please enter a valid email address';
    if (!email) validationErrors.email = 'Email is required';
    if (password.length < 6)
        validationErrors.password = 'Min 6 characters for password';
    if (password.length > 128)
        validationErrors.password = 'Max 128 characters for password';
    if (!password) validationErrors.password = 'Password is required';
    if (confirmPassword.length > 128)
        validationErrors.confirmPassword = 'Max 128 characters for password';
    if (password !== confirmPassword)
        validationErrors.confirmPassword =
            'Confirmation password does not match';
    if (!confirmPassword)
        validationErrors.confirmPassword = 'Confirmation password is required';

    if (Object.keys(validationErrors).length > 0) {
        return {
            type: 'CREATE_ACCOUNT_REJECTED',
            payload: {
                response: {
                    data: validationErrors
                }
            }
        };
    }

    const newMobile =
        '+' + (mobile.indexOf('60') === 0 ? mobile : '6' + mobile);

    const attributeList = [
        new CognitoUserAttribute({
            Name: 'name',
            Value: name
        }),
        new CognitoUserAttribute({
            Name: 'email',
            Value: email
        }),
        new CognitoUserAttribute({
            Name: 'phone_number',
            Value: newMobile
        })
    ];

    return {
        type: 'CREATE_ACCOUNT',
        payload: new Promise((resolve, reject) => {
            cognitoUserPool.signUp(
                email,
                password,
                attributeList,
                null,
                (err, result) => {
                    if (err) {
                        reject({
                            response: {
                                data: err.message || JSON.stringify(err)
                            }
                        });
                        return;
                    }
                    resolve(result);
                }
            );
        })
    };
}

export function checkCookie() {
    return {
        type: 'CHECK_COOKIE'
    };
}

export function signOut() {
    return {
        type: 'SIGN_OUT'
    };
}

export function signUp() {
    return {
        type: 'SIGN_UP'
    };
}

export function signIn() {
    return {
        type: 'SIGN_IN'
    };
}

export function clearRegistration() {
    return {
        type: 'CLEAR_REGISTRATION'
    };
}

export function clearSignIn() {
    return {
        type: 'CLEAR_SIGN_IN'
    };
}

export function signInUser(signInCredentials) {
    return {
        type: 'SIGN_IN_USER',
        payload: axios.post(
            `${process.env.HOST}auth/local/sign-in`,
            signInCredentials
        )
    };
}

export function editAccount(user) {
    return {
        type: 'EDIT_ACCOUNT',
        payload: user
    };
}

export function cancelEditAccount() {
    return {
        type: 'CANCEL_EDIT_ACCOUNT'
    };
}

export function editUserAccount(registration, user) {
    return {
        type: 'EDIT_USER_ACCOUNT',
        payload: axios.post(
            `${process.env.HOST}auth/local/edit-account`,
            registration,
            {
                headers: {
                    Authorization: user.token
                }
            }
        )
    };
}

export function selectPackage(value) {
    return {
        type: 'SELECT_PACKAGE',
        payload: value
    };
}

export function getPaymentSignature(paymentId, selectedPackage, user, country) {
    return {
        type: 'GET_PAYMENT_SIGNATURE',
        payload: axios.post(
            `${process.env.HOST}payment/signature`,
            {paymentId: paymentId, selectedPackage: selectedPackage, country},
            {
                headers: {
                    Authorization: user.token
                }
            }
        )
    };
}

export function setPaymentId(paymentId) {
    return {
        type: 'SET_PAYMENT_ID',
        payload: paymentId
    };
}

export function changePassword() {
    return {
        type: 'CHANGE_PASSWORD'
    };
}

export function cancelChangePassword() {
    return {
        type: 'CANCEL_CHANGE_PASSWORD'
    };
}

export function changeUserPassword(registration, user) {
    return {
        type: 'CHANGE_USER_PASSWORD',
        payload: axios.post(
            `${process.env.HOST}auth/local/change-password`,
            registration,
            {
                headers: {
                    Authorization: user.token
                }
            }
        )
    };
}

export function forgotPassword() {
    return {
        type: 'FORGOT_PASSWORD'
    };
}

export function cancelForgotPassword() {
    return {
        type: 'CANCEL_FORGOT_PASSWORD'
    };
}

export function forgotUserPassword(payload, user) {
    return {
        type: 'FORGOT_USER_PASSWORD',
        payload: axios.post(
            `${process.env.HOST}auth/local/forgot-password`,
            payload,
            {
                headers: {
                    Authorization: user.token
                }
            }
        )
    };
}

export function resetPassword(token) {
    return {
        type: 'RESET_PASSWORD',
        payload: token
    };
}

export function resetUserPassword(registration) {
    return {
        type: 'RESET_USER_PASSWORD',
        payload: axios.post(
            `${process.env.HOST}auth/local/reset-password`,
            registration
        )
    };
}

export function getTransactions(user) {
    return {
        type: 'GET_TRANSACTIONS',
        payload: axios.get(`${process.env.HOST}my-account/transactions`, {
            headers: {
                Authorization: user.token
            }
        })
    };
}

export function getActiveCustomers(user) {
    return {
        type: 'GET_ACTIVE_CUSTOMERS',
        payload: axios.get(`${process.env.HOST}boss/active-customers`, {
            headers: {
                Authorization: user.token
            }
        })
    };
}
