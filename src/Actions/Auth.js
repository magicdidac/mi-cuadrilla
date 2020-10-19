import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { showNotification } from '../utils/notification';
import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } from '../utils/settings';
import history from '../history'

export const signIn = function (username, password) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            let authenticationData = {
                Username: username,
                Password: password,
            }
            let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
            let poolData = {
                ClientId: COGNITO_CLIENT_ID,
                UserPoolId: COGNITO_USER_POOL_ID,
            }
            let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
            let userData = {
                Username: username,
                Pool: userPool,
            }
            let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    dispatch({
                        type: 'SET_USER',
                        payload: { cognitoUser: cognitoUser }
                    })
                    history.push('/home')
                    resolve();
                },
                onFailure: function (err) {
                    let config = ''
                    if (err.code === 'PasswordResetRequiredException') {
                        history.push('/resetpassword')
                    } else if (err.code === 'InvalidParameterException') {
                        config = {
                            type: 'error',
                            message: 'Username no valido',
                            autoClose: true,
                        }
                    } else {
                        config = {
                            type: 'error',
                            message: err.message,
                            autoClose: true,
                        }
                    }

                    if (config) {
                        showNotification(config)
                    }
                    reject()
                },
                newPasswordRequired: function (userAttributes, requiredAttributes) {
                    dispatch({
                        type: 'SAVE_COGNITOUSER',
                        payload: { cognitoUser: cognitoUser }
                    })
                    history.push('/newpassword')
                    resolve()
                }
            })
        })
    }
}

export const setUserInformation = (cognitoUser) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_USER',
            payload: { cognitoUser: cognitoUser }
        })
        history.push('/home')
    }
}

export const signOut = () => {
    return (dispatch) => {
        dispatch({
            type: 'SIGNOUT',
            payload: ''
        })
        history.push('/')
    }
}

export const setNewPassword = (newPassword, cognitoUser) => {
    return (dispatch) => {
        cognitoUser.completeNewPasswordChallenge(newPassword, [], {
            onSuccess: function (result) {
                console.log('Yes')
                dispatch({
                    type: 'SET_USER',
                    payload: { cognitoUser: cognitoUser }
                })
                history.push('/home')
            },
            onFailure: function (err) {
                let config = {
                    type: 'error',
                    message: err.message,
                    autoClose: true,
                }
                showNotification(config);
                history.push('/');
            }
        })

    }
}