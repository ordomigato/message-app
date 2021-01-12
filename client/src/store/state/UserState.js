import React, { useReducer, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/users";
import userReducer from "../reducer/users";
import setAuthToken from "../../utils/setAuthToken";

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
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
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(user);

      const res = await axios.post("/api/auth/signup", body, config);

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data.results,
      });
      return { msg: "user successfully registered" };
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
      return err.response.data;
    }
  };

  // login action
  const login = async user => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(user);

      const res = await axios.post("/api/auth/login", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.results,
      });
      return { msg: "user successfully logged in" };
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
      });
      return err.response.data;
    }
  };

  // loadUser info
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
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
        logout,
      }}
    >
      {/* fix to avoid rendering prior to loading user */}
      {!state.loading && props.children}
    </UserContext.Provider>
  );
};

export default UserState;
