import React from "react";
import AuthBanner from "components/AuthBanner";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    padding: 0,
  },
  FormContainer: {
    padding: "40px",
  },
}));

const AuthLayout = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth={false} className={classes.root}>
      <Grid container direction="row">
        <Grid item sm={5} xs={12}>
          <AuthBanner />
        </Grid>
        <Grid item sm={7} xs={12} className={classes.FormContainer}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthLayout;
