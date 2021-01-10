import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MessagePage from "./pages/MessagePage";

import UserState from "./store/state/UserState";
import ConversationState from "./store/state/ConversationState";

import "./App.css";

function App() {
  return (
    <UserState>
      <ConversationState>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <PrivateRoute exact path="/">
                <MessagePage />
              </PrivateRoute>
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/login" component={LoginPage} />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </ConversationState>
    </UserState>
  );
}

export default App;
