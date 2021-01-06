import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from "../constants";

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupErrors: [],
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        signupErrors: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginErrors: [],
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginErrors: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
