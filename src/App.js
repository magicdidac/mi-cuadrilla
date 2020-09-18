import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { AuthProvider } from './utils/Auth';
import { PrivateRoute } from './utils/PrivateRoute'; 
import { Login } from './Login/Login';
import { ChangePassword } from './ChangePassword/ChangePassword';
import{ Home } from './Home/Home';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#9c4dcc",
      main: "#6a1b9a",
      dark: "#38006b",
    },
    secondary: {
      light: "#6a4f4b",
      main: "#3e2723",
      dark: "#1b0000",
    },
    white: '#ffffff',
    black: '#000000',
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className='App'>
            <Switch>
              <Route exact path='/login' component={Login}/>
              <PrivateRoute exact path='/changePassword' component={ChangePassword} />
              <PrivateRoute exact path='/' component={Home} />
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
