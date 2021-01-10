import React from "react";
import ProfileHeader from "./ProfileHeader";
import ChatList from "./ChatList";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    padding: "20px",
  },
}));

const ChatDrawer = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.container}>
      <ProfileHeader />
      <ChatList />
    </Grid>
  );
};

export default ChatDrawer;
