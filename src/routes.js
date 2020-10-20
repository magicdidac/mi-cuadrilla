import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import NewPassword from './NewPassword/NewPassword';
import Home from './Home/Home';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import ResetPassword from './ResetPassword/ResetPassword';

const RouterConfig = () => {

    return (
        <Switch>
            <Route exact path='/home' component={Home} />
            <Route exact path='/newpassword' component={NewPassword} />
            <Route exact path='/forgetpassword' component={ForgetPassword} />
            <Route exact path='/resetpassword' component={ResetPassword} />
            <Route exact path='/' component={Login} />
        </Switch>
    )

}

export default RouterConfig;