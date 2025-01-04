import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authAlertOpen, setAuthAlertOpen] = useState(null);


    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUser({ username: decodedToken.username });
        }
        setLoading(false);
    }, []);

    return(<AuthContext.Provider value = {{user , setUser, loading, setLoading, authAlertOpen, setAuthAlertOpen }}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () =>  { 
    return useContext(AuthContext);
};