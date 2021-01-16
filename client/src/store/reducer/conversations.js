import {
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_FAIL,
  SEND_MESSAGE_SUCCESS,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_FAIL,
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_SUCCESS,
  RESET_CONVERSATIONS,
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
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        openedConversation:
          state.openedConversation === null
            ? null
            : {
                ...state.openedConversation,
                messages: [...state.openedConversation.messages, payload],
              },
        conversations: state.conversations.map((c) =>
          c.id === payload.conversationId
            ? { ...c, messages: [...c.messages, payload] }
            : c
        ),
      };
    case RESET_CONVERSATIONS:
      return {
        payload,
      };
    default:
      return state;
  }
};

export default conversationReducer;
