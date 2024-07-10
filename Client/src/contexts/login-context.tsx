/* eslint-disable no-unused-vars */
import { createContext, Dispatch, ReactNode, useReducer } from 'react';

interface State { 
    email: string
}

const initialState: State = {
    email:''
}

type LoginContextProps = {
    state: State,
    dispatch: Dispatch<any>
}

const reducer = (state:State, action:any) => {
    switch (action.type) {
        case 'SET_EMAIL' : 
            return {
                ...state,
                email: action.payload
            }
        default: 
            return state;
        }   
}

export const LoginContext = createContext<any>({});

export const LoginProvider = ({children}: {children:ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState) // third is lazy initialization it initiated on client side

    return (
        <LoginContext.Provider value={{state, dispatch}}>
            {children}
        </LoginContext.Provider>
    )
}
