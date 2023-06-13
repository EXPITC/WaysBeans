import React, { createContext, useReducer } from "react";
import { API } from "../config/api";

const initialState = {
  isLogin: null,
  user: {},
  isUserOrder: null,
};

export const UserContext = createContext(initialState);

const reducer = (state, action) => {
  const { status, payload } = action;

  switch (status) {
    case "login":
      localStorage.setItem("token", payload.token);
      API.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
      return {
        isLogin: true,
        user: payload,
      };
    case "logout":
      localStorage.removeItem("token");
      delete API.defaults.headers.common["Authorization"];
      return {
        ...initialState,
        isLogin: false,
      };
    case "isUserOrder":
      return {
        ...state,
        isUserOrder: payload,
      };
    case "isLogin":
      return {
        ...state,
        isLogin: payload,
      };
    default:
      return initialState;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
