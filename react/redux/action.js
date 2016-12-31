export function signInUser(user) {
    return {
        type: 'SIGN_IN_USER',
        payload: {user}
    }
}