import React, { useReducer } from "react";
import ConversationContext from "../context/conversations";
import conversationReducer from "../reducer/conversations";
import JackImage from "../../assets/img/jack.png";
import JillImage from "../../assets/img/jill.png";

import { CHANGE_CONVERSATION, SEND_MESSAGE_SUCCESS } from "../constants";

const ConversationState = props => {
  const initialState = {
    // Remove once we can work with real data
    conversations: [
      {
        id: 1,
        participants: [{ id: 4321, username: "Jack", profileImage: JackImage }],
        messages: [
          {
            message: "Ready yet?",
            createdAt: "10:01",
            createdBy: 4321,
            User: {
              id: 4321,
              username: "Jack",
              profileImage: JackImage,
            },
          },
        ],
      },
      {
        id: 2,
        participants: [{ id: 1234, username: "Jill", profileImage: JillImage }],
        messages: [
          {
            message: "How's it going?",
            createdAt: "10:04",
            createdBy: 1234,
            User: {
              id: 1234,
              username: "Jill",
              profileImage: JillImage,
            },
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
