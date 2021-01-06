import React, { useContext, useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { TextField, FormControl } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import LargeButton from "../LargeButton";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../store/context/users";
import { checkField, checkAllFields } from "../../utils/validation";

const useStyles = makeStyles(() => ({
  textField: {
    margin: "20px 0",
  },
  isValid: {
    visibility: "hidden",
    height: 0,
  },
  notValid: {
    visibility: "block",
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  const { signup, signupErrors } = useContext(UserContext);

  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    pw: "",
    confirmPw: "",
  });

  const { username, email, pw, confirmPw } = signupInfo;

  const [isValid, setIsValid] = useState({
    usernameIsValid: false,
    emailIsValid: false,
    pwIsValid: false,
    confirmPwIsValid: false,
  });

  const [allValid, setAllValid] = useState(false);

  const updateState = e => {
    // extract name (used as key) and value
    const { name: key, value } = e.target;
    // update global state
    setSignupInfo({ ...signupInfo, [key]: value });
    // perform validation
    validate(key, value);
  };

  const validate = (key, value) => {
    const valid = checkField(key, value);
    const isValidString = `${key}IsValid`;
    // form new state and set it as well as check if all values are valid
    if (key === "pw") {
      let isValidData = {
        ...isValid,
        [isValidString]: valid,
        confirmPwIsValid: value === confirmPw ? true : false,
      };
      setIsValid(isValidData);
      setAllValid(checkAllFields(isValidData));
    } else if (key === "confirmPw") {
      let isValidData = {
        ...isValid,
        [isValidString]: valid,
        confirmPwIsValid: value === pw ? true : false,
      };
      setIsValid(isValidData);
      setAllValid(checkAllFields(isValidData));
    } else {
      let isValidData = {
        ...isValid,
        [isValidString]: valid,
      };
      setIsValid(isValidData);
      setAllValid(checkAllFields(isValidData));
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    signup(signupInfo);
  };

  return (
    <section className="container register-form-container">
      <header className="form-section-header">
        <p className="auth-link">Already have an account?</p>
        <Link to="/login" className="login-link">
          <LargeButton color="primary">Login</LargeButton>
        </Link>
      </header>
      <div className="register-form-wrapper">
        <h2 className="register-form-title">Create an account.</h2>
        {/* Display Errors */}
        {signupErrors.length > 0 && (
          <MuiAlert variant="outlined" severity="error">
            {signupErrors}
          </MuiAlert>
        )}
        <form method="post" onSubmit={e => onSubmit(e)}>
          <FormControl variant="outlined" fullWidth margin="normal">
            <TextField
              className={classes.textField}
              required
              id="username"
              label="Username"
              type="text"
              name="username"
              value={username}
              onChange={updateState}
              autoFocus
              autoComplete="username"
              error={!isValid.usernameIsValid}
              helperText="Please enter a username"
              FormHelperTextProps={{
                classes: {
                  root: isValid.usernameIsValid
                    ? classes.isValid
                    : username === ""
                    ? classes.isValid
                    : classes.notValid,
                },
              }}
            />
            <TextField
              className={classes.textField}
              required
              id="email"
              label="E-mail address"
              type="email"
              name="email"
              value={email}
              onChange={updateState}
              autoComplete="email"
              error={!isValid.emailIsValid}
              helperText="Please enter your email"
              FormHelperTextProps={{
                classes: {
                  root: isValid.emailIsValid
                    ? classes.isValid
                    : email === ""
                    ? classes.isValid
                    : classes.notValid,
                },
              }}
            />
            <TextField
              className={classes.textField}
              required
              id="password"
              label="Password"
              type="password"
              name="pw"
              value={pw}
              onChange={updateState}
              autoComplete="new-password"
              error={!isValid.pwIsValid}
              helperText="Please enter a password"
              FormHelperTextProps={{
                classes: {
                  root: isValid.pwIsValid
                    ? classes.isValid
                    : pw === ""
                    ? classes.isValid
                    : classes.notValid,
                },
              }}
            />
            <TextField
              className={classes.textField}
              required
              id="confirm-password"
              label="Confirm Password"
              type="password"
              name="confirmPw"
              value={confirmPw}
              onChange={updateState}
              autoComplete="new-password"
              error={!isValid.confirmPwIsValid}
              helperText="Passwords do not match"
              FormHelperTextProps={{
                classes: {
                  root: isValid.confirmPwIsValid
                    ? classes.isValid
                    : confirmPw === ""
                    ? classes.isValid
                    : classes.notValid,
                },
              }}
            />
          </FormControl>
          <div className="register-button-container">
            <LargeButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={!allValid}
            >
              Create
            </LargeButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
