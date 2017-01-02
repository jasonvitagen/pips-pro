import axios from 'axios';

export function signInUser(user) {
    return {
        type: 'SIGN_IN_USER',
        payload: user
    }
}

export function typeInRegistration(payload) {
    return {
        type: 'TYPE_IN_REGISTRATION',
        payload
    }
}

export function createAccount(registration) {
    return {
        type: 'CREATE_ACCOUNT',
        payload: axios.post('http://localhost:3000/auth/local/create-account', registration)
    }
}