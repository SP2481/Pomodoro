import { createContext, ReactNode, useState } from 'react';

export const LoginContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});

export const LoginProvider = ({ children }:{children:ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
        return;
    };

    const logout = () => {
        setIsLoggedIn(false);
        return;
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};
