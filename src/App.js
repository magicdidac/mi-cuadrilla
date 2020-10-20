import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import RouterConfig from './routes';
import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } from './utils/settings';
import { setUserInformation } from './Actions';
import { connect } from 'react-redux';

class App extends React.Component {

  UNSAFE_componentWillMount = () => {
    let data = {
      ClientId: COGNITO_CLIENT_ID,
      UserPoolId: COGNITO_USER_POOL_ID,
    }

    let userPool = new AmazonCognitoIdentity.CognitoUserPool(data)
    let cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log(err)
          return;
        }
        if (session) {
          this.props.setUserInformation(cognitoUser)
          return;
        }
      })
    } else
      console.log("not curr user")
  }

  render() {

    const path = this.props.location.pathname
    let notloggedAllowedPaths = path === "/forgetpassword" || path === "/newpassword" || path === '/resetpassword';
    if (this.props.userStore.cognitoUser || path === '/' || notloggedAllowedPaths) {
      return (
        <RouterConfig />
      );
    } else {
      return (
        <Redirect to='/' />
      )
    }

  }
}

const mapStateToProps = (state) => (
  {
    userStore: state.user,
  }
)

export default connect(mapStateToProps, { setUserInformation })(withRouter(App));
