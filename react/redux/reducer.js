const
    registrationInitialState = {
        name: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        recaptcha: '',
        errors: {},
        submitting: false
    }
    , signInInitialState = {
        email: '',
        password: '',
        submitting: false
    };


export function signInIntent(state = '', action) {
    switch (action.type) {
        case 'SIGN_UP':
            return 'signup';
        case 'SIGN_IN':
            return 'signin';
        case 'CREATE_ACCOUNT_FULFILLED':
            return '';
        case 'SIGN_IN_USER_FULFILLED':
            return '';
    }
    return state;
}


export function user(state = {}, action) {
    switch (action.type) {
        case 'CREATE_ACCOUNT_FULFILLED':
            return {...state, ...action.payload};
        case 'CHECK_COOKIE':
            return {...state, ...action.payload};
        case 'SIGN_OUT':
            return {};
        case 'SIGN_IN_USER_FULFILLED':
            return {...state, ...action.payload};
    }
    return state;
};


export function registration(state = registrationInitialState, action) {
    switch (action.type) {
        case 'CREATE_ACCOUNT_PENDING':
            return {...state, submitting: true};
        case 'TYPE_IN_REGISTRATION':
            return {...state, [action.payload.field]: action.payload.value};
        case 'CREATE_ACCOUNT_REJECTED':
            return {...state, errors: action.payload.response.data, error: action.payload.response.data, submitting: false};
        case 'CREATE_ACCOUNT_FULFILLED':
            return registrationInitialState;
        case 'CLEAR_REGISTRATION':
            return registrationInitialState;
    }
    return state;
}


export function signIn(state = signInInitialState, action) {
    switch (action.type) {
        case 'TYPE_IN_SIGN_IN':
            return {...state, [action.payload.field]: action.payload.value};
        case 'CLEAR_SIGN_IN':
            return signInInitialState;
    }
    return state;
}