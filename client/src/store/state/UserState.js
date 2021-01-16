import React, { useReducer, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import UserContext from "../context/users";
import userReducer from "../reducer/users";
import setAuthToken from "../../utils/setAuthToken";
import { SocketContext } from "socket";

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  SEARCH_USERS_CLEAR,
  SEARCH_USERS_SUCCESSFUL,
  SET_ONLINE_USERS,
} from "../constants";

const UserState = (props) => {
  const initialState = {
    isAuthenticated: false,
    user: {},
    users: [],
    loading: true,
    onlineUsers: [],
  };

  const setOnlineUsers = useCallback((users) => {
    dispatch({
      type: SET_ONLINE_USERS,
      payload: users,
    });
  }, []);

  // signup action
  const signup = async (user) => {
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
  const login = async (user) => {
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

  // find users
  const findUsers = useCallback(async (query) => {
    try {
      if (!query) {
        dispatch({
          type: SEARCH_USERS_CLEAR,
        });
        return;
      }
      const res = await axios.get(`/api/users/username/${query}`);
      dispatch({
        type: SEARCH_USERS_SUCCESSFUL,
        payload: res.data.users,
      });
    } catch (err) {
      dispatch({
        type: SEARCH_USERS_CLEAR,
      });
    }
  }, []);

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
        users: state.users,
        onlineUsers: state.onlineUsers,
        setOnlineUsers,
        findUsers,
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
