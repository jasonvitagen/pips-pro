export default (state = {
    signedIn: false,
    user: {}
}, action) => {
    switch (action.type) {
        case "SIGN_IN_USER":
            return {...state, signedIn: true, user: action.payload.user};
        case "SIGN_OUT_USER":
            return {...state, signedIn: false, user: {}};
    }
    return state;
};