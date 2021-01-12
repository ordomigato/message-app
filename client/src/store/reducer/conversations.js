import { CHANGE_CONVERSATION, SEND_MESSAGE_SUCCESS } from "../constants";

const conversationReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_CONVERSATION:
      return {
        ...state,
        openedConversation: payload,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        conversations: state.conversations.map(conversation => {
          if (conversation.id === payload.conversationId) {
            return {
              ...conversation,
              messages: [...conversation.messages, payload],
            };
          } else {
            return conversation;
          }
        }),
      };
    default:
      return state;
  }
};

export default conversationReducer;
