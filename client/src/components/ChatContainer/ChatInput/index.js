import React, { useState, useContext } from "react";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ConversationContext from "store/context/conversations";

const useStyles = makeStyles(() => ({
  container: {
    padding: "0 30px",
  },
  input: {
    width: "100%",
    backgroundColor: "#E9EEF9",
    padding: "14px",
    borderRadius: "3px",
    margin: "12px 0 20px 0",
  },
  icon: {
    color: "#B1C3DF",
  },
}));

const ChatInput = () => {
  const { sendMessage, openedConversation } = useContext(ConversationContext);
  const classes = useStyles();
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setMsg(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(msg, openedConversation.id);
    setMsg("");
  };

  return (
    <form className={classes.container} onSubmit={onSubmit}>
      <InputBase
        id="chat-input"
        value={msg}
        onChange={onChange}
        label="chat-input"
        placeholder="Type something..."
        className={classes.input}
      />
    </form>
  );
};

export default ChatInput;
