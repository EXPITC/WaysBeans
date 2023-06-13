import { createContext, useReducer } from "react";

const initialState = {
  isModalLogin: false,
  isModalRegister: false,
};

export const AuthModalContext = createContext(initialState);

const reducer = (_state, action) => {
  switch (action) {
    case "openLoginModal":
      return {
        isModalLogin: true,
        isModalRegister: false,
      };
    case "openRegisterModal":
      return {
        isModalLogin: false,
        isModalRegister: true,
      };
    case "closeAuthModal":
      return initialState;
    default:
      return initialState;
  }
};

export const AuthModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthModalContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthModalContext.Provider>
  );
};
