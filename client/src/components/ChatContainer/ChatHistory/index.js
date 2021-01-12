import React from "react";
import { Grid } from "@material-ui/core";
import MessageContainer from "./MessageContainer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    padding: "calc(30px - 0.5rem  )",
  },
}));

const ChatHistory = ({ currentConversation }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      {currentConversation.messages.map((message, i) => (
        <MessageContainer
          // update when messages have unique ids
          key={i}
          // Update when authentication works to test current user ID
          otherUser={message.User.id === 1 ? false : true}
          message={message}
        />
      ))}
    </Grid>
  );
};

export default ChatHistory;
