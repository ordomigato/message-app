import React, { useState, useContext } from "react";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ConversationContext from "../../../store/context/conversations";

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

const ChatInput = ({ currentConversation }) => {
  const { sendMessage } = useContext(ConversationContext);
  const classes = useStyles();
  const [msg, setMsg] = useState({
    message: "",
  });

  const onChange = e => {
    setMsg({ ...msg, message: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    // add conversation id to msg object
    msg.conversationId = currentConversation.id;
    msg.sentBy = { id: 1, name: "George" };
    sendMessage(msg);
    setMsg({ message: "" });
  };

  return (
    <form className={classes.container} onSubmit={onSubmit}>
      <InputBase
        id="chat-input"
        value={msg.message}
        onChange={onChange}
        label="chat-input"
        placeholder="Type something..."
        className={classes.input}
      />
    </form>
  );
};

export default ChatInput;
