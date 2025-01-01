import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUser({ username: decodedToken.username });
        }
        setLoading(false);
    }, []);


    useEffect(()=> {
        console.log(user);
    }, [user])


    return(<AuthContext.Provider value = {{user , setUser, loading, setLoading }}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () =>  { 
    return useContext(AuthContext);
};