import React, { useReducer, useCallback } from "react";
import ConversationContext from "../context/conversations";
import conversationReducer from "../reducer/conversations";
import {
  SEND_MESSAGE_SUCCESS,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_FAIL,
  GET_CONVERSATIONS_FAIL,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_SUCCESS,
} from "../constants";
import axios from "axios";

const ConversationState = (props) => {
  const initialState = {
    // Remove once we can work with real data
    conversations: [],
    openedConversation: null,
    loading: true,
  };

  // send message
  const sendMessage = (msg) => {
    console.log(msg);
  };

  // get multiple conversations
  const getConversations = useCallback(async () => {
    try {
      const res = await axios.get("/api/conversations");
      dispatch({
        type: GET_CONVERSATIONS_SUCCESS,
        payload: res.data.results,
      });
    } catch (err) {
      dispatch({
        type: GET_CONVERSATIONS_FAIL,
      });
    }
  }, []);

  // get a single conversation
  const getConversation = async (id) => {
    try {
      const res = await axios.get(`/api/conversations/${id}`);

      dispatch({ type: GET_CONVERSATION_SUCCESS, payload: res.data.results });
    } catch (err) {
      dispatch({
        type: GET_CONVERSATION_FAIL,
      });
    }
  };

  const createConversation = async (participants) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ participants: participants });

      const res = await axios.post("/api/conversations", body, config);

      dispatch({
        type: CREATE_CONVERSATION_SUCCESS,
        payload: res.data.results,
      });
    } catch (err) {
      // if results.foundConvoId exists, the conversation already existed
      if (err.response.data.results) {
        getConversation(err.response.data.results.foundConvoId);
        return;
      }

      dispatch({
        type: CREATE_CONVERSATION_FAIL,
      });
    }
  };

  const [state, dispatch] = useReducer(conversationReducer, initialState);
  return (
    <ConversationContext.Provider
      value={{
        conversations: state.conversations,
        openedConversation: state.openedConversation,
        getConversation,
        getConversations,
        createConversation,
        sendMessage,
      }}
    >
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationState;
