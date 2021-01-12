import React, { useContext, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { makeStyles } from "@material-ui/core/styles";
import ConversationContext from "store/context/conversations";

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: "100vh",
    maxHeight: "100vh",
    overflow: "hidden",
    flexWrap: "nowrap",
  },
  chatHistory: {
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

const ChatContainer = () => {
  const classes = useStyles();
  const { openedConversation, conversations } = useContext(ConversationContext);
  const [currentConversation, setCurrentConversation] = useState(null);

  useEffect(() => {
    const findConversation = () => {
      // find conversation based on id
      const conversation = conversations.find(
        conversation => conversation.id === openedConversation
      );
      setCurrentConversation(conversation);
    };

    findConversation();
  }, [conversations, openedConversation, currentConversation]);

  return (
    <Grid container direction="column" className={classes.container}>
      {currentConversation ? (
        <>
          <Grid item>
            <ChatHeader currentConversation={currentConversation} />
          </Grid>
          <Grid item className={classes.chatHistory}>
            <ChatHistory currentConversation={currentConversation} />
          </Grid>
          <Grid item>
            <ChatInput currentConversation={currentConversation} />
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};

export default ChatContainer;
