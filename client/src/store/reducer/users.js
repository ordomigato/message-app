import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  AUTH_SUCCESS,
  AUTH_ERROR,
} from "../constants";

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loading: false,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
