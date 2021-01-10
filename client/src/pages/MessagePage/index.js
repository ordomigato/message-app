import React from "react";
import ChatDrawer from "../../components/ChatDrawer";
import ChatContainer from "../../components/ChatContainer";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: 0,
  },
}));

const MessagePage = props => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth={false} className={classes.root}>
      <Grid container direction="row">
        <Grid item sm={6} md={4} xs={12}>
          <ChatDrawer />
        </Grid>
        <Grid item sm={6} md={8} xs={12}>
          <ChatContainer />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MessagePage;
