import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  TextField,
  FormControl,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import LargeButton from "../LargeButton";
import UserContext from "../../store/context/users";

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
}));

const LoginForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const { login, logout, isAuthenticated } = useContext(UserContext);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    pw: "",
  });

  const [loginErrors, setLoginErrors] = useState([]);

  const handleLogin = e => {
    e.preventDefault();
    login(loginInfo).then(res => {
      if (res.success === false) {
        return setLoginErrors([res.msg]);
      } else {
        setLoginErrors([]);
        history.push("/");
      }
    });
  };

  const updateState = e => {
    // extract name (used as key) and value
    const { name: key, value } = e.target;
    setLoginInfo({ ...loginInfo, [key]: value });
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
              <Typography variant="h5">Don't have an account?</Typography>
            </Grid>
            <Link to="/signup" className={classes.link}>
              <LargeButton color="primary">Create Account</LargeButton>
            </Link>
          </Grid>
          <Grid container direction="column" className={classes.formContainer}>
            <Typography variant="h2" component="h1">
              Welcome back!
            </Typography>
            {/* Display Errors */}
            {loginErrors.map((error, index) => (
              <MuiAlert variant="outlined" severity="error" key={index}>
                {error}
              </MuiAlert>
            ))}
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
              <Grid container justify="center">
                <LargeButton type="submit" variant="contained" color="primary">
                  Login
                </LargeButton>
              </Grid>
            </form>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default LoginForm;
