import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import RouterConfig from './routes';
import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } from './utils/settings';
import { inject} from 'mobx-react'

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isLogged: false,
    }
  }

  UNSAFE_componentWillMount = () => {
    const self = this
    let data = {
      ClientId: COGNITO_CLIENT_ID,
      UserPoolId: COGNITO_USER_POOL_ID,
    }

    let userPool = new AmazonCognitoIdentity.CognitoUserPool(data)
    let cognitoUser = userPool.getCurrentUser();
    this.props.UserStore.setCognitoUser(cognitoUser)

    if(cognitoUser){
      cognitoUser.getSession((err, session) => {
        if(err){
          console.log(err)
          return;
        }
        if(session){
          let payload = session.idToken.payload
          this.props.UserStore.setUserInfo(payload['cognito:username'], payload['cognito:groups'][0], payload.email)
          self.setState({ isLogged: true })
          return;
        }
      })
    }else
      console.log("not curr user")
  }

  render() {

    const path = this.props.location.pathname
    let notloggedAllowedPaths = path ==="/forgetpassword" || path === "/newpassword" || path.indexOf('/resetpassword') > -1;
    if(!!this.state.isLogged || path === '/' || notloggedAllowedPaths){
      return (
            <RouterConfig/>
      );      
    } else {
      return (
        <Redirect to='/' />
      )
    }

  }
}

export default inject("UserStore")(withRouter(App));
