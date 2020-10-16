import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from 'mobx-react';
import UserStore from './stores/UserStore';
import { Router } from 'react-router-dom';
import history from './history';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';

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

ReactDOM.render(
  <Provider UserStore={UserStore}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
        <ToastContainer/>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
