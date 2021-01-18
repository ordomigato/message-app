import React from "react";
import ProfileHeader from "./ProfileHeader";
import ChatList from "./ChatList";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    maxHeight: "100vh",
    overflow: "hidden",
    flexWrap: "nowrap",
    padding: "20px",
  },
  chatList: {
    flexGrow: "1",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.5em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const ChatDrawer = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.container}>
      <ProfileHeader />
      <Grid item className={classes.chatList}>
        <ChatList />
      </Grid>
    </Grid>
  );
};

export default ChatDrawer;
