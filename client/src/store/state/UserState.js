import React, { useReducer } from "react";
import UserContext from "../context/users";
import userReducer from "../reducer/users";

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from "../constants";

const UserState = props => {
  const initialState = {
    signupErrors: [],
    loginErrors: [],
  };

  // signup action
  const signup = async user => {
    try {
      if (user.email !== "test@test.com")
        throw { msg: "email is already taken" };
      dispatch({
        type: SIGNUP_SUCCESS,
      });
      return { msg: "user successfully registered" };
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
        payload: err.msg,
      });
    }
  };

  // login action
  const login = async user => {
    try {
      if (user.email !== "test@test.com") throw { msg: "email is not correct" };
      dispatch({
        type: LOGIN_SUCCESS,
      });
      return { msg: "user successfully logged in" };
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.msg,
      });
    }
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider
      value={{
        signupErrors: state.signupErrors,
        loginErrors: state.loginErrors,
        signup,
        login,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
