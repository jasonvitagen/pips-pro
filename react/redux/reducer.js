export function user(state = {}, action) {
    switch (action.type) {
        case 'CREATE_ACCOUNT_FULFILLED':
            console.log(action.payload);
            return action.payload;
    }
    return state;
};

export function registration(state = {name: '', email: '', password: '', confirmPassword: '', errors: {}}, action) {
    switch (action.type) {
        case 'TYPE_IN_REGISTRATION':
            return {...state, [action.payload.field]: action.payload.value};
        case 'CREATE_ACCOUNT_REJECTED':
            return {...state, errors: action.payload.response.data, error: action.payload.response.data};
        case 'CREATE_ACCOUNT_FULFILLED':
            return {...state, errors: {}};
    }
    return state;
}