import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import UserState from "./store/state/UserState";

import "./App.css";

function App() {
  return (
    <UserState>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/signup" />
            </Route>
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </UserState>
  );
}

export default App;
