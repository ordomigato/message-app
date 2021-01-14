import {
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_FAIL,
  SEND_MESSAGE_SUCCESS,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_FAIL,
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_SUCCESS,
  SEARCH_USERS_SUCCESSFUL,
  SEARCH_USERS_CLEAR,
} from "../constants";

const conversationReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversations: [payload, ...state.conversations],
        openedConversation: payload,
      };
    case CREATE_CONVERSATION_FAIL: {
      return { ...state, loading: false };
    }
    case GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        conversations: payload,
        loading: false,
      };
    case GET_CONVERSATIONS_FAIL:
      return {
        ...state,
        conversations: [],
        openedConversation: null,
        loading: false,
      };
    case GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === payload.id ? payload : c
        ),
        openedConversation: payload,
        loading: false,
      };
    case GET_CONVERSATION_FAIL:
      return {
        ...state,
        loading: false,
      };
    case SEARCH_USERS_SUCCESSFUL:
      return {
        ...state,
        foundUsers: payload,
        loading: false,
      };
    case SEARCH_USERS_CLEAR:
      return {
        ...state,
        foundUsers: [],
        loading: false,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        openedConversation: {
          ...state.openedConversation,
          messages: [...state.openedConversation.messages, payload],
        },
        conversations: state.conversations.map((c) =>
          c.id === payload.conversationId
            ? { ...c, messages: [...c.messages, payload] }
            : c
        ),
      };
    default:
      return state;
  }
};

export default conversationReducer;
