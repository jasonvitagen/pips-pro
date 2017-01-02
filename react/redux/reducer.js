export function user(state = {name: ''}, action) {
    switch (action.type) {
        case 'SIGN_IN_USER':
            return {...state, name: action.payload.name}
        case 'SIGN_OUT_USER':
            return {...state, user: {}};
    }
    return state;
};

export function registration(state = {name: '', email: '', password: '', confirmPassword: '', errors: {}}, action) {
    switch (action.type) {
        case 'TYPE_IN_REGISTRATION':
            return {...state, [action.payload.field]: action.payload.value};
        case 'CREATE_ACCOUNT_REJECTED':
            return {...state, errors: action.payload.response.data};
        case 'CREATE_ACCOUNT_FULFILLED':
            return {...state, errors: {}};
    }
    return state;
}