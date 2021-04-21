import { createContext } from 'react';

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: (jwtToken: string, userId: string) => {},
    logout: () => {},
    isAuthentification: false    
});