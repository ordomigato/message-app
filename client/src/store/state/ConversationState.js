import React, { useReducer } from "react";
import ConversationContext from "../context/conversations";
import conversationReducer from "../reducer/conversations";
import JackImage from "../../assets/img/jack.png";
import JillImage from "../../assets/img/jill.png";

import { CHANGE_CONVERSATION, SEND_MESSAGE_SUCCESS } from "../constants";

const ConversationState = props => {
  const initialState = {
    conversations: [
      {
        id: 1,
        participants: [{ id: 2, name: "Jack", image: JackImage }],
        messages: [
          {
            message: "Ready yet?",
            createdAt: "10:01",
            sentBy: { id: 2, name: "Jack", image: JackImage },
            viewedBy: [{ id: 2, name: "Jack" }],
          },
        ],
      },
      {
        id: 2,
        participants: [{ id: 3, name: "Jill", image: JillImage }],
        messages: [
          {
            message: "How's it going?",
            createdAt: "10:04",
            sentBy: { id: 3, name: "Jill", image: JillImage },
            viewedBy: [{ id: 3, name: "Jill" }],
          },
        ],
      },
    ],
    openedConversation: null,
  };

  // send message
  const sendMessage = msg => {
    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      payload: msg,
    });
  };

  const changeConversation = conversationId => {
    dispatch({
      type: CHANGE_CONVERSATION,
      payload: conversationId,
    });
  };

  const [state, dispatch] = useReducer(conversationReducer, initialState);
  return (
    <ConversationContext.Provider
      value={{
        conversations: state.conversations,
        openedConversation: state.openedConversation,
        changeConversation,
        sendMessage,
      }}
    >
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationState;
