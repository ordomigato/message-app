import React, { useReducer, useEffect } from "react";
import UserContext from "../context/users";
import userReducer from "../reducer/users";

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  AUTH_SUCCESS,
  AUTH_ERROR,
} from "../constants";

const UserState = props => {
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: true,
  };

  // signup action
  const signup = async user => {
    try {
      dispatch({
        type: SIGNUP_SUCCESS,
      });
      return { msg: "user successfully registered" };
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
      return { error: err.msg };
    }
  };

  // login action
  const login = async user => {
    try {
      dispatch({
        type: LOGIN_SUCCESS,
      });
      return { msg: "user successfully logged in" };
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
      return { error: err.msg };
    }
  };

  // loadUser info
  const loadUser = async () => {
    try {
      dispatch({
        type: AUTH_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        signup,
        login,
        loadUser,
      }}
    >
      {/* fix to avoid rendering prior to loading user */}
      {!state.loading && props.children}
    </UserContext.Provider>
  );
};

export default UserState;
