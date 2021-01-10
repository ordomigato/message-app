import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  FormControl,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import LargeButton from "../LargeButton";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../store/context/users";
import { checkField, checkAllFields } from "../../utils/validation";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    margin: "20px 0",
  },
  formContainer: {
    maxWidth: "380px",
    alignSelf: "center",
  },
  header: {
    padding: "20px 0",
  },
  link: {
    textDecoration: "none",
    marginLeft: "30px",
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
  const { signup, logout, isAuthenticated } = useContext(UserContext);

  const [registerErrors, setRegisterErrors] = useState([]);
  const [submitButtonPressed, setSubmitButtonPressed] = useState(false);

  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    pw: "",
    confirmPw: "",
  });

  const [isValid, setIsValid] = useState({
    usernameIsValid: {
      bool: false,
      errorMsg: null,
    },
    emailIsValid: {
      bool: false,
      errorMsg: null,
    },
    pwIsValid: {
      bool: false,
      errorMsg: null,
    },
    confirmPwIsValid: {
      bool: false,
      errorMsg: null,
    },
  });

  // easier access
  const { username, email, pw, confirmPw } = signupInfo;

  const updateState = e => {
    // extract name (used as key) and value
    const { name: key, value } = e.target;
    // update global state
    setSignupInfo({ ...signupInfo, [key]: value });
  };

  const validate = () => {
    // perform validation
    let isValidResults = {};
    Object.keys(signupInfo).forEach(key => {
      const isValidString = `${key}IsValid`;
      const { isSuccess, errorMsg } = checkField(key, signupInfo[key]);
      // add results to isValidResults
      isValidResults = {
        ...isValidResults,
        [isValidString]: { bool: isSuccess, errorMsg },
      };
    });
    // check password matches confirmPw and add to isValidResults
    const pwMatches = pw === confirmPw;
    isValidResults = {
      ...isValidResults,
      confirmPwIsValid: {
        bool: pwMatches,
        errorMsg: pwMatches ? null : "Passwords do not match",
      },
    };
    // set isValidResults
    setIsValid(isValidResults);

    // check if all fields pass and retun
    return checkAllFields(isValidResults);
  };

  const onSubmit = e => {
    e.preventDefault();
    // clear registerErrors
    setRegisterErrors([]);
    // validate
    const isSignupInfoValid = validate();
    setSubmitButtonPressed(true);
    // if all valid, continue with signup
    if (isSignupInfoValid === true) {
      signup(signupInfo).then(res =>
        res.success === false
          ? setRegisterErrors([res.msg])
          : setRegisterErrors([])
      );
      return;
    } else {
      return;
    }
  };

  return (
    <Container component="section" className={classes.root}>
      {isAuthenticated ? (
        <LargeButton onClick={logout}>Logout</LargeButton>
      ) : (
        <>
          <Grid
            container
            justify="flex-end"
            alignItems="center"
            className={classes.header}
            component="header"
          >
            <Grid item>
              <Typography variant="h5">Already have an account?</Typography>
            </Grid>
            <Link to="/login" className={classes.link}>
              <LargeButton color="primary">Login</LargeButton>
            </Link>
          </Grid>
          <Grid container direction="column" className={classes.formContainer}>
            <Typography
              variant="h2"
              component="h1"
              className="login-form-title"
            >
              Create an account.
            </Typography>
            {/* Display Errors */}
            {registerErrors.map((error, index) => (
              <MuiAlert variant="outlined" severity="error" key={index}>
                {error}
              </MuiAlert>
            ))}
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
                  error={submitButtonPressed && !isValid.usernameIsValid.bool}
                  helperText={isValid.usernameIsValid.errorMsg}
                  FormHelperTextProps={{
                    classes: {
                      root: isValid.usernameIsValid.bool
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
                  error={submitButtonPressed && !isValid.emailIsValid.bool}
                  helperText={isValid.emailIsValid.errorMsg}
                  FormHelperTextProps={{
                    classes: {
                      root: isValid.emailIsValid.bool
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
                  error={submitButtonPressed && !isValid.pwIsValid.bool}
                  helperText={isValid.pwIsValid.errorMsg}
                  FormHelperTextProps={{
                    classes: {
                      root: isValid.pwIsValid.bool
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
                  error={submitButtonPressed && !isValid.confirmPwIsValid.bool}
                  helperText={isValid.confirmPwIsValid.errorMsg}
                  FormHelperTextProps={{
                    classes: {
                      root: isValid.confirmPwIsValid.bool
                        ? classes.isValid
                        : classes.notValid,
                    },
                  }}
                />
              </FormControl>
              <Grid container justify="center">
                <LargeButton type="submit" variant="contained" color="primary">
                  Create
                </LargeButton>
              </Grid>
            </form>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default RegisterForm;
