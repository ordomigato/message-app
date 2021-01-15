import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";

const useStyles = makeStyles(() => ({
  avatar: {
    display: (otherUser) => (otherUser ? null : "none"),
    height: "30px",
    width: "30px",
  },
  messageContainer: {
    marginLeft: (otherUser) => (otherUser ? "10px" : 0),
  },
  meta: {
    color: "#BECCE2",
    textAlign: (otherUser) => (otherUser ? "left" : "right"),
  },
  message: {
    padding: "10px 15px",
    marginTop: "5px",
    background: (otherUser) =>
      otherUser ? "linear-gradient(to right, #3a8dff, #86b9ff)" : "#F4F6FA",
    borderRadius: (otherUser) =>
      otherUser ? "0 10px 10px 10px" : "10px 10px 0 10px",
    color: (otherUser) => (otherUser ? "#fff" : "#91A3C0"),
  },
}));

const MessageContainer = ({ otherUser, message }) => {
  const classes = useStyles(otherUser);

  return (
    <Grid container justify={otherUser ? "flex-start" : "flex-end"}>
      <Grid item>
        {message.userInfo && (
          <Avatar
            className={classes.avatar}
            src={
              message.userInfo.profileImage
                ? message.userInfo.profileImage
                : null
            }
          />
        )}
      </Grid>
      <Grid item className={classes.messageContainer}>
        <Typography className={classes.meta}>
          {`${otherUser && message.userInfo ? message.userInfo.username : ""}`}{" "}
          <Moment format="h:mm">{message.createdAt}</Moment>
        </Typography>
        <Typography className={classes.message}>{message.message}</Typography>
      </Grid>
    </Grid>
  );
};

export default MessageContainer;
