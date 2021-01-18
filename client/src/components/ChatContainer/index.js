import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { makeStyles } from "@material-ui/core/styles";
import ConversationContext from "store/context/conversations";

const useStyles = makeStyles((theme) => ({
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
  const { openedConversation } = useContext(ConversationContext);

  return (
    <Grid container direction="column" className={classes.container}>
      {openedConversation ? (
        <>
          <Grid item>
            <ChatHeader />
          </Grid>
          <Grid item className={classes.chatHistory}>
            <ChatHistory />
          </Grid>
          <Grid item>
            <ChatInput />
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};

export default ChatContainer;
