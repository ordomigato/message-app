import React, { useReducer, useCallback, useContext, useEffect } from "react";
import setAuthToken from "../../utils/setAuthToken";
import ConversationContext from "../context/conversations";
import conversationReducer from "../reducer/conversations";
import { SocketContext } from "socket";
import {
  SEND_MESSAGE_SUCCESS,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_FAIL,
  GET_CONVERSATIONS_FAIL,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_SUCCESS,
  RESET_CONVERSATIONS,
} from "../constants";
import axios from "axios";

const ConversationState = (props) => {
  const initialState = {
    // Remove once we can work with real data
    conversations: [],
    openedConversation: null,
    loading: true,
  };

  const resetConversationState = () => {
    dispatch({
      payload: initialState,
      type: RESET_CONVERSATIONS,
    });
  };

  const { socket, isConnected } = useContext(SocketContext);

  useEffect(() => {
    if (!isConnected) return;
    socket.on("new-message", (message) => {
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: message,
      });
    });
  }, [socket]);

  // send message
  const sendMessage = (msg, conversationId) => {
    const message = { text: msg, conversationId };
    socket.emit("new-message", message);
  };

  // get multiple conversations
  const getConversations = useCallback(async () => {
    // needed as initial load will not attach authorization header
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

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
        resetConversationState,
      }}
    >
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationState;
