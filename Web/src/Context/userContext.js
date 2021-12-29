import React,{ createContext, useReducer } from 'react'
import jwt from 'jsonwebtoken'
export const UserContext = createContext(null);

const initialState = {
    isLogin: false,
    user: {},
}

const reducer = (state, action) => {
    const { status, payload } = action;
    // let verify;
    // if (payload?.token) {
    //     verify = jwt.verify(payload.token, process.env.REACT_APP_X);
    // }
    
    // const verify = jwt.verify(payload.token, process.env.REACT_APP_X);
    // const { role } = verify
    // console.log(role)
    switch (status) {
        case 'login':
            localStorage.setItem('token', payload.token)
            return {
                isLogin: true,
                user: payload
            }
        case 'logout':
            localStorage.removeItem('token')
            return {
                isLogin: false,
                user: {}
            }
        default:
            throw new Error();
    }    
}

export const UserContextProvider = ({ children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        < UserContext.Provider value={{ state, dispatch }} >
            {children}       
        </UserContext.Provider>
    )
}