const
    registrationInitialState = {
        name: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        recaptcha: '',
        errors: {},
        error: '',
        submitting: false,
        editAccount: false
    }
    , signInInitialState = {
        email: '',
        password: '',
        submitting: false
    }
    , paymentInitialState = {
        PaymentPostUrl: '',
        MerchantCode: '',
        PaymentId: '',
        RefNo: '',
        Amount: '',
        Currency: '',
        ProdDesc: '',
        UserName: '',
        UserEmail: '',
        UserContact: '',
        Remark: '',
        Signature: '',
        ResponseUrl: '',
        BackendUrl: '',
        verifying: false,

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
        case 'EDIT_ACCOUNT':
            return {...state, editAccount: true};
        case 'CANCEL_EDIT_ACCOUNT':
            return {...state, editAccount: false};
        case 'CANCEL_CHANGE_PASSWORD':
            return {...state, resetPassword: false, changePassword: false};
        case 'EDIT_USER_ACCOUNT_FULFILLED':
            return {...state, ...action.payload, editAccount: false};
        case 'CHANGE_USER_PASSWORD_FULFILLED':
            return {...state, ...action.payload, changePassword: false};
        case 'CHANGE_PASSWORD':
            return {...state, changePassword: true};
        case 'FORGOT_PASSWORD':
            return {...state, forgotPassword: true};
        case 'CANCEL_FORGOT_PASSWORD':
            return {...state, forgotPassword: false};
        case 'FORGOT_USER_PASSWORD_FULFILLED':
            return {...state, forgotPassword: false};
        case 'RESET_PASSWORD':
            return {...state, resetPassword: true, changePassword: true};
        case 'RESET_USER_PASSWORD_FULFILLED':
            return {...state, resetPassword: false, changePassword: false};
    }
    return state;
};


export function registration(state = registrationInitialState, action) {
    switch (action.type) {
        case 'CREATE_ACCOUNT_PENDING':
            return {...state, submitting: true};
        case 'EDIT_USER_ACCOUNT_PENDING':
            return {...state, submitting: true};
        case 'CHANGE_USER_PASSWORD_PENDING':
            return {...state, submitting: true};
        case 'TYPE_IN_REGISTRATION':
            return {...state, [action.payload.field]: action.payload.value};
        case 'CREATE_ACCOUNT_REJECTED':
            return {...state, errors: action.payload.response.data, error: action.payload.response.data, submitting: false};
        case 'EDIT_USER_ACCOUNT_REJECTED':
            return {...state, errors: action.payload.response.data, error: action.payload.response.data, submitting: false};
        case 'CHANGE_USER_PASSWORD_REJECTED':
            return {...state, errors: action.payload.response.data, error: action.payload.response.data, submitting: false};
        case 'CREATE_ACCOUNT_FULFILLED':
            return registrationInitialState;
        case 'EDIT_USER_ACCOUNT_FULFILLED':
            return {...state, errors: {}, error: '', submitting: false};
        case 'CHANGE_USER_PASSWORD_FULFILLED':
            return {...state, errors: {}, error: '', submitting: false};
        case 'CLEAR_REGISTRATION':
            return registrationInitialState;
        case 'EDIT_ACCOUNT':
            return {...state, ...action.payload, editAccount: true, password: 123, confirmPassword: 123};
        case 'CHANGE_PASSWORD':
            return {...state, ...action.payload, changePassword: true, email: '123'};
        case 'CHANGE_PASSWORD_REJECTED':
            return {...state, errors: action.payload.response.data};
        case 'CANCEL_EDIT_ACCOUNT':
            return {...state, editAccount: false, password: '', confirmPassword: ''};
        case 'CANCEL_CHANGE_PASSWORD':
            return {...state, changePassword: false, email: '', resetPasswordToken: ''};
        case 'RESET_PASSWORD':
            return {...state, resetPasswordToken: action.payload};
        case 'RESET_USER_PASSWORD_REJECTED':
            return {...state, errors: action.payload.response.data};
    }
    return state;
}


export function signIn(state = signInInitialState, action) {
    switch (action.type) {
        case 'SIGN_IN_USER_PENDING':
            return {...state, submitting: true};
        case 'SIGN_IN_USER_FULFILLED':
            return {...state, submitting: false};
        case 'SIGN_IN_USER_REJECTED':
            return {...state, submitting: false};
        case 'TYPE_IN_SIGN_IN':
            return {...state, [action.payload.field]: action.payload.value};
        case 'CLEAR_SIGN_IN':
            return signInInitialState;
        case 'FORGOT_USER_PASSWORD_PENDING':
            return {...state, submitting: true};
        case 'FORGOT_USER_PASSWORD_FULFILLED':
            return {...state, submitting: false};
        case 'FORGOT_USER_PASSWORD_REJECTED':
            return {...state, submitting: false};
    }
    return state;
}


export function selectedPackage(state = '1', action) {
    switch (action.type) {
        case 'SELECT_PACKAGE':
            return action.payload;
    }
    return state;
}


export function payment(state = paymentInitialState, action) {
    switch (action.type) {
        case 'SET_PAYMENT_ID':
            return {...state, PaymentId: action.payload};
        case 'GET_PAYMENT_SIGNATURE_FULFILLED':
            return {...action.payload.data, verifying: false};
        case 'GET_PAYMENT_SIGNATURE_PENDING':
            return {...state, verifying: true};
        case 'GET_PAYMENT_SIGNATURE_REJECTED':
            return {...state, verifying: false};
        case 'CREATE_ACCOUNT_FULFILLED':
            return {...state, UserName: action.payload.name, UserEmail: action.payload.email, UserContact: action.payload.mobile};
        case 'SIGN_IN_USER_FULFILLED':
            return {...state, UserName: action.payload.name, UserEmail: action.payload.email, UserContact: action.payload.mobile};

    }
    return state;
}


export function transactions(state = [], action) {
    switch (action.type) {
        case 'GET_TRANSACTIONS_FULFILLED':
            return action.payload.data
    }
    return state;
}


export function activeCustomers(state = [], action) {
    switch (action.type) {
        case 'GET_ACTIVE_CUSTOMERS_FULFILLED':
            return action.payload.data
    }
    return state;
}