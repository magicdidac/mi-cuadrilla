const INITIAL_STATE = {
    username: '',
    role: '',
    email: '',
    cognitoUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SAVE_COGNITOUSER':
            return {
                ...state,
                cognitoUser: action.payload.cognitoUser
            }
        case 'SET_USER':
            let userPayload = action.payload.cognitoUser.signInUserSession.idToken.payload
            return {
                ...state,
                cognitoUser: action.payload.cognitoUser,
                username: userPayload['cognito:username'],
                email: userPayload.email,
                role: userPayload['cognito:groups'][0]
            }
        case 'SET_EMAIL':
            return { ...state, email: action.payload }
        case 'SIGNOUT':
            state.cognitoUser.signOut()
            return INITIAL_STATE;
        case 'RESET_USER_INFO':
            return INITIAL_STATE;
        default:
            return INITIAL_STATE;
    }
}

export default userReducer;