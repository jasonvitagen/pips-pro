const
    registrationInitialState = {name: '', mobile: '', email: '', password: '', confirmPassword: '', recaptcha: '', errors: {}, submitting: false};


export function user(state = {}, action) {
    switch (action.type) {
        case 'CREATE_ACCOUNT_FULFILLED':
            return {...state, ...action.payload};
        case 'CHECK_COOKIE':
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
    }
    return state;
}