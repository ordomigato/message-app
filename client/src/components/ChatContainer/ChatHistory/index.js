import React, { useContext, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import MessageContainer from "./MessageContainer";
import { makeStyles } from "@material-ui/core/styles";
import ConversationContext from "store/context/conversations";
import UserContext from "store/context/users";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "calc(30px - 0.5rem  )",
  },
}));

const ChatHistory = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { openedConversation } = useContext(ConversationContext);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef === null) return;
    messagesEndRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [openedConversation]);

  return (
    <Grid container className={classes.container}>
      {openedConversation &&
        openedConversation.messages.map((m) => (
          <MessageContainer
            key={m.id}
            message={m}
            otherUser={m.createdBy !== user.id ? true : false}
          />
        ))}
      <div ref={messagesEndRef} />
    </Grid>
  );
};

export default ChatHistory;
