import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  SEARCH_USERS_SUCCESSFUL,
  SEARCH_USERS_CLEAR,
  SET_ONLINE_USERS,
} from "../constants";

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        loading: false,
      };
    case SIGNUP_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        loading: false,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
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
        user: payload.user,
        loading: false,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loading: false,
      };
    case SEARCH_USERS_SUCCESSFUL:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case SEARCH_USERS_CLEAR:
      return {
        ...state,
        users: [],
        loading: false,
      };
    case SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
