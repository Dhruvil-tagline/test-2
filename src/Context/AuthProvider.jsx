import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setUser] = useState(null);

    useEffect(() => {
        const parts = document.cookie.split(`token=`);
        let output = parts[parts.length - 1];
        if (output) {
            setUser(output);
        }
        }, []);

    const setToken = (token) => {
        document.cookie = `token=${token}`;
        setUser(token);
    };

    const removeToken = () => {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, removeToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook to access AuthContext easily
export const useAuth = () => useContext(AuthContext);