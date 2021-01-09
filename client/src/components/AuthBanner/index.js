import React from "react";
import backgroundImage from "../../assets/img/bg-img.png";
import ChatBubble from "../../assets/svg/ChatBubble";
import { Typography, Paper, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
  },
  paper: {
    backgroundImage: ` url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    minHeight: "100vh",
  },
  gradient: {
    background: "linear-gradient(#3a8dff, #86b9ff)",
    height: "100%",
    minHeight: "100vh",
    opacity: 0.85,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: "100px",
  },
}));

const AuthBanner = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container} display={{ xs: "none", sm: "block" }}>
      <Paper className={classes.gradient} elevation={0} square></Paper>
      <Paper className={classes.paper} elevation={0} square></Paper>
      <Box className={classes.content}>
        <Grid container direction="column" spacing={2}>
          <Grid item align="center">
            <ChatBubble color="#fff" />
          </Grid>
          <Grid item>
            <Typography variant="h3" component="h2" align="center">
              Converse with anyone with any language
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AuthBanner;
