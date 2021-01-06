import React, { useContext, useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { TextField, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import LargeButton from "../LargeButton";
import UserContext from "../../store/context/users";

const useStyles = makeStyles(() => ({
  textField: {
    margin: "20px 0",
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const { login, loginErrors } = useContext(UserContext);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    pw: "",
  });

  const handleLogin = e => {
    e.preventDefault();
    login(loginInfo).then(res => console.log(res));
  };

  const updateState = e => {
    // extract name (used as key) and value
    const { name: key, value } = e.target;
    setLoginInfo({ ...loginInfo, [key]: value });
  };

  return (
    <section className="container login-form-container">
      <header className="form-section-header">
        <p className="auth-link">Don't have an account?</p>
        <Link to="/signup" className="signup-link">
          <LargeButton color="primary">Create Account</LargeButton>
        </Link>
      </header>
      <div className="login-form-wrapper">
        <h2 className="login-form-title">Create an account.</h2>
        {/* Display Errors */}
        {loginErrors.length > 0 && (
          <MuiAlert variant="outlined" severity="error">
            {loginErrors}
          </MuiAlert>
        )}
        <form method="post" onSubmit={e => handleLogin(e)}>
          <FormControl variant="outlined" fullWidth margin="normal">
            <TextField
              className={classes.textField}
              required
              id="email"
              label="E-mail address"
              type="email"
              name="email"
              value={loginInfo.email}
              onChange={updateState}
              autoFocus
              autoComplete="email"
            />
            <TextField
              className={classes.textField}
              required
              id="password"
              label="Password"
              type="password"
              name="pw"
              value={loginInfo.pw}
              onChange={updateState}
              autoComplete="current-password"
            />
          </FormControl>
          <div className="login-button-container">
            <LargeButton type="submit" variant="contained" color="primary">
              Login
            </LargeButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
