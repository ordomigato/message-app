import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  avatar: {
    display: otherUser => (otherUser ? null : "none"),
    height: "30px",
    width: "30px",
  },
  messageContainer: {
    marginLeft: otherUser => (otherUser ? "10px" : 0),
  },
  meta: {
    color: "#BECCE2",
    textAlign: otherUser => (otherUser ? "left" : "right"),
  },
  message: {
    padding: "10px 15px",
    marginTop: "5px",
    background: otherUser =>
      otherUser ? "linear-gradient(to right, #3a8dff, #86b9ff)" : "#F4F6FA",
    borderRadius: otherUser =>
      otherUser ? "0 10px 10px 10px" : "10px 10px 0 10px",
    color: otherUser => (otherUser ? "#fff" : "#91A3C0"),
  },
}));

const MessageContainer = ({ otherUser, message }) => {
  const classes = useStyles(otherUser);

  return (
    <Grid container justify={otherUser ? "flex-start" : "flex-end"}>
      <Grid item>
        <Avatar className={classes.avatar} src={message.sentBy.image} />
      </Grid>
      <Grid item className={classes.messageContainer}>
        <Typography className={classes.meta}>{`${
          otherUser ? message.sentBy.name : ""
        } ${"10:00"}`}</Typography>
        <Typography className={classes.message}>{message.message}</Typography>
      </Grid>
    </Grid>
  );
};

export default MessageContainer;
