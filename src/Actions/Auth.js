import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { showNotification } from '../utils/notification';
import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } from '../utils/settings';
import history from '../history'

export const signIn = (username, password, UserStore) => {
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
        UserStore.setCognitoUser(cognitoUser)

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                let payload = result.idToken.payload
                UserStore.setUserInfo(payload['cognito:username'], payload['cognito:groups'][0], payload.email)
                history.push('/home')
                resolve();
            },
            onFailure: function (err) {
                UserStore.resetCognitoUser()
                let config = ''
                if(err.code === 'PasswordResetRequiredException') {
                    history.push('/resetpassword')
                } else if(err.code === 'InvalidParameterException'){
                    config = {
                        type: 'error',
                        message: 'Username no valido',
                        autoClose: true,
                    }
                }else{
                    config = {
                        type: 'error',
                        message: err.message,
                        autoClose: true,
                    }
                }
                
                if(config){
                    showNotification(config)
                }
                reject()
            },
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                history.push('/newpassword')
                resolve()
            }
        })
    })
}

export const signOut = (UserStore) => {
    UserStore.cognitoUser.signOut()
    UserStore.resetCognitoUser()
    history.push('/')
}

export const setNewPassword = (newPassword, UserStore) => {
    UserStore.cognitoUser.completeNewPasswordChallenge(newPassword, [], {
        onSuccess: function (result){
            let payload = result.idToken.payload
            UserStore.setUserInfo(payload['cognito:username'], payload['cognito:groups'][0], payload.email)
            history.push('/home')
        },
        onFailure: function (err){
            let config = {
                type: 'error',
                message: err.message,
                autoClose: true,
            }
            showNotification(config);
            UserStore.resetCognitoUser()
            history.push('/');
        }
    })
}