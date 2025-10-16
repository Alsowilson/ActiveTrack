import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect (() => {
        const storedUser = localStorage.getItem("activeTrackUser"); 
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem("activeTrackUser", JSON.stringify(user));
        } else {
            localStorage.removeItem("activeTrackUser");
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData);
    };

    const signup = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

